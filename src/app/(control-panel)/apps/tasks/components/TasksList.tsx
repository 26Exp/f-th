import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from '@hello-pangea/dnd';
import FuseLoading from '@fuse/core/FuseLoading';
import { useMemo } from 'react';
import _ from 'lodash';
import TaskListItem from './TaskListItem';
import SectionListItem from './SectionListItem';
import { Task, useGetTasksQuery } from '../TasksApi';
import useReorderTasks from '../hooks/useReorderTasks';

/**
 * The tasks list.
 */
function TasksList() {
	const { data: tasks, isLoading } = useGetTasksQuery();
	const reorderList = useReorderTasks();
	const orderedTasks = useMemo(() => {
		return _.merge([], tasks).sort((a: Task, b: Task) => a.order - b.order) as Task[];
	}, [tasks]);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (tasks.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no tasks!
				</Typography>
			</div>
		);
	}

	function onDragEnd(result: DropResult) {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		const { index: destinationIndex } = destination;
		const { index: sourceIndex } = source;

		if (destinationIndex === sourceIndex) {
			return;
		}

		reorderList({
			startIndex: sourceIndex,
			endIndex: destinationIndex
		});
	}

	return (
		<List className="w-full m-0 p-0  border-x-1">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId="list"
					type="list"
					direction="vertical"
				>
					{(provided: DroppableProvided) => (
						<>
							<div ref={provided.innerRef}>
								{orderedTasks?.map((item) => {
									if (item.type === 'task') {
										return (
											<TaskListItem
												key={item.id}
												data={item}
											/>
										);
									}

									if (item.type === 'section') {
										return (
											<SectionListItem
												key={item.id}
												data={item}
											/>
										);
									}

									return null;
								})}
							</div>
							{provided.placeholder}
						</>
					)}
				</Droppable>
			</DragDropContext>
		</List>
	);
}

export default TasksList;
