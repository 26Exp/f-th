
'use client';

import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import BasicGridComponent from '../../components/grid2/BasicGrid';
import BasicGridRaw from '../../components/grid2/BasicGrid.tsx?raw';
import FullWidthGridComponent from '../../components/grid2/FullWidthGrid';
import FullWidthGridRaw from '../../components/grid2/FullWidthGrid.tsx?raw';
import SpacingGridComponent from '../../components/grid2/SpacingGrid';
import SpacingGridRaw from '../../components/grid2/SpacingGrid.tsx?raw';
import RowAndColumnSpacingComponent from '../../components/grid2/RowAndColumnSpacing';
import RowAndColumnSpacingRaw from '../../components/grid2/RowAndColumnSpacing.tsx?raw';
import ResponsiveGridComponent from '../../components/grid2/ResponsiveGrid';
import ResponsiveGridRaw from '../../components/grid2/ResponsiveGrid.tsx?raw';
import AutoGridComponent from '../../components/grid2/AutoGrid';
import AutoGridRaw from '../../components/grid2/AutoGrid.tsx?raw';
import VariableWidthGridComponent from '../../components/grid2/VariableWidthGrid';
import VariableWidthGridRaw from '../../components/grid2/VariableWidthGrid.tsx?raw';
import NestedGridComponent from '../../components/grid2/NestedGrid';
import NestedGridRaw from '../../components/grid2/NestedGrid.tsx?raw';
import NestedGridColumnsComponent from '../../components/grid2/NestedGridColumns';
import NestedGridColumnsRaw from '../../components/grid2/NestedGridColumns.tsx?raw';
import ColumnsGridComponent from '../../components/grid2/ColumnsGrid';
import ColumnsGridRaw from '../../components/grid2/ColumnsGrid.tsx?raw';
import OffsetGridComponent from '../../components/grid2/OffsetGrid';
import OffsetGridRaw from '../../components/grid2/OffsetGrid.tsx?raw';
import CenteredElementGridComponent from '../../components/grid2/CenteredElementGrid';
import CenteredElementGridRaw from '../../components/grid2/CenteredElementGrid.tsx?raw';
import FullBorderedGridComponent from '../../components/grid2/FullBorderedGrid';
import FullBorderedGridRaw from '../../components/grid2/FullBorderedGrid.tsx?raw';
import HalfBorderedGridComponent from '../../components/grid2/HalfBorderedGrid';
import HalfBorderedGridRaw from '../../components/grid2/HalfBorderedGrid.tsx?raw';

function Grid2Doc(props) {
	return (
		<>
			<Button 
				className="normal-case absolute right-0 not-prose"
				variant="contained"
				color="secondary"
				component="a" 
				href="https://mui.com/components/grid2" 
				target="_blank"
				role="button"
				size="small"
				startIcon={<FuseSvgIcon size={16}>heroicons-outline:arrow-top-right-on-square</FuseSvgIcon>}
			>
				Reference
			</Button>
			<Typography className="text-5xl my-16 font-700" component="h1">Grid version 2</Typography>
<Typography className="description">The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</Typography>

<Typography className="text-base mb-32" component="div">The <code>{`Grid`}</code> component works well for a layout with a known number of columns.
The columns can be configured with multiple breakpoints to specify the column span of each child.</Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">How it works</Typography>
<Typography className="text-base mb-32" component="div">The grid system is implemented with the <code>{`Grid`}</code> component:</Typography>
<ul className="space-y-16">
<li>It uses <a href="https://www.w3.org/TR/css-flexbox-1/">CSS Flexbox</a> (rather than CSS Grid) for high flexibility.</li>
<li>The grid is always a flex item. Use the <code>{`container`}</code> prop to add a flex container.</li>
<li>Item widths are set in percentages, so they&#39;re always fluid and sized relative to their parent element.</li>
<li>There are five default grid breakpoints: xs, sm, md, lg, and xl. If you need custom breakpoints, check out <a href="#custom-breakpoints">custom breakpoints grid</a>.</li>
<li>You can give integer values for each breakpoint, to indicate how many of the 12 available columns are occupied by the component when the viewport width satisfies the <a href="/material-ui/customization/breakpoints/#default-breakpoints">breakpoint constraints</a>.</li>
<li>It uses negative margins and padding to create gaps between children, which behave similarly to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap">the <code>{`gap`}</code> CSS property</a>.</li>
<li>It does <em>not</em> support row spanning. Children elements cannot span multiple rows. We recommend using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout">CSS Grid</a> if you need this functionality.</li>
<li>It does <em>not</em> automatically place children. It will try to fit the children one by one, and if there is not enough space, the rest of the children will start on the next line, and so on. If you need auto-placement, we recommend using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout">CSS Grid</a> instead.</li>
</ul>
<Typography className="text-base mb-32" component="div">:::warning
The <code>{`Grid`}</code> component is a <em>layout</em> grid, not a <em>data</em> grid.
If you need a data grid, check out <a href="/x/react-data-grid/">the MUI X <code>{`DataGrid`}</code> component</a>.
:::</Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Fluid grids</Typography>
<Typography className="text-base mb-32" component="div">Fluid grids use columns that scale and resize content. A fluid grid&#39;s layout can use breakpoints to determine if the layout needs to change dramatically.</Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Basic grid</Typography>
<Typography className="text-base mb-32" component="div">In order to create a grid layout, you need a container.
Use the <code>{`container`}</code> prop to create a grid container that wraps the grid items (the <code>{`Grid`}</code> is always an item).</Typography>
<Typography className="text-base mb-32" component="div">Column widths are integer values between 1 and 12.
For example, an item with <code>{`size={6}`}</code> occupies half of the grid container&#39;s width.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="BasicGrid.js"
                    className="my-16"
                    iframe={false}
                    component={BasicGridComponent} 
                    raw={BasicGridRaw}
                    /></Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Multiple breakpoints</Typography>
<Typography className="text-base mb-32" component="div">Items may have multiple widths defined, causing the layout to change at the defined breakpoint.
Width values apply to all wider breakpoints, and larger breakpoints override those given to smaller breakpoints.</Typography>
<Typography className="text-base mb-32" component="div">For example, a component with <code>{`size={{ xs: 12, sm: 6 }}`}</code> occupies the entire viewport width when the viewport is <a href="/material-ui/customization/breakpoints/#default-breakpoints">less than 600 pixels wide</a>.
When the viewport grows beyond this size, the component occupies half of the total width—six columns rather than 12.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="FullWidthGrid.js"
                    className="my-16"
                    iframe={false}
                    component={FullWidthGridComponent} 
                    raw={FullWidthGridRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Spacing</Typography>
<Typography className="text-base mb-32" component="div">Use the <code>{`spacing`}</code> prop to control the space between children.
The spacing value can be any positive number (including decimals) or a string.
The prop is converted into a CSS property using the <a href="/material-ui/customization/spacing/"><code>{`theme.spacing()`}</code></a> helper.</Typography>
<Typography className="text-base mb-32" component="div">The following demo illustrates the use of the <code>{`spacing`}</code> prop:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="SpacingGrid.js"
                    className="my-16"
                    iframe={false}
                    component={SpacingGridComponent} 
                    raw={SpacingGridRaw}
                    /></Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Row and column spacing</Typography>
<Typography className="text-base mb-32" component="div">The <code>{`rowSpacing`}</code> and <code>{`columnSpacing`}</code> props let you specify row and column gaps independently of one another.
They behave similarly to the <code>{`row-gap`}</code> and <code>{`column-gap`}</code> properties of <a href="/system/grid/#row-gap-amp-column-gap">CSS Grid</a>.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="RowAndColumnSpacing.js"
                    className="my-16"
                    iframe={false}
                    component={RowAndColumnSpacingComponent} 
                    raw={RowAndColumnSpacingRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Responsive values</Typography>
<Typography className="text-base mb-32" component="div">You can set prop values to change when a given breakpoint is active.
For instance, we can implement Material Design&#39;s <a href="https://m2.material.io/design/layout/responsive-layout-grid.html">recommended</a> responsive layout grid, as seen in the following demo:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="ResponsiveGrid.js"
                    className="my-16"
                    iframe={false}
                    component={ResponsiveGridComponent} 
                    raw={ResponsiveGridRaw}
                    /></Typography>
<Typography className="text-base mb-32" component="div">Responsive values are supported by:</Typography>
<ul className="space-y-16">
<li><code>{`size`}</code></li>
<li><code>{`columns`}</code></li>
<li><code>{`columnSpacing`}</code></li>
<li><code>{`direction`}</code></li>
<li><code>{`rowSpacing`}</code></li>
<li><code>{`spacing`}</code></li>
<li><code>{`offset`}</code></li>
</ul>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Auto-layout</Typography>
<Typography className="text-base mb-32" component="div">The auto-layout feature gives equal space to all items present.
When you set the width of one item, the others will automatically resize to match it.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="AutoGrid.js"
                    className="my-16"
                    iframe={false}
                    component={AutoGridComponent} 
                    raw={AutoGridRaw}
                    /></Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Variable width content</Typography>
<Typography className="text-base mb-32" component="div">When a breakpoint&#39;s value is given as <code>{`"auto"`}</code>, then a column&#39;s size will automatically adjust to match the width of its content.
The demo below shows how this works:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="VariableWidthGrid.js"
                    className="my-16"
                    iframe={false}
                    component={VariableWidthGridComponent} 
                    raw={VariableWidthGridRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Nested grid</Typography>
<Typography className="text-base mb-32" component="div">The grid container that renders as a <strong>direct child</strong> inside another grid container is a nested grid that inherits its <a href="#columns"><code>{`columns`}</code></a> and <a href="#spacing"><code>{`spacing`}</code></a> from the top level.
It will also inherit the props of the top-level grid if it receives those props.</Typography>
<Typography className="text-base mb-32" component="div">:::success</Typography>
<Typography className="text-base mb-32" component="div">Note that a nested grid container should be a direct child of another grid container. If there are non-grid elements in between, the grid container will start as the new root container.</Typography>

<FuseHighlight component="pre" className="language-js">
{` 
<Grid container>
  <Grid container> // A nested grid container that inherits columns and spacing from above.
    <div>
      <Grid container> // A new root grid container with its own variables scope.
`}
</FuseHighlight>
<Typography className="text-base mb-32" component="div">:::</Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Inheriting spacing</Typography>
<Typography className="text-base mb-32" component="div">A nested grid container will inherits the row and column spacing from its parent unless the <code>{`spacing`}</code> prop is specified to the instance.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="NestedGrid.js"
                    className="my-16"
                    iframe={false}
                    component={NestedGridComponent} 
                    raw={NestedGridRaw}
                    /></Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Inheriting columns</Typography>
<Typography className="text-base mb-32" component="div">A nested grid container will inherits the columns from its parent unless the <code>{`columns`}</code> prop is specified to the instance.</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="NestedGridColumns.js"
                    className="my-16"
                    iframe={false}
                    component={NestedGridColumnsComponent} 
                    raw={NestedGridColumnsRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Columns</Typography>
<Typography className="text-base mb-32" component="div">Use the <code>{`columns`}</code> prop to change the default number of columns (12) in the grid, as shown below:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="ColumnsGrid.js"
                    className="my-16"
                    iframe={false}
                    component={ColumnsGridComponent} 
                    raw={ColumnsGridRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Offset</Typography>
<Typography className="text-base mb-32" component="div">The <code>{`offset`}</code> prop pushes an item to the right side of the grid.
This props accepts:</Typography>
<ul className="space-y-16">
<li>numbers—for example, <code>{`offset={{ md: 2 }}`}</code> pushes an item two columns to the right when the viewport size is equal to or greater than the <code>{`md`}</code> breakpoint.</li>
<li><code>{`"auto"`}</code>—this pushes the item to the far right side of the grid container.</li>
</ul>
<Typography className="text-base mb-32" component="div">The demo below illustrates how to use the offset props:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="OffsetGrid.js"
                    className="my-16"
                    iframe={false}
                    component={OffsetGridComponent} 
                    raw={OffsetGridRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Custom breakpoints</Typography>
<Typography className="text-base mb-32" component="div">If you specify custom breakpoints in the theme, you can use those names as grid item props in responsive values:</Typography>

<FuseHighlight component="pre" className="language-js">
{` 
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Demo() {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid key={index} size={{ mobile: 6, tablet: 4, laptop: 3 }}>
            <div>{index + 1}</div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
`}
</FuseHighlight>
<div className="border-1 p-16 rounded-xl my-12">

<Typography className="text-base mb-32" component="div">Custom breakpoints affect all <a href="#responsive-values">responsive values</a>.</Typography>
</div>

<Typography className="text-15 mt-20 mb-10 font-700" component="h3">TypeScript</Typography>
<Typography className="text-base mb-32" component="div">You have to set module augmentation on the theme breakpoints interface.</Typography>

<FuseHighlight component="pre" className="language-ts">
{` 
declare module '@mui/system' {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
`}
</FuseHighlight>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Customization</Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Centered elements</Typography>
<Typography className="text-base mb-32" component="div">To center a grid item&#39;s content, specify <code>{`display="flex"`}</code> directly on the item.
Then use <code>{`justifyContent`}</code> and/or <code>{`alignItems`}</code> to adjust the position of the content, as shown below:</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="CenteredElementGrid.js"
                    className="my-16"
                    iframe={false}
                    component={CenteredElementGridComponent} 
                    raw={CenteredElementGridRaw}
                    /></Typography>
<Typography className="text-base mb-32" component="div">:::warning
Using the <code>{`container`}</code> prop does not work in this situation because the grid container is designed exclusively to wrap grid items.
It cannot wrap other elements.
:::</Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Full border</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="FullBorderedGrid.js"
                    className="my-16"
                    iframe={false}
                    component={FullBorderedGridComponent} 
                    raw={FullBorderedGridRaw}
                    /></Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Half border</Typography>
<Typography className="text-base mb-32" component="div"><FuseExample
                    name="HalfBorderedGrid.js"
                    className="my-16"
                    iframe={false}
                    component={HalfBorderedGridComponent} 
                    raw={HalfBorderedGridRaw}
                    /></Typography>
<Typography className="text-3xl mt-24 mb-10 font-700" component="h2">Limitations</Typography>
<Typography className="text-15 mt-20 mb-10 font-700" component="h3">Column direction and reversing</Typography>
<Typography className="text-base mb-32" component="div">The <code>{`size`}</code> and <code>{`offset`}</code> props are <em>not</em> supported within containers that use <code>{`direction="column"`}</code> or <code>{`direction="column-reverse"`}</code>.</Typography>
<Typography className="text-base mb-32" component="div">Size and offset props define the number of columns the component will use for a given breakpoint.
They are intended to control the width using <code>{`flex-basis`}</code> in <code>{`row`}</code> containers, but they will impact the height in <code>{`column`}</code> containers.
If used, these props may have undesirable effects on the height of the <code>{`Grid`}</code> item elements.</Typography>

		</>
	);
}

export default Grid2Doc;
