import React from "react"
import profile from "./assets/profile.png"
import "./login.css"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Collapse from '@mui/material/Collapse'
import TextField from "@mui/material/TextField"
import { BsPersonCircle } from "react-icons/bs"

export default function LoginPage({setUser}) {
	
	const [username, setUsername] = React.useState("")
	const [password, setPassword] = React.useState("")

	const [accounts, setAccounts] = React.useState([])
	const [open, setOpen] = React.useState(false)
	const navigate = useNavigate()

	if (localStorage.getItem("user")) {
		navigate('/dashboard')
	}
	

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		const response = await fetch("https://143.198.216.137/api/users/?format=json")
		const jsonData = await response.json()
		setAccounts(jsonData)
	    
	    accounts.map(user => {
	    	if (user.username === username && user.password === password) {
				setUser(user.username)
				localStorage.setItem("user", user.username)
	    		navigate("/dashboard")
	    	} else {
	    		setOpen(true)
	    	}
	    })
	}
	

	React.useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate('/dashboard')
		}
	}, [])
	
	return (
		<div>
			<div style={{display: 'flex', justifyContent: 'center' }}>
				<img src={profile} />
			</div>

			<div>
				<form id="loginForm" onSubmit={handleSubmit}>
					
					<Collapse in={open}>
						<Alert severity="error" onClose={() => setOpen(false)}>
			    			Invalid username/password combination !!
			    		</Alert>
		    		</Collapse>
					
					<TextField error={open ? true : false} label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} className="font" required />

					<TextField error={open ? true : false} label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} className="font" required />

					<Button variant="contained" type="submit" startIcon={<BsPersonCircle />} className="font">Submit</Button>

				</form>
			</div>
			
		</div>
	)
}
