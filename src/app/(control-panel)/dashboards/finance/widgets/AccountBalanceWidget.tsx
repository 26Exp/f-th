import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from 'lodash';
import AccountBalanceWidgetType from './types/AccountBalanceWidgetType';
import { useGetFinanceDashboardWidgetsQuery } from '../FinanceDashboardApi';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * The AccountBalanceWidget widget.
 */
function AccountBalanceWidget() {
	const theme = useTheme();

	const { data: widgets, isLoading } = useGetFinanceDashboardWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets?.accountBalance as AccountBalanceWidgetType;

	if (!widget) {
		return null;
	}

	const { series, growRate, ami } = widget;

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
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.secondary.light, theme.palette.secondary.light],
		fill: {
			colors: [theme.palette.secondary.dark, theme.palette.secondary.light],
			opacity: 0.5
		},
		series,
		stroke: {
			curve: 'straight',
			width: 2
		},
		tooltip: {
			followCursor: true,
			theme: 'dark',
			x: {
				format: 'MMM dd, yyyy'
			},
			y: {
				formatter: (value) => `${value}%`
			}
		},
		xaxis: {
			type: 'datetime'
		}
	};

	return (
		<Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
			<div className="flex flex-col p-24 pb-16">
				<div className="flex items-start justify-between">
					<div className="flex flex-col">
						<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
							Account Balance
						</Typography>
						<Typography
							className="font-medium"
							color="text.secondary"
						>
							Monthly balance growth and avg. monthly income
						</Typography>
					</div>

					<div>
						<Chip
							size="small"
							className="font-medium text-sm"
							label="12 months"
						/>
					</div>
				</div>
				<div className="flex items-start mt-24 mr-8">
					<div className="flex flex-col">
						<Typography className="font-semibold text-3xl md:text-5xl tracking-tighter">
							{growRate}%
						</Typography>
						<Typography
							className="font-medium text-sm leading-none"
							color="text.secondary"
						>
							Average Monthly Growth
						</Typography>
					</div>
					<div className="flex flex-col ml-32 md:ml-64">
						<Typography className="font-semibold text-3xl md:text-5xl tracking-tighter">
							{ami.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
						</Typography>
						<Typography
							className="font-medium text-sm leading-none"
							color="text.secondary"
						>
							Average Monthly Income
						</Typography>
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-auto">
				<ReactApexChart
					className="flex-auto w-full h-full"
					options={chartOptions}
					series={_.cloneDeep(series)}
					type={chartOptions?.chart?.type}
					height={chartOptions?.chart?.height}
				/>
			</div>
		</Paper>
	);
}

export default AccountBalanceWidget;
