import Divider from '@mui/material/Divider';
import { Draggable } from '@hello-pangea/dnd';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';
import clsx from 'clsx';
import useNavigate from '@fuse/hooks/useNavigate';
import { Task } from '../TasksApi';

type SectionListItemProps = {
	data: Task;
};

/**
 * The section list item.
 */
function SectionListItem(props: SectionListItemProps) {
	const { data } = props;
	const navigate = useNavigate();

	return (
		<Draggable
			draggableId={data.id}
			index={data.order}
		>
			{(provided) => (
				<>
					<ListItemButton
						className="px-40 py-12 group"
						sx={{ bgcolor: 'background.default' }}
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
						<ListItemText
							classes={{
								root: 'm-0',
								primary: clsx('font-semibold text-15 truncate', data.completed && 'line-through')
							}}
							primary={data.title}
						/>
					</ListItemButton>
					<Divider />
				</>
			)}
		</Draggable>
	);
}

export default SectionListItem;
