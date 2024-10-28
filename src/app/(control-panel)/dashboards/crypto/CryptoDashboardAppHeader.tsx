import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import Divider from '@mui/material/Divider';
import { MouseEvent } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import ValueSectionSmall from './widgets/ValueSectionSmall';
import BTCWidgetType from './types/BTCWidgetType';
import { useGetCryptoDashboardWidgetsQuery } from './CryptoDashboardApi';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';

type CryptoDashboardAppHeaderProps = {
	onToggleLeftSidebar: (ev: MouseEvent) => void;
};

/**
 * The crypto dashboard app header.
 */
function CryptoDashboardAppHeader(props: CryptoDashboardAppHeaderProps) {
	const { onToggleLeftSidebar } = props;
	const { data: widgets, isLoading } = useGetCryptoDashboardWidgetsQuery();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	if (isLoading) {
		return <FuseLoading />;
	}

	const btc = widgets?.btc as BTCWidgetType;

	if (!btc) {
		return null;
	}

	return (
		<div className="flex flex-wrap w-full items-center px-8 py-16 md:px-16">
			<div className="w-full flex items-center space-x-8 mb-4">
				{isMobile && (
					<IconButton
						onClick={(ev) => onToggleLeftSidebar(ev)}
						aria-label="open left sidebar"
						className="border border-divider"
						size="small"
					>
						<FuseSvgIcon>heroicons-outline:bars-3</FuseSvgIcon>
					</IconButton>
				)}

				<PageBreadcrumb />
			</div>

			<div className="flex flex-col flex-auto mb-12">
				<div className="flex items-center space-x-8">
					<Typography
						className="font-medium text-2xl"
						color="text.secondary"
					>
						Bitcoin
					</Typography>
					<Typography
						className="font-medium text-lg tracking-wider"
						color="text.secondary"
					>
						(BTC)
					</Typography>
				</div>
				<div className="flex items-end mt-4 space-x-6">
					<Typography className="font-mono text-3xl leading-none tracking-tight">
						{btc.amount.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</Typography>
					<div className="flex items-end">
						<FuseSvgIcon
							size={20}
							className={clsx(
								'text-green-500 mx-2 mb-px',
								btc.trend.dir === 'up' && 'text-green-500',
								btc.trend.dir === 'down' && 'text-red-500'
							)}
						>
							{btc.trend.dir === 'up'
								? 'heroicons-solid:arrow-small-up'
								: 'heroicons-solid:arrow-small-down'}
						</FuseSvgIcon>

						<Typography
							className={clsx(
								'font-mono font-medium text-lg leading-none mb-px',
								btc.trend.dir === 'up' && 'text-green-500',
								btc.trend.dir === 'down' && 'text-red-500'
							)}
						>
							{btc.trend.amount.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
							%
						</Typography>
					</div>
				</div>
			</div>

			<div className="hidden sm:flex items-center mx-8 rounded-lg border">
				<ValueSectionSmall
					title="Market Cap"
					unit="B"
					value={btc.marketCap}
				/>
				<Divider
					orientation="vertical"
					flexItem
				/>
				<ValueSectionSmall
					title="Volume"
					unit="B"
					value={btc.volume}
				/>
				<Divider
					orientation="vertical"
					flexItem
				/>
				<ValueSectionSmall
					title="Supply"
					unit="M"
					value={btc.supply}
				/>
				<Divider
					orientation="vertical"
					flexItem
				/>
				<ValueSectionSmall
					title="All Time High"
					value={btc.allTimeHigh}
				/>
			</div>
		</div>
	);
}

export default CryptoDashboardAppHeader;
