import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetProjectDashboardWidgetsQuery } from '../../../ProjectDashboardApi';
import WidgetDataType, { RangeType } from './types/WidgetDataType';

/**
 * The SummaryWidget widget.
 */
function SummaryWidget() {
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	const widget = widgets?.summary as WidgetDataType;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	const { data, ranges, currentRange: currentRangeDefault } = widget;

	const [currentRange, setCurrentRange] = useState<RangeType>(currentRangeDefault as RangeType);

	function handleChangeRange(event: SelectChangeEvent<string>) {
		setCurrentRange(event.target.value as RangeType);
	}

	return (
		<Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
			<div className="flex items-center justify-between px-8 pt-8">
				<Select
					className=""
					classes={{ select: 'py-0 flex items-center' }}
					value={currentRange}
					onChange={handleChangeRange}
					inputProps={{
						name: 'currentRange'
					}}
					variant="filled"
				>
					{Object.entries(ranges).map(([key, n]) => {
						return (
							<MenuItem
								key={key}
								value={key}
							>
								{n}
							</MenuItem>
						);
					})}
				</Select>
				<IconButton aria-label="more">
					<FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
				</IconButton>
			</div>
			<div className="text-center mt-16">
				<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
					{data.count[currentRange]}
				</Typography>
				<Typography className="text-lg font-medium text-blue-600 dark:text-blue-500">{data.name}</Typography>
			</div>
			<Typography
				className="flex items-baseline justify-center w-full mt-20 mb-24 space-x-8"
				color="text.secondary"
			>
				<span className="truncate">{data.extra.name}:</span>
				<b>{data.extra.count[currentRange]}</b>
			</Typography>
		</Paper>
	);
}

export default memo(SummaryWidget);
