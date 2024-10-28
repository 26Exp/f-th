import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import MessengerAppContext from '@/app/(control-panel)/apps/messenger/contexts/MessengerAppContext';

type MainSidebarMoreMenuProps = {
	className?: string;
};

/**
 * The main sidebar more menu.
 */
function MainSidebarMoreMenu(props: MainSidebarMoreMenuProps) {
	const { setContactSidebarOpen } = useContext(MessengerAppContext);

	const { className } = props;

	const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);

	function handleMoreMenuClick(event: React.MouseEvent<HTMLElement>) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose() {
		setMoreMenuEl(null);
	}

	return (
		<div className={className}>
			<IconButton
				aria-haspopup="true"
				onClick={handleMoreMenuClick}
			>
				<FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
			</IconButton>
			<Menu
				id="chats-more-menu"
				anchorEl={moreMenuEl}
				open={Boolean(moreMenuEl)}
				onClose={handleMoreMenuClose}
			>
				<MenuItem
					onClick={() => {
						setContactSidebarOpen(null);
						handleMoreMenuClose();
					}}
				>
					Contact info
				</MenuItem>
			</Menu>
		</div>
	);
}

export default MainSidebarMoreMenu;
