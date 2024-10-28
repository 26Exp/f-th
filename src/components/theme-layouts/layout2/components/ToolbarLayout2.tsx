import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import NavbarToggleButton from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import { useToolbarTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { useFuseLayoutSettings } from '@fuse/core/FuseLayout/FuseLayout';
import NotificationPanelToggleButton from '@/app/(control-panel)/apps/notifications/NotificationPanelToggleButton';
import AdjustFontSize from '../../components/AdjustFontSize';
import FullScreenToggle from '../../components/FullScreenToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import NavigationShortcuts from '../../components/navigation/NavigationShortcuts';
import NavigationSearch from '../../components/navigation/NavigationSearch';
import UserMenu from '../../components/UserMenu';
import QuickPanelToggleButton from '../../components/quickPanel/QuickPanelToggleButton';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';

type ToolbarLayout2Props = {
	className?: string;
};

/**
 * The toolbar layout 2.
 */
function ToolbarLayout2(props: ToolbarLayout2Props) {
	const { className = '' } = props;

	const { config } = useFuseLayoutSettings();
	const toolbarTheme = useToolbarTheme();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx('relative z-20 flex shadow-md', className)}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="container min-h-48 p-0 md:min-h-64 lg:px-24">
					<div className="flex flex-1 px-8 md:px-16 space-x-8 ">
						{config.navbar.display && isMobile && (
							<NavbarToggleButton className="mx-0 h-36 w-36 p-0 sm:mx-8" />
						)}

						{!isMobile && <NavigationShortcuts />}
					</div>

					<div className="flex items-center overflow-x-auto px-8 md:px-16 space-x-6">
						<LanguageSwitcher />
						<AdjustFontSize />
						<FullScreenToggle />
						<NavigationSearch />
						<QuickPanelToggleButton />
						<NotificationPanelToggleButton />
						{!isMobile && (
							<UserMenu
								className="border border-solid"
								arrowIcon="heroicons-outline:chevron-down"
								popoverProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'center'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'center'
									}
								}}
							/>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout2);
