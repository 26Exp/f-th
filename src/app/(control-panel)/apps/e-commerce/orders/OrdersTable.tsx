/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import FuseLoading from '@fuse/core/FuseLoading';
import { EcommerceOrder, useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import OrdersStatus from './OrdersStatus';

function OrdersTable() {
	const { data: orders, isLoading } = useGetECommerceOrdersQuery();
	const [removeOrders] = useDeleteECommerceOrdersMutation();

	const columns = useMemo<MRT_ColumnDef<EcommerceOrder>[]>(
		() => [
			{
				accessorKey: 'reference',
				header: 'Reference',
				size: 64,
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/orders/${row.original.id}`}
						role="button"
					>
						<u>{row.original.reference}</u>
					</Typography>
				)
			},
			{
				id: 'customer',
				accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
				header: 'Customer'
			},
			{
				id: 'total',
				accessorFn: (row) => `$${row.total}`,
				header: 'Total',
				size: 64
			},
			{ id: 'payment', accessorFn: (row) => row.payment.method, header: 'Payment', size: 128 },
			{
				id: 'status',
				accessorFn: (row) => <OrdersStatus name={row.status[0].name} />,
				accessorKey: 'status',
				header: 'Status'
			},
			{
				accessorKey: 'date',
				header: 'Date'
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				initialState={{
					density: 'spacious',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: ['mrt-row-expand', 'mrt-row-select'],
						right: ['mrt-row-actions']
					},
					pagination: {
						pageIndex: 0,
						pageSize: 20
					}
				}}
				data={orders}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeOrders([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeOrders(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-36 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default OrdersTable;
