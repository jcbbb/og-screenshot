const { Router } = require('express');
const { sanitazeUrl, getDimensions } = require('../utils/utils');
const puppeteer = require('puppeteer');

const router = Router();

const PROTOCOL = 'https://';
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

router.get('/:url', async (req, res) => {
    const browser = await puppeteer.launch();

    try {
        const { url } = req.params;
        const { viewport, format, fullpage } = req.query;
        const [width, height] = viewport ? getDimensions(viewport) : [DEFAULT_WIDTH, DEFAULT_HEIGHT];

        sanitazeUrl(url);

        const page = await browser.newPage();

        await page.setViewport({
            width,
            height,
            isMobile: true,
        });

        await page.goto(`${PROTOCOL}${url}`, {
            waitUntil: 'networkidle0',
        });

        const screenshot = await page.screenshot({
            omitBackground: true,
            type: format || 'png',
            fullPage: fullpage || false,
        });

        await browser.close();
        res.contentType(`image/${format || 'png'}`);
        res.send(screenshot);
    } catch (err) {
        res.status(500).json({ err });
        await browser.close();
    } finally {
        await browser.close();
    }
});

module.exports = router;
