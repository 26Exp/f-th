import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, ListItemButton, ListItemText } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format } from 'date-fns/format';
import Typography from '@mui/material/Typography';
import { Draggable } from '@hello-pangea/dnd';
import clsx from 'clsx';

import useNavigate from '@fuse/hooks/useNavigate';
import { Task, useUpdateTasksItemMutation } from '../TasksApi';

type TaskListItemProps = {
	data: Task;
};

/**
 * The task list item.
 */
function TaskListItem(props: TaskListItemProps) {
	const { data } = props;
	const [updateTask] = useUpdateTasksItemMutation();
	const navigate = useNavigate();

	return (
		<Draggable
			draggableId={data.id}
			index={data.order}
		>
			{(provided, snapshot) => (
				<>
					<ListItemButton
						className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-12 group')}
						sx={{ bgcolor: 'background.paper' }}
						ref={provided.innerRef}
						{...provided.draggableProps}
						onClick={() => {
							navigate(`/apps/tasks/${data.id}`);
						}}
					>
						<div
							className="md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
							{...provided.dragHandleProps}
						>
							<FuseSvgIcon
								sx={{ color: 'text.disabled' }}
								size={20}
							>
								heroicons-solid:bars-3
							</FuseSvgIcon>
						</div>
						<ListItemIcon className="min-w-36 -ml-10 mr-8">
							<IconButton
								sx={{ color: data.completed ? 'secondary.main' : 'text.disabled' }}
								onClick={(ev) => {
									ev.preventDefault();
									ev.stopPropagation();
									updateTask({ ...data, completed: !data.completed });
								}}
							>
								<FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon>
							</IconButton>
						</ListItemIcon>
						<ListItemText
							classes={{ root: 'm-0', primary: clsx('truncate', data.completed && 'line-through') }}
							primary={data.title}
						/>
						<div className="flex items-center">
							<div>
								{data.priority === 0 && (
									<FuseSvgIcon className="text-green icon-size-16 mx-12">
										heroicons-outline:arrow-small-down
									</FuseSvgIcon>
								)}
								{data.priority === 2 && (
									<FuseSvgIcon className="text-red icon-size-16 mx-12">
										heroicons-outline:arrow-small-up
									</FuseSvgIcon>
								)}
							</div>

							{data.dueDate && (
								<Typography
									className="text-md whitespace-nowrap"
									color="text.secondary"
								>
									{format(new Date(data.dueDate), 'LLL dd')}
								</Typography>
							)}
						</div>
					</ListItemButton>
					<Divider />
				</>
			)}
		</Draggable>
	);
}

export default TaskListItem;
