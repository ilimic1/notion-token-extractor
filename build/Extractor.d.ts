export default class Extractor {
    private browser;
    private page;
    gotoLoginPage(): Promise<void>;
    login(email: string, password: string): Promise<void>;
    waitForDashboard(): Promise<void>;
    getTokens(): Promise<{
        tokenV2: string;
        fileToken: string;
    }>;
    closeBrowser(): Promise<void>;
}
