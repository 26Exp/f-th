import { useParams } from 'next/navigation';
import { useGetScrumboardBoardQuery } from '../ScrumboardApi';

function useGetScrumboardBoard() {
	const routeParams = useParams<{ boardId?: string }>();
	const { boardId } = routeParams;

	return useGetScrumboardBoardQuery(boardId, { skip: !boardId });
}

export default useGetScrumboardBoard;
