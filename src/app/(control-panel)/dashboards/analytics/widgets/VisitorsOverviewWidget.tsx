import { alpha, ThemeProvider, useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
// eslint-disable-next-line camelcase
import { private_safeDarken } from '@mui/system/colorManipulator';
import { useAppSelector } from 'src/store/hooks';
import _ from 'lodash';
import FuseTabs from 'src/components/tabs/FuseTabs';
import FuseTab from 'src/components/tabs/FuseTab';
import { useContrastMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import VisitorsOverviewWidgetType from './types/VisitorsOverviewWidgetType';
import { selectWidget } from '../AnalyticsDashboardApi';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * The visitors overview widget.
 */
function VisitorsOverviewWidget() {
	const theme = useTheme();
	const contrastTheme = useContrastMainTheme(theme.palette.primary.dark);
	const widget = useAppSelector(selectWidget<VisitorsOverviewWidgetType>('visitors'));

	if (!widget) {
		return null;
	}

	const { series, ranges } = widget;

	const [tabValue, setTabValue] = useState(0);
	const currentRange = Object.keys(ranges)[tabValue];

	const chartOptions: ApexOptions = {
		chart: {
			animations: {
				speed: 400,
				animateGradually: {
					enabled: false
				}
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			width: '100%',
			height: '100%',
			type: 'area',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		colors: [contrastTheme.palette.secondary.light],
		dataLabels: {
			enabled: false
		},
		fill: {
			colors: [contrastTheme.palette.secondary.dark]
		},
		grid: {
			show: true,
			borderColor: alpha(contrastTheme.palette.primary.contrastText, 0.1),
			padding: {
				top: 10,
				bottom: -40,
				left: 0,
				right: 0
			},
			position: 'back',
			xaxis: {
				lines: {
					show: true
				}
			}
		},
		stroke: {
			width: 2
		},
		tooltip: {
			followCursor: true,
			theme: 'dark',
			x: {
				format: 'MMM dd, yyyy'
			},
			y: {
				formatter: (value) => `${value}`
			}
		},
		xaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			crosshairs: {
				stroke: {
					color: contrastTheme.palette.secondary.main,
					dashArray: 0,
					width: 2
				}
			},
			labels: {
				offsetY: -20,
				style: {
					colors: contrastTheme.palette.primary.contrastText
				}
			},
			tickAmount: 20,
			tooltip: {
				enabled: false
			},
			type: 'datetime'
		},
		yaxis: {
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			},
			min: (min) => min - 750,
			max: (max) => max + 250,
			tickAmount: 5,
			show: false
		}
	};

	return (
		<ThemeProvider theme={contrastTheme}>
			<Box
				className="sm:col-span-2 lg:col-span-3 dark flex flex-col flex-auto shadow rounded-xl overflow-hidden"
				sx={{
					background: private_safeDarken(contrastTheme.palette.primary.main, 0.1),
					color: contrastTheme.palette.primary.contrastText
				}}
			>
				<div className="flex justify-between mt-12 mx-12 md:mt-24 md:mx-24">
					<div className="flex flex-col">
						<Typography
							sx={{
								color: contrastTheme.palette.primary.contrastText
							}}
							className="mr-16 text-2xl md:text-3xl font-semibold tracking-tight leading-7"
						>
							Visitors Overview
						</Typography>
						<Typography
							className="font-medium"
							sx={{
								color: alpha(contrastTheme.palette.primary.contrastText, 0.7)
							}}
						>
							Number of unique visitors
						</Typography>
					</div>
					<div className="">
						<FuseTabs
							value={tabValue}
							onChange={(_ev, value: number) => setTabValue(value)}
						>
							{Object.entries(ranges).map(([key, label]) => (
								<FuseTab
									key={key}
									label={label}
								/>
							))}
						</FuseTabs>
					</div>
				</div>

				<div className="flex flex-col flex-auto h-320">
					<ReactApexChart
						options={chartOptions}
						series={_.cloneDeep(series[currentRange])}
						type={chartOptions?.chart?.type}
						height={chartOptions?.chart?.height}
					/>
				</div>
			</Box>
		</ThemeProvider>
	);
}

export default VisitorsOverviewWidget;
