import clientPromise from "../../libs/mongodb";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("analytics-dash");

        const userData = await db.collection("user-data")

        let lastMonth = new Date()

        lastMonth.setMonth(lastMonth.getMonth() - 1);

        let byVersion = []
        let byVersionMonthly = []

        let versions = await userData.distinct("version")

        versions.forEach((element) => {
            userData.countDocuments({
                version: element,
                dateCreated: {
                    $gte: lastMonth
                }
            }).then((count) => {
                byVersionMonthly.push({
                    [element]: count.toString()
                })
            })

            userData.countDocuments({
                version: element
            }).then((count) => {
                if (count > 0) {
                    byVersion.push({
                        [element]: count.toString()
                    })
                }
            })
        });

        let res = {
            "totalRegistered": await userData.countDocuments({}),
            "byOS": {
                "win32": await userData.countDocuments({
                    os: "win32"
                }),
                "darwin": await userData.countDocuments({
                    os: "darwin"
                }),
                "linux": await userData.countDocuments({
                    os: "linux"
                }),
            },
            byVersion,
            "lastMonth": {
                "totalRegistered": await userData.countDocuments({
                    dateCreated: {
                        $gte: lastMonth
                    }
                }),
                "byOS": {
                    "win32": await userData.countDocuments({
                        os: "win32",
                        dateCreated: {
                            $gte: lastMonth
                        }
                    }),
                    "darwin": await userData.countDocuments({
                        os: "darwin",
                        dateCreated: {
                            $gte: lastMonth
                        }
                    }),
                    "linux": await userData.countDocuments({
                        os: "linux",
                        dateCreated: {
                            $gte: lastMonth
                        }
                    }),
                },
                byVersionMonthly
            }
        }

        return Response.json(res)
    } catch (e) {
        console.error(e);
    }

}