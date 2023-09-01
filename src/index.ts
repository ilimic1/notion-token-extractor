import Extractor from './Extractor';

(async () => {
  const extractor = new Extractor();
  await extractor.gotoLoginPage();
  await extractor.waitForDashboard();
  const { tokenV2, fileToken } = await extractor.getTokens();
  await extractor.closeBrowser();

  console.log(`TOKEN_V2='${tokenV2.replaceAll("'", "\\'")}'`);
  console.log(`FILE_TOKEN='${fileToken.replaceAll("'", "\\'")}'`);
})();
