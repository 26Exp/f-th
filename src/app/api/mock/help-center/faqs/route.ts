import mockApi from 'src/@mock-utils/mockApi';
import { Faq } from '@/app/(control-panel)/apps/help-center/HelpCenterApi';

/**
 * GET api/mock/help-center/faqs
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('help_center_faqs');
	const items = await api.findAll<Faq>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
