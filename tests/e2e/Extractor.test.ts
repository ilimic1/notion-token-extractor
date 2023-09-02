import 'dotenv/config';
import Extractor from '../../src/Extractor';

if (typeof process.env.TESTS_NOTION_EMAIL !== 'string') {
  throw new Error(
    'Error! Please define TESTS_NOTION_EMAIL environment variable.'
  );
}
const testsEmail = process.env.TESTS_NOTION_EMAIL;

if (typeof process.env.TESTS_NOTION_PASS !== 'string') {
  throw new Error(
    'Error! Please define TESTS_NOTION_PASS environment variable.'
  );
}
const testsPass = process.env.TESTS_NOTION_PASS;

let extractor: Extractor | null = null;

describe('Extractor', () => {
  it(
    'should extract valid token_v2 and file_token from cookies',
    async () => {
      extractor = new Extractor();

      console.debug('Running extractor.gotoLoginPage()');
      await extractor.gotoLoginPage();

      console.debug('Running extractor.login()');
      await extractor.login(testsEmail, testsPass);

      console.debug('Running extractor.waitForDashboard()');
      await extractor.waitForDashboard();

      console.debug('Running extractor.getTokens()');
      const { tokenV2, fileToken } = await extractor.getTokens();

      console.debug('Running extractor.closeBrowser()');
      await extractor.closeBrowser();

      expect(typeof tokenV2).toBe('string');
      expect(tokenV2).not.toBe('');

      expect(typeof fileToken).toBe('string');
      expect(fileToken).not.toBe('');
    },
    1 * 60 * 1000
  );

  afterAll(async () => {
    if (extractor === null) {
      return;
    }
    await extractor.closeBrowser();
  });
});
