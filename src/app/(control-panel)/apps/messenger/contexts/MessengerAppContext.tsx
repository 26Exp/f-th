import { createContext } from 'react';

type MessengerAppContextType = {
	setMainSidebarOpen: (isOpen?: boolean) => void;
	setContactSidebarOpen: (contactId?: string) => void;
	setUserSidebarOpen: (isOpen?: boolean) => void;
	contactSidebarOpen?: string;
};

const MessengerAppContext = createContext<MessengerAppContextType>({
	setMainSidebarOpen: () => {},
	setContactSidebarOpen: (_T: string) => {},
	setUserSidebarOpen: () => {},
	contactSidebarOpen: null
});

export default MessengerAppContext;
