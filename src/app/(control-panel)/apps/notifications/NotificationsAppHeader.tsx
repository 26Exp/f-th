import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSnackbar } from 'notistack';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import {
	useCreateNotificationMutation,
	useDeleteNotificationsMutation,
	useGetAllNotificationsQuery
} from './NotificationApi';
import NotificationModel from './models/NotificationModel';
import NotificationTemplate from './NotificationTemplate';

/**
 * The Notifications app header.
 */
function NotificationsAppHeader() {
	const [addNotification] = useCreateNotificationMutation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [deleteNotifications] = useDeleteNotificationsMutation();
	const { data: notifications } = useGetAllNotificationsQuery();

	function handleDismissAll() {
		deleteNotifications(notifications.map((notification) => notification.id));
	}

	function demoNotification() {
		const item = NotificationModel({ title: 'Great Job! this is awesome.' });

		enqueueSnackbar(item.title, {
			key: item.id,

			// autoHideDuration: 3000,
			content: (
				<NotificationTemplate
					item={item}
					onClose={() => {
						closeSnackbar(item.id);
					}}
				/>
			)
		});

		addNotification(item);
	}

	return (
		<div className="flex w-full container">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 pb-0">
				<div className="flex flex-col flex-auto">
					<PageBreadcrumb className="mb-8" />

					<Typography className="text-4xl font-extrabold leading-none tracking-tight mb-4">
						Notifications
					</Typography>
					<Typography
						className="font-medium tracking-tight"
						color="text.secondary"
					>
						Lists all notifications
					</Typography>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-8">
					<Button
						className="whitespace-nowrap"
						onClick={demoNotification}
						variant="contained"
						color="primary"
					>
						Example notification
					</Button>

					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						onClick={handleDismissAll}
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:bell</FuseSvgIcon>}
					>
						Dissmiss All
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NotificationsAppHeader;
