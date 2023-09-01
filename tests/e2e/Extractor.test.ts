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

describe('Extractor', () => {
  it(
    'should extract valid token_v2 and file_token from cookies',
    async () => {
      const extractor = new Extractor();
      await extractor.gotoLoginPage();

      await extractor.login(testsEmail, testsPass);

      await extractor.waitForDashboard();
      const { tokenV2, fileToken } = await extractor.getTokens();
      await extractor.closeBrowser();

      expect(typeof tokenV2).toBe('string');
      expect(tokenV2).not.toBe('');

      expect(typeof fileToken).toBe('string');
      expect(fileToken).not.toBe('');

      // todo: make a request to notion and check if the tokens are valid
    },
    1 * 60 * 1000
  );
});
