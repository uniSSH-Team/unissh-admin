import clientPromise from "../../../libs/mongodb.js";

export async function GET(request) {
    let params = new URL(request.url).searchParams;

    try {
        const client = await clientPromise;
        const db = client.db("analytics-dash").collection('user-data');

        if (params.get("os") == "win32" || params.get("os") == "darwin" || params.get("os") == "linux") {
            if (request.geo.country) {
                db.insertOne({
                    os: `${params.get("os")}`,
                    version: `${params.get("version")}`,
                    dateCreated: new Date(),
                    country: request.geo.country
                })
            } else {
                db.insertOne({
                    os: `${params.get("os")}`,
                    version: `${params.get("version")}`,
                    dateCreated: new Date(),
                    country: "Unknown"
                })
            }
        } else {
            return Response.json({
                "success": 0,
                "error": "INVALID OS"
            })
        }

        return Response.json({
            "success": 1
        })
    } catch (e) {
        throw Error(e)
    }

}