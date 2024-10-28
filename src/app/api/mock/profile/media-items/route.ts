import mockApi from 'src/@mock-utils/mockApi';
import { ProfileMediaItem } from '@/app/(control-panel)/apps/profile/ProfileApi';

/**
 * GET api/mock/profile/media-items
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('profile_media_items');
	const items = await api.findAll<ProfileMediaItem>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
