import { motion } from 'framer-motion';
import { Checkbox, FormLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import { selectSelectedLabels, toggleSelectedLabels } from './calendarAppSlice';
import { useGetCalendarLabelsQuery } from './CalendarApi';
import LabelsDialog from './dialogs/labels/LabelsDialog';

/**
 * The calendar app sidebar.
 */
function CalendarAppSidebar() {
	const selectedLabels = useAppSelector(selectSelectedLabels);
	const dispatch = useAppDispatch();
	const { data: labels } = useGetCalendarLabelsQuery();

	return (
		<div className="flex flex-col flex-auto min-h-full py-24 px-16">
			<PageBreadcrumb className="mb-8" />

			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
				className="pb-24 text-4xl font-extrabold tracking-tight"
			>
				Calendar
			</motion.span>

			<div className="group flex items-center justify-between mb-12">
				<Typography
					className="text-lg font-600 leading-none"
					color="secondary.main"
				>
					LABELS
				</Typography>

				<LabelsDialog />
			</div>

			{labels?.map((label) => (
				<FormLabel
					htmlFor={label.id}
					key={label.id}
					className="group flex items-center mt-8 space-x-8 h-24 w-full cursor-pointer"
				>
					<Checkbox
						id={label.id}
						color="secondary"
						className="p-0"
						checked={selectedLabels.includes(label.id)}
						onChange={() => {
							dispatch(toggleSelectedLabels(label.id));
						}}
					/>

					<Box
						className="w-12 h-12 shrink-0 rounded-full"
						sx={{ backgroundColor: label.color }}
					/>

					<Typography className="flex flex-1 leading-none">{label.title}</Typography>
				</FormLabel>
			))}
		</div>
	);
}

export default CalendarAppSidebar;
