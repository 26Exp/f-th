import mockApi from 'src/@mock-utils/mockApi';
import { Event } from '@/app/(control-panel)/apps/calendar/CalendarApi';

/**
 * PUT api/mock/calendar/events/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('calendar_events');
	const data = (await req.json()) as Event;
	const updatedItem = await api.update<Event>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/calendar/events/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('calendar_events');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
