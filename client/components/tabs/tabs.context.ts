import React from 'react';

const TabsContext = React.createContext<{
	tabsRef?: any;
	setTabsRef?: (ref: any) => void;
}>({
	tabsRef: null,
	setTabsRef: (ref: any) => void 0,
});

export default TabsContext;
