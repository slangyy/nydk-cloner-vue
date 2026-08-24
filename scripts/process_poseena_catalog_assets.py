"""Create web-ready POSEENA catalog assets from temporary PowerPoint exports.

The source deck and its password are intentionally not handled by this script.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


@dataclass(frozen=True)
class ProductGroup:
    id: str
    label: str
    source_id: str
    source_label: str
    first_slide: int
    last_slide: int


PRODUCT_GROUPS = (
    ProductGroup("sofa", "沙发", "poseena", "POSEENA 普西纳", 238, 247),
    ProductGroup("chair-stool", "椅凳", "poseena", "POSEENA 普西纳", 248, 276),
    ProductGroup("occasional-table", "几类", "poseena", "POSEENA 普西纳", 277, 297),
    ProductGroup("cabinet", "柜类", "poseena", "POSEENA 普西纳", 298, 311),
    ProductGroup("bed", "床类", "poseena", "POSEENA 普西纳", 312, 316),
    ProductGroup("table", "桌类", "poseena", "POSEENA 普西纳", 317, 331),
    ProductGroup("rack", "置物架", "poseena", "POSEENA 普西纳", 332, 333),
    ProductGroup("yanshan", "砚山", "yanshan", "POSEENA · 砚山", 334, 342),
    ProductGroup("panshi", "磐石", "panshi", "POSEENA · 磐石", 343, 358),
)

CASE_SOURCES = (
    ("source-house", "源邸壹号·合院", 172, 179),
    ("greenland", "绿地集团", 180, 189),
    ("sunac-qujiang", "融创·曲江印", 190, 196),
    ("venice-wuxinhu", "威尼斯·五鑫湖", 197, 205),
    ("baojie-villa", "宝界山庄", 206, 218),
)


def resize_within(image: Image.Image, longest: int) -> Image.Image:
    width, height = image.size
    scale = min(1.0, longest / max(width, height))
    if scale == 1:
        return image
    return image.resize(
        (max(1, round(width * scale)), max(1, round(height * scale))),
        Image.Resampling.LANCZOS,
    )


def largest_component_bbox(mask: np.ndarray) -> tuple[int, int, int, int]:
    height, width = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    best_pixels: list[tuple[int, int]] = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or seen[y, x]:
                continue
            stack = [(x, y)]
            seen[y, x] = True
            pixels: list[tuple[int, int]] = []
            while stack:
                current_x, current_y = stack.pop()
                pixels.append((current_x, current_y))
                for next_x, next_y in (
                    (current_x - 1, current_y),
                    (current_x + 1, current_y),
                    (current_x, current_y - 1),
                    (current_x, current_y + 1),
                ):
                    if (
                        0 <= next_x < width
                        and 0 <= next_y < height
                        and mask[next_y, next_x]
                        and not seen[next_y, next_x]
                    ):
                        seen[next_y, next_x] = True
                        stack.append((next_x, next_y))
            if len(pixels) > len(best_pixels):
                best_pixels = pixels
    if not best_pixels:
        raise ValueError("No opaque product pixels found")
    xs = [pixel[0] for pixel in best_pixels]
    ys = [pixel[1] for pixel in best_pixels]
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def crop_product(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    alpha = rgba.getchannel("A")
    scale = 8
    small = alpha.resize(
        (max(1, width // scale), max(1, height // scale)),
        Image.Resampling.BOX,
    )
    small_array = np.array(small, copy=True)
    small_array[: round(small.height * 0.1), :] = 0
    small_array[round(small.height * 0.77) :, :] = 0
    binary = Image.fromarray(np.where(small_array > 14, 255, 0).astype(np.uint8))
    connected = binary.filter(ImageFilter.MaxFilter(9))
    bbox = largest_component_bbox(np.asarray(connected) > 0)
    left = max(0, bbox[0] * scale - round(width * 0.035))
    top = max(0, bbox[1] * scale - round(height * 0.035))
    right = min(width, bbox[2] * scale + round(width * 0.035))
    bottom = min(height, bbox[3] * scale + round(height * 0.035))

    local_alpha = np.asarray(alpha)[top:bottom, left:right]
    opaque_y, opaque_x = np.where(local_alpha > 8)
    if opaque_x.size:
        padding = round(max(width, height) * 0.02)
        refined_left = max(0, left + int(opaque_x.min()) - padding)
        refined_right = min(width, left + int(opaque_x.max()) + padding + 1)
        refined_top = max(0, top + int(opaque_y.min()) - padding)
        refined_bottom = min(height, top + int(opaque_y.max()) + padding + 1)
        left, right = refined_left, refined_right
        top, bottom = refined_top, refined_bottom
    return rgba.crop((left, top, right, bottom))


def save_variants(image: Image.Image, full_path: Path, thumb_path: Path) -> dict[str, int]:
    full_path.parent.mkdir(parents=True, exist_ok=True)
    thumb_path.parent.mkdir(parents=True, exist_ok=True)
    full = resize_within(image, 2560)
    full.save(full_path, "WEBP", quality=91, method=4)
    thumbnail = resize_within(full, 360)
    thumbnail.save(thumb_path, "WEBP", quality=84, method=3)
    return {"width": full.width, "height": full.height}


def content_hash(image: Image.Image) -> str:
    rgba = image.convert("RGBA")
    digest = hashlib.sha256()
    digest.update(f"{rgba.width}x{rgba.height}".encode())
    digest.update(rgba.tobytes())
    return digest.hexdigest()


def source_for_case_slide(slide: int) -> tuple[str, str]:
    for source_id, label, first_slide, last_slide in CASE_SOURCES:
        if first_slide <= slide <= last_slide:
            return source_id, label
    raise ValueError(f"Unexpected case slide {slide}")


def clear_generated_webp(directory: Path) -> None:
    for variant in ("full", "thumbs"):
        variant_directory = directory / variant
        if not variant_directory.exists():
            continue
        for generated_file in variant_directory.glob("*.webp"):
            generated_file.unlink()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--products", type=Path, required=True)
    parser.add_argument("--cases", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    manifest: dict[str, object] = {"groups": [], "caseSources": []}
    groups: list[dict[str, object]] = []
    for group in PRODUCT_GROUPS:
        clear_generated_webp(args.output / group.id)
        records: list[dict[str, object]] = []
        for position, slide in enumerate(range(group.first_slide, group.last_slide + 1), 1):
            source = args.products / f"slide-{slide}.png"
            if not source.exists():
                raise FileNotFoundError(source)
            product = crop_product(Image.open(source))
            filename = f"{position:03d}-s{slide}.webp"
            full = args.output / group.id / "full" / filename
            thumb = args.output / group.id / "thumbs" / filename
            dimensions = save_variants(product, full, thumb)
            records.append(
                {
                    "id": f"{group.id}-{position:03d}",
                    "slide": slide,
                    "filename": filename,
                    "sha256": content_hash(product),
                    **dimensions,
                    "sourceId": group.source_id,
                    "sourceLabel": group.source_label,
                }
            )
        groups.append(
            {
                "id": group.id,
                "label": group.label,
                "firstSlide": group.first_slide,
                "lastSlide": group.last_slide,
                "images": records,
            }
        )

    seen_case_hashes: set[str] = set()
    case_records: list[dict[str, object]] = []
    clear_generated_webp(args.output / "customer-cases")
    for source in sorted(args.cases.glob("*.png")):
        if source.stat().st_size < 100_000:
            continue
        slide = int(source.name.split("-", 1)[0])
        source_id, source_label = source_for_case_slide(slide)
        image = Image.open(source).convert("RGB")
        digest = content_hash(image)
        if digest in seen_case_hashes:
            continue
        seen_case_hashes.add(digest)
        position = len(case_records) + 1
        filename = f"{position:03d}-{source_id}-s{slide}.webp"
        full = args.output / "customer-cases" / "full" / filename
        thumb = args.output / "customer-cases" / "thumbs" / filename
        dimensions = save_variants(image, full, thumb)
        case_records.append(
            {
                "id": f"customer-case-{position:03d}",
                "slide": slide,
                "filename": filename,
                "sha256": digest,
                **dimensions,
                "sourceId": source_id,
                "sourceLabel": source_label,
            }
        )
    groups.append(
        {
            "id": "customer-cases",
            "label": "客户案例",
            "firstSlide": 172,
            "lastSlide": 218,
            "images": case_records,
        }
    )
    manifest["groups"] = groups
    manifest["caseSources"] = [
        {
            "id": source_id,
            "label": label,
            "firstSlide": first_slide,
            "lastSlide": last_slide,
        }
        for source_id, label, first_slide, last_slide in CASE_SOURCES
    ]
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
