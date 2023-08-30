"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(async () => {
    const browser = await puppeteer_1.default.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.notion.so/login');
    await page.waitForSelector('.notion-frame', { timeout: 2 * 60 * 1000 });
    /**
     * We need to get token_v2 and file_token from cookies.
     * token_v2 will be set after login.
     * file_token will be set after visiting https://www.notion.so/f/refresh
     */
    // set file_token cookie
    const result = await page.evaluate("fetch('/f/refresh').then((res) => res.text()).then((response) => response);");
    // await new Promise((r) => setTimeout(r, 5000));
    // const cookies1 = await page.cookies('.notion.so');
    // const cookies2 = await page.cookies('.notion.so/f');
    // const cookies3 = await page.cookies('www.notion.so');
    // const cookies4 = await page.cookies('www.notion.so/f');
    // const cookies5 = await page.cookies('https://notion.so');
    // const cookies6 = await page.cookies('https://notion.so/f'); // has file_token
    // const cookies7 = await page.cookies('https://www.notion.so'); // has token_v2
    // const cookies8 = await page.cookies('https://www.notion.so/f'); // has both token_v2 and file_token
    const cookies = await page.cookies('https://www.notion.so/f'); // this domain has both token_v2 and file_token cookies
    const tokenV2 = cookies.reduce((tokenV2, cookie) => (cookie.name === 'token_v2' ? cookie.value : tokenV2), null);
    if (tokenV2 === null || tokenV2 === '') {
        throw new Error('Could not get token_v2 from cookies.');
    }
    const fileToken = cookies.reduce((fileToken, cookie) => cookie.name === 'file_token' ? cookie.value : fileToken, null);
    if (fileToken === null || fileToken === '') {
        throw new Error('Could not get file_token from cookies.');
    }
    await browser.close();
    console.log(`TOKEN_V2='${tokenV2.replaceAll("'", "\\'")}'`);
    console.log(`FILE_TOKEN='${fileToken.replaceAll("'", "\\'")}'`);
})();
//# sourceMappingURL=index.js.map