import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type ContactsSidebarContentProps = {
	children?: React.ReactNode;
};

/**
 * The contacts sidebar content.
 */
function ContactsSidebarContent({ children }: ContactsSidebarContentProps) {
	return (
		<div className="flex flex-col flex-auto max-w-full w-md">
			<IconButton
				className="absolute top-0 right-0 my-16 mx-32 z-10"
				sx={{
					backgroundColor: 'primary.light',
					color: 'primary.contrastText',
					'&:hover': {
						backgroundColor: 'primary.main',
						color: 'primary.contrastText'
					}
				}}
				component={NavLinkAdapter}
				to="/apps/contacts"
			>
				<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
			</IconButton>

			{children}
		</div>
	);
}

export default ContactsSidebarContent;
