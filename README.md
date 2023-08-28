A small discord bot which saves some attachments in a given channel to a local folder.
# Setup
1. Download this repository
2. Go in to the downloaded folder
3. Run `npm i`
4. Rename `.env.example` to `.env`
5. Configure variables in the `.env` file
## Variables in .env
1. TOKEN - Your discord bot token. Make sure the bot has `MESSAGE CONTENT INTENT` turned on in the discord developer portal.
2. SAVE_DESTINATION - Where downloaded files will be saved.
3. CHANNEL_ID - In which channel to look for file uploads.
4. EXPECTED_FILE_TYPE - What files to save. Exampl values: `png`, `jpg`, `zip`, `txt`.
5. SAVE_WRONG_FILE_TYPE - Boolean. EXPECTED_FILE_TYPE Still has to have something in it!!!