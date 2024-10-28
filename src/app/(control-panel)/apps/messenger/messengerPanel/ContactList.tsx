import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { memo, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import clsx from 'clsx';
import { Box, CircularProgress } from '@mui/material';
import { selectSelectedChatId, setSelectedChatId, openChatPanel } from './messengerPanelSlice';
import ContactButton from './ContactButton';
import {
	useCreateMessengerChatMutation,
	useGetMessengerChatsQuery,
	useGetMessengerContactsQuery,
	useGetMessengerUserProfileQuery
} from '../MessengerApi';

const Root = styled(FuseScrollbars)(({ theme }) => ({
	background: theme.palette.background.paper
}));

const container = {
	show: {
		transition: {
			staggerChildren: 0.025
		}
	}
};
const item = {
	hidden: { opacity: 0, scale: 0.6 },
	show: { opacity: 1, scale: 1 }
};

type ContactListProps = {
	className?: string;
};

/**
 * The contact list.
 */
function ContactList(props: ContactListProps) {
	const { className } = props;
	const dispatch = useAppDispatch();
	const selectedChatId = useAppSelector(selectSelectedChatId);
	const contactListScroll = useRef<HTMLDivElement>(null);
	const { data: user } = useGetMessengerUserProfileQuery();

	const [createChat] = useCreateMessengerChatMutation();
	const { data: chats, isLoading: isChatsLoading } = useGetMessengerChatsQuery();
	const { data: contacts, isLoading: isContactsLoading } = useGetMessengerContactsQuery();
	const { data: chatList } = useGetMessengerChatsQuery();

	const chatListContacts = useMemo(() => {
		return contacts?.length > 0 && chats?.length > 0
			? chats.map((_chat) => ({
					..._chat,
					...contacts.find((_contact) => _chat.contactIds.includes(_contact.id))
				}))
			: [];
	}, [contacts, chats]);

	const scrollToTop = () => {
		if (!contactListScroll.current) {
			return;
		}

		contactListScroll.current.scrollTop = 0;
	};

	const handleContactClick = (contactId: string) => {
		dispatch(openChatPanel());

		const chat = chatList?.find((chat) => chat.contactIds.includes(contactId));

		if (chat) {
			dispatch(setSelectedChatId(chat.id));
			scrollToTop();
		} else {
			createChat({ contactIds: [contactId, user.id] }).then((res) => {
				const chatId = res.data.id;
				dispatch(setSelectedChatId(chatId));
				scrollToTop();
			});
		}
	};

	if (isContactsLoading || isChatsLoading) {
		return (
			<Box
				className="flex justify-center py-12"
				sx={{
					width: 70,
					minWidth: 70
				}}
			>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	return (
		<Root
			className={clsx('flex shrink-0 flex-col overflow-y-auto py-8 overscroll-contain', className)}
			ref={contactListScroll}
			option={{ suppressScrollX: true, wheelPropagation: false }}
		>
			{contacts?.length > 0 && (
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-col shrink-0"
				>
					{chatListContacts &&
						chatListContacts.map((contact) => {
							return (
								<motion.div
									variants={item}
									key={contact.id}
								>
									<ContactButton
										contact={contact}
										selectedChatId={selectedChatId}
										onClick={handleContactClick}
									/>
								</motion.div>
							);
						})}
					<Divider className="mx-24 my-8" />
					{contacts.map((contact) => {
						const chatContact = chats.find((_chat) => _chat.contactIds.includes(contact.id));

						return !chatContact ? (
							<motion.div
								variants={item}
								key={contact.id}
							>
								<ContactButton
									contact={contact}
									selectedChatId={selectedChatId}
									onClick={handleContactClick}
								/>
							</motion.div>
						) : null;
					})}
				</motion.div>
			)}
		</Root>
	);
}

export default memo(ContactList);
