import mockApi from 'src/@mock-utils/mockApi';
import { CourseStepContent } from '@/app/(control-panel)/apps/academy/AcademyApi';

/**
 * GET api/mock/academy/course-step-contents/{id}
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const api = mockApi('academy_course_step_contents');
	const item = await api.find<CourseStepContent>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}
