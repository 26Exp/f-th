import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { MouseEvent, useEffect, useState } from 'react';
import _ from 'lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PartialDeep } from 'type-fest';
import { alpha } from '@mui/system/colorManipulator';
import { ScrumboardCard, useCreateScrumboardBoardCardMutation } from '../../../ScrumboardApi';
import useUpdateScrumboardBoard from '../../../hooks/useUpdateScrumboardBoard';

type FormType = PartialDeep<ScrumboardCard>;

const defaultValues = {
	title: ''
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	title: z.string().nonempty('You must enter a title')
});

type BoardAddCardProps = {
	boardId: string;
	listId: string;
	onCardAdded: () => void;
};

/**
 * The board add card component.
 */
function BoardAddCard(props: BoardAddCardProps) {
	const { boardId, listId, onCardAdded } = props;
	const updateBoard = useUpdateScrumboardBoard();

	const [formOpen, setFormOpen] = useState(false);

	const [createCard] = useCreateScrumboardBoardCardMutation();

	const { control, formState, handleSubmit, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset(defaultValues);
		}
	}, [formOpen, reset]);

	function handleOpenForm(ev: MouseEvent<HTMLButtonElement>) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function onSubmit(card: FormType) {
		createCard({ boardId, listId, card })
			.unwrap()
			.then((newCard) => {
				updateBoard((board) => ({
					...board,
					lists: board.lists.map((list) =>
						list.id === listId
							? {
									...list,
									cards: [...list.cards, newCard.id]
								}
							: list
					)
				}));
				onCardAdded();
			});

		handleCloseForm();
	}

	return (
		<div className="w-full">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleCloseForm}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="title"
							control={control}
							render={({ field }) => (
								<TextField
									sx={{
										'& .MuiOutlinedInput-root': {
											padding: 0
										}
									}}
									required
									fullWidth
									variant="outlined"
									placeholder="Card title*"
									autoFocus
									InputProps={{
										...field,
										endAdornment: (
											<InputAdornment
												className="space-x-8 px-4"
												position="end"
											>
												<IconButton
													onClick={handleCloseForm}
													size="small"
												>
													<FuseSvgIcon size={16}>heroicons-outline:x-mark</FuseSvgIcon>
												</IconButton>
												<Button
													className="rounded min-h-28 max-h-28 p-0"
													variant="contained"
													color="secondary"
													type="submit"
													disabled={_.isEmpty(dirtyFields) || !isValid}
													size="small"
												>
													Add
												</Button>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
					</form>
				</ClickAwayListener>
			) : (
				<Button
					variant="contained"
					onClick={handleOpenForm}
					classes={{
						root: 'font-medium w-full rounded-lg p-24 justify-start'
					}}
					startIcon={<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>}
					sx={{
						backgroundColor: 'divider',
						'&:hover, &:focus': {
							backgroundColor: (theme) => alpha(theme.palette.divider, 0.8)
						},
						color: 'text.secondary'
					}}
				>
					Add another card
				</Button>
			)}
		</div>
	);
}

export default BoardAddCard;
