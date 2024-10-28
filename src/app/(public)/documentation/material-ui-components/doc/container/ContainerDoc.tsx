
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import SimpleContainerComponent from '../../components/container/SimpleContainer';
import SimpleContainerRaw from '../../components/container/SimpleContainer.tsx?raw';
import FixedContainerComponent from '../../components/container/FixedContainer';
import FixedContainerRaw from '../../components/container/FixedContainer.tsx?raw';

function ContainerDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/container" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Container</Typography>
<Typography className="description">The container centers your content horizontally. It's the most basic layout element.</Typography>

<Typography className="text-base mb-32" component="div">While containers can be nested, most layouts do not require a nested container.</Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Fluid</Typography>
<Typography className="text-base mb-32" component="div">A fluid container width is bounded by the <code>{`maxWidth`}</code> prop value.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="SimpleContainer.js"
                    className="my-16"
                    iframe={true}
                    component={SimpleContainerComponent} 
                    raw={SimpleContainerRaw}
                    /></Typography>

<FuseHighlight component="pre" className="language-jsx">
{` 
<Container maxWidth="sm">
`}
</FuseHighlight>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Fixed</Typography>
<Typography className="text-base mb-32" component="div">If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the <code>{`fixed`}</code> prop.
The max-width matches the min-width of the current breakpoint.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="FixedContainer.js"
                    className="my-16"
                    iframe={true}
                    component={FixedContainerComponent} 
                    raw={FixedContainerRaw}
                    /></Typography>

<FuseHighlight component="pre" className="language-jsx">
{` 
<Container fixed>
`}
</FuseHighlight>

		</>
	);
}

export default ContainerDoc;
