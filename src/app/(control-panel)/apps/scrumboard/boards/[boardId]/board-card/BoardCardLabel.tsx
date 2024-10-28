import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import useSelectLabel from '../../../hooks/useSelectLabel';

type BoardCardLabelProps = {
	boardId: string;
	id: string;
};

/**
 * The board card label component.
 */
function BoardCardLabel(props: BoardCardLabelProps) {
	const { boardId, id } = props;
	const label = useSelectLabel({ boardId, id });

	if (!label) {
		return null;
	}

	return (
		<Tooltip
			title={label.title}
			key={id}
		>
			<Chip
				className="font-semibold text-md mx-4 mb-6"
				label={label.title}
				size="small"
			/>
		</Tooltip>
	);
}

export default BoardCardLabel;
