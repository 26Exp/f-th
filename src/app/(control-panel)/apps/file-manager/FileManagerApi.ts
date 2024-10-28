import { apiService as api } from 'src/store/apiService';

export const addTagTypes = ['file_manager_folder'] as const;

const FileManagerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFileManagerAllFolderItems: build.query<
				GetFileManagerAllFolderItemsApiResponse,
				GetFileManagerAllFolderItemsApiArg
			>({
				query: () => ({
					url: `/api/mock/file-manager/items`,
					params: { type: 'folder' }
				}),
				providesTags: ['file_manager_folder']
			}),
			getFileManagerFolder: build.query<GetFileManagerFolderApiResponse, GetFileManagerFolderApiArg>({
				query: (folderId) => ({
					url: `/api/mock/file-manager/items`,
					params: { folderId }
				}),
				providesTags: ['file_manager_folder']
			}),
			updateFileManagerFolder: build.mutation<UpdateFileManagerFolderApiResponse, UpdateFileManagerFolderApiArg>({
				query: (queryArg) => ({
					url: `/api/mock/file-manager/items/${queryArg.folderId}`,
					method: 'PUT',
					body: queryArg.fileManagerItem
				}),
				invalidatesTags: ['file_manager_folder']
			}),
			deleteFileManagerFolder: build.mutation<DeleteFileManagerFolderApiResponse, DeleteFileManagerFolderApiArg>({
				query: (folderId) => ({
					url: `/api/mock/file-manager/items/${folderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['file_manager_folder']
			})
		}),
		overrideExisting: false
	});
export default FileManagerApi;

export type GetFileManagerAllFolderItemsApiResponse = FileManagerItem[];
export type GetFileManagerAllFolderItemsApiArg = null;

export type GetFileManagerFolderApiResponse = FileManagerItem[];
export type GetFileManagerFolderApiArg = string; // folderId

export type UpdateFileManagerFolderApiResponse = unknown;
export type UpdateFileManagerFolderApiArg = {
	/** folder id */
	folderId: string;
	fileManagerItem: FileManagerItem;
};

export type DeleteFileManagerFolderApiResponse = unknown;
export type DeleteFileManagerFolderApiArg = string; // folderId;

export type FileManagerPath = {
	name: string;
	id: string;
};

export type FileManagerItem = {
	id: string;
	folderId?: string;
	name: string;
	createdBy: string;
	createdAt: string;
	modifiedAt: string;
	size: string;
	type: string;
	contents: string;
	description: string;
};

export const {
	useGetFileManagerFolderQuery,
	useUpdateFileManagerFolderMutation,
	useDeleteFileManagerFolderMutation,
	useGetFileManagerAllFolderItemsQuery
} = FileManagerApi;

export type FileManagerApiType = {
	[FileManagerApi.reducerPath]: ReturnType<typeof FileManagerApi.reducer>;
};
