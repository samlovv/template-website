import puppeteer from "puppeteer";
import { utapi } from "../uploadthing";

export async function generateScreenshotAndUpload({html , css, tailwind}: any) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });



  const fullHtml = `${ tailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}<style>
            html, body {
                border-radius: 10px;
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: sans-serif;
                overflow: hidden;
              } ${css}</style>${html}`;


  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "networkidle0" });
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2, // делает более чёткий скрин
    });

  
  const buffer = await page.screenshot({ type: "png", fullPage: true });

  

  await browser.close();
  const file = new File([buffer], "screenshot.png", { type: "image/png" });

  const uploaded = await utapi.uploadFiles([file]);

  const url = uploaded[0]?.data?.url;

  return url || null;
}
