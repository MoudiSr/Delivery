import React from "react"
import "./delivery.css"
import { BsFillPatchPlusFill, BsFiletypeXls } from "react-icons/bs"
import MyTable from "./Table"
import MyTableRow from "./TableRow"
import axios from "axios"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Card from '@mui/material/Card'
import { isMobile } from "react-device-detect"
import { useNavigate } from "react-router-dom"
import MainNav from "./MainNav"
import NavBar from "./NavBar"
import { CSVLink } from "react-csv"
import BottomNav from "./BottomNav"
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


const OrdersContext = React.createContext()

export default function Delivery({value, setValue}) {
	const actions = [
	  { icon: <FileCopyIcon />, name: 'Copy' },
	  { icon: <SaveIcon />, name: 'Save' },
	  { icon: <PrintIcon />, name: 'Print' },
	  { icon: <ShareIcon />, name: 'Share' },
	];
	const [open, setOpen] = React.useState(false)
	const [orders, setOrders] = React.useState([])
	const navigate = useNavigate()

	const [name, setName] = React.useState("")
	const [location, setLocation] = React.useState("")
	const [price, setPrice] = React.useState(0)
	const [delivery, setDelivery] = React.useState(0)
	const [items, setItems] = React.useState("")
	const [date, setDate] = React.useState("")
	const [user, setUser] = React.useState("")


	const handleClickOpen = () => {
	    setOpen(true)
	}

	  const handleClose = () => {
	    setOpen(false)
	}

	const fetchOrders = async () => {
	    const { data } = await axios.get(
	      "https://143.198.216.137/api/orders/?format=json"
	    )
	    setOrders(data)
	}


	React.useEffect(() => {
		fetchOrders()
	}, [open])

	const addOrder = async (e) => {
		e.preventDefault()
		const data = {name: name, location: location, price: price, delivery: delivery, items: items, date: date, user: user }
		const response = await axios.post('https://143.198.216.137/api/orders/', data)
		setOpen(false)
		setName("")
		setLocation("")
		setPrice(0)
		setDelivery(0)
		setItems("")
		setDate("")
		setUser("")
	}

	const [query, setQuery] = React.useState('')

	const keys = ['id', 'name', 'location', 'price', 'delivery', 'items', 'date', 'user']

	const [status, setStatus] = React.useState(3)

	const [specificOrders, setSpecificOrders] =  React.useState([])

	const fetchSpecificOrders = () => {
		setSpecificOrders([])
		orders.map((order) => {
			if (status === 1){
				setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
			} else if (status === 2 && order.status === 'Done') {
				setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
			} else if (status === 3 && order.status === 'Pending') {
				setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
			}
		})
	}

	React.useEffect(() => {
		fetchSpecificOrders()
	}, [status])

	return (
		<OrdersContext.Provider value={{ setOrders, fetchOrders }}>
			<MainNav />

			<div className="main-body">
				<NavBar className="navbar bg1">
					<span style={{fontSize: '1.4rem'}}>Clients</span>
					<div>
						{!isMobile && 
						<Button variant="contained" style={{marginRight: "2rem", backgroundColor: "#3e8c4b", fontFamily: "'Rubik', sans-serif"}} startIcon={<BsFiletypeXls />}>
							<CSVLink 
								data={specificOrders} 
								filename={status === 1 ? "orders-all" : status === 2 ? "orders-done" : "orders-pending"}
								style={{textDecoration: 'none', color: '#fff'}} 
							>
								{"إحصاء"}
							</CSVLink>
						</Button>}
						<Button onClick={handleClickOpen} variant="contained" startIcon={<BsFillPatchPlusFill />} style={{fontFamily: "'Rubik', sans-serif"}}>{"إضافة الطلبية"}</Button>
					</div>
				</NavBar>

				<MyTable setQuery={setQuery} setStatus={setStatus} status={status}>
					{orders.filter((order) => (
						order.name
						.toLowerCase()
						.includes(query)))
						.map((order) => {
							if (status === 1){
								return <MyTableRow key={order.id} id={order.id} name={order.name} location={order.location} price={order.price} delivery={order.delivery} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 2 && order.status === 'Done') {
								return <MyTableRow key={order.id} id={order.id} name={order.name} location={order.location} price={order.price} delivery={order.delivery} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 3 && order.status === 'Pending') {
								return <MyTableRow key={order.id} id={order.id} name={order.name} location={order.location} price={order.price} delivery={order.delivery} items={order.items} date={order.date} user={order.user} status={order.status} />
							}
							
						}
					)
					}		
				</MyTable>
			</div>

			<Dialog open={open} onClose={handleClose}>
		        <DialogTitle style={{fontFamily: "'Rubik', sans-serif"}}>Add Order</DialogTitle>
		        <DialogContent>
		          <TextField
		            autoFocus
		            margin="dense"
		            id="name"
		            label="الاسم"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setName(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="location"
		            label="المنطقة"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setLocation(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="price"
		            label="سعر الطلبية"
		            type="number"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setPrice(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="delivery"
		            type="number"
		            label="الديليفيري"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setDelivery(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="items"
		            label="الطلبية"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setItems(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="date"
		            label=""
		            fullWidth
		            type="date"
		            variant="outlined"
		            onChange={(e) => setDate(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		          <TextField
		            autoFocus
		            margin="dense"
		            id="user"
		            label="المستخدم"
		            fullWidth
		            variant="outlined"
		            onChange={(e) => setUser(e.target.value)}
		            required
		            style={{fontFamily: "'Rubik', sans-serif"}}
		          />
		        </DialogContent>
		        <DialogActions>
		          <Button onClick={handleClose} style={{fontFamily: "'Rubik', sans-serif"}}>Cancel</Button>
		          <Button onClick={addOrder} style={{fontFamily: "'Rubik', sans-serif"}}>Add</Button>
		        </DialogActions>
			</Dialog>
			{isMobile && 
				<>
					<BottomNav value={value} setValue={setValue}/>
				</>
			}

			
		</OrdersContext.Provider>
	)
}

export { OrdersContext }