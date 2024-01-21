import clientPromise from "../../libs/mongodb";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("analytics-dash");

        const allData = await db.collection("user-data")

        console.log(allData)

        return Response.json({
            "allData": allData.data
        })
    } catch (e) {
        console.error(e);
    }

}