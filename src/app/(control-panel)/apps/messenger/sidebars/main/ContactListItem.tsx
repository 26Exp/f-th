import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import useNavigate from '@fuse/hooks/useNavigate';
import UserAvatar from '../../components/UserAvatar';
import {
	Contact,
	useCreateMessengerChatMutation,
	useGetMessengerChatsQuery,
	useGetMessengerUserProfileQuery
} from '../../MessengerApi';

type ContactListItemProps = {
	item: Contact;
};

/**
 * The contact list item.
 */
function ContactListItem(props: ContactListItemProps) {
	const { item } = props;
	const { data: chatList } = useGetMessengerChatsQuery();
	const [createChat] = useCreateMessengerChatMutation();
	const { data: user } = useGetMessengerUserProfileQuery();

	const navigate = useNavigate();

	function handleClick() {
		const chat = chatList?.find((chat) => chat.contactIds.includes(item.id));

		if (chat) {
			navigate(`/apps/messenger/${chat.id}`);
		} else {
			createChat({ contactIds: [item.id, user.id] }).then((res) => {
				const chatId = res.data.id;
				navigate(`/apps/messenger/${chatId}`);
			});
		}
	}

	return (
		<ListItemButton
			className="px-24 py-12 min-h-80"
			onClick={handleClick}
		>
			<UserAvatar user={item} />

			<ListItemText
				classes={{
					root: 'min-w-px px-16',
					primary: 'font-medium text-base',
					secondary: 'truncate'
				}}
				primary={item.name}
			/>
		</ListItemButton>
	);
}

export default ContactListItem;
