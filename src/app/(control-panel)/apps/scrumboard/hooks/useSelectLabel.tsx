import { useMemo } from 'react';
import _ from 'lodash';
import { useGetScrumboardBoardLabelsQuery } from '../ScrumboardApi';

type useSelectLabelProps = {
	boardId: string;
	id: string;
};

function useSelectLabel(props: useSelectLabelProps) {
	const { boardId, id } = props;
	const { data: labels } = useGetScrumboardBoardLabelsQuery(boardId);
	const label = useMemo(() => _.find(labels, { id }), [labels, id]);

	return label;
}

export default useSelectLabel;
