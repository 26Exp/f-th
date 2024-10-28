import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import WidgetDataType from './types/WidgetDataType';
import { useGetProjectDashboardWidgetsQuery } from '../../../ProjectDashboardApi';

/**
 * The FeaturesWidget widget.
 */
function FeaturesWidget() {
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.features as WidgetDataType;

	if (!widget) {
		return null;
	}

	const { data, title } = widget;

	return (
		<Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
			<div className="flex items-center justify-between px-8 pt-8">
				<Typography
					className="px-12 text-lg font-medium tracking-tight leading-6 truncate"
					color="text.secondary"
				>
					{title}
				</Typography>
				<IconButton aria-label="more">
					<FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
				</IconButton>
			</div>
			<div className="text-center mt-16">
				<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500">
					{String(data.count)}
				</Typography>
				<Typography className="text-lg font-medium text-green-600">{data.name}</Typography>
			</div>
			<Typography
				className="flex items-baseline justify-center w-full mt-20 mb-24 space-x-8"
				color="text.secondary"
			>
				<span className="truncate">{data.extra.name}:</span>
				<b>{String(data.extra.count)}</b>
			</Typography>
		</Paper>
	);
}

export default memo(FeaturesWidget);
