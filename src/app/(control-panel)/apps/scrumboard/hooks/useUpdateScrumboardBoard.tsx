import { useParams } from 'next/navigation';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';
import { ScrumboardBoard, useGetScrumboardBoardQuery, useUpdateScrumboardBoardMutation } from '../ScrumboardApi';

function useUpdateScrumboardBoard() {
	const routeParams = useParams<{ boardId?: string }>();
	const { boardId } = routeParams;
	const { data: board } = useGetScrumboardBoardQuery(boardId, { skip: !boardId });
	const [updateBoard] = useUpdateScrumboardBoardMutation();

	const handleUpdateBoard = (updateFn: (board: ScrumboardBoard) => PartialObjectDeep<ScrumboardBoard, object>) => {
		updateBoard({ ...board, ...updateFn(board) });
	};

	return handleUpdateBoard;
}

export default useUpdateScrumboardBoard;
