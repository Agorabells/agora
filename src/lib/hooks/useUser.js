import useSWR from 'swr';

import { fetcher } from '.';

export function useUser() {
	return useSWR('/api/user', fetcher);
}
