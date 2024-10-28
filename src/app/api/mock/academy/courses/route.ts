import mockApi from 'src/@mock-utils/mockApi';
import { Course } from '@/app/(control-panel)/apps/academy/AcademyApi';

/**
 * GET api/mock/academy/courses
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('academy_courses');
	const items = await api.findAll<Course>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
