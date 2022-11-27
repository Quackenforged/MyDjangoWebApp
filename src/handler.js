import { parse } from "node:url"
import { DEFAULT_HEADER } from "./util/util"

const allRoutes = {
    "/heroes:get": (request, response) => {
        response.write("GET")
        response.end()
    },

    default: (request, response) => {
        
        // 404 routes
        response.write("not found")
        response.writeHead(404, DEFAULT_HEADER)
        response.end()

    }
}
function handller (request, response) {
    const {
        url,
        method
    } = request

    const {
        pathname
    } = parse(url, true)

    const key = '${pathname}:${method.toLowerCase()}'
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response))
    .catch(handlerError(response))
}

function handlerError(response) {
    return error => {
        console.log("Something went wrong", error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: "internal server error"
        }))
    }
}
export default handler

