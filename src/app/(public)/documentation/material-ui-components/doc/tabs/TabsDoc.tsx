
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import BasicTabsComponent from '../../components/tabs/BasicTabs';
import BasicTabsRaw from '../../components/tabs/BasicTabs.tsx?raw';

function TabsDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/tabs" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Tabs</Typography>
<Typography className="description">Tabs make it easy to explore and switch between different views.</Typography>

<Typography className="text-base mb-32" component="div">Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.</Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Introduction</Typography>
<Typography className="text-base mb-32" component="div">Tabs are implemented using a collection of related components:</Typography>
<ul className="space-y-16">
<li><code>{`<Tab />`}</code> - the tab element itself. Clicking on a tab displays its corresponding panel.</li>
<li><code>{`<Tabs />`}</code> - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.</li>
</ul>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="BasicTabs.js"
                    className="my-16"
                    iframe={false}
                    component={BasicTabsComponent} 
                    raw={BasicTabsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Basics</Typography>

<FuseHighlight component="pre" className="language-jsx">
{` 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
`}
</FuseHighlight>

		</>
	);
}

export default TabsDoc;
