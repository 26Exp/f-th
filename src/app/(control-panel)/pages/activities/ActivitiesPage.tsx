'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import exampleActivitiesData from './exampleActivitiesData';
import ActivityTimelineItem from './ActivityTimelineItem';

/**
 * The activities page.
 */
function ActivitiesPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<FusePageSimple
			content={
				<div className="flex flex-col w-full p-24">
					<PageBreadcrumb className="mb-8" />
					<Typography className="text-4xl font-extrabold leading-none tracking-tight mb-4">
						All Activities
					</Typography>
					<Typography
						className="text-lg"
						color="text.secondary"
					>
						Application wide activities are listed here as individual items, starting with the most recent.
					</Typography>
					<Timeline
						className="py-48 px-0"
						position="right"
						sx={{
							'& .MuiTimelineItem-root:before': {
								display: 'none'
							}
						}}
					>
						{exampleActivitiesData.map((item, index) => (
							<ActivityTimelineItem
								last={exampleActivitiesData.length === index + 1}
								item={item}
								key={item.id}
							/>
						))}
					</Timeline>
				</div>
			}
			scroll={isMobile ? 'normal' : 'page'}
		/>
	);
}

export default ActivitiesPage;
