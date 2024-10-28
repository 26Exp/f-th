'use client';

import { useParams } from 'next/navigation';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import DemoContent from '@fuse/core/DemoContent';
import { useGetHelpCenterGuideByIdQuery } from '../../../HelpCenterApi';

/**
 * The help center guide.
 */
function HelpCenterGuide() {
	const routeParams = useParams<{ guideId: string }>();
	const { guideId } = routeParams;

	const { data: guide } = useGetHelpCenterGuideByIdQuery(guideId);

	if (!guide) {
		return null;
	}

	return (
		<div className="flex flex-col items-center p-24 sm:p-40 container">
			<div className="flex flex-col w-full max-w-4xl">
				<div className="sm:mt-32">
					<PageBreadcrumb />
				</div>

				<Typography className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
					{guide.title}
				</Typography>

				<Typography
					className="mt-8 sm:text-2xl tracking-tight"
					color="text.secondary"
				>
					{guide.subtitle}
				</Typography>

				<div
					className="mt-32 sm:mt-48 max-w-none prose dark:prose-invert"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: guide.content }}
				/>

				<DemoContent />

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-40 pt-32 border-t">
					<Typography
						className="text-sm font-medium"
						color="text.secondary"
					>
						Last updated 2 months ago
					</Typography>
					<div className="flex items-center mt-8 sm:mt-0">
						<Typography
							className="font-medium mx-8"
							color="text.secondary"
						>
							Was this page helpful?
						</Typography>
						<IconButton>
							<FuseSvgIcon>heroicons-outline:thumb-up</FuseSvgIcon>
						</IconButton>
						<IconButton>
							<FuseSvgIcon>heroicons-outline:thumb-down</FuseSvgIcon>
						</IconButton>
					</div>
				</div>

				<Card className="mt-32 flex items-center justify-between p-24 sm:px-40 rounded-xl shadow hover:shadow-lg transition-shadow ease-in-out duration-150">
					<div>
						<Typography color="text.secondary">Next</Typography>
						<Typography className="text-lg font-semibold">Removing a media from a project</Typography>
					</div>
					<FuseSvgIcon className="ml-12">heroicons-outline:arrow-right</FuseSvgIcon>
				</Card>
			</div>
		</div>
	);
}

export default HelpCenterGuide;
