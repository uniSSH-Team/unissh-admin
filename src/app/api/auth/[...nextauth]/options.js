import DiscordProvider from "next-auth/providers/discord";

export const options = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ]
}