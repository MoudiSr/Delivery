import React from "react"
import "./delivery.css"
import { BsFillPatchPlusFill, BsFiletypeDocx } from "react-icons/bs"
import MyTable from "./Table"
import MyTableRow from "./TableRow"
import axios from "axios"
import Button from '@mui/material/Button'
import { isMobile } from "react-device-detect"
import { useNavigate } from "react-router-dom"
import MainNav from "./MainNav"
import NavBar from "./NavBar"
import { CSVLink } from "react-csv"
import BottomNav from "./BottomNav"
import ExportToWord from "./ExportToWord"
import OrderModal from "./OrderModal"


const OrdersContext = React.createContext()

export default function Delivery({value, setValue, user}) {
	
	const [open, setOpen] = React.useState(false)
	const [orders, setOrders] = React.useState([])
	const navigate = useNavigate()

	const [dealerName, setDealerName] = React.useState("")
	const [clientName, setClientName] = React.useState("")
	const [location, setLocation] = React.useState("")
	const [orderDollar, setOrderDollar] = React.useState(0)
	const [orderLBP, setOrderLBP] = React.useState("")
	const [delivery, setDelivery] = React.useState(0)
	const [deliveryCurrency, setDeliveryCurrency] = React.useState(0)
	const [driverTax, setDriverTax] = React.useState(0)
	const [driverTaxCurrency, setDriverTaxCurrency] = React.useState('')
	const [items, setItems] = React.useState("")
	const [date, setDate] = React.useState(new Date())
	const [orderId, setOrderId] = React.useState(0)


	const handleClickOpen = () => {
		setDealerName("")
		setClientName("")
		setLocation("")
		setOrderDollar(0)
		setOrderLBP(0)
		setDelivery(0)
		setDeliveryCurrency("dollar")
		setDriverTax(0)
		setDriverTaxCurrency("dollar")
		setItems("")
		setDate(new Date())
		setOrderId(0)
	    setOpen(true)
	}

	  const handleClose = () => {
	    setOpen(false)
		setInputVisible(false)
		setDealerName("")
		setClientName("")
		setLocation("")
		setOrderDollar(0)
		setOrderLBP(0)
		setDelivery(0)
		setDeliveryCurrency("dollar")
		setDriverTax(0)
		setDriverTaxCurrency("dollar")
		setItems("")
		setDate(new Date())
		setOrderId(0)
	}

	const fetchOrders = async () => {
	    const response = await fetch("https://httpservercontrol.mostspecialdelivery.tech/api/orders/?format=json")
		const jsonData = await response.json()
	    setOrders(jsonData)
	}


	React.useEffect(() => {
		fetchOrders()
	}, [open])

	const type = "add"

	const addOrder = async (e) => {
		e.preventDefault()

		let finalAmountInDollar = deliveryCurrency === 'dollar' ? parseFloat(delivery) : 0
		finalAmountInDollar += parseFloat(orderDollar)

		let finalAmountInLBP = deliveryCurrency !== 'dollar' ? parseFloat(delivery) : 0
		finalAmountInLBP += parseFloat(orderLBP)

		let remainingAmountInDollar = deliveryCurrency === 'dollar' ? parseFloat(delivery) : 0
		remainingAmountInDollar -= driverTaxCurrency === 'dollar' ? parseFloat(driverTax) : 0

		let remainingAmountInLBP = deliveryCurrency !== 'dollar' ? parseFloat(delivery) : 0
		remainingAmountInLBP -= driverTaxCurrency !== 'dollar' ? parseFloat(driverTax) : 0


		const data = {order_id: orderId, dealer_name: dealerName, client_name: clientName, location: location, order_Dollar: orderDollar, order_LBP: orderLBP, delivery: delivery, delivery_currency: deliveryCurrency, final_amount_LBP: finalAmountInLBP, final_amount_Dollar: finalAmountInDollar, driver_tax: driverTax, driver_tax_Currency: driverTaxCurrency, remaining_amount_LBP: remainingAmountInLBP, remaining_amount_Dollar: remainingAmountInDollar, items: items, date: date, user: user}
		const response = await axios.post('https://httpservercontrol.mostspecialdelivery.tech/api/orders/', data)
		setOpen(false)

		
		setDealerName("")
		setClientName("")
		setLocation("")
		setOrderDollar(0)
		setOrderLBP(0)
		setDelivery(0)
		setDeliveryCurrency("dollar")
		setDriverTax(0)
		setDriverTaxCurrency("dollar")
		setItems("")
		setDate(new Date())
		setOrderId(0)
	}

	
	const [dateFilter, setDateFilter] = React.useState(null)

	const [query, setQuery] = React.useState('')


	const [status, setStatus] = React.useState(3)

	const [specificOrders, setSpecificOrders] = React.useState([])

	const fetchSpecificOrders = () => {
		
		setSpecificOrders([])
		orders.map((order) => {
			let orderDate = new Date(order.date)
			if (dateFilter == null) {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending')){
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 2 && order.status === 'Done') {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 3 && order.status === 'Pending') {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 4 && order.status === 'Archived') {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				}
			} else {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending') && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]){
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 2 && order.status === 'Done' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 3 && order.status === 'Pending' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				} else if (status === 4 && order.status === 'Archived' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSpecificOrders(prevSpecificOrders => [...prevSpecificOrders, order])
				}
			}
			
		})

		if (specificOrders.length == 0) {
			setSpecificOrders(orders)
		}
	}

	React.useEffect(() => {
		fetchSpecificOrders()
	}, [status, dateFilter])

	const filteredOrders = specificOrders.length === 0 ? 
		orders.filter((order) => (
			order.dealer_name.toLowerCase().includes(query) ||
			order.client_name.toLowerCase().includes(query) ||
			order.order_id.toString().includes(query) ||
			order.date.toString().includes(query)
	)
	) : specificOrders.filter((order) => (
						order.dealer_name.toLowerCase().includes(query) ||
						order.client_name.toLowerCase().includes(query) ||
						order.order_id.toString().includes(query) ||
						order.date.toString().includes(query)
		)
	)

	

	
	const [data, setData] = React.useState([])

	const kashefExcelData = () => {
		setData([])
		filteredOrders.map(order => {
			let orderDate = new Date(order.date)
			if (dateFilter == null) {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending')){
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 2 && order.status === 'Done') {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 3 && order.status === 'Pending') {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 4 && order.status === 'Archived') {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				}
			} else {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending') && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]){
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 2 && order.status === 'Done' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 3 && order.status === 'Pending' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				} else if (status === 4 && order.status === 'Archived' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
					})
				}
			}
		})
	}

	const [secondData, setSecondData] = React.useState([])

	const secondExcelData = () => {
		setSecondData([])
		filteredOrders.map(order => {
			let orderDate = new Date(order.date)
			if (dateFilter == null) {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending')){
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 2 && order.status === 'Done') {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 3 && order.status === 'Pending') {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 4 && order.status === 'Archived') {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				}
			} else {
				if (status === 1 && (order.status === 'Done' || order.status === 'Pending') && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]){
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 2 && order.status === 'Done' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 3 && order.status === 'Pending' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				} else if (status === 4 && order.status === 'Archived' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
					setSecondData(prevData => {
						return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
					})
				}
			}
		})
	}
	
	React.useEffect(() => {
		kashefExcelData()
		secondExcelData()
	}, [filteredOrders])

	const [inputVisible, setInputVisible] = React.useState(false)
	
	const [addedAreas, setAddedAreas] = React.useState([])

	const handleVisible = () => {
		setInputVisible(prevVisible => !prevVisible)
	}

	
	return (
		<OrdersContext.Provider value={{ setOrders, fetchOrders }}>
			<MainNav />

			<div className="main-body">
				<NavBar className="navbar bg1">
					<span style={{fontSize: '1.4rem'}}>Clients</span>
					<div>
						{!isMobile && 
						<Button variant="contained" style={{marginRight: "2rem", backgroundColor: "#3e8c4b", fontFamily: "'Rubik', sans-serif"}} startIcon={<BsFiletypeDocx />}>
							<CSVLink 
								data={secondData} 
								filename={status === 1 ? "data2-all" : status === 2 ? "data2-done" : "data2-pending"}
								style={{textDecoration: 'none', color: '#fff'}} 
							>
								{"ايصال"}
							</CSVLink>
						</Button>}
						{!isMobile && <ExportToWord orders={data} filteredOrders={filteredOrders} />}
						<Button onClick={handleClickOpen} variant="contained" startIcon={<BsFillPatchPlusFill />} style={{fontFamily: "'Rubik', sans-serif"}}>{"إضافة الطلبية"}</Button>
					</div>
				</NavBar>

				<MyTable setQuery={setQuery} setStatus={setStatus} status={status} setDateFilter={setDateFilter} dateFilter={dateFilter}>
					{filteredOrders.map((order) => {
						let orderDate = new Date(order.date)
						if (dateFilter == null) {
							if (status === 1 && (order.status === 'Done' || order.status === 'Pending')){
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 2 && order.status === 'Done') {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 3 && order.status === 'Pending') {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 4 && order.status === 'Archived') {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							}
						} else {
							if (status === 1 && (order.status === 'Done' || order.status === 'Pending') && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]){
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 2 && order.status === 'Done' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 3 && order.status === 'Pending' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 4 && order.status === 'Archived' && orderDate >= dateFilter[0] && orderDate <= dateFilter[1]) {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							}
						}
							
						}
					)
					}		
				</MyTable>
			</div>

			<OrderModal open={open} 
				handleClose={handleClose} 
				addOrder={addOrder} 
				addedAreas={addedAreas}
				setAddedAreas={setAddedAreas}
				inputVisible={inputVisible} 
				setOrderId={setOrderId} 
				setDealerName={setDealerName}
				setClientName={setClientName}
				setLocation={setLocation}
				setOrderDollar={setOrderDollar}
				setOrderLBP={setOrderLBP}
				setDelivery={setDelivery}
				setDeliveryCurrency={setDeliveryCurrency}
				setDriverTax={setDriverTax}
				setDriverTaxCurrency={setDriverTaxCurrency}
				setItems={setItems}
				setDate={setDate}
				handleVisible={handleVisible}
				user={user}
				type={type}
			/>
			
			{isMobile && 
				<>
					<BottomNav value={value} setValue={setValue}/>
				</>
			}

			
		</OrdersContext.Provider>
	)
}

export { OrdersContext }