import { useUpdateMailboxMailsMutation } from '../MailboxApi';

function useUpdateMails() {
	return useUpdateMailboxMailsMutation();
}

export default useUpdateMails;
