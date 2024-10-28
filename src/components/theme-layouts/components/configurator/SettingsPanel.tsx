import FuseScrollbars from '@fuse/core/FuseScrollbars';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import FuseSettings, { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import FuseSettingsViewerDialog from 'src/components/theme-layouts/components/FuseSettingsViewerDialog';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { SwipeableHandlers } from 'react-swipeable';
import useUser from '@auth/useUser';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';

import { useAppDispatch } from '@/store/hooks';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

type TransitionProps = {
	children?: React.ReactElement;
};

const Transition = forwardRef((props: TransitionProps, ref) => {
	const { children, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

type SettingsPanelProps = {
	settingsHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function SettingsPanel(props: SettingsPanelProps) {
	const { settingsHandlers, onClose, open } = props;
	const { isGuest, updateUserSettings } = useUser();
	const dispatch = useAppDispatch();

	const { data: settings, setSettings } = useFuseSettings();

	const handleSettingsChange = async (newSettings: Partial<FuseSettingsConfigType>) => {
		const _newSettings = setSettings(newSettings);

		/**
		 * Updating user settings disabled for demonstration purposes
		 * The request is made to the mock API and will not persist the changes
		 * You can enable it by removing the comment block below when using a real API
		 * */
		/* if (!isGuest) {
			const updatedUserData = await updateUserSettings(_newSettings);

			if (updatedUserData) {
				dispatch(showMessage({ message: 'User settings saved.' }));
			}
		} */
	};

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="settings-panel"
			aria-describedby="settings"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...settingsHandlers}
		>
			<FuseScrollbars className="p-16 sm:p-24 space-y-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
				</IconButton>

				<Typography
					className="font-semibold"
					variant="h6"
				>
					Theme Settings
				</Typography>

				<FuseSettings
					value={settings}
					onChange={handleSettingsChange}
				/>

				<div className="py-32">
					<FuseSettingsViewerDialog />
				</div>
			</FuseScrollbars>
		</StyledDialog>
	);
}

export default SettingsPanel;
