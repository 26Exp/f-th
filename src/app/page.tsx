import { redirect } from 'next/navigation';

function MainPage() {
	redirect(`/dashboards/project`);
	return null;
}

export default MainPage;
