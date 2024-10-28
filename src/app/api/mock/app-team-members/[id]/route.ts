import mockApi from 'src/@mock-utils/mockApi';
import { SettingsTeamMember } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * PUT api/mock/app-team-members/{id}
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('app_team_members');
	const data = (await req.json()) as SettingsTeamMember;
	const updatedItem = await api.update<SettingsTeamMember>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/app-team-members/{id}
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('app_team_members');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
