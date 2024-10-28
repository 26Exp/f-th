import mockApi from 'src/@mock-utils/mockApi';
import { GuideCategory } from '@/app/(control-panel)/apps/help-center/HelpCenterApi';

/**
 * GET api/mock/help-center/guide-categories
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('help_center_guide_categories');
	const items = await api.findAll<GuideCategory>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
