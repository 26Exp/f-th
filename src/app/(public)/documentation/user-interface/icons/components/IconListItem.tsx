import React, { useState, useCallback } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

type IconItemProps = PaperProps & {
	icon: string;
	iconSet: string;
	onIconSelect: (icon: string) => void;
	size: number;
};

const IconListItem = React.memo((props: IconItemProps) => {
	const { icon, iconSet, onIconSelect, size, ...rest } = props;
	const [open, setOpen] = useState(false);

	const handleCopy = useCallback((copyText: string) => {
		navigator.clipboard.writeText(copyText);

		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	}, []);

	const handleSelect = useCallback(() => {
		onIconSelect(icon);

		const iconText = `${iconSet}:${icon}`;

		handleCopy(iconText);
	}, [handleCopy, icon, iconSet, onIconSelect]);

	return (
		<Tooltip
			open={open}
			title="Copied!"
			slotProps={{ popper: { placement: 'top' } }}
			arrow
		>
			<Paper
				className="flex flex-col items-center  px-8 py-16 border-2 min-h-0 rounded cursor-pointer"
				elevation={0}
				onClick={handleSelect}
				{...rest}
			>
				<div className="flex items-center justify-center my-16">
					<FuseSvgIcon
						className="text-48"
						size={size}
						color="action"
					>
						{`${iconSet}:${icon}`}
					</FuseSvgIcon>
				</div>
				<Typography
					className="text-sm text-center break-all m-0"
					color="text.secondary"
				>
					{`${iconSet}:${icon}`}
				</Typography>
			</Paper>
		</Tooltip>
	);
});

export default IconListItem;
