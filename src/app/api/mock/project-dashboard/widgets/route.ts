import mockApi from 'src/@mock-utils/mockApi';
import { ProjectDashboardWidgetType } from '@/app/(control-panel)/dashboards/project/ProjectDashboardApi';

/**
 * GET api/mock/project-dashboard/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('project_dashboard_widgets');
	const items = await api.findAll<ProjectDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
