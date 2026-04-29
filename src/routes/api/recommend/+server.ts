import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';
import { menuItems } from '$lib/menu';
import type { RequestHandler } from './$types';

function buildSystemPrompt() {
	const menuLines = menuItems
		.map((item) => {
			let line = `- id: ${item.id} — ${item.name}. ${item.description}`;
			if (item.variations?.length) {
				line += ` Variations: ${item.variations.join(', ')}.`;
			}
			return line;
		})
		.join('\n');

	return `You are the barista at Saru, a calm café in Berlin.
Based on how the customer feels or what they're in the mood for, recommend two different items from the menu.

Menu:
${menuLines}

Respond with JSON in this exact shape:
{
  "recommendations": [
    {
      "id": "<item id from the list above>",
      "name": "<item name>",
      "variation": "<variation name or null>",
      "reason": "<one short sentence, warm and personal, max 15 words>"
    },
    {
      "id": "<a different item id>",
      "name": "<item name>",
      "variation": "<variation name or null>",
      "reason": "<one short sentence, warm and personal, max 15 words>"
    }
  ]
}

The two recommendations must be different items. Only include a variation for items that have variations listed above.`;
}

export const POST: RequestHandler = async ({ request }) => {
	const { mood } = await request.json();

	if (!mood || typeof mood !== 'string' || !mood.trim()) {
		error(400, 'Mood is required');
	}

	if (mood.length > 300) {
		error(400, 'Too long');
	}

	const client = new OpenAI({
		apiKey: env.GROQ_API_KEY,
		baseURL: 'https://api.groq.com/openai/v1'
	});

	const completion = await client.chat.completions.create({
		model: 'llama-3.1-8b-instant',
		temperature: 0.7,
		response_format: { type: 'json_object' },
		messages: [
			{ role: 'system', content: buildSystemPrompt() },
			{ role: 'user', content: mood }
		]
	});

	const raw = completion.choices[0].message.content ?? '';
	const { recommendations } = JSON.parse(raw);

	if (
		!Array.isArray(recommendations) ||
		recommendations.length < 2 ||
		!recommendations.every((r) => r.id && r.name && r.reason)
	) {
		error(500, 'Invalid recommendation format');
	}

	return json({ recommendations });
};
