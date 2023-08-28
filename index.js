require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const path = require("path");
const fs = require("fs");
const { fileURLToPath } = require("url");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user.username}`);
    const directoryPath = path.join(__dirname, "commands");
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            logger.error("Unable to reach commands folder");
            logger.error(err);
            process.exit(-1);
        }

        files.forEach(function (file) {
            if (file.endsWith(".js")) {
                console.log(`file: ${file}`);
                require(`./commands/${file}`).main(client);
            }
        });
    });
});

client.login(process.env.TOKEN);
