'use client';

import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from '@fuse/core/Link';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import FuseTabs from 'src/components/tabs/FuseTabs';
import FuseTab from 'src/components/tabs/FuseTab';
import InvoiceTab from './tabs/InvoiceTab';
import OrderDetailsTab from './tabs/OrderDetailsTab';
import ProductsTab from './tabs/ProductsTab';
import { useGetECommerceOrderQuery } from '../../ECommerceApi';

/**
 * The order.
 */
function Order() {
	const routeParams = useParams<{ orderId: string }>();
	const { orderId } = routeParams;

	const {
		data: order,
		isLoading,
		isError
	} = useGetECommerceOrderQuery(orderId, {
		skip: !orderId
	});

	const isMobile = useThemeMediaQuery((_theme) => _theme.breakpoints.down('lg'));

	const [tabValue, setTabValue] = useState('details');

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: string) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	if (isError) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such order!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/orders"
					color="inherit"
				>
					Go to Orders Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FusePageCarded
			header={
				order && (
					<div className="flex flex-1 flex-col py-32">
						<motion.div
							initial={{ x: 20, opacity: 0 }}
							animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
						>
							<PageBreadcrumb className="mb-8" />
						</motion.div>

						<motion.div
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
							className="flex flex-col min-w-0"
						>
							<Typography className="text-2xl truncate font-semibold">
								{`Order ${order.reference}`}
							</Typography>
							<Typography
								variant="caption"
								className="font-medium"
							>
								{`From ${order.customer.firstName} ${order.customer.lastName}`}
							</Typography>
						</motion.div>
					</div>
				)
			}
			content={
				<div className="p-16 sm:p-24 w-full">
					<FuseTabs
						className="mb-32"
						value={tabValue}
						onChange={handleTabChange}
					>
						<FuseTab
							value="details"
							label="Order Details"
						/>
						<FuseTab
							value="products"
							label="Products"
						/>
						<FuseTab
							value="invoice"
							label="Invoice"
						/>
					</FuseTabs>
					{order && (
						<>
							{tabValue === 'details' && <OrderDetailsTab />}
							{tabValue === 'products' && <ProductsTab />}
							{tabValue === 'invoice' && <InvoiceTab order={order} />}
						</>
					)}
				</div>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Order;
