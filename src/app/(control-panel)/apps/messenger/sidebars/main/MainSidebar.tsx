import FuseUtils from '@fuse/utils';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { lighten } from '@mui/material/styles';
import ContactListItem from './ContactListItem';
import UserAvatar from '../../components/UserAvatar';
import MainSidebarMoreMenu from './MainSidebarMoreMenu';
import ChatListItem from './ChatListItem';
import {
	useGetMessengerChatsQuery,
	useGetMessengerContactsQuery,
	useGetMessengerUserProfileQuery
} from '../../MessengerApi';
import MessengerAppContext from '@/app/(control-panel)/apps/messenger/contexts/MessengerAppContext';

/**
 * The main sidebar.
 */
function MainSidebar() {
	const { setUserSidebarOpen } = useContext(MessengerAppContext);
	const { data: contacts } = useGetMessengerContactsQuery();
	const { data: user } = useGetMessengerUserProfileQuery();
	const { data: chatList } = useGetMessengerChatsQuery();

	const [searchText, setSearchText] = useState('');

	function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	return (
		<div className="flex flex-col flex-auto">
			<Box
				className="py-16 px-24 border-b-1 flex flex-col flex-shrink-0 sticky top-0 z-10"
				sx={(theme) => ({
					backgroundColor: lighten(theme.palette.background.default, 0.02),
					...theme.applyStyles('light', {
						backgroundColor: lighten(theme.palette.background.default, 0.4)
					})
				})}
			>
				<div className="flex justify-between items-center mb-16">
					{user && (
						<div
							className="flex items-center cursor-pointer"
							onClick={() => setUserSidebarOpen(true)}
							onKeyDown={() => setUserSidebarOpen(true)}
							role="button"
							tabIndex={0}
						>
							<UserAvatar
								className="relative"
								user={user}
							/>
							<Typography className="mx-16 font-medium">{user?.name}</Typography>
						</div>
					)}
					<MainSidebarMoreMenu className="-mx-16" />
				</div>
				{useMemo(
					() => (
						<Paper className="flex p-4 items-center w-full px-8 py-4 border-1 rounded-lg h-36 shadow-none">
							<FuseSvgIcon color="action">heroicons-solid:magnifying-glass</FuseSvgIcon>
							<Input
								placeholder="Search or start new chat"
								className="flex flex-1"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
							/>
						</Paper>
					),
					[searchText]
				)}
			</Box>
			<div className="flex-auto">
				<List className="w-full">
					{useMemo(() => {
						if (!contacts || !chatList) {
							return null;
						}

						function getFilteredArray<T>(arr: T[], _searchText: string): T[] {
							if (_searchText.length === 0) {
								return arr;
							}

							return FuseUtils.filterArrayByString(arr, _searchText);
						}

						const filteredContacts = getFilteredArray([...contacts], searchText);

						const filteredChatList = chatList.filter((chat) =>
							filteredContacts.some((contact) => chat.contactIds.includes(contact.id))
						);

						const container = {
							show: {
								transition: {
									staggerChildren: 0.02
								}
							}
						};

						const item = {
							hidden: { opacity: 0, y: 10 },
							show: { opacity: 1, y: 0 }
						};

						return (
							<motion.div
								className="flex flex-col shrink-0"
								variants={container}
								initial="hidden"
								animate="show"
							>
								{filteredChatList.length > 0 && (
									<motion.div variants={item}>
										<Typography
											className="font-medium text-2xl px-24 pt-16"
											color="secondary.main"
										>
											Chats
										</Typography>
									</motion.div>
								)}

								{filteredChatList.map((chat, index) => (
									<motion.div
										variants={item}
										key={chat.id}
									>
										<div className={clsx(filteredChatList.length !== index + 1 && 'border-b-1')}>
											<ChatListItem item={chat} />
										</div>
									</motion.div>
								))}

								{filteredContacts.length > 0 && (
									<motion.div variants={item}>
										<Typography
											className="font-medium text-2xl px-24 pt-16"
											color="secondary.main"
										>
											Contacts
										</Typography>
									</motion.div>
								)}

								{filteredContacts.map((contact, index) => (
									<motion.div
										variants={item}
										key={contact.id}
									>
										<div className={clsx(filteredContacts.length !== index + 1 && 'border-b-1')}>
											<ContactListItem item={contact} />
										</div>
									</motion.div>
								))}
							</motion.div>
						);
					}, [contacts, chatList, searchText])}
				</List>
			</div>
		</div>
	);
}

export default MainSidebar;
