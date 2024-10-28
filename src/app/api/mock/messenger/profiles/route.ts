import mockApi from 'src/@mock-utils/mockApi';
import { Profile } from '@/app/(control-panel)/apps/messenger/MessengerApi';

/**
 * GET api/mock/messenger/profiles
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('messenger_profiles');
	const items = await api.findAll<Profile>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
