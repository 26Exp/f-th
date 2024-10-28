import { redirect } from 'next/navigation';

function SettingsApp() {
	redirect(`/apps/settings/account`);
	return null;
}

export default SettingsApp;
