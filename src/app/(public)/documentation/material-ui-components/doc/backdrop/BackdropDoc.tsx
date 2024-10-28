
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import SimpleBackdropComponent from '../../components/backdrop/SimpleBackdrop';
import SimpleBackdropRaw from '../../components/backdrop/SimpleBackdrop.tsx?raw';

function BackdropDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/backdrop" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Backdrop</Typography>
<Typography className="description">The Backdrop component narrows the user's focus to a particular element on the screen.</Typography>

<Typography className="text-base mb-32" component="div">The Backdrop signals a state change within the application and can be used for creating loaders, dialogs, and more.
In its simplest form, the Backdrop component will add a dimmed layer over your application.</Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Example</Typography>
<Typography className="text-base mb-32" component="div">The demo below shows a basic Backdrop with a Circular Progress component in the foreground to indicate a loading state.
After clicking <strong>Show Backdrop</strong>, you can click anywhere on the page to close it.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="SimpleBackdrop.js"
                    className="my-16"
                    iframe={false}
                    component={SimpleBackdropComponent} 
                    raw={SimpleBackdropRaw}
                    /></Typography>

		</>
	);
}

export default BackdropDoc;
