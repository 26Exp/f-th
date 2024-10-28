import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import PageBreadcrumb from 'src/components/PageBreadcrumb';

/**
 * The products header.
 */
function ProductsHeader() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<div className="flex grow-0  flex-1 w-full items-center justify-between  space-y-8 sm:space-y-0 py-24 sm:py-32">
			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
			>
				<div>
					<PageBreadcrumb className="mb-8" />
					<Typography className="text-4xl font-extrabold leading-none tracking-tight">Products</Typography>
				</div>
			</motion.span>

			<div className="flex flex-1 items-center justify-end space-x-8">
				<motion.div
					className="flex flex-grow-0"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<Button
						className=""
						variant="contained"
						color="secondary"
						component={NavLinkAdapter}
						to="/apps/e-commerce/products/new"
						size={isMobile ? 'small' : 'medium'}
					>
						<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
						<span className="mx-4 sm:mx-8">Add</span>
					</Button>
				</motion.div>
			</div>
		</div>
	);
}

export default ProductsHeader;
