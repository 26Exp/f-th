import mockApi from 'src/@mock-utils/mockApi';
import { ProfileActivity } from '@/app/(control-panel)/apps/profile/ProfileApi';

/**
 * GET api/mock/profile/activities
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_activities');
	const items = await api.findAll<ProfileActivity>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
