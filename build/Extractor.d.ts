export default class Extractor {
    private browser;
    private page;
    gotoLoginPage(): Promise<void>;
    /**
     * This method is used for testing purposes only.
     * This method sometimes fails because Notion randomly sends a login code via email and refuses to accept the actual password.
     * When headless Chrome is used notion always sends a login code via email, when non-headless Chrome is used it sometimes sends a login code via email.
     */
    login(email: string, password: string): Promise<void>;
    waitForDashboard(): Promise<void>;
    getTokens(): Promise<{
        tokenV2: string;
        fileToken: string;
    }>;
    closeBrowser(): Promise<void>;
}
