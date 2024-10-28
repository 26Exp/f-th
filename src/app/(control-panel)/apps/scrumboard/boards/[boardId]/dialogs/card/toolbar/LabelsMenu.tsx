import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useState, MouseEvent } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useParams } from 'next/navigation';
import ToolbarMenu from './ToolbarMenu';
import { useGetScrumboardBoardLabelsQuery } from '../../../../../ScrumboardApi';

type LabelsMenuProps = {
	labels: string[];
	onToggleLabel: (labelId: string) => void;
};

/**
 * The labels menu component.
 */
function LabelsMenu(props: LabelsMenuProps) {
	const { labels, onToggleLabel } = props;

	const routeParams = useParams();
	const { boardId } = routeParams as { boardId: string };

	const { data: labelsArr } = useGetScrumboardBoardLabelsQuery(boardId);

	const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

	function handleMenuOpen(event: MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div>
			<IconButton
				className="rounded-0"
				onClick={handleMenuOpen}
				size="large"
			>
				<FuseSvgIcon>heroicons-outline:tag</FuseSvgIcon>
			</IconButton>
			<ToolbarMenu
				state={anchorEl}
				onClose={handleMenuClose}
			>
				<div>
					{labelsArr.map((label) => {
						return (
							<MenuItem
								className="px-8"
								key={label.id}
								onClick={() => {
									onToggleLabel(label.id);
								}}
							>
								<Checkbox checked={labels.includes(label.id)} />
								<ListItemText className="mx-8">{label.title}</ListItemText>
								<ListItemIcon className="min-w-24">
									<FuseSvgIcon>heroicons-outline:tag</FuseSvgIcon>
								</ListItemIcon>
							</MenuItem>
						);
					})}
				</div>
			</ToolbarMenu>
		</div>
	);
}

export default LabelsMenu;
