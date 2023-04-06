import puppeteer from 'puppeteer';
import { performance } from 'perf_hooks';
import { version } from 'process';
import { readFileSync } from 'fs';

const getPackageVersion = (name) => {
    const fileName = `node_modules/${name}/package.json`;
    const content = readFileSync(fileName);
    const json = JSON.parse(content);
    return json.version;
};

const getBrowserRevision = async (revision) => {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const localRevs = await browserFetcher.localRevisions();

    if (localRevs.includes(revision)) {
        return browserFetcher.revisionInfo(revision);
    }

    console.log(`Downloading Chromium revision ${revision} ...`);
    return browserFetcher.download(revision);
};

(async () => {
    const REVISION = '1095492'; /** Use same revision as puppeteer 19.7.0 to discard possible difference */
    const URL = 'https://google.com';
    const pptrVersion = getPackageVersion('puppeteer');

    const revisionInfo = await getBrowserRevision(REVISION);
    const { executablePath } = revisionInfo;
    const launchOptions = {
        headless: true,
        executablePath,
    };

    const browser = await puppeteer.launch(launchOptions);
    const browserVersion = await browser.version();
    const allPages = await browser.pages();
    const page = (allPages.length) ? allPages[0] : await browser.newPage();
    await page.goto(URL, { waitUntil: 'load' });

    /** Start measure after page loaded to discard network delays */
    const startTime = performance.now();

    const elements = await page.$$('*');
    const tasks = elements.map((elem) => elem.evaluate((el) => el.className));
    const data = await Promise.all(tasks);
    console.log(data.join(' '));

    console.log(`Node: ${version}`);
    console.log(`Puppeteer: ${pptrVersion}`);
    console.log(`Browser: ${browserVersion}`);
    console.log(`Duration: ${performance.now() - startTime}`);

    await browser.close();
})();
