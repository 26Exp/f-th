import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useAppDispatch } from 'src/store/hooks';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import usePathname from '@fuse/hooks/usePathname';
import ItemIcon from './ItemIcon';
import { resetSelectedItemId } from './fileManagerAppSlice';
import useFileManagerData from './hooks/useFileManagerData';

/**
 * The detail sidebar content.
 */
function DetailSidebarContent() {
	const { selectedItem } = useFileManagerData();
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(resetSelectedItemId());
	}, [pathname]);

	if (!selectedItem) {
		return null;
	}

	return (
		<motion.div
			initial={{ y: 50, opacity: 0.8 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
			className="file-details p-24 sm:p-32"
		>
			<div className="flex items-center justify-end w-full">
				<IconButton onClick={() => dispatch(resetSelectedItemId())}>
					<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
				</IconButton>
			</div>
			<Box
				className=" w-full rounded-lg border preview h-128 sm:h-256 file-icon flex items-center justify-center my-32"
				sx={(theme) => ({
					backgroundColor: lighten(theme.palette.background.default, 0.02),
					...theme.applyStyles('light', {
						backgroundColor: lighten(theme.palette.background.default, 0.4)
					})
				})}
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.3 } }}
				>
					<ItemIcon type={selectedItem.type} />
				</motion.div>
			</Box>
			<Typography className="text-17 font-medium">{selectedItem.name}</Typography>
			<div className="text-15 font-medium mt-32">Information</div>
			<div className="flex flex-col mt-16 border-t border-b divide-y font-medium">
				<div className="flex items-center justify-between py-12">
					<Typography color="text.secondary">Created By</Typography>
					<Typography>{selectedItem.createdBy}</Typography>
				</div>
				<div className="flex items-center justify-between py-12">
					<Typography color="text.secondary">Created At</Typography>
					<Typography>{selectedItem.createdAt}</Typography>
				</div>
				<div className="flex items-center justify-between py-12">
					<Typography color="text.secondary">Modified At</Typography>
					<Typography>{selectedItem.modifiedAt}</Typography>
				</div>
				<div className="flex items-center justify-between py-12">
					<Typography color="text.secondary">Size</Typography>
					<Typography>{selectedItem.size}</Typography>
				</div>
				{selectedItem.contents && (
					<div className="flex items-center justify-between py-12">
						<Typography color="text.secondary">Contents</Typography>
						<Typography>{selectedItem.contents}</Typography>
					</div>
				)}
			</div>
			{selectedItem.description && (
				<>
					<div className="text-15 font-medium mt-32 pb-16 border-b">Description</div>
					<Typography className="py-12">{selectedItem.description}</Typography>
				</>
			)}
			<div className="grid grid-cols-2 gap-16 w-full mt-32">
				<Button
					className="flex-auto"
					color="secondary"
					variant="contained"
				>
					Download
				</Button>
				<Button className="flex-auto">Delete</Button>
			</div>
		</motion.div>
	);
}

export default DetailSidebarContent;
