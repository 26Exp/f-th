import _ from 'lodash';
import { useCallback } from 'react';
import { Task, useGetTasksQuery, useUpdateTasksItemsMutation } from '../TasksApi';

function useReorderTasks() {
	const { data: tasks } = useGetTasksQuery();
	const [updateTasksItems] = useUpdateTasksItemsMutation();

	const reorderTasks = useCallback(
		({ startIndex, endIndex }: { startIndex: number; endIndex: number }) => {
			const ordered = _.merge([], tasks).sort((a: Task, b: Task) => a.order - b.order) as Task[];

			const [removed] = ordered.splice(startIndex, 1);

			ordered.splice(endIndex, 0, removed);

			updateTasksItems(ordered.map((task, index) => ({ id: task.id, order: index })));
		},
		[tasks]
	);

	return reorderTasks;
}

export default useReorderTasks;
