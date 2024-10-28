'use client';

import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import DemoHeader from '../../../components/DemoHeader';
import DemoContent from '../../../components/DemoContent';

const Root = styled(FusePageCarded)({
	'& .FusePageCarded-header': {},
	'& .FusePageCarded-toolbar': {},
	'& .FusePageCarded-content': {},
	'& .FusePageCarded-sidebarHeader': {},
	'& .FusePageCarded-sidebarContent': {}
});

/**
 * The CardedFullWidthPageScroll page.
 */
function CardedFullWidthPageScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="page"
		/>
	);
}

export default CardedFullWidthPageScrollComponent;
