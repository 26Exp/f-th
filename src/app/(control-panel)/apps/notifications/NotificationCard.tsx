import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { MouseEvent } from 'react';
import { darken, ThemeProvider, useTheme } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import orange from '@mui/material/colors/orange';
import yellow from '@mui/material/colors/yellow';
import { useContrastMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { Notification } from './NotificationApi';

type NotificationCardProps = {
	item: Notification;
	className?: string;
	onClose: (T: string) => void;
};

const variantBgColors = {
	success: green[600],
	info: blue[700],
	error: red[600],
	warning: orange[600],
	alert: yellow[700]
};

/**
 * The notification card.
 */
function NotificationCard(props: NotificationCardProps) {
	const { item, className, onClose } = props;
	const theme = useTheme();

	const defaultBgColor = theme.palette.background.paper;

	let bgColor: string = (variantBgColors[item.variant] as string) || defaultBgColor;

	if (item.variant === 'primary') {
		bgColor = theme.palette.primary.dark;
	}

	if (item.variant === 'secondary') {
		bgColor = theme.palette.secondary.dark;
	}

	const contrastTheme = useContrastMainTheme(bgColor);

	const handleClose = (ev: MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		if (onClose) {
			onClose(item?.id);
		}
	};

	return (
		<ThemeProvider theme={contrastTheme}>
			<Card
				className={clsx(
					'relative flex min-h-64 w-full items-center space-x-8 rounded-xl p-20 shadow',
					className
				)}
				sx={[
					{
						backgroundColor: bgColor,
						color: `${contrastTheme.palette.text.primary}!important`
					},
					item.link ? { '&:hover': { backgroundColor: darken(bgColor, 0.05) } } : {}
				]}
				elevation={0}
				component={item.link ? NavLinkAdapter : 'div'}
				to={item.link || ''}
				role={item.link && 'button'}
			>
				{item.icon && !item.image && (
					<Box
						sx={{ backgroundColor: darken(bgColor, contrastTheme.palette.mode === 'dark' ? 0.3 : 0.1) }}
						className="mr-12 flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
					>
						<FuseSvgIcon
							className="opacity-75"
							color="inherit"
							size={20}
						>
							{item.icon}
						</FuseSvgIcon>
					</Box>
				)}

				{item.image && (
					<img
						className="mr-12 h-32 w-32 shrink-0 overflow-hidden rounded-full object-cover object-center"
						src={item.image}
						alt="Notification"
					/>
				)}

				<div className="flex flex-auto flex-col">
					{item.title && <Typography className="line-clamp-1 font-semibold">{item.title}</Typography>}

					{item.description && (
						<div
							className="line-clamp-2"
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: item.description }}
						/>
					)}

					{item.time && (
						<Typography className="mt-8 text-sm leading-none opacity-60">
							{formatDistanceToNow(new Date(item.time), { addSuffix: true })}
						</Typography>
					)}
				</div>

				<IconButton
					disableRipple
					className="absolute right-0 top-0 p-8"
					color="inherit"
					size="small"
					onClick={handleClose}
				>
					<FuseSvgIcon
						size={12}
						className="opacity-75"
						color="inherit"
					>
						heroicons-solid:x-mark
					</FuseSvgIcon>
				</IconButton>
				{item.children}
			</Card>
		</ThemeProvider>
	);
}

export default NotificationCard;
