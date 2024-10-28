import mockApi from 'src/@mock-utils/mockApi';
import { Guide } from '@/app/(control-panel)/apps/help-center/HelpCenterApi';

/**
 * GET api/mock/help-center/guides
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('help_center_guides');
	const items = await api.findAll<Guide>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
