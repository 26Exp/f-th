
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import BasicBreadcrumbsComponent from '../../components/breadcrumbs/BasicBreadcrumbs';
import BasicBreadcrumbsRaw from '../../components/breadcrumbs/BasicBreadcrumbs.tsx?raw';
import ActiveLastBreadcrumbComponent from '../../components/breadcrumbs/ActiveLastBreadcrumb';
import ActiveLastBreadcrumbRaw from '../../components/breadcrumbs/ActiveLastBreadcrumb.tsx?raw';
import CustomSeparatorComponent from '../../components/breadcrumbs/CustomSeparator';
import CustomSeparatorRaw from '../../components/breadcrumbs/CustomSeparator.tsx?raw';
import IconBreadcrumbsComponent from '../../components/breadcrumbs/IconBreadcrumbs';
import IconBreadcrumbsRaw from '../../components/breadcrumbs/IconBreadcrumbs.tsx?raw';
import CollapsedBreadcrumbsComponent from '../../components/breadcrumbs/CollapsedBreadcrumbs';
import CollapsedBreadcrumbsRaw from '../../components/breadcrumbs/CollapsedBreadcrumbs.tsx?raw';
import CondensedWithMenuComponent from '../../components/breadcrumbs/CondensedWithMenu';
import CondensedWithMenuRaw from '../../components/breadcrumbs/CondensedWithMenu.tsx?raw';
import CustomizedBreadcrumbsComponent from '../../components/breadcrumbs/CustomizedBreadcrumbs';
import CustomizedBreadcrumbsRaw from '../../components/breadcrumbs/CustomizedBreadcrumbs.tsx?raw';

function BreadcrumbsDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/breadcrumbs" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Breadcrumbs</Typography>
<Typography className="description">A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.</Typography>



<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Basic breadcrumbs</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="BasicBreadcrumbs.js"
                    className="my-16"
                    iframe={false}
                    component={BasicBreadcrumbsComponent} 
                    raw={BasicBreadcrumbsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Active last breadcrumb</Typography>
<Typography className="text-base mb-32" component="div">Keep the last breadcrumb interactive.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="ActiveLastBreadcrumb.js"
                    className="my-16"
                    iframe={false}
                    component={ActiveLastBreadcrumbComponent} 
                    raw={ActiveLastBreadcrumbRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Custom separator</Typography>
<Typography className="text-base mb-32" component="div">In the following examples, we are using two string separators and an SVG icon.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="CustomSeparator.js"
                    className="my-16"
                    iframe={false}
                    component={CustomSeparatorComponent} 
                    raw={CustomSeparatorRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Breadcrumbs with icons</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="IconBreadcrumbs.js"
                    className="my-16"
                    iframe={false}
                    component={IconBreadcrumbsComponent} 
                    raw={IconBreadcrumbsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Collapsed breadcrumbs</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="CollapsedBreadcrumbs.js"
                    className="my-16"
                    iframe={false}
                    component={CollapsedBreadcrumbsComponent} 
                    raw={CollapsedBreadcrumbsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Condensed with menu</Typography>
<Typography className="text-base mb-32" component="div">As an alternative, consider adding a Menu component to display the condensed links in a dropdown list:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="CondensedWithMenu.js"
                    className="my-16"
                    iframe={false}
                    component={CondensedWithMenuComponent} 
                    raw={CondensedWithMenuRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Customization</Typography>
<Typography className="text-base mb-32" component="div">Here is an example of customizing the component.
You can learn more about this in the <a href="/material-ui/customization/how-to-customize/">overrides documentation page</a>.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="CustomizedBreadcrumbs.js"
                    className="my-16"
                    iframe={false}
                    component={CustomizedBreadcrumbsComponent} 
                    raw={CustomizedBreadcrumbsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Accessibility</Typography>
<Typography className="text-base mb-32" component="div">(WAI-ARIA: <a href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/</a>)</Typography>
<Typography className="text-base mb-32" component="div">Be sure to add a <code>{`aria-label`}</code> description on the <code>{`Breadcrumbs`}</code> component.</Typography>
<Typography className="text-base mb-32" component="div">The accessibility of this component relies on:</Typography>
<ul className="space-y-16">
<li>The set of links is structured using an ordered list (<code>{`<ol>`}</code> element).</li>
<li>To prevent screen reader announcement of the visual separators between links, they are hidden with <code>{`aria-hidden`}</code>.</li>
<li>A nav element labeled with <code>{`aria-label`}</code> identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.</li>
</ul>

		</>
	);
}

export default BreadcrumbsDoc;
