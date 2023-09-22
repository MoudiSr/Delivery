import React from "react"
import NavBar from "./NavBar"
import Button from '@mui/material/Button'
import { isMobile } from "react-device-detect"
import profile from "./assets/profile.png"
import { GoPackage, GoPeople } from "react-icons/go"
import { AiOutlineDollar } from "react-icons/ai"
import { BsHouseDoor } from "react-icons/bs"
import { Link } from "react-router-dom"


export default function MainNav() {

	return (
		<NavBar className="border-[1px]">
			<NavBar style={{display: 'flex', justifyContent: 'center' }}>
				<img src={profile} />
			</NavBar>
			{!isMobile && <NavBar className="border-t-[1px] flex">
				<Link to="/dashboard" className="no-underline ml-4">
					<Button className="m-2" style={{fontFamily: "'Rubik', sans-serif", color: "#242424"}} startIcon={<BsHouseDoor />}>الصفحة الرئيسية</Button>
				</Link>
				<Link to="/orders" className="no-underline">
					<Button className="m-2" style={{fontFamily: "'Rubik', sans-serif", color: "#242424"}} startIcon={<GoPackage />}>الطلبيات</Button>
				</Link>
				<Link to="/employees" className="no-underline">
					<Button className="m-2" style={{fontFamily: "'Rubik', sans-serif", color: "#242424"}} startIcon={<GoPeople />}>الموظفين</Button>
				</Link>
				<Link to="/expenses" className="no-underline">
					<Button className="m-2" style={{fontFamily: "'Rubik', sans-serif", color: "#242424"}} startIcon={<AiOutlineDollar />}>المصاريف</Button>
				</Link>
			</NavBar>}
		</NavBar>
	)
}