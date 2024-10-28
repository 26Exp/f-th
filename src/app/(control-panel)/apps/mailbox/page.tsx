import { redirect } from 'next/navigation';

function MailboxApp() {
	redirect(`/apps/mailbox/folders/inbox`);
	return null;
}

export default MailboxApp;
