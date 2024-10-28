import mockApi from 'src/@mock-utils/mockApi';
import { SettingsTeamMember } from '@/app/(control-panel)/apps/settings/SettingsApi';

/**
 * GET api/mock/app-team-members
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_team_members');
	const items = await api.findAll(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/app-team-members
 */
export async function POST(req: Request) {
	const api = mockApi('app_team_members');
	const requestData = (await req.json()) as SettingsTeamMember;
	const newItem = await api.create<SettingsTeamMember>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}

/**
 * PUT api/mock/app-team-members
 */
export async function PUT(req: Request) {
	const api = mockApi('app_team_members');
	const updatedItems = (await req.json()) as SettingsTeamMember[];

	const result = await Promise.all(
		updatedItems.map((item: SettingsTeamMember) => api.update<SettingsTeamMember>(item.id, item))
	);

	return new Response(JSON.stringify(result), { status: 200 });
}
