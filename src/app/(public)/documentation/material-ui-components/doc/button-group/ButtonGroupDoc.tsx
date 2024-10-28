
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import BasicButtonGroupComponent from '../../components/button-group/BasicButtonGroup';
import BasicButtonGroupRaw from '../../components/button-group/BasicButtonGroup.tsx?raw';
import VariantButtonGroupComponent from '../../components/button-group/VariantButtonGroup';
import VariantButtonGroupRaw from '../../components/button-group/VariantButtonGroup.tsx?raw';
import GroupSizesColorsComponent from '../../components/button-group/GroupSizesColors';
import GroupSizesColorsRaw from '../../components/button-group/GroupSizesColors.tsx?raw';
import GroupOrientationComponent from '../../components/button-group/GroupOrientation';
import GroupOrientationRaw from '../../components/button-group/GroupOrientation.tsx?raw';
import SplitButtonComponent from '../../components/button-group/SplitButton';
import SplitButtonRaw from '../../components/button-group/SplitButton.tsx?raw';
import DisableElevationComponent from '../../components/button-group/DisableElevation';
import DisableElevationRaw from '../../components/button-group/DisableElevation.tsx?raw';

function ButtonGroupDoc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/button-group" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Button Group</Typography>
<Typography className="description">The ButtonGroup component can be used to group related buttons.</Typography>



<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Basic button group</Typography>
<Typography className="text-base mb-32" component="div">The buttons can be grouped by wrapping them with the <code>{`ButtonGroup`}</code> component.
They need to be immediate children.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="BasicButtonGroup.js"
                    className="my-16"
                    iframe={false}
                    component={BasicButtonGroupComponent} 
                    raw={BasicButtonGroupRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Button variants</Typography>
<Typography className="text-base mb-32" component="div">All the standard button variants are supported.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="VariantButtonGroup.js"
                    className="my-16"
                    iframe={false}
                    component={VariantButtonGroupComponent} 
                    raw={VariantButtonGroupRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Sizes and colors</Typography>
<Typography className="text-base mb-32" component="div">The <code>{`size`}</code> and <code>{`color`}</code> props can be used to control the appearance of the button group.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="GroupSizesColors.js"
                    className="my-16"
                    iframe={false}
                    component={GroupSizesColorsComponent} 
                    raw={GroupSizesColorsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Vertical group</Typography>
<Typography className="text-base mb-32" component="div">The button group can be displayed vertically using the <code>{`orientation`}</code> prop.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="GroupOrientation.js"
                    className="my-16"
                    iframe={false}
                    component={GroupOrientationComponent} 
                    raw={GroupOrientationRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Split button</Typography>
<Typography className="text-base mb-32" component="div"><code>{`ButtonGroup`}</code> can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="SplitButton.js"
                    className="my-16"
                    iframe={false}
                    component={SplitButtonComponent} 
                    raw={SplitButtonRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Disabled elevation</Typography>
<Typography className="text-base mb-32" component="div">You can remove the elevation with the <code>{`disableElevation`}</code> prop.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="DisableElevation.js"
                    className="my-16"
                    iframe={false}
                    component={DisableElevationComponent} 
                    raw={DisableElevationRaw}
                    /></Typography>

		</>
	);
}

export default ButtonGroupDoc;
