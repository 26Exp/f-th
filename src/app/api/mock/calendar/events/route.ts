import mockApi from 'src/@mock-utils/mockApi';
import { Event } from '@/app/(control-panel)/apps/calendar/CalendarApi';

/**
 * GET api/mock/calendar/events
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('calendar_events');
	const items = await api.findAll<Event>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/calendar/events
 */
export async function POST(req: Request) {
	const api = mockApi('calendar_events');
	const requestData = (await req.json()) as Event;
	const newItem = await api.create<Event>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
