'use client';

import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import FuseNavigation from '@fuse/core/FuseNavigation';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FusePageSimple from '@fuse/core/FusePageSimple';
import usePathname from '@fuse/hooks/usePathname';
import { Button } from '@mui/material';
import Link from '@fuse/core/Link';
import PurchaseButton from 'src/components/theme-layouts/components/PurchaseButton';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import DocumentationNavigation from '../DocumentationNavigation';
import DocumentationSidebarHeader from './DocumentationSidebarHeader';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageCarded-header': {},
	'& .FusePageCarded-content': {
		backgroundColor: theme.palette.background.default
	},
	'& .FusePageCarded-wrapper': {},
	'& .FusePageCarded-leftSidebar': {},
	'& .description': {},
	'& [class^="language-"]': {
		margin: 0
	}
}));
type DocumentationLayoutProps = {
	children: React.ReactNode;
};

/**
 * Documentation Layout
 */
function DocumentationLayout(props: DocumentationLayoutProps) {
	const { children } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const pathname = usePathname();
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

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
			header={
				<div>
					<div className="flex flex-col items-start sm:items-center sm:flex-row justify-center py-4 px-12 max-w-full h-full">
						<div className="flex flex-1 items-center">
							<IconButton
								onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
								aria-label="toggle left sidebar"
							>
								<FuseSvgIcon>heroicons-outline:bars-3</FuseSvgIcon>
							</IconButton>

							<PageBreadcrumb
								skipHome
								maxItems={isMobile ? 2 : 5}
							/>
						</div>
						<div className="flex flex-shrink justify-end items-center space-x-4">
							<PurchaseButton size="small">Purchase</PurchaseButton>
							<Button
								className="whitespace-nowrap"
								component={Link}
								to="/"
								variant="contained"
								startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-turn-left-up</FuseSvgIcon>}
								color="primary"
								size="small"
							>
								Back to the Dashboard
							</Button>
						</div>
					</div>
				</div>
			}
			content={
				<div className="p-16 md:p-24 min-h-full flex flex-auto flex-col">
					<div className="flex flex-col flex-1 relative pb-32 prose max-w-4xl dark:prose-invert">
						{children}
					</div>
				</div>
			}
			leftSidebarContent={
				<div className="px-4 py-24">
					<DocumentationSidebarHeader className="mb-32 px-16" />
					<FuseNavigation
						className={clsx('navigation')}
						navigation={DocumentationNavigation.children}
					/>
				</div>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarWidth={288}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default DocumentationLayout;
