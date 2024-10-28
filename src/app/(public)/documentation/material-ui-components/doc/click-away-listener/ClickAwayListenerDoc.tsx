
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';


function ClickAwayListenerDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/click-away-listener" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Click-Away Listener</Typography>
<Typography className="description">The Click-Away Listener component detects when a click event happens outside of its child element.</Typography>

<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">This document has moved</Typography>
<Typography className="text-base mb-32" component="div">:::warning
Please refer to the <a href="/base-ui/react-click-away-listener/">Click-Away Listener</a> component page in the Base UI docs for demos and details on usage.</Typography>
<Typography className="text-base mb-32" component="div">Click-Away Listener is a part of the standalone <a href="/base-ui/">Base UI</a> component library.
It is currently re-exported from <code>{`@mui/material`}</code> for your convenience, but it will be removed from this package in a future major version, after <code>{`@mui/base`}</code> gets a stable release.
:::</Typography>

		</>
	);
}

export default ClickAwayListenerDoc;
