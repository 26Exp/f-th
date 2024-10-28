import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import _ from 'lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NoteListItemModel from '../../../models/NoteListItemModel';
import { NoteListItemType } from '../../../NotesApi';

/**
 * Form Validation Schema
 */
const schema = z.object({
	content: z.string().nonempty('You must enter a content')
});

type FormType = Pick<NoteListItemType, 'content'>;

const defaultValues: FormType = {
	content: ''
};

type NoteFormAddListItemProps = {
	onListItemAdd: (noteListItem: NoteListItemType) => void;
};

/**
 * The note form add list item.
 */
function NoteFormAddListItem(props: NoteFormAddListItemProps) {
	const { onListItemAdd } = props;

	const { control, formState, handleSubmit, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(data: FormType) {
		onListItemAdd(NoteListItemModel(data));
		reset(defaultValues);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ListItem
				className="px-12"
				dense
			>
				<IconButton
					className="p-0"
					aria-label="Add"
					type="submit"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					size="small"
				>
					<FuseSvgIcon size={16}>heroicons-outline:plus</FuseSvgIcon>
				</IconButton>
				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="flex flex-1"
							error={!!errors.content}
							helperText={errors?.content?.message}
							placeholder="Add an item"
							variant="standard"
							autoFocus
							hiddenLabel
							size="small"
							InputProps={{
								disableUnderline: true,
								className: ''
							}}
						/>
					)}
				/>
			</ListItem>
		</form>
	);
}

export default NoteFormAddListItem;
