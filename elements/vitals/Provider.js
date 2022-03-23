import { createContext, useState, useEffect } from 'react';

import { useUser } from '../../lib/hooks';

export const DataContext = createContext();

export default function Provider({ children }) {
	const [user, setUser] = useState(null);

	const { data, error } = useUser();

	useEffect(() => {
		if (!data) return;
		if (error) throw error;
		setUser(data);
	}, [data]);

	return <DataContext.Provider value={{ user, setUser }}>{children}</DataContext.Provider>;
}
