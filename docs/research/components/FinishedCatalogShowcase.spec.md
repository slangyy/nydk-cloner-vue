# FinishedCatalogShowcase Specification

## Scope

- Route: `/home_decoration_p5` only.
- The other finished-system routes continue to use `FinishedSpaceShowcase`.
- Source data: `src/data/products/poseenaCatalog.ts`.
- Processed asset manifest:
  `public/assets/products/finished/poseena/catalog/manifest.json`.

## Catalog order and counts

1. 沙发：10
2. 椅凳：29
3. 几类：21
4. 柜类：14
5. 床类：5
6. 桌类：15
7. 置物架：2
8. 砚山：9
9. 磐石：16
10. 客户案例：47 张，按源邸壹号·合院、绿地集团、融创·曲江印、
    威尼斯·五鑫湖、宝界山庄的画册页序合并。

产品使用透明背景主体图与 `contain`，客户案例使用室内图与 `cover`。
所有栏目封面等于该栏图库的第一张图片。

## Showcase behavior

- Layout and interaction follow the homepage `SpaceShowcase`: full-width dark
  stage, Russian/Chinese active title, white rule, circular warm-brown plus
  button and a bottom horizontal category rail.
- Product covers are rendered as complete transparent-background product images
  over the dark stage. Customer cases use full-stage `cover` photography.
- Clicking the stage background/product image or circular plus opens the current
  group's gallery.
- Desktop hover, focus and click switch the current category. During automatic
  centering, hover selection is briefly suspended so another item cannot become
  active merely by sliding under a stationary pointer.
- Rail arrows select the previous/next category with wrapping and center it.
  The native rail remains touch-scrollable and does not auto-play.
- The rail shows 6 categories on desktop, 4 on tablet and 3 on phone; the active
  category uses the same warm-brown pill as the homepage space rail.

## Gallery behavior

- Native modal dialog with a full-viewport dark surface.
- Every image is fully visible with `object-fit: contain`; thumbnails use the
  independently generated 360px assets.
- Previous/next wraps at both ends and is available from arrows, Left/Right,
  horizontal touch swipe and one-step mouse-wheel gestures.
- The active case image displays its five-case source label. Product images show
  the category/series source.
- The original-image fullscreen control requests fullscreen for the entire
  dialog surface, so the header and fixed top-right close button remain present.
- Escape and backdrop/stage-background click close the dialog. Body scrolling and
  triggering-button focus are restored after closing.
- Only the current large image is loaded by the dialog; adjacent large images are
  preloaded in JavaScript. All other rail images use thumbnails.

## Responsive calibration

- Desktop (1440px): 16:9 stage and 6 rail categories.
- Tablet (768px): minimum-height stage and 4 rail categories.
- Phone (390px): 500px stage, 3 rail categories, compact active heading and
  safe-area-aware gallery status.
