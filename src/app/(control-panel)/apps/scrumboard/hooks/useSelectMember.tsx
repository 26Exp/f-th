import { useMemo } from 'react';
import _ from 'lodash';
import { useGetScrumboardMembersQuery } from '../ScrumboardApi';

function useSelectMember(id: string) {
	const { data: members } = useGetScrumboardMembersQuery();
	const member = useMemo(() => _.find(members, { id }), [members, id]);

	return member;
}

export default useSelectMember;
