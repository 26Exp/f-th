import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns/format';
import Link from '@fuse/core/Link';
import { lighten } from '@mui/material/styles';
import ActivityItemType from './ActivityItemType';

type ActivityTimelineItemProps = {
	last: boolean;
	item: ActivityItemType;
};

/**
 * The ActivityTimelineItem component.
 */
function ActivityTimelineItem(props: ActivityTimelineItemProps) {
	const { item, last } = props;

	return (
		<TimelineItem>
			<TimelineSeparator>
				<TimelineDot
					color="primary"
					className="mt-0 flex h-36  w-36 items-center justify-center p-0"
				>
					{item.image && <Avatar src={item.image} />}
					{!item.image && (
						<FuseSvgIcon size={20}>{item.icon ? item.icon : 'heroicons-solid:star'}</FuseSvgIcon>
					)}
				</TimelineDot>

				{!last && <TimelineConnector />}
			</TimelineSeparator>
			<TimelineContent className="flex flex-col items-start pb-48 pt-0">
				{/* eslint-disable-next-line react/no-danger */}
				{item.description && <div dangerouslySetInnerHTML={{ __html: item.description }} />}

				<div className="mt-8 flex flex-col text-md leading-5 sm:mt-4 sm:flex-row sm:items-center sm:space-x-8">
					<Typography
						className="text-md"
						color="text.secondary"
					>
						{format(new Date(item.date), 'MMM dd, h:mm a')}
					</Typography>
					{item.linkedContent && <div className="hidden sm:block">&bull;</div>}

					{item.useRouter && (
						<Link
							className="cursor-pointer"
							to={item.link}
						>
							{item.linkedContent}
						</Link>
					)}

					{!item.useRouter && (
						<a
							className="cursor-pointer"
							href={item.link}
							target="_blank"
							rel="noreferrer"
						>
							{item.linkedContent}
						</a>
					)}
				</div>

				{item.extraContent && (
					<Box
						className="mt-16 rounded-lg border px-20 py-16"
						sx={(theme) => ({
							backgroundColor: lighten(theme.palette.background.default, 0.02),
							...theme.applyStyles('light', {
								backgroundColor: lighten(theme.palette.background.default, 0.4)
							})
						})}
					>
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={{ __html: item.extraContent }} />
					</Box>
				)}
			</TimelineContent>
		</TimelineItem>
	);
}

export default ActivityTimelineItem;
