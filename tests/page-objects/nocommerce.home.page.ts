import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/loggers";

//Constructor
class HomePage extends BasePage {
    constructor(page : Page) {
        super(page);
    }

    get userNameInputBox() {return this.page.getByRole ('textbox', {name: "Email:"})}
    get passwordInputBox() {return this.page.getByRole ('textbox', {name: "Password:"})}
    get loginBtn() {return this.page.getByRole ('button', {name: "Log in"})}
}