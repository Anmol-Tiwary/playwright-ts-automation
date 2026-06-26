import { test, expect, request } from "@playwright/test"
import { log } from "../helpers/loggers"
import constants from "../../data/functional/constants.json"
import testData from "../../data/functional/test-data"
import fileHelpers from "../helpers/file-helpers"

test.describe("Rest Api Demo", () => {

    let envConfig = undefined
    test.beforeEach("Load Env Config", async ({ request }, testInfo) => {
        envConfig = testInfo.project.use as any
    })

    // Get Method
    test("Should get list of Users", async ({ request }) => {

        //make a get call
        await log("info", `Making a get call using ${envConfig.apiURL}`)
        const res = await request.get(`${envConfig.apiURL}${constants.REQ_REQ_ENDPOINTS.get_user}`, {
            headers: {
                'x-api-key': process.env.apiKey
            }
        })

        //Assert the status code
        expect(res.status()).toBe(200)
        await log("info", `the Get call is sucessfull with ${res.status()}`)

        //get list of users
        const userData = await res.json()
        await log("info", `List of users ${JSON.stringify(userData, null, 2)}`)

        //write the list of users
        fileHelpers.writeFile(`${process.cwd()}/data/api-res/list-of-users.json`, JSON.stringify(userData, undefined, 2))
    })

    //post method
    test("Should create a user", async ({ request }) => {
        //Make a Get call
        await log("info", `Making a post call using ${envConfig.apiURL}`)

        const payload = testData.apiUsercreation()[0]

        const res = await request.post(`${envConfig.apiURL}${constants.REQ_REQ_ENDPOINTS.POST_USER}`, {
            headers: {
                'x-api-key': process.env.apiKey,
                "Content-Type": "application/json",
            },
            data: payload
        })

        //Assert the status code
        expect(res.status()).toBe(201)
        await log("info", ` The post call is sucessfull ${res.status()}`)

        const restData = await res.json();
        log("info", ` Response data from the post call ${JSON.stringify(restData)}`)
    })
})