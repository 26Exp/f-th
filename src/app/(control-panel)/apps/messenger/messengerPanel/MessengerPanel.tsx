import AppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import keycode from 'keycode';
import { useCallback, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import _ from 'lodash';
import Chat from './Chat';
import ContactList from './ContactList';
import { selectSelectedChatId, closeChatPanel, openChatPanel, selectChatPanelOpen } from './messengerPanelSlice';
import {
	useGetMessengerChatsQuery,
	useGetMessengerContactsQuery,
	useGetMessengerUserProfileQuery
} from '../MessengerApi';

const Root = styled('div')<{ opened: number }>(({ theme }) => ({
	position: 'sticky',
	display: 'flex',
	top: 0,
	width: 70,
	maxWidth: 70,
	minWidth: 70,
	height: '100vh',
	zIndex: 1000,
	borderLeft: `1px solid ${theme.palette.divider}`,
	[theme.breakpoints.down('lg')]: {
		position: 'fixed',
		height: '100%',
		width: 0,
		maxWidth: 0,
		minWidth: 0
	},
	'& > .panel': {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 360,
		minWidth: 360,
		height: '100%',
		margin: 0,
		overflow: 'hidden',
		zIndex: 1000,
		backgroundColor: theme.palette.background.paper,
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		transform: 'translate3d(0,0,0)',
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.standard
		}),
		[theme.breakpoints.down('lg')]: {
			left: 'auto',
			position: 'fixed',
			transform: theme.direction === 'rtl' ? 'translate3d(-360px,0,0)' : 'translate3d(360px,0,0)',
			boxShadow: 'none',
			width: 320,
			minWidth: 320,
			maxWidth: '100%'
		}
	},
	'@keyframes hide-panel': {
		'0%': {
			overflow: 'visible'
		},
		'99%': {
			overflow: 'visible'
		},
		'100%': {
			overflow: 'hidden'
		}
	},
	variants: [
		{
			props: ({ opened }) => opened,
			style: {
				overflow: 'visible'
			}
		},
		{
			props: ({ opened }) => !opened,
			style: {
				overflow: 'hidden',
				animation: `hide-panel 1ms linear ${theme.transitions.duration.standard}`,
				animationFillMode: 'forwards'
			}
		},
		{
			props: ({ opened }) => opened,
			style: {
				'& > .panel': {
					transform: theme.direction === 'rtl' ? 'translate3d(290px,0,0)' : 'translate3d(-290px,0,0)'
				}
			}
		},
		{
			props: ({ opened }) => opened,
			style: {
				'& > .panel': {
					[theme.breakpoints.down('lg')]: {
						transform: 'translate3d(0,0,0)',
						boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
					}
				}
			}
		}
	]
}));

/**
 * The chat panel component.
 */
function MessengerPanel() {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const ref = useRef<HTMLDivElement>(null);

	const selectedChatId = useAppSelector(selectSelectedChatId);
	const { data: contacts } = useGetMessengerContactsQuery();
	const { data: chatList } = useGetMessengerChatsQuery();
	const { data: user } = useGetMessengerUserProfileQuery();

	const chat = chatList?.find((chat) => chat.id === selectedChatId);

	const contactId = chat?.contactIds?.find((id) => id !== user?.id);

	const selectedContact = _.find(contacts, { id: contactId });

	const open = useAppSelector(selectChatPanelOpen);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			return open && theme.direction === 'rtl' && dispatch(closeChatPanel());
		},
		onSwipedRight: () => {
			return open && theme.direction === 'ltr' && dispatch(closeChatPanel());
		}
	});

	const handleDocumentKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (keycode(event) === 'esc') {
				dispatch(closeChatPanel());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		return () => {
			document.removeEventListener('keydown', handleDocumentKeyDown);
		};
	}, [dispatch, handleDocumentKeyDown]);

	useEffect(() => {
		if (open) {
			document.addEventListener('keydown', handleDocumentKeyDown);
		} else {
			document.removeEventListener('keydown', handleDocumentKeyDown);
		}
	}, [handleDocumentKeyDown, open]);

	/**
	 * Click Away Listener
	 */
	useEffect(() => {
		function handleDocumentClick(ev: MouseEvent) {
			if (ref.current && !ref.current.contains(ev.target as Node)) {
				dispatch(closeChatPanel());
			}
		}

		if (open) {
			document.addEventListener('click', handleDocumentClick, true);
		}

		return () => {
			if (!open) {
				return;
			}

			document.removeEventListener('click', handleDocumentClick, true);
		};
	}, [open, dispatch]);

	return (
		<Root
			opened={open ? 1 : 0}
			{...handlers}
		>
			<div
				className="panel flex flex-col max-w-full"
				ref={ref}
			>
				<AppBar
					position="static"
					className="shadow-md"
				>
					<Toolbar className="px-4">
						{(!open || selectedChatId === '') && (
							<div className="flex flex-1 items-center px-3 space-x-12">
								<IconButton
									className="w-56 h-56"
									color="inherit"
									onClick={() => dispatch(openChatPanel())}
									size="large"
								>
									<FuseSvgIcon size={24}>heroicons-outline:chat-bubble-left-right</FuseSvgIcon>
								</IconButton>
								{selectedChatId === '' && (
									<Typography
										className="text-15"
										color="inherit"
									>
										Team Chat
									</Typography>
								)}
							</div>
						)}
						{open && selectedContact && (
							<div className="flex flex-1 items-center px-12">
								<Avatar src={selectedContact.avatar} />
								<Typography
									className="mx-16 text-15"
									color="inherit"
								>
									{selectedContact.name}
								</Typography>
							</div>
						)}
						<div className="flex px-4">
							<IconButton
								onClick={() => dispatch(closeChatPanel())}
								color="inherit"
								size="large"
							>
								<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				<Paper className="flex flex-1 flex-row min-h-px shadow-0">
					<ContactList className="flex shrink-0" />

					{open && selectedChatId ? (
						<Chat className="flex flex-1 z-10" />
					) : (
						<div className="flex flex-col flex-1 items-center justify-center p-24">
							<FuseSvgIcon
								size={128}
								color="disabled"
							>
								heroicons-outline:chat-bubble-left-right
							</FuseSvgIcon>
							<Typography
								className="px-16 pb-24 mt-24 text-center"
								color="text.secondary"
							>
								Select a contact to start a conversation.
							</Typography>
						</div>
					)}
				</Paper>
			</div>
		</Root>
	);
}

export default MessengerPanel;
