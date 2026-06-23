import {test as base } from "@playwright/test";

export type EnvConfig = {
    envName: string
    appURL: string
    dbConfing: {};
}

export const test = base.extend<EnvConfig>({
envName: ["test", {option: true}],
appURL: ["<provideURL>", {option: true}],
dbConfing: [{}, {option: true}],

    })