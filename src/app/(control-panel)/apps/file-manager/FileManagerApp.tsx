'use client';

import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import { useAppSelector } from 'src/store/hooks';
import DetailSidebarContent from './DetailSidebarContent';
import FileManagerHeader from './FileManagerHeader';
import { selectSelectedItemId } from './fileManagerAppSlice';

type FileManagerAppProps = {
	children: React.ReactNode;
};

/**
 * The file manager app.
 */
function FileManagerApp(props: FileManagerAppProps) {
	const { children } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const selectedItemId = useAppSelector(selectSelectedItemId);

	return (
		<FusePageCarded
			header={<FileManagerHeader />}
			content={children}
			rightSidebarOpen={!!selectedItemId}
			rightSidebarContent={<DetailSidebarContent />}
			rightSidebarWidth={400}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default FileManagerApp;
