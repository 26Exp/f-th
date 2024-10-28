import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import MainProjectSelection from '@/components/MainProjectSelection';

type DocumentationSidebarHeaderProps = {
	className?: string;
};

function DocumentationSidebarHeader(props: DocumentationSidebarHeaderProps) {
	const { className = '' } = props;

	return (
		<div className={clsx('flex items-center space-x-8', className)}>
			<img
				className="logo-icon h-32 w-32"
				src="/assets/images/logo/logo.svg"
				alt="logo"
			/>
			<div className="logo-text flex flex-col flex-auto">
				<Typography className="text-2xl tracking-light font-semibold leading-none">FUSE</Typography>
				<Typography
					className="text-xl tracking-light font-bold leading-none"
					color="primary"
				>
					DOCS
				</Typography>
			</div>
			<MainProjectSelection />
		</div>
	);
}

export default DocumentationSidebarHeader;
