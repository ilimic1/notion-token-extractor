"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Extractor_1 = __importDefault(require("../../src/Extractor"));
if (typeof process.env.TESTS_NOTION_EMAIL !== 'string') {
    throw new Error('Error! Please define TESTS_NOTION_EMAIL environment variable.');
}
const testsEmail = process.env.TESTS_NOTION_EMAIL;
if (typeof process.env.TESTS_NOTION_PASS !== 'string') {
    throw new Error('Error! Please define TESTS_NOTION_PASS environment variable.');
}
const testsPass = process.env.TESTS_NOTION_PASS;
describe('Extractor', () => {
    it('should extract valid token_v2 and file_token from cookies', async () => {
        const extractor = new Extractor_1.default();
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
    }, 1 * 60 * 1000);
});
//# sourceMappingURL=Extractor.test.js.map