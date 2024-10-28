import { useContext } from 'react';
import { FuseSettingsContext, FuseSettingsContextType } from '../FuseSettingsProvider';

const useFuseSettings = (): FuseSettingsContextType => {
	const context = useContext(FuseSettingsContext);

	if (!context) {
		throw new Error('useSettings must be used within a FuseSettingsProvider');
	}

	return context;
};

export default useFuseSettings;
