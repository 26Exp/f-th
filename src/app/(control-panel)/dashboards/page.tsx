import { redirect } from 'next/navigation';

function DashboardsPage() {
	redirect(`/dashboards/project`);
	return null;
}

export default DashboardsPage;
