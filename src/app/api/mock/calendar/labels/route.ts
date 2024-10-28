import mockApi from 'src/@mock-utils/mockApi';
import { Label } from '@/app/(control-panel)/apps/calendar/CalendarApi';

/**
 * GET api/mock/calendar/labels
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('calendar_labels');
	const items = await api.findAll<Label>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/calendar/labels
 */
export async function POST(req: Request) {
	const api = mockApi('calendar_labels');
	const requestData = (await req.json()) as Label;
	const newItem = await api.create<Label>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
