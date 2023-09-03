import React from "react"
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { GoPackage, GoPeople } from "react-icons/go"
import { BsHouseDoor } from "react-icons/bs"
import { Link } from "react-router-dom"

const LinkBehavior1 = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/dashboard" {...props} />
));

const LinkBehavior2 = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/orders" {...props} />
));

const LinkBehavior3 = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/employees" {...props} />
));

export default function BottomNav({value, setValue, children}) {
	

	return (
		<BottomNavigation 
			showLabels
			value={value} 
			onChange={(event, newValue) => setValue(newValue)} 
			style={{position: 'fixed', bottom: '0', right: '0', left: '0'}} 
		>
			
		      	<BottomNavigationAction
			        label="Dashboard"
			        value="dashboard"
			        icon={<BsHouseDoor />}
			        component={LinkBehavior1}
			    />
		    

		      	<BottomNavigationAction
		       	 	label="Orders"
		        	value="orders"
		        	icon={<GoPackage />}
		        	component={LinkBehavior2}
		      	/>

		      	<BottomNavigationAction
		        	label="Employees"
		        	value="employees"
		        	icon={<GoPeople />}
		        	component={LinkBehavior3}
		      	/>
		      	{children}
	    </BottomNavigation>
	)
}