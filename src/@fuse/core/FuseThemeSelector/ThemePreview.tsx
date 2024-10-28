import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';

export type FuseThemeOption = {
	id: string;
	section: FuseThemesType;
};

type ThemePreviewProps = {
	className?: string;
	onSelect?: (T: FuseThemeOption) => void;
	theme: FuseThemeOption;
};

/**
 * The ThemePreview component is responsible for rendering a preview of a theme scheme.
 * It uses various MUI components to render the preview.
 * The component is memoized to prevent unnecessary re-renders.
 */
function ThemePreview(props: ThemePreviewProps) {
	const { theme, className, onSelect = () => {} } = props;
	const { section, id } = theme;

	const { navbar, toolbar, footer, main } = section;

	return (
		<div className={clsx(className, 'w-full min-h-full ')}>
			<button
				className={clsx(
					'flex p-0  h-160 relative w-full cursor-pointer overflow-hidden rounded text-left font-500 shadow transition-all hover:shadow-lg items-stretch hover:scale-105 duration-200 ease-in-out',
					{
						'bg-white': id === 'default',
						'bg-gray-700': id !== 'default'
					}
				)}
				style={{
					backgroundColor: main.palette.background.default,
					color: main.palette.text.primary
				}}
				onClick={() => {
					onSelect(theme);
				}}
				type="button"
			>
				<div
					className="flex flex-col w-1/3 min-h-full p-4 border-r-1 border-gray-700"
					style={{
						backgroundColor: navbar.palette.background.default,
						color: navbar.palette.text.primary
					}}
				>
					<span className="text-sm">Navbar</span>
				</div>

				<div className="flex flex-col w-2/3">
					<div
						className="w-full px-4 py-4 border-b-1 border-gray-700"
						style={{
							backgroundColor: toolbar.palette.background.default,
							color: toolbar.palette.text.primary
						}}
					>
						<span className="text-sm">Toolbar</span>
					</div>

					<div className="flex flex-1  flex-col w-full">
						<div
							className="relative h-44 w-full px-4"
							style={{
								backgroundColor: main.palette.primary.main,
								color: main.palette.primary.contrastText
							}}
						>
							<span className="text-sm">Header</span>

							<div
								className="absolute bottom-0 right-0 mb-10 mr-8 flex h-24 w-24 items-center justify-center rounded-full text-10 shadow-1 z-10"
								style={{
									backgroundColor: main.palette.secondary.main,
									color: main.palette.secondary.contrastText
								}}
							>
								<span className="">S</span>
							</div>
						</div>

						<div className="-mt-24 flex-1 w-full pl-4 pr-4">
							<div
								className="relative w-full h-full rounded p-4 shadow-1"
								style={{
									backgroundColor: main.palette.background.paper,
									color: main.palette.text.primary
								}}
							>
								<span className="text-sm">Paper</span>
							</div>
						</div>

						<div className="w-full p-4">
							<span className="text-sm">Background</span>
						</div>
					</div>

					<div
						className="w-full px-8 py-4 border-t-1 border-gray-700"
						style={{
							backgroundColor: footer.palette.background.default,
							color: footer.palette.text.primary
						}}
					>
						<span className="text-sm">Footer</span>
					</div>
				</div>
			</button>
			<Typography className="mt-4 w-full text-center font-semibold">{id}</Typography>
		</div>
	);
}

export default ThemePreview;
