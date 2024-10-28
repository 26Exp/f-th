import { lighten, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'src/store/hooks';
import { selectSelectedChatId } from './messengerPanelSlice';
import {
	Message,
	useGetMessengerChatQuery,
	useGetMessengerUserProfileQuery,
	useSendMessengerMessageMutation
} from '../MessengerApi';

const StyledMessageRow = styled('div')(({ theme }) => ({
	'&.contact': {
		'& .bubble': {
			backgroundColor: lighten(theme.palette.secondary.main, 0.1),
			color: theme.palette.secondary.contrastText,
			borderTopLeftRadius: 5,
			borderBottomLeftRadius: 5,
			borderTopRightRadius: 8,
			borderBottomRightRadius: 8,
			'& .time': {
				marginLeft: 12
			}
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 8
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 8
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
 * The chat component.
 */
function Chat(props: ChatProps) {
	const { className } = props;
	const selectedChatId = useAppSelector(selectSelectedChatId);

	const { data: chat } = useGetMessengerChatQuery(selectedChatId);
	const { data: user } = useGetMessengerUserProfileQuery();
	const [sendMessage] = useSendMessengerMessageMutation();
	const { data: messages } = useGetMessengerChatQuery(selectedChatId, {
		skip: !selectedChatId
	});

	const [messageText, setMessageText] = useState('');

	const chatScroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollToBottom();
	}, [chat]);

	function scrollToBottom() {
		if (!chatScroll.current) {
			return;
		}

		chatScroll.current.scrollTo({
			top: chatScroll.current.scrollHeight,
			behavior: 'instant'
		});
	}

	const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setMessageText(ev.target.value);
	};

	return (
		<Paper
			className={clsx('flex flex-col relative pb-64 shadow', className)}
			sx={(theme) => ({
				background: theme.palette.background.default
			})}
		>
			<div
				ref={chatScroll}
				className="flex flex-1 flex-col overflow-y-auto overscroll-contain"
			>
				<div className="flex flex-col pt-16">
					{useMemo(() => {
						function isFirstMessageOfGroup(item: Message, i: number) {
							return i === 0 || (chat[i - 1] && chat[i - 1].contactId !== item.contactId);
						}

						function isLastMessageOfGroup(item: Message, i: number) {
							return i === chat.length - 1 || (chat[i + 1] && chat[i + 1].contactId !== item.contactId);
						}

						return messages?.length > 0
							? messages.map((item, i) => {
									return (
										<StyledMessageRow
											key={i}
											className={clsx(
												'flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4',
												item.contactId === user.id ? 'me' : 'contact',
												{ 'first-of-group': isFirstMessageOfGroup(item, i) },
												{ 'last-of-group': isLastMessageOfGroup(item, i) },
												i + 1 === chat.length && 'pb-40'
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
								})
							: null;
					}, [chat, user?.id])}
				</div>
				{chat?.length === 0 && (
					<div className="flex flex-col flex-1">
						<div className="flex flex-col flex-1 items-center justify-center">
							<FuseSvgIcon
								size={128}
								color="disabled"
							>
								heroicons-outline:chat-bubble-left-right
							</FuseSvgIcon>
						</div>
						<Typography
							className="px-16 pb-24 text-center"
							color="text.secondary"
						>
							Start a conversation by typing your message below.
						</Typography>
					</div>
				)}
			</div>
			{useMemo(() => {
				const onMessageSubmit = (ev: FormEvent) => {
					ev.preventDefault();

					if (messageText === '') {
						return;
					}

					sendMessage({
						message: messageText,
						chatId: selectedChatId
					});
					setMessageText('');
				};
				return (
					chat && (
						<form
							onSubmit={onMessageSubmit}
							className="pb-16 px-8 absolute bottom-0 left-0 right-0"
						>
							<Paper className="flex items-center relative shadow">
								<InputBase
									autoFocus={false}
									id="message-input"
									className="flex flex-1 grow shrink-0 ltr:mr-48 rtl:ml-48"
									placeholder="Type your message"
									onChange={onInputChange}
									value={messageText}
								/>
								<IconButton
									className="absolute ltr:right-0 rtl:left-0"
									type="submit"
								>
									<FuseSvgIcon
										className=""
										color="action"
									>
										heroicons-outline:paper-airplane
									</FuseSvgIcon>
								</IconButton>
							</Paper>
						</form>
					)
				);
			}, [chat, messageText, selectedChatId])}
		</Paper>
	);
}

export default Chat;
