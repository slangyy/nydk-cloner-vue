import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const outputDirectory = new URL("../public/assets/poseena/", import.meta.url);

const assets = [
  ["hero.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/91deb383-1cf1-48ea-a1b9-ad273cc60633.jpg"],
  ["louvre.png", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/5c89a350-1f1b-4125-8724-5215e485478f.png"],
  ["brand-light.png", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/a8d31f7b-e31f-4b3d-9166-e2b9452e7eaa.png"],
  ["mentor-wu.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/25a3dcf5-e07c-4932-bfb9-eb2cebf78384.jpg"],
  ["mentor-li.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/da64af10-228c-4c8e-b3a3-a62373d09c2c.jpg"],
  ["pursuit.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/4012c4e2-176d-45b7-9faa-10bcfa6fae88.jpg"],
  ["product-system.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/5e3fa4d8-83d4-4327-9a1e-c2df9a71068f.jpg"],
  ["case-store.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/0d58c2bb-86fe-4f21-8522-24b3f1c154da.jpg"],
  ["case-hyatt.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/9d4abd8c-be10-41d8-914e-603fe0225416.jpg"],
  ["case-airport.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/pg2024102815374863441/cms/image/eb46e3a7-9e62-448a-9ae5-37ed413305e0.jpg"],
  ["pattern-light.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/ngc202306270002/cms/image/9f3cec4a-2ba5-46d7-9e9d-21c801a85597.jpg?d=1719480807102"],
  ["pattern-rose.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/ngc202306270002/cms/image/14aef30a-8048-4026-a6cd-d624d6775b54.jpg?d=1719480825063"],
  ["strategy-hover.jpg", "https://omo-oss-image.thefastimg.com/portal-saas/ngc202306270002/cms/image/9fcbd45e-99b1-48a9-9849-ede2d3833b69.jpg?d=1719480874391"],
];

async function download([fileName, url]) {
  const response = await fetch(url, {
    headers: {
      Referer: "https://www.ny-dk.com/ExtremeSystem.html",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) {
    throw new Error(`Empty response: ${url}`);
  }

  const declaredType = response.headers.get("content-type") ?? "";
  const extension = extname(fileName).slice(1);
  if (!declaredType.includes(extension === "jpg" ? "jpeg" : extension)) {
    console.warn(`Unexpected content type for ${basename(fileName)}: ${declaredType}`);
  }

  await writeFile(new URL(fileName, outputDirectory), bytes);
  return `${fileName}: ${bytes.length} bytes`;
}

await mkdir(outputDirectory, { recursive: true });

for (let index = 0; index < assets.length; index += 4) {
  const batch = assets.slice(index, index + 4);
  const results = await Promise.all(batch.map(download));
  results.forEach((result) => console.log(result));
}
