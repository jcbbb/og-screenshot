const { Router } = require("express");
const { parse } = require("url");
const { sanitazeUrl, getDimensions, getUrlFromPathname } = require("../utils/utils");
const puppeteer = require("puppeteer");

const router = Router();

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

router.get("/*", async (req, res) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  try {
    const { pathname = "/", query = {} } = parse(req.url, true);
    const url = getUrlFromPathname(pathname);
    const { viewport, format, fullpage } = query;

    const [width, height] = viewport ? getDimensions(viewport) : [DEFAULT_WIDTH, DEFAULT_HEIGHT];

    sanitazeUrl(url);

    const page = await browser.newPage();

    await page.setViewport({
      width,
      height,
      isMobile: true,
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const screenshot = await page.screenshot({
      omitBackground: true,
      type: format || "png",
      fullPage: fullpage || false,
    });

    await browser.close();
    res.contentType(`image/${format || "png"}`);
    res.send(screenshot);
  } catch (err) {
    res.status(500).json({ err });
  } finally {
    await browser.close();
  }
});

module.exports = router;
