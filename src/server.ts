import { chromium, Page } from "playwright";
import express, { Request, Response } from "express";

const app = express();
let page: Page;

const headless = process.env.HEADLESS === "true";

const getInputBox = () => {
  return page.getByRole("textbox");
};

async function isLoggedIn(): Promise<boolean> {
  const inputBox = await page.$$(
    "div[class*='PromptTextarea__TextareaWrapper'] > textarea"
  );

  return inputBox.length > 0;
}

async function sendMessage(message: string): Promise<void> {
  const box = getInputBox()!;
  await box.fill(message);
  await box.press("Enter");
}

async function getLastMessage(): Promise<string | null> {
  const pageElements = await page.$$("div[class*='ConversationItem__Message']");
  const lastElement = pageElements.at(-1)!;
  const content = await lastElement.textContent();

  return content;
}

app.get("/chat", async (req: Request, res: Response) => {
  const message = req.query.q;
  console.log("Sending message: ", message);
  await sendMessage(message as string);

  setTimeout(async () => {
    const response = await getLastMessage();
    console.log("Response: ", response);
    res.send(response);
  }, 10000);
});

const startBrowser = async () => {
  await page.goto("https://chat.openai.com/chat");

  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    console.log("Please log in to OpenAI Chat");
  } else {
    console.log("Logged in!");
    app.listen(5001, () => {
      console.log(`Example app listening on port 5001`);
    });
  }
};

const main = async () => {
  const browser = await chromium.launchPersistentContext("/tmp/playwrigh", {
    headless,
  });
  page = await browser.newPage();
  await startBrowser();
};

main();
