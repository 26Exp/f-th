import mockApi from 'src/@mock-utils/mockApi';
import { NotesLabel } from '@/app/(control-panel)/apps/notes/NotesApi';

/**
 * GET api/mock/notes/labels/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('notes_labels');
	const item = await api.find<NotesLabel>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/notes/labels/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('notes_labels');
	const data = (await req.json()) as NotesLabel;
	const updatedItem = await api.update<NotesLabel>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/notes/labels/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('notes_labels');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
