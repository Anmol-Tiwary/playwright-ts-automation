import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
    // delete allure report
    if (process.env.RUNNER?.toUpperCase() == 'LOCAL') {
        const resultDir = path.resolve(process.cwd(), "allure-results");

        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, { recursive: true, force: true });
        }

    }

}