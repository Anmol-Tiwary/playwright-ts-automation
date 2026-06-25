import { test, expect, request } from "@playwright/test"
import { log } from "../helpers/loggers"
import { json } from "node:stream/consumers"

test.describe("Rest Api Demo", () => {
    const baseURL = "https://reqres.in/api"
    //reqres.in/api/users?page=2

    // Get Method
    test("Should get list of Users", async ({ request }) => {

        //make a get call
        await log("info", `Making a get call using ${baseURL}`)
        const res = await request.get(`${baseURL}/users?page=2`, {
            headers: {
                'x-api-key': 'free_user_3Fcnu9ODf0JXmOy3Sw7CMgmSwRw'
            }
        })

        //Assert the status code
        expect(res.status()).toBe(200)
        await log("info", `the Get call is sucessfull with ${res.status()}`)

        //get list of users
        const userData = await res.json()
        await log("info", `List of users ${JSON.stringify(userData, null, 2)}`)
    })

    //post method
    test("Should create a user", async ({ request }) => {
        //Make a Get call
    await log("info", `Making a post call using ${baseURL}`)

    const payload = {
       "id": 125,
      "email": "rachel.howell@reqres.in",
      "first_name": "Rachelo",
      "last_name": "Howelly",
      "avatar": "",
    };

    const res = await request.post(`${baseURL}/users/2`, {
        headers: {
           'x-api-key': 'reqres_a44340d004184f328a40d5a5f5ba69de',
           "Content-Type": "application/json",
                   },
                   data: payload
    })

    //Assert the status code
    expect(res.status()).toBe(201)
    await log("info",` The post call is sucessfull ${res.status()}`)

    const restData =  await res.json();
    log("info", ` Response data from the post call ${JSON.stringify(restData)}`)
    })
})