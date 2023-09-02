import puppeteer, { Browser, Page } from 'puppeteer';

export default class Extractor {
  private browser: Browser | null = null;
  private page: Page | null = null;

  public async gotoLoginPage() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: process.env.GITHUB_ACTION ? ['--no-sandbox'] : undefined,
      executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container in the CI
    });
    this.page = await this.browser.newPage();
    await this.page.goto('https://www.notion.so/login');
  }

  /**
   * This method is used for testing purposes only.
   * This method sometimes fails because Notion randomly sends a login code via email and refuses to accept the actual password.
   * When headless Chrome is used notion always sends a login code via email, when non-headless Chrome is used it sometimes sends a login code via email.
   */
  public async login(email: string, password: string) {
    if (this.page === null) {
      throw new Error('Page is null.');
    }

    await this.page.waitForSelector('#notion-email-input-2');
    await this.page.type('#notion-email-input-2', email);
    await this.page.keyboard.press('Enter');

    await this.page.waitForSelector('#notion-password-input-1');
    await this.page.type('#notion-password-input-1', password);
    await this.page.keyboard.press('Enter');
    // todo
  }

  public async waitForDashboard() {
    if (this.page === null) {
      throw new Error('Page is null.');
    }

    await this.page.waitForSelector('.notion-frame', {
      timeout: 2 * 60 * 1000,
    });

    /**
     * We need to get token_v2 and file_token from cookies.
     * token_v2 will be set after login.
     * file_token will be set after visiting https://www.notion.so/f/refresh
     */

    // set file_token cookie
    const result = await this.page.evaluate(
      "fetch('/f/refresh').then((res) => res.text()).then((response) => response);"
    );

    // await new Promise((r) => setTimeout(r, 5000));
  }

  public async getTokens() {
    if (this.page === null) {
      throw new Error('Page is null.');
    }

    // const cookies1 = await this.page.cookies('.notion.so');
    // const cookies2 = await this.page.cookies('.notion.so/f');
    // const cookies3 = await this.page.cookies('www.notion.so');
    // const cookies4 = await this.page.cookies('www.notion.so/f');
    // const cookies5 = await this.page.cookies('https://notion.so');
    // const cookies6 = await this.page.cookies('https://notion.so/f'); // has file_token
    // const cookies7 = await this.page.cookies('https://www.notion.so'); // has token_v2
    // const cookies8 = await this.page.cookies('https://www.notion.so/f'); // has both token_v2 and file_token

    const cookies = await this.page.cookies('https://www.notion.so/f'); // this domain has both token_v2 and file_token cookies

    const tokenV2 = cookies.reduce<string | null>(
      (tokenV2, cookie) =>
        cookie.name === 'token_v2' ? cookie.value : tokenV2,
      null
    );

    if (tokenV2 === null || tokenV2 === '') {
      throw new Error('Could not get token_v2 from cookies.');
    }

    const fileToken = cookies.reduce<string | null>(
      (fileToken, cookie) =>
        cookie.name === 'file_token' ? cookie.value : fileToken,
      null
    );

    if (fileToken === null || fileToken === '') {
      throw new Error('Could not get file_token from cookies.');
    }

    return { tokenV2, fileToken };
  }

  public async closeBrowser() {
    if (this.browser === null) {
      throw new Error('Browser is null.');
    }

    await this.browser.close();
  }
}
