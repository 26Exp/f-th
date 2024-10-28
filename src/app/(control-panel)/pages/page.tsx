import { redirect } from 'next/navigation';

function PagesPage() {
	redirect(`/pages/activities`);
	return null;
}

export default PagesPage;
