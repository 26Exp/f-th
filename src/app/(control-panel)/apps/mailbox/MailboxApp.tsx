'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import usePathname from '@fuse/hooks/usePathname';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import './i18n';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-rightSidebar': {
		flex: '1',
		[theme.breakpoints.down('lg')]: {
			minWidth: '100%'
		}
	},
	'& .FusePageSimple-contentWrapper': {
		[theme.breakpoints.up('lg')]: {
			maxWidth: 400
		}
	}
}));

type MailboxLayoutProps = {
	children: React.ReactNode;
	mailView: React.ReactNode;
	sidebarView: React.ReactNode;
};

/**
 * The mailbox app.
 */
function MailboxApp({ children, mailView, sidebarView }: MailboxLayoutProps) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const routeParams = useParams<{ mailParams: string[] }>();
	const [_category, _subCategory, mailId] = routeParams?.mailParams || [];

	const pathname = usePathname();

	useEffect(() => {
		if (isMobile) {
			setRightSidebarOpen(Boolean(mailId));
		} else {
			setRightSidebarOpen(true);
		}
	}, [mailId, isMobile]);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			setLeftSidebarOpen(false);
		}
	}, [pathname, isMobile]);

	return (
		<Root
			content={children}
			leftSidebarContent={sidebarView}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			leftSidebarWidth={288}
			scroll={isMobile ? 'normal' : 'content'}
			rightSidebarContent={mailView}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
		/>
	);
}

export default MailboxApp;
