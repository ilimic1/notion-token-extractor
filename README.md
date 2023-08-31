# README

Extracts tokens from Notion needed to make internal API calls.

Run `npx -y @ilimic/notion-token-extractor > .env`

The above command will open Chrome and let you login into Notion, after you login it will save `token_v2` and `file_token` cookies to the `.env` file so you can use them later.

https://www.npmjs.com/package/@ilimic/notion-token-extractor
