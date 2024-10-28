import mockApi from 'src/@mock-utils/mockApi';
import { FinanceDashboardWidgetType } from '@/app/(control-panel)/dashboards/finance/FinanceDashboardApi';

/**
 * GET api/mock/finance-dashboard/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('finance_dashboard_widgets');
	const items = await api.findAll<FinanceDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
