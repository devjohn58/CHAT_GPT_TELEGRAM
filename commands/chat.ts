import { bot } from "..";
import { showBotActivity } from "../actions/show-bot-activity";
import { Context } from "grammy";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

let responseError = "You talk too fast. Please say it again!";
const openai = new OpenAIApi(configuration);

bot.command("chat", async (ctx: Context) => {
	const msg = ctx.update.message;
	const msgId = msg?.message_id;
    const chatId = msg?.chat.id;
    
	// Discard malformed messages
	if (!msgId || !chatId) return;

	try {
		showBotActivity(ctx, chatId);
		try {
			const res = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `${msg.text}`,
				temperature: 0.7, // Higher values means the model will take more risks.
				max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
				top_p: 1, // alternative to sampling with temperature, called nucleus sampling
				frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
				presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
			});
			ctx.reply(res?.data?.choices[0]?.text ?? responseError, {
				reply_to_message_id: msg.message_id,
			});
		} catch (error) {
			ctx.reply(responseError, {
				reply_to_message_id: msg.message_id,
			});
		}
	} catch (error: any) {
		ctx.reply(responseError, {
			reply_to_message_id: msg.message_id,
		});
		console.error(error);
	}
});
