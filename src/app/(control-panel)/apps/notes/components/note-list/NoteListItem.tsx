import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NoteLabel from '../NoteLabel';
import NoteReminderLabel from '../NoteReminderLabel';
import setDescriptionStyle from '../../utils/setDescriptionStyle';
import { openNoteDialog, selectVariateDescSize } from '../../notesAppSlice';
import { NotesNote } from '../../NotesApi';

type NoteListItemProps = {
	note: NotesNote;
	className?: string;
};

/**
 * The note list item.
 */
function NoteListItem(props: NoteListItemProps) {
	const { note, className } = props;

	const variateDescSize = useAppSelector(selectVariateDescSize);

	const dispatch = useAppDispatch();

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
		>
			<Card
				className={clsx('cursor-pointer', className)}
				onClick={() => dispatch(openNoteDialog(note.id))}
			>
				{note.image && note.image !== '' && (
					<img
						src={note.image}
						className="w-full block"
						alt="note"
					/>
				)}

				{note.title && note.title !== '' && (
					<Typography className="px-16 my-12 text-base font-semibold">{note.title}</Typography>
				)}

				{note.content && note.content !== '' && (
					<Typography
						className="px-16 my-12 "
						component="div"
					>
						<div
							className={clsx('w-full break-words', variateDescSize ? 'font-500' : 'text-base')}
							ref={(el) => {
								setTimeout(() => setDescriptionStyle(note.content, el, Boolean(variateDescSize)));
							}}
						>
							{note.content}
						</div>
					</Typography>
				)}

				{note.tasks && note.tasks.length > 0 && (
					<ul className="px-16 my-12 flex flex-wrap">
						{note.tasks.map((item) => (
							<li
								key={item.id}
								className="flex items-center w-full"
							>
								<FuseSvgIcon
									color={item.completed ? 'secondary' : 'disabled'}
									size={16}
								>
									heroicons-solid:check-circle
								</FuseSvgIcon>
								<Typography
									className={clsx('truncate text-md mx-8', item.completed && 'line-through')}
									color={item.completed ? 'text.secondary' : 'inherit'}
								>
									{item.content}
								</Typography>
							</li>
						))}
					</ul>
				)}

				{(note.labels.length > 0 || note.reminder) && (
					<div className="px-16 my-12 flex flex-wrap w-full -mx-2">
						{note.reminder && (
							<NoteReminderLabel
								className="mt-4 mx-2 max-w-full"
								date={note.reminder}
							/>
						)}
						{note.labels.map((id) => (
							<NoteLabel
								id={id}
								key={id}
								className="mt-4 mx-2 max-w-full"
								linkable
							/>
						))}
					</div>
				)}
			</Card>
		</motion.div>
	);
}

export default NoteListItem;
