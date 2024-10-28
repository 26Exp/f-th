import mockApi from 'src/@mock-utils/mockApi';
import { NotesLabel } from '@/app/(control-panel)/apps/notes/NotesApi';

/**
 * GET api/mock/notes/labels
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('notes_labels');
	const items = await api.findAll<NotesLabel>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/notes/labels
 */
export async function POST(req: Request) {
	const api = mockApi('notes_labels');
	const requestData = (await req.json()) as NotesLabel;
	const newItem = await api.create<NotesLabel>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}
