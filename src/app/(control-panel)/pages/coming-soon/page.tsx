import { redirect } from 'next/navigation';

function ComingSoonPage() {
	redirect(`/pages/coming-soon/classic`);
	return null;
}

export default ComingSoonPage;
