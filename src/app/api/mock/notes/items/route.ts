import mockApi from 'src/@mock-utils/mockApi';
import { NotesNote } from '@/app/(control-panel)/apps/notes/NotesApi';

/**
 * GET api/mock/notes/items
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('notes_items');
	const items = await api.findAll<NotesNote>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/notes/items
 */
export async function POST(req: Request) {
	const api = mockApi('notes_items');
	const requestData = (await req.json()) as NotesNote;
	const newItem = await api.create<NotesNote>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
