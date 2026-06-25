import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/loggers";

//Constructor
export default class HomePage extends BasePage {
    constructor(page : Page) {
        super(page);
    }

    get userNameInputBox() {return this.page.getByRole ('textbox', {name: "Email:"})}
    get passwordInputBox() {return this.page.getByRole ('textbox', {name: "Password:"})}
    get loginBtn() {return this.page.getByRole ('button', {name: "Log in"})}


//page actions
async logIneCommApp( url: string, username: string, password: string){
    await log("info", `login to the ${url}`);
//Login
await this.navigateTo(url)
await this.typeInto(this.userNameInputBox, username)
await this.typeInto(this.passwordInputBox, password)
await this.click(this.loginBtn)

//assertion
await expect(this.page).toHaveURL(`1${url}/admin/`)
await log("info", 'Homepage is sucessfully launched')
}
}