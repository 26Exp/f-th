import { apiService as api } from 'src/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';

export const addTagTypes = ['tasks_list', 'tasks_item', 'tasks_tags'] as const;

const TasksApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTasks: build.query<GetTasksApiResponse, GetTasksApiArg>({
				query: () => ({ url: `/api/mock/tasks/items` }),
				providesTags: ['tasks_list']
			}),
			reorderTasks: build.mutation<ReorderTasksApiResponse, ReorderTasksApiArg>({
				query: ({ startIndex, endIndex }) => {
					return {
						url: `/api/mock/tasks/reorder`,
						method: 'POST',
						body: { startIndex, endIndex }
					};
				},
				invalidatesTags: ['tasks_list'],
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(
							showMessage({
								message: 'List Order Saved',
								autoHideDuration: 2000,
								anchorOrigin: {
									vertical: 'top',
									horizontal: 'right'
								}
							})
						);
					} catch (err) {
						dispatch(showMessage({ message: 'Error saving list order' }));
					}
				}
			}),
			createTasksItem: build.mutation<CreateTasksItemApiResponse, CreateTasksItemApiArg>({
				query: (task) => ({
					url: `/api/mock/tasks/items`,
					method: 'POST',
					body: task
				}),
				invalidatesTags: ['tasks_list']
			}),
			getTasksItem: build.query<GetTasksItemApiResponse, GetTasksItemApiArg>({
				query: (taskId) => ({ url: `/api/mock/tasks/items/${taskId}` }),
				providesTags: ['tasks_item']
			}),
			deleteTasksItem: build.mutation<DeleteTasksItemApiResponse, DeleteTasksItemApiArg>({
				query: (taskId) => ({
					url: `/api/mock/tasks/items/${taskId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['tasks_list']
			}),
			updateTasksItems: build.mutation<UpdateTasksItemsApiResponse, UpdateTasksItemsApiArg>({
				query: (tasks) => ({
					url: `/api/mock/tasks/items`,
					method: 'PUT',
					body: tasks
				}),
				invalidatesTags: ['tasks_item', 'tasks_list'],
				async onQueryStarted(updatedTasks, { dispatch, queryFulfilled }) {
					const patchResult = dispatch(
						TasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
							// Update the draft state with the optimistic update
							updatedTasks.forEach((updatedTask) => {
								const index = draft.findIndex((task) => task.id === updatedTask.id);

								if (index !== -1) {
									draft[index] = { ...draft[index], ...updatedTask };
								}
							});
						})
					);
					try {
						await queryFulfilled;
					} catch {
						patchResult.undo(); // Rollback if the mutation fails
					}
				}
			}),
			updateTasksItem: build.mutation<UpdateTasksItemApiResponse, UpdateTasksItemApiArg>({
				query: (task) => ({
					url: `/api/mock/tasks/items/${task.id}`,
					method: 'PUT',
					body: task
				}),
				invalidatesTags: ['tasks_item', 'tasks_list']
			}),
			getTasksTags: build.query<GetTasksTagsApiResponse, GetTasksTagsApiArg>({
				query: () => ({ url: `/api/mock/tasks/tags` }),
				providesTags: ['tasks_tags']
			}),
			createTasksTag: build.mutation<CreateTasksTagApiResponse, CreateTasksTagApiArg>({
				query: (tag) => ({
					url: `/api/mock/tasks/tags`,
					method: 'POST',
					body: tag
				}),
				invalidatesTags: ['tasks_tags']
			})
		}),
		overrideExisting: false
	});
export { TasksApi };

export type GetTasksApiResponse = /** status 200 OK */ Task[];
export type GetTasksApiArg = void;

export type ReorderTasksApiResponse = /** status 200 OK */ Task[];
export type ReorderTasksApiArg = { startIndex: number; endIndex: number };

export type CreateTasksItemApiResponse = /** status 201 Created */ Task;
export type CreateTasksItemApiArg = Task;

export type GetTasksItemApiResponse = /** status 200 OK */ Task;
export type GetTasksItemApiArg = string;

export type DeleteTasksItemApiResponse = unknown;
export type DeleteTasksItemApiArg = string;

export type UpdateTasksItemsApiResponse = /** status 200 OK */ Task[];
export type UpdateTasksItemsApiArg = Partial<Task>[];

export type UpdateTasksItemApiResponse = /** status 200 OK */ Task;
export type UpdateTasksItemApiArg = Task;

export type GetTasksTagsApiResponse = /** status 200 OK */ Tag[];
export type GetTasksTagsApiArg = void;

export type CreateTasksTagApiResponse = /** status 200 OK */ Tag;
export type CreateTasksTagApiArg = Tag;

export type Task = {
	id: string;
	type: string;
	title: string;
	notes: string;
	completed: boolean;
	dueDate?: string | null;
	priority: number;
	tags: string[];
	assignedTo?: null | string;
	subTasks: {
		id: string;
		title: string;
		completed: boolean;
	}[];
	order: number;
};

export type Tag = {
	id: string;
	title: string;
};

export const {
	useGetTasksQuery,
	useCreateTasksItemMutation,
	useGetTasksItemQuery,
	useDeleteTasksItemMutation,
	useUpdateTasksItemMutation,
	useUpdateTasksItemsMutation,
	useGetTasksTagsQuery,
	useCreateTasksTagMutation,
	useReorderTasksMutation
} = TasksApi;

export type TasksApiType = {
	[TasksApi.reducerPath]: ReturnType<typeof TasksApi.reducer>;
};
