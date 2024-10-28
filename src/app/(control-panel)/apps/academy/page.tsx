import { redirect } from 'next/navigation';

function AcademyApp() {
	redirect(`/apps/academy/courses`);
	return null;
}

export default AcademyApp;
