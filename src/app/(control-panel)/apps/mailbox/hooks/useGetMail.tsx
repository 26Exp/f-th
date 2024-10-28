import { useParams } from 'next/navigation';
import { useGetMailboxMailQuery } from '../MailboxApi';

function useGetMail() {
	const routeParams = useParams<{ mailParams: string[] }>();
	const [_category, _subCategory, mailId] = routeParams?.mailParams || [];

	return useGetMailboxMailQuery(mailId, {
		skip: !mailId
	});
}

export default useGetMail;
