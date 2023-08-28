const { Client, Message } = require("discord.js");
const https = require("https");
const fs = require("fs");

/**
 *
 * @param {Client} client
 */
function main(client) {
    console.log("Registered fileUploaded command");
    /**
     * @param {Message} msg
     */
    client.on("messageCreate", (msg) => {
        if (msg.author.bot) return;
        if (msg.channelId != process.env.CHANNEL_ID) return;
        if (msg.attachments.size < 1) {
            msg.reply("ERROR: Found no attachments in message");
            return;
        }
        const expectedFileType = process.env.EXPECTED_FILE_TYPE;
        const saveFrongFileType = process.env.SAVE_WRONG_FILE_TYPE;
        msg.attachments.forEach((attachment) => {
            const receivedFileType = attachment.name.split(".").slice(-1)[0];
            if (
                receivedFileType != expectedFileType &&
                saveFrongFileType == "false"
            ) {
                msg.reply(
                    `Wrong file type for attachment ${attachment.name}. Expected a ${expectedFileType} but received a ${receivedFileType}`
                );
                return;
            }

            msg.channel.send(`Starting download on ${attachment.name}`);
            try {
                const file = fs.createWriteStream(
                    `${process.env.SAVE_DESTINATION}/${attachment.name}`
                );
                const request = https.get(attachment.url, (response) => {
                    response.pipe(file);

                    file.on("finish", () => {
                        file.close();
                        msg.channel.send(
                            `${attachment.name} successfuly saved`
                        );
                    });

                    file.on("error", (err) => {
                        msg.channel.send(
                            `Encountered and error trying to download file ${attachment.name}`
                        );
                        console.error(
                            `Encountered and error trying to download file ${attachment.name}`
                        );
                        console.error(err);
                    });
                });
            } catch (error) {
                msg.reply(
                    `Encountered an error saving file ${attachment.name}`
                );
                console.log(error);
            }
        });
    });
}

module.exports = { main };
