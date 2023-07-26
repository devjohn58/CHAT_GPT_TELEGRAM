import { bot } from "..";
import { Context } from "grammy";
import { showBotActivity } from "../actions/show-bot-activity";

bot.command("start", async (ctx: Context) => {
	if (!ctx.msg) return;
	const chatId = ctx?.msg?.chat.id;
	const privateChat = ctx?.msg?.chat.type === "private";
	const topicId = ctx.msg?.message_thread_id;
	if (!privateChat) return;
	try {
		showBotActivity(ctx, chatId);
		ctx.reply(
			`Hello <b>${ctx?.msg?.from?.username}</b> Before we begin, let me send greetings and thanks to you for being here. I hope you are feeling healthy and happy today.

I am ChatGpt Bot, and I am delighted to meet you here. We can talk about anything you want, from interesting topics to important matters in life. I am ready to listen and assist you in any way I can.

If you have any questions or want to share something, please don't hesitate to let me know. We can start the conversation right now.

Use command /chat { your content } to chat with me.`,
			{
                message_thread_id: topicId ?? undefined,
                parse_mode: "HTML"
			}
		).catch(() => {
			console.error(
				`[Error] [start.ts:61] Failed to send start message.`
			);
			return;
		});
	} catch (error) {
		console.error({
			message: "Error replying to the start command",
			error,
		});
		return;
	}
});
