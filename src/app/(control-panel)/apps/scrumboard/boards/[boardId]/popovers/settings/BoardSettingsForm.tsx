import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { useDebounce, useDeepCompareEffect } from '@fuse/hooks';
import { PartialDeep } from 'type-fest';
import ListItemButton from '@mui/material/ListItemButton';
import useNavigate from '@fuse/hooks/useNavigate';
import {
	ScrumboardBoard,
	useDeleteScrumboardBoardMutation,
	useUpdateScrumboardBoardMutation
} from '../../../../ScrumboardApi';
import useGetScrumboardBoard from '../../../../hooks/useGetScrumboardBoard';

type BoardSettingsFormProps = {
	onClose: () => void;
};

/**
 * The board settings form component.
 */
function BoardSettingsForm(props: BoardSettingsFormProps) {
	const { onClose } = props;
	const navigate = useNavigate();
	const { data: board } = useGetScrumboardBoard();
	const [updateBoard] = useUpdateScrumboardBoardMutation();
	const [deleteBoard] = useDeleteScrumboardBoardMutation();

	const { watch, control, reset } = useForm({
		mode: 'onChange',
		defaultValues: board?.settings
	});

	const boardSettingsForm = watch();
	const boardSettings = useMemo(() => board?.settings, [board]);

	const updateBoardData = useDebounce((data: PartialDeep<ScrumboardBoard>) => {
		updateBoard({ ...board, settings: { ...boardSettings, ...data.settings } });
	}, 600);

	useDeepCompareEffect(() => {
		if (_.isEmpty(boardSettingsForm) || !boardSettings) {
			return;
		}

		if (!_.isEqual(boardSettings, boardSettingsForm)) {
			updateBoardData({ settings: boardSettingsForm });
		}
	}, [boardSettings, boardSettingsForm, updateBoardData]);

	useEffect(() => {
		if (!boardSettings) {
			return;
		}

		reset(boardSettings);
	}, [boardSettings, reset]);

	if (_.isEmpty(boardSettingsForm)) {
		return null;
	}

	return (
		<div className="relative w-full">
			<IconButton
				className="absolute top-0 right-0 z-10"
				onClick={onClose}
				color="inherit"
				size="small"
			>
				<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
			</IconButton>

			<List className="pt-32">
				<ListItem>
					<ListItemIcon className="min-w-36">
						<FuseSvgIcon>heroicons-outline:photo</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Card Cover Images" />
					<ListItemSecondaryAction>
						<Controller
							name="cardCoverImages"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Switch
									onChange={(ev) => {
										onChange(ev.target.checked);
									}}
									checked={value}
								/>
							)}
						/>
					</ListItemSecondaryAction>
				</ListItem>

				<Controller
					name="subscribed"
					control={control}
					render={({ field: { onChange, value } }) => (
						<ListItem>
							<ListItemIcon className="min-w-36">
								<FuseSvgIcon>
									{value ? 'heroicons-outline:eye' : 'heroicons-outline:eye-slash'}
								</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Subscribe" />
							<ListItemSecondaryAction>
								<Switch
									onChange={(ev) => {
										onChange(ev.target.checked);
									}}
									checked={value}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				/>

				<ListItemButton
					onClick={() => {
						deleteBoard(board?.id)
							.unwrap()
							.then(() => {
								navigate(`/apps/scrumboard/boards`);
							});
					}}
				>
					<ListItemIcon className="min-w-36">
						<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Delete Board" />
				</ListItemButton>
			</List>
		</div>
	);
}

export default BoardSettingsForm;
