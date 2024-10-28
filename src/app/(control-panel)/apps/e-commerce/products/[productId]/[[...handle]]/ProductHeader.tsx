import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';
import _ from 'lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import useNavigate from '@fuse/hooks/useNavigate';
import {
	EcommerceProduct,
	useCreateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useUpdateECommerceProductMutation
} from '../../../ECommerceApi';

/**
 * The product header.
 */
function ProductHeader() {
	const routeParams = useParams<{ productId: string }>();
	const { productId } = routeParams;

	const [createProduct] = useCreateECommerceProductMutation();
	const [saveProduct] = useUpdateECommerceProductMutation();
	const [removeProduct] = useDeleteECommerceProductMutation();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;

	const navigate = useNavigate();

	const { name, images, featuredImageId } = watch() as EcommerceProduct;

	function handleSaveProduct() {
		saveProduct(getValues() as EcommerceProduct);
	}

	function handleCreateProduct() {
		createProduct(getValues() as EcommerceProduct)
			.unwrap()
			.then((data) => {
				navigate(`/apps/e-commerce/products/${data.id}`);
			});
	}

	function handleRemoveProduct() {
		removeProduct(productId);
		navigate('/apps/e-commerce/products');
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{
						x: 20,
						opacity: 0
					}}
					animate={{
						x: 0,
						opacity: 1,
						transition: { delay: 0.3 }
					}}
				>
					<PageBreadcrumb className="mb-8" />
				</motion.div>

				<div className="flex items-center max-w-full space-x-12">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{images && images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="/assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-15 sm:text-2xl truncate font-semibold">
							{name || 'New Product'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Product Detail
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{productId !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveProduct}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							Remove
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							onClick={handleSaveProduct}
						>
							Save
						</Button>
					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateProduct}
					>
						Add
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default ProductHeader;
