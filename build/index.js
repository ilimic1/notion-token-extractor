"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Extractor_1 = __importDefault(require("./Extractor"));
(async () => {
    const extractor = new Extractor_1.default();
    await extractor.gotoLoginPage();
    await extractor.waitForDashboard();
    const { tokenV2, fileToken } = await extractor.getTokens();
    await extractor.closeBrowser();
    console.log(`TOKEN_V2='${tokenV2.replaceAll("'", "\\'")}'`);
    console.log(`FILE_TOKEN='${fileToken.replaceAll("'", "\\'")}'`);
})();
//# sourceMappingURL=index.js.map