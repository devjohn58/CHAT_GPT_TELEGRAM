import { Bot as TelegramBot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN env variable is not defined");
}

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
import "./commands";

bot.start().catch((error) => {
  console.error("[Error] Could not start bot.", error);
});
// console.clear();
console.log("Bot is running....")