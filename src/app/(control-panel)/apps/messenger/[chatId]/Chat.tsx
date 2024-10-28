'use client';

import { lighten, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useContext, useEffect, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Error404Page from '@/app/(public)/404/Error404Page';
import ChatMoreMenu from './ChatMoreMenu';
import {
	Message,
	useGetMessengerChatQuery,
	useGetMessengerChatsQuery,
	useGetMessengerContactQuery,
	useGetMessengerUserProfileQuery,
	useSendMessengerMessageMutation
} from '../MessengerApi';
import UserAvatar from '../components/UserAvatar';
import MessengerAppContext from '@/app/(control-panel)/apps/messenger/contexts/MessengerAppContext';

const StyledMessageRow = styled('div')(({ theme }) => ({
	'&.contact': {
		'& .bubble': {
			backgroundColor: lighten(theme.palette.secondary.main, 0.1),
			color: theme.palette.secondary.contrastText,
			borderTopLeftRadius: 4,
			borderBottomLeftRadius: 4,
			borderTopRightRadius: 12,
			borderBottomRightRadius: 12,
			'& .time': {
				paddingLeft: 12
			}
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 12
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 12
			}
		}
	},
	'&.me': {
		paddingLeft: 36,
		'& .bubble': {
			marginLeft: 'auto',
			backgroundColor: lighten(theme.palette.primary.main, 0.1),
			color: theme.palette.primary.contrastText,
			borderTopLeftRadius: 12,
			borderBottomLeftRadius: 12,
			borderTopRightRadius: 4,
			borderBottomRightRadius: 4,
			'& .time': {
				justifyContent: 'flex-end',
				right: 0,
				paddingRight: 12
			}
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopRightRadius: 12
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomRightRadius: 12
			}
		}
	},
	'&.contact + .me, &.me + .contact': {
		paddingTop: 20,
		marginTop: 20
	},
	'&.first-of-group': {
		'& .bubble': {
			borderTopLeftRadius: 12,
			paddingTop: 8
		}
	},
	'&.last-of-group': {
		'& .bubble': {
			borderBottomLeftRadius: 12,
			paddingBottom: 8,
			'& .time': {
				display: 'flex'
			}
		}
	}
}));

type ChatProps = {
	className?: string;
};

/**
 * The Chat App.
 */
function Chat(props: ChatProps) {
	const { className } = props;
	const { setMainSidebarOpen, setContactSidebarOpen } = useContext(MessengerAppContext);
	const chatRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState('');

	const routeParams = useParams<{ chatId: string }>();
	const { chatId } = routeParams;

	const { data: chatList } = useGetMessengerChatsQuery();

	const chat = chatList?.find((chat) => chat.id === chatId);

	const { data: user } = useGetMessengerUserProfileQuery();
	const { data: messages } = useGetMessengerChatQuery(chatId, {
		skip: !chatId
	});

	const contactId = chat?.contactIds?.find((id) => id !== user?.id);

	const { data: selectedContact } = useGetMessengerContactQuery(contactId, {
		skip: !contactId
	});
	const [sendMessage] = useSendMessengerMessageMutation();

	useEffect(() => {
		if (messages) {
			setTimeout(scrollToBottom);
		}
	}, [messages]);

	function scrollToBottom() {
		if (!chatRef.current) {
			return;
		}

		chatRef.current.scrollTo({
			top: chatRef.current.scrollHeight,
			behavior: 'smooth'
		});
	}

	function isFirstMessageOfGroup(item: Message, i: number) {
		return i === 0 || (messages[i - 1] && messages[i - 1].contactId !== item.contactId);
	}

	function isLastMessageOfGroup(item: Message, i: number) {
		return i === messages.length - 1 || (messages[i + 1] && messages[i + 1].contactId !== item.contactId);
	}

	function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
		setMessage(ev.target.value);
	}

	function onMessageSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (message === '') {
			return;
		}

		sendMessage({
			message,
			chatId
		});

		setMessage('');
	}

	if (!user || !messages || !chat) {
		return null;
		return <Error404Page />;
	}

	return (
		<>
			<Box
				className="w-full border-b-1"
				sx={(theme) => ({
					backgroundColor: lighten(theme.palette.background.default, 0.02),
					...theme.applyStyles('light', {
						backgroundColor: lighten(theme.palette.background.default, 0.4)
					})
				})}
			>
				<Toolbar className="flex items-center justify-between px-16 w-full">
					<div className="flex items-center">
						<IconButton
							aria-label="Open drawer"
							onClick={() => setMainSidebarOpen(true)}
							className="border border-divider flex lg:hidden"
						>
							<FuseSvgIcon>heroicons-outline:chat-bubble-left-right</FuseSvgIcon>
						</IconButton>
						<div
							className="flex items-center cursor-pointer"
							onClick={() => {
								setContactSidebarOpen(contactId);
							}}
							onKeyDown={() => setContactSidebarOpen(contactId)}
							role="button"
							tabIndex={0}
						>
							<UserAvatar
								className="relative mx-8"
								user={selectedContact}
							/>
							<Typography
								color="inherit"
								className="text-15 font-semibold px-4"
							>
								{selectedContact?.name}
							</Typography>
						</div>
					</div>
					<ChatMoreMenu className="-mx-8" />
				</Toolbar>
			</Box>
			<div className="flex flex-auto h-full min-h-0 w-full">
				<div className={clsx('flex flex-1 z-10 flex-col relative', className)}>
					<div
						ref={chatRef}
						className="flex flex-1 flex-col overflow-y-auto"
					>
						{messages?.length > 0 && (
							<div className="flex flex-col pt-16 px-16 pb-40">
								{messages.map((item, i) => {
									return (
										<StyledMessageRow
											key={i}
											className={clsx(
												'flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4',
												item.contactId === user.id ? 'me' : 'contact',
												{ 'first-of-group': isFirstMessageOfGroup(item, i) },
												{ 'last-of-group': isLastMessageOfGroup(item, i) },
												i + 1 === messages.length && 'pb-72'
											)}
										>
											<div className="bubble flex relative items-center justify-center px-12 py-8 max-w-full">
												<Typography className=" whitespace-pre-wrap text-md">
													{item.value}
												</Typography>
												<Typography
													className="time absolute hidden w-full text-sm -mb-20 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
													color="text.secondary"
												>
													{formatDistanceToNow(new Date(item.createdAt), {
														addSuffix: true
													})}
												</Typography>
											</div>
										</StyledMessageRow>
									);
								})}
							</div>
						)}
					</div>
					{messages && (
						<Paper
							square
							component="form"
							onSubmit={onMessageSubmit}
							className="absolute border-t-1 bottom-0 right-0 left-0 py-16 px-16"
							sx={(theme) => ({
								backgroundColor: lighten(theme.palette.background.default, 0.02),
								...theme.applyStyles('light', {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								})
							})}
						>
							<div className="flex items-center relative">
								<IconButton type="submit">
									<FuseSvgIcon
										className="text-3xl"
										color="action"
									>
										heroicons-outline:face-smile
									</FuseSvgIcon>
								</IconButton>

								<IconButton type="submit">
									<FuseSvgIcon
										className="text-3xl"
										color="action"
									>
										heroicons-outline:paper-clip
									</FuseSvgIcon>
								</IconButton>

								<InputBase
									autoFocus={false}
									id="message-input"
									className="flex-1 flex grow shrink-0 mx-8 border-2"
									placeholder="Type your message"
									onChange={onInputChange}
									value={message}
									sx={{ backgroundColor: 'background.paper' }}
								/>
								<IconButton type="submit">
									<FuseSvgIcon color="action">heroicons-outline:paper-airplane</FuseSvgIcon>
								</IconButton>
							</div>
						</Paper>
					)}
				</div>
			</div>
		</>
	);
}

export default Chat;
