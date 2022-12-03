# Whatsapp -> GPT node

# Requirements

- node LTS
- yarn

## Setup

- You'll need to run WhatsApp from a phone number using the golang library I'm using.
- You'll run a dedicated browser in another window that's controlling ChatGPT.
- Open 2 terminals
- In one `yarn build:server` then `yarn:start` - Log in to open ai 
- Quit the sever
- In the other terminal `yarn start:whatsapp` and log in to whatsapp web
- Quit the process
- Restart in headless mode using `yarn start`


## Usuage

- Ping to your `logged in` whatsapp number `!ping` -> You should receive `pong`
- Ping to the same number `!openai <your-message>` -> You should receive the response from `openai` 
