import mockApi from 'src/@mock-utils/mockApi';
import { ScrumboardMember } from '@/app/(control-panel)/apps/scrumboard/ScrumboardApi';

/**
 * GET api/mock/scrumboard/members/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('scrumboard_members');
	const item = await api.find<ScrumboardMember>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/scrumboard/members/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('scrumboard_members');
	const data = (await req.json()) as ScrumboardMember;
	const updatedItem = await api.update<ScrumboardMember>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/scrumboard/members/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('scrumboard_members');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
