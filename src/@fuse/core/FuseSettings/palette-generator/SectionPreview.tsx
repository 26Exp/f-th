import clsx from 'clsx';
import Box from '@mui/material/Box';
import { alpha, lighten } from '@mui/material/styles';

/**
 * Props for SectionPreview component
 */
type SectionPreviewProps = {
	className?: string;
	section?: 'main' | 'navbar' | 'toolbar' | 'footer';
};

/**
 * SectionPreview component
 */
function SectionPreview(props: SectionPreviewProps) {
	const { section, className } = props;
	return (
		<div className={clsx('flex h-80 w-128 overflow-hidden rounded-md border-1 hover:opacity-80', className)}>
			<Box
				sx={[
					section === 'navbar'
						? {
								backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
							}
						: {
								backgroundColor: (theme) =>
									lighten(
										theme.palette.background.default,
										theme.palette.mode === 'light' ? 0.4 : 0.02
									)
							},
					section === 'navbar'
						? {
								'& > div': {
									backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
								}
							}
						: {
								'& > div': {
									backgroundColor: (theme) => theme.palette.divider
								}
							}
				]}
				className="w-32 space-y-1 px-6 pt-12"
			>
				<div className="h-4 rounded-sm" />
				<div className="h-4 rounded-sm" />
				<div className="h-4 rounded-sm" />
				<div className="h-4 rounded-sm" />
				<div className="h-4 rounded-sm" />
			</Box>
			<div className="flex flex-auto flex-col border-l">
				<Box
					sx={[
						section === 'toolbar'
							? {
									backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
								}
							: {
									backgroundColor: (theme) =>
										lighten(
											theme.palette.background.default,
											theme.palette.mode === 'light' ? 0.4 : 0.02
										)
								},
						section === 'toolbar'
							? {
									'& > div': {
										backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
									}
								}
							: {
									'& > div': {
										backgroundColor: (theme) => theme.palette.divider
									}
								}
					]}
					className={clsx('flex h-12 items-center justify-end pr-6')}
				>
					<div className="ml-4 h-4 w-4 rounded-full" />
					<div className="ml-4 h-4 w-4 rounded-full" />
					<div className="ml-4 h-4 w-4 rounded-full" />
				</Box>
				<Box
					sx={[
						section === 'main'
							? {
									backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
								}
							: {
									backgroundColor: (theme) =>
										lighten(
											theme.palette.background.default,
											theme.palette.mode === 'light' ? 0.4 : 0.02
										)
								}
					]}
					className={clsx('flex flex-auto border-y')}
				/>
				<Box
					sx={[
						section === 'footer'
							? {
									backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
								}
							: {
									backgroundColor: (theme) =>
										lighten(
											theme.palette.background.default,
											theme.palette.mode === 'light' ? 0.4 : 0.02
										)
								},
						section === 'footer'
							? {
									'& > div': {
										backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.3)
									}
								}
							: {
									'& > div': {
										backgroundColor: (theme) => theme.palette.divider
									}
								}
					]}
					className={clsx('flex h-12 items-center pr-6')}
				>
					<div className="ml-4 h-4 w-4 rounded-full" />
					<div className="ml-4 h-4 w-4 rounded-full" />
					<div className="ml-4 h-4 w-4 rounded-full" />
				</Box>
			</div>
		</div>
	);
}

export default SectionPreview;
