import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useAppDispatch } from 'src/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FullCalendar from '@fullcalendar/react';
import { DatesSetArg } from '@fullcalendar/core';
import { MutableRefObject } from 'react';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { openNewEventDialog } from './calendarAppSlice';
import CalendarViewMenu from './CalendarViewMenu';

type CalendarHeaderProps = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentDate: DatesSetArg;
	onToggleLeftSidebar: () => void;
};

/**
 * The calendar header.
 */
function CalendarHeader(props: CalendarHeaderProps) {
	const { calendarRef, currentDate, onToggleLeftSidebar } = props;

	const mainTheme = useMainTheme();
	const calendarApi = () => calendarRef.current.getApi();
	const dispatch = useAppDispatch();

	function handleViewChange(viewType: string) {
		calendarApi().changeView(viewType);
	}

	return (
		<div className="flex w-full p-12 justify-between z-10 container">
			<div className="flex items-center justify-between space-x-8">
				<div className="flex items-center space-x-8">
					<IconButton
						onClick={() => onToggleLeftSidebar()}
						aria-label="open left sidebar"
						className="border border-divider"
						size="small"
					>
						<FuseSvgIcon size={16}>heroicons-outline:bars-3</FuseSvgIcon>
					</IconButton>

					<Typography className="hidden sm:flex text-2xl font-semibold tracking-tight whitespace-nowrap">
						{currentDate?.view.title}
					</Typography>
				</div>

				<div className="flex items-center space-x-8">
					<Tooltip title="Previous">
						<IconButton
							aria-label="Previous"
							onClick={() => calendarApi().prev()}
							className="border border-divider"
							size="small"
						>
							<FuseSvgIcon size={16}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-left'
									: 'heroicons-solid:chevron-right'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>
					<Tooltip title="Next">
						<IconButton
							aria-label="Next"
							onClick={() => calendarApi().next()}
							className="border border-divider"
							size="small"
						>
							<FuseSvgIcon size={16}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-right'
									: 'heroicons-solid:chevron-left'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>

					<Tooltip title="Today">
						<div>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, transition: { delay: 0.3 } }}
							>
								<IconButton
									aria-label="today"
									onClick={() => calendarApi().today()}
									className="border border-divider"
									size="small"
								>
									<FuseSvgIcon size={16}>heroicons-outline:calendar</FuseSvgIcon>
								</IconButton>
							</motion.div>
						</div>
					</Tooltip>
				</div>
			</div>

			<motion.div
				className="flex items-center justify-end md:justify-center space-x-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.3 } }}
			>
				<IconButton
					className="border border-divider"
					size="small"
					aria-label="add"
					onClick={(ev) =>
						dispatch(
							openNewEventDialog({
								jsEvent: ev.nativeEvent,
								start: new Date(),
								end: new Date()
							})
						)
					}
				>
					<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
				</IconButton>

				<CalendarViewMenu
					currentDate={currentDate}
					onChange={handleViewChange}
				/>
			</motion.div>
		</div>
	);
}

export default CalendarHeader;
