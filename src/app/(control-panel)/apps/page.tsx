import { redirect } from 'next/navigation';

function AppsPage() {
	redirect(`/apps/academy`);
	return null;
}

export default AppsPage;
