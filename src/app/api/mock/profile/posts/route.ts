import mockApi from 'src/@mock-utils/mockApi';
import { ProfilePost } from '@/app/(control-panel)/apps/profile/ProfileApi';

/**
 * GET api/mock/profile/posts
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_posts');
	const items = await api.findAll<ProfilePost>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
