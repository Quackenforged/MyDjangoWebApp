import test from "node:test"
import assert from "node:assert"
import { promisify } from "node:util"

test("Hero Integration Test Suite", async (t) => {
    const testPort = 9009

    process.env.PORT = testPort
    const {server} = await import("../../src/index.js")
    const testServerAddress = "http://localhost:${testPort}/heroes"

    await t.test("create hero", async (t) => {

        const data = {"id": 10,
        "name": "Batman",
        "age": 50,
        "power": "rich"   
        }
        fetch(testServerAddress, {
            method: "POST",
            body: JSON.stringify(data)
        })
    })
    await promisify(server.close(server))()

})