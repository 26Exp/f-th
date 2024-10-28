import mockApi from 'src/@mock-utils/mockApi';
import { Profile } from '@/app/(control-panel)/apps/messenger/MessengerApi';

/**
 * GET api/mock/messenger/profiles/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('messenger_profiles');
	const item = await api.find<Profile>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/messenger/profiles/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('messenger_profiles');
	const data = (await req.json()) as Profile;
	const updatedItem = await api.update<Profile>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
