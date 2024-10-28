import mockApi from 'src/@mock-utils/mockApi';
import { Chat } from '@/app/(control-panel)/apps/messenger/MessengerApi';

/**
 * GET api/mock/messenger/chat-list
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('messenger_chat_list');
	const items = await api.findAll<Chat>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/messenger/chat-list
 */
export async function POST(req: Request) {
	const api = mockApi('messenger_chat_list');
	const requestData = (await req.json()) as Chat;
	const newItem = await api.create<Chat>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
