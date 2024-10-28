import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns/format';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import ListItemButton from '@mui/material/ListItemButton';
import { NavLinkAdapterPropsType } from '@fuse/core/NavLinkAdapter/NavLinkAdapter';
import UserAvatar from '../../components/UserAvatar';
import { Chat, Contact, useGetMessengerContactsQuery, useGetMessengerUserProfileQuery } from '../../MessengerApi';

type ExtendedListItemProps = NavLinkAdapterPropsType & {
	component: React.ElementType<NavLinkAdapterPropsType>;
};

const StyledListItem = styled(ListItemButton)<ExtendedListItemProps>(({ theme }) => ({
	'&.active': {
		backgroundColor: theme.palette.background.default
	}
}));

type ChatListItemProps = {
	item: Partial<Contact & Chat>;
};

/**
 * The chat list item.
 */
function ChatListItem(props: ChatListItemProps) {
	const { item } = props;
	const { data: user } = useGetMessengerUserProfileQuery();
	const { data: contacts } = useGetMessengerContactsQuery();

	const contactId = item.contactIds.find((id) => id !== user?.id);
	const contact = contacts?.find((contact) => contact.id === contactId);

	return (
		<StyledListItem
			component={NavLinkAdapter}
			className="px-24 py-12 min-h-80"
			to={`/apps/messenger/${item.id}`}
			activeClassName="active"
		>
			<UserAvatar user={contact} />

			<ListItemText
				classes={{
					root: 'min-w-px px-16',
					primary: 'font-medium text-base',
					secondary: 'truncate'
				}}
				primary={contact?.name}
				secondary={item.lastMessage}
			/>

			{contactId && (
				<div className="flex flex-col justify-center items-end">
					{item?.lastMessageAt && (
						<Typography
							className="whitespace-nowrap mb-8 font-medium text-md"
							color="text.secondary"
						>
							{format(new Date(item.lastMessageAt), 'PP')}
						</Typography>
					)}
					<div className="items-center">
						{item.muted && (
							<FuseSvgIcon
								size={20}
								color="disabled"
							>
								heroicons-solid:volume-off
							</FuseSvgIcon>
						)}
						{Boolean(item.unreadCount) && (
							<Box
								sx={{
									backgroundColor: 'secondary.main',
									color: 'secondary.contrastText'
								}}
								className="flex items-center justify-center min-w-20 h-20 rounded-full font-medium text-10 text-center"
							>
								{item.unreadCount}
							</Box>
						)}
					</div>
				</div>
			)}
		</StyledListItem>
	);
}

export default ChatListItem;
