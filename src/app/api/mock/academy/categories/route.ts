import mockApi from 'src/@mock-utils/mockApi';
import { Category } from '@/app/(control-panel)/apps/academy/AcademyApi';

/**
 * GET api/mock/academy/categories
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('academy_categories');
	const items = await api.findAll<Category>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
