import { Bot as TelegramBot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN env variable is not defined");
}

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
import "./commands";
try {
    bot.api.setMyCommands([
      {
        command: "start",
        description: "Starting with our bot.",
      },
      {
        command: "chat",
        description: "Use command /chat { your content } to chat with me.",
      },
    ]);
  } catch (error) {
    console.error("[Error] Could not set bot commands.", error);
  }
bot.start().catch((error) => {
  console.error("[Error] Could not start bot.", error);
});
// console.clear();
console.log("Bot is running....")