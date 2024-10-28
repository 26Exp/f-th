'use client';

import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@fuse/core/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import useFileManagerData from './hooks/useFileManagerData';

/**
 * The file manager header.
 */
function FileManagerHeader() {
	const { folders, files, path } = useFileManagerData();

	return (
		<div className="py-24 sm:py-32 w-full flex  space-y-8 sm:space-y-0 items-center justify-between">
			<div className="flex flex-col space-y-8 sm:space-y-0">
				<PageBreadcrumb className="mb-8" />

				<motion.span
					className="flex items-end"
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<Typography
						component={Link}
						to="/apps/file-manager"
						className="text-2xl md:text-5xl font-extrabold tracking-tight leading-none"
						role="button"
					>
						File Manager
					</Typography>

					{path && path?.length > 0 && (
						<Breadcrumbs
							aria-label="breadcrumb"
							className="mx-12"
							separator={<NavigateNextIcon fontSize="small" />}
						>
							<div />
							{path?.map((item, index) =>
								index + 1 === path.length ? (
									<Typography key={index}>{item?.name}</Typography>
								) : (
									<Link
										key={index}
										color="text.primary"
										to={`/apps/file-manager/${item?.id}`}
									>
										{item?.name}
									</Link>
								)
							)}
						</Breadcrumbs>
					)}
				</motion.span>
				<motion.span
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<Typography
						className="text-base font-medium mx-2"
						color="text.secondary"
					>
						{`${folders.length} folders, ${files.length} files`}
					</Typography>
				</motion.span>
			</div>

			<div className="flex items-center">
				<Button
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
				>
					<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
					<span className="hidden sm:flex mx-8">Upload file</span>
				</Button>
			</div>
		</div>
	);
}

export default FileManagerHeader;
