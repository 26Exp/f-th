import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseTab from 'src/components/tabs/FuseTab';
import FuseTabs from 'src/components/tabs/FuseTabs';
import { useGetProjectDashboardWidgetsQuery } from '../../../ProjectDashboardApi';
import TaskDistributionDataType from './types/TaskDistributionDataType';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * The TaskDistributionWidget widget.
 */
function TaskDistributionWidget() {
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	const widget = widgets?.taskDistribution as TaskDistributionDataType;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!widget) {
		return null;
	}

	const { overview, series, labels, ranges } = widget;
	const [tabValue, setTabValue] = useState(0);
	const currentRange = Object.keys(ranges)[tabValue];
	const [awaitRender, setAwaitRender] = useState(true);

	const theme = useTheme();

	const chartOptions: ApexOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'polarArea',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		labels,
		legend: {
			position: 'bottom'
		},
		plotOptions: {
			polarArea: {
				spokes: {
					connectorColors: theme.palette.divider
				},
				rings: {
					strokeColor: theme.palette.divider
				}
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.75
				}
			}
		},
		stroke: {
			width: 2
		},
		theme: {
			monochrome: {
				enabled: true,
				color: theme.palette.secondary.main,
				shadeIntensity: 0.75,
				shadeTo: 'dark'
			}
		},
		tooltip: {
			followCursor: true,
			theme: 'dark'
		},
		yaxis: {
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			}
		}
	};

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (awaitRender) {
		return null;
	}

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-xl overflow-hidden h-full">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
					Task Distribution
				</Typography>
				<div className="mt-3 sm:mt-0">
					<FuseTabs
						value={tabValue}
						onChange={(ev, value: number) => setTabValue(value)}
					>
						{Object.entries(ranges).map(([key, label], index) => (
							<FuseTab
								key={key}
								value={index}
								label={label}
							/>
						))}
					</FuseTabs>
				</div>
			</div>
			<div className="flex flex-col flex-auto mt-6">
				<ReactApexChart
					className="flex-auto w-full"
					options={chartOptions}
					series={series[currentRange]}
					type={chartOptions?.chart?.type}
				/>
			</div>
			<Box
				sx={[
					(_theme) =>
						_theme.palette.mode === 'light'
							? {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								}
							: {
									backgroundColor: lighten(theme.palette.background.default, 0.02)
								}
				]}
				className="grid grid-cols-2 border-t divide-x -m-24 mt-16"
			>
				<div className="flex flex-col items-center justify-center p-24 sm:p-32">
					<div className="text-5xl font-semibold leading-none tracking-tighter">
						{overview[currentRange].new}
					</div>
					<Typography className="mt-4 text-center text-secondary">New tasks</Typography>
				</div>
				<div className="flex flex-col items-center justify-center p-6 sm:p-8">
					<div className="text-5xl font-semibold leading-none tracking-tighter">
						{overview[currentRange].completed}
					</div>
					<Typography className="mt-4 text-center text-secondary">Completed tasks</Typography>
				</div>
			</Box>
		</Paper>
	);
}

export default memo(TaskDistributionWidget);
