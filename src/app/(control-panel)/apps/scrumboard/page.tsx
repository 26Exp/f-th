import { redirect } from 'next/navigation';

function ScrumboardApp() {
	redirect(`/apps/scrumboard/boards`);
	return null;
}

export default ScrumboardApp;
