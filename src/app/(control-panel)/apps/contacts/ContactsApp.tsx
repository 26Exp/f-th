'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import useNavigate from '@fuse/hooks/useNavigate';
import ContactsHeader from './ContactsHeader';
import ContactsList from './contact-list/ContactsList';
import { useGetContactsListQuery, useGetContactsCountriesQuery, useGetContactsTagsQuery } from './ContactsApi';
import ContactsSidebarContent from './ContactsSidebarContent';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .container': {
		maxWidth: '100%!important'
	},
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 -1px 0 0px ${theme.palette.divider}`
	}
}));

type ContactsAppProps = {
	children?: React.ReactNode;
};

/**
 * The ContactsApp page.
 */
function ContactsApp(props: ContactsAppProps) {
	const { children } = props;
	const navigate = useNavigate();
	const routeParams = useParams();

	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const pageLayout = useRef(null);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	useGetContactsListQuery();
	useGetContactsCountriesQuery();
	useGetContactsTagsQuery();

	useEffect(() => {
		setRightSidebarOpen(!!routeParams.contactId);
	}, [routeParams]);

	return (
		<Root
			header={<ContactsHeader />}
			content={<ContactsList />}
			ref={pageLayout}
			rightSidebarContent={<ContactsSidebarContent>{children}</ContactsSidebarContent>}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => navigate('/apps/contacts')}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ContactsApp;
