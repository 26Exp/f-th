import mockApi from 'src/@mock-utils/mockApi';
import { ProfileAlbum } from '@/app/(control-panel)/apps/profile/ProfileApi';

/**
 * GET api/mock/profile/albums
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_albums');
	const items = await api.findAll<ProfileAlbum>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
