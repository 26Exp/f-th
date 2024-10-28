'use client';

import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useEffect, useMemo, useState } from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import usePathname from '@fuse/hooks/usePathname';
import MainSidebar from './sidebars/main/MainSidebar';
import ContactSidebar from './sidebars/contact/ContactSidebar';
import UserSidebar from './sidebars/user/UserSidebar';
import MessengerAppContext from './contexts/MessengerAppContext';

const drawerWidth = 400;

const Root = styled(FusePageSimple)(() => ({
	'& .container': {
		maxWidth: '100%!important'
	},
	'& .FusePageSimple-content': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		height: '100%'
	}
}));

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	}
}));

type MessengerAppProps = {
	children: React.ReactNode;
};

/**
 * The chat app.
 */
function MessengerApp(props: MessengerAppProps) {
	const { children } = props;
	const pathname = usePathname();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [mainSidebarOpen, setMainSidebarOpen] = useState(!isMobile);
	const [contactSidebarOpen, setContactSidebarOpen] = useState<string | null>(null);
	const [userSidebarOpen, setUserSidebarOpen] = useState(false);

	useEffect(() => {
		setMainSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			setMainSidebarOpen(false);
		}
	}, [pathname, isMobile]);

	useEffect(() => {
		if (isMobile && userSidebarOpen) {
			setMainSidebarOpen(false);
		}
	}, [isMobile, userSidebarOpen]);

	const MessengerAppContextData = useMemo(
		() => ({
			setMainSidebarOpen,
			setContactSidebarOpen,
			setUserSidebarOpen,
			contactSidebarOpen
		}),
		[setMainSidebarOpen, setContactSidebarOpen, setUserSidebarOpen, contactSidebarOpen]
	);

	return (
		<MessengerAppContext.Provider value={MessengerAppContextData}>
			<Root
				content={children}
				leftSidebarContent={<MainSidebar />}
				leftSidebarOpen={mainSidebarOpen}
				leftSidebarOnClose={() => {
					setMainSidebarOpen(false);
				}}
				leftSidebarWidth={400}
				rightSidebarContent={<ContactSidebar />}
				rightSidebarOpen={contactSidebarOpen}
				rightSidebarOnClose={() => {
					setContactSidebarOpen(null);
				}}
				rightSidebarWidth={400}
				scroll="content"
			/>
			<StyledSwipeableDrawer
				className="h-full absolute z-9999"
				variant="temporary"
				anchor="left"
				open={userSidebarOpen}
				onOpen={() => {}}
				onClose={() => setUserSidebarOpen(false)}
				classes={{
					paper: 'absolute left-0'
				}}
				style={{ position: 'absolute' }}
				ModalProps={{
					keepMounted: false,
					disablePortal: true,
					BackdropProps: {
						classes: {
							root: 'absolute'
						}
					}
				}}
			>
				<UserSidebar />
			</StyledSwipeableDrawer>
		</MessengerAppContext.Provider>
	);
}

export default MessengerApp;
