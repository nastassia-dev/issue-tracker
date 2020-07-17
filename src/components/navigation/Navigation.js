import React, { useState } from 'react';

import TopBar from './TopBar';
import SideNav from './SideNav';

const Navigation = () => {
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);
	return (
		<>
			<TopBar open={open} handleDrawerOpen={handleDrawerOpen}/>
			<SideNav open={open} handleDrawerClose={handleDrawerClose}/>
		</>
	)
};

export default Navigation;
