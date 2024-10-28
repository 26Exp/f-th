import mockApi from 'src/@mock-utils/mockApi';
import { ProfileAbout } from '@/app/(control-panel)/apps/profile/ProfileApi';

/**
 * GET api/mock/profile/about
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_about');
	const items = await api.findAll<ProfileAbout>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
