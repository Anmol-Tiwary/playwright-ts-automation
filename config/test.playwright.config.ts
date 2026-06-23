import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
    testDir: path.resolve(process.cwd(), "./tests"),
    timeout: 40 * 1000,
    globalSetup: "../tests/helpers/global-setup.ts",
    reporter: [
        ["html", { open: "never" }],
        [
            "allure-playwright",
            {
                detail: true,
                suiteTitle: true,
                environmentInfo: {
                    name: "TEST",
                    appName: "CURA",
                    Release: "Release 1.1",
                },
            },
        ],
    ],
    use: {
        headless: false,
        viewport: null,
        screenshot: "only-on-failure",
        actionTimeout: 10000,
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        dbConfig: {
            Server: "",
            dbname: "",
            connectionStr: "",
        },
    } as any,
    projects: [
        {
            name: "chromium",
            use: {
                browserName: "chromium",
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"],
                },
            },
        },
    ],
});