import { useParams } from 'next/navigation';
import _ from 'lodash';
import { useAppSelector } from 'src/store/hooks';
import { useMemo } from 'react';
import {
	FileManagerItem,
	FileManagerPath,
	useGetFileManagerAllFolderItemsQuery,
	useGetFileManagerFolderQuery
} from '../FileManagerApi';
import { selectSelectedItemId } from '../fileManagerAppSlice';

function useFileManagerData() {
	const routeParams = useParams<{ folderId: string[] }>();
	const { folderId } = routeParams;
	const _folderId = folderId?.[0] ?? 'root';
	const { data, isLoading } = useGetFileManagerFolderQuery(_folderId);
	const { data: folderItems } = useGetFileManagerAllFolderItemsQuery();

	const folders = _.filter(data, { type: 'folder' });
	const files = _.reject(data, { type: 'folder' });
	const path = useMemo(() => {
		const path: FileManagerPath[] = [];

		let currentFolder: FileManagerItem | null = null;

		if (_folderId) {
			currentFolder = _.find(folderItems, { id: _folderId });

			if (currentFolder) {
				path.push(currentFolder);
			}
		}

		while (currentFolder?.folderId) {
			// eslint-disable-next-line no-loop-func
			currentFolder = folderItems.find((item) => item.id === currentFolder?.folderId);

			if (currentFolder) {
				path.unshift(currentFolder);
			}
		}
		return path;
	}, [folderItems, folderId]);

	const selectedItemId = useAppSelector(selectSelectedItemId);
	const selectedItem = _.find(data, { id: selectedItemId });

	return {
		folders,
		files,
		isLoading,
		selectedItem,
		selectedItemId,
		path
	};
}

export default useFileManagerData;
