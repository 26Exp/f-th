import mockApi from 'src/@mock-utils/mockApi';
import { Message } from '@/app/(control-panel)/apps/messenger/MessengerApi';

/**
 * GET api/mock/messenger/messages
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('messenger_messages');
	const items = await api.findAll<Message>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/messenger/messages
 */
export async function POST(req: Request) {
	const api = mockApi('messenger_messages');
	const requestData = (await req.json()) as Message;
	const newItem = await api.create<Message>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
