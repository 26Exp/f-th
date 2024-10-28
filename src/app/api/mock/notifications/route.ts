import mockApi from 'src/@mock-utils/mockApi';
import { Notification } from '@/app/(control-panel)/apps/notifications/NotificationApi';

/**
 * GET api/mock/notifications
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('notifications');
	const items = await api.findAll<Notification>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/notifications
 */
export async function POST(req: Request) {
	const api = mockApi('notifications');
	const requestData = (await req.json()) as Notification;
	const newItem = await api.create<Notification>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

/**
 * DELETE api/mock/notifications
 */
export async function DELETE(req: Request) {
	const api = mockApi('notifications');
	const ids = (await req.json()) as string[];
	const result = await api.delete(ids);

	return new Response(JSON.stringify({ success: result.success }), { status: 200 });
}
