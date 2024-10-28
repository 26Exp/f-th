import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import CurrentStatementWidgetType from './types/CurrentStatementWidgetType';
import { useGetFinanceDashboardWidgetsQuery } from '../FinanceDashboardApi';

/**
 * The CurrentStatementWidget widget.
 */
function CurrentStatementWidget() {
	const { data: widgets, isLoading } = useGetFinanceDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.currentStatement as CurrentStatementWidgetType;

	if (!widget) {
		return null;
	}

	const { status, date, limit, spent, minimum } = widget;

	return (
		<Paper className="relative flex flex-col flex-auto rounded-xl shadow overflow-hidden">
			<div className="flex items-center justify-between px-8 pt-8">
				<div className="px-8 flex flex-col">
					<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
						Current Statement
					</Typography>
					{status === 'paid' && (
						<Typography className="text-green-600 font-medium text-sm">Paid on {date}</Typography>
					)}
					{status === 'pending' && (
						<Typography className="text-red-600 font-medium text-sm">Must be paid before {date}</Typography>
					)}
				</div>
				<div className="">
					<IconButton aria-label="more">
						<FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
					</IconButton>
				</div>
			</div>
			<div className="flex flex-row flex-wrap p-16 space-x-12">
				<div className="flex flex-col my-12">
					<Typography
						color="text.secondary"
						className="text-sm font-medium leading-none"
					>
						Card Limit
					</Typography>
					<Typography className="mt-8 font-medium text-3xl leading-none">
						{limit.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</Typography>
				</div>
				<div className="flex flex-col my-12">
					<Typography
						color="text.secondary"
						className="text-sm font-medium leading-none"
					>
						Spent
					</Typography>
					<Typography className="mt-8 font-medium text-3xl leading-none">
						{spent.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</Typography>
				</div>
				<div className="flex flex-col my-12">
					<Typography
						color="text.secondary"
						className="text-sm font-medium leading-none"
					>
						Minimum
					</Typography>
					<Typography className="mt-8 font-medium text-3xl leading-none">
						{minimum.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</Typography>
				</div>
			</div>

			<div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24">
				{status === 'paid' && (
					<FuseSvgIcon
						size={96}
						className="opacity-25 text-green-500 dark:text-green-400"
					>
						heroicons-outline:check-circle
					</FuseSvgIcon>
				)}

				{status === 'pending' && (
					<FuseSvgIcon
						size={96}
						className="opacity-25 text-red-500 dark:text-red-400"
					>
						heroicons-outline:exclamation-circle
					</FuseSvgIcon>
				)}
			</div>
		</Paper>
	);
}

export default memo(CurrentStatementWidget);
