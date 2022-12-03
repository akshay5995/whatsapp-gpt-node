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
 - Restart server by running `yarn:start` (Should should be already logged in)
- In the other terminal `yarn start:whatsapp` and log in to whatsapp web


## Playground

- Ping to your `logged in` number `!ping` -> You'll receive pong
- Ping to the same numb er `!openai` -> You'll receive the response from openai

