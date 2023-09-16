import React from "react"
import "./delivery.css"
import { BsFillPatchPlusFill, BsFiletypeDocx } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai"
import {FaDollarSign} from "react-icons/fa"
import MyTable from "./Table"
import MyTableRow from "./TableRow"
import axios from "axios"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { isMobile } from "react-device-detect"
import { useNavigate } from "react-router-dom"
import MainNav from "./MainNav"
import NavBar from "./NavBar"
import { CSVLink } from "react-csv"
import BottomNav from "./BottomNav"
import ExportToWord from "./ExportToWord"
import Collapse from '@mui/material/Collapse'


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
	const [date, setDate] = React.useState("")
	const [orderId, setOrderId] = React.useState("")


	const handleClickOpen = () => {
	    setOpen(true)
	}

	  const handleClose = () => {
	    setOpen(false)
		setInputVisible(false)
	}

	const fetchOrders = async () => {
	    const response = await fetch("https://httpservercontrol.mostspecialdelivery.tech/api/orders/?format=json")
		const jsonData = await response.json()
	    setOrders(jsonData)
	}


	React.useEffect(() => {
		fetchOrders()
	}, [open])

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
		
	}

	const [dateRange, setDateRange] = React.useState([
		new Date(),
		new Date()
	])

	const [dateChanged, setDateChanged] = React.useState(0)

	const [query, setQuery] = React.useState('')


	const [status, setStatus] = React.useState(3)

	const [specificOrders, setSpecificOrders] = React.useState([])

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

		if (specificOrders.length == 0) {
			setSpecificOrders(orders)
		}
	}

	React.useEffect(() => {
		fetchSpecificOrders()
	}, [status])

	const filteredOrders = specificOrders.length === 0 ? 
		orders.filter((order) => (
			order.dealer_name.toLowerCase().includes(query) ||
			order.client_name.toLowerCase().includes(query) ||
			order.order_id.toString().includes(query)
	)
	) : specificOrders.filter((order) => (
						order.dealer_name.toLowerCase().includes(query) ||
						order.client_name.toLowerCase().includes(query) ||
						order.order_id.toString().includes(query)
		)
	)

	const dateFilteredOrders = filteredOrders.filter(order => {
			if (order.date >= dateRange[0] && order.date <= dateRange[1]){
				return [...orders, order]
			}
		})

	
	const [data, setData] = React.useState([])

	const kashefExcelData = () => {
		setData([])
		filteredOrders.map(order => {
			setData(prevData => {
				return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Client: order.client_name, Area: order.location, OrderDollar: order.order_Dollar.toLocaleString(), OrderLBP: order.order_LBP.toLocaleString(), Delivery: order.delivery.toLocaleString(), isDollarDelivery: order.delivery_currency === "dollar" ? true : false, TotalInDollar: order.final_amount_Dollar.toLocaleString(), TotalInLBP: order.final_amount_LBP.toLocaleString()}]
			})
		})
	}

	const [secondData, setSecondData] = React.useState([])

	const secondExcelData = () => {
		setSecondData([])
		filteredOrders.map(order => {
			setSecondData(prevData => {
				return [...prevData, {ID: order.order_id, Date: order.date, Dealer: order.dealer_name, Driver_Tax: order.driver_tax, Remaining_Amount_Dollar: order.remaining_amount_Dollar, Remaining_Amount_LBP: order.remaining_amount_LBP}]
			})
		})
	}
	
	React.useEffect(() => {
		kashefExcelData()
		secondExcelData()
	}, [filteredOrders])

	const [inputVisible, setInputVisible] = React.useState(false)
	const [inputText, setInputText] = React.useState("")
	const [addedAreas, setAddedAreas] = React.useState([])

	const handleVisible = () => {
		setInputVisible(prevVisible => !prevVisible)
	}

	const addArea = () => {
		if (inputText.length > 0){
			setAddedAreas(prevData => [...prevData, inputText])
			document.getElementById("addAreaInput").value = ""
			setInputText("")
			handleVisible()
		}
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
						{!isMobile && <ExportToWord orders={data}/>}
						<Button onClick={handleClickOpen} variant="contained" startIcon={<BsFillPatchPlusFill />} style={{fontFamily: "'Rubik', sans-serif"}}>{"إضافة الطلبية"}</Button>
					</div>
				</NavBar>

				<MyTable setQuery={setQuery} setStatus={setStatus} status={status} dateRange={dateRange} setDateRange={setDateRange} setDateChanged={setDateChanged}>
					{dateFilteredOrders.map((order) => { 
							if (status === 1){
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 2 && order.status === 'Done') {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							} else if (status === 3 && order.status === 'Pending') {
								return <MyTableRow key={order.id} id={order.id} order_id={order.order_id} dealer_name={order.dealer_name} client_name={order.client_name} location={order.location} order_Dollar={order.order_Dollar} order_LBP={order.order_LBP} delivery={order.delivery} delivery_currency={order.delivery_currency} final_amount_LBP={order.final_amount_LBP} final_amount_Dollar={order.final_amount_Dollar} driver_tax={order.driver_tax} driver_tax_Currency={order.driver_tax_Currency} remaining_amount_Dollar={order.remaining_amount_Dollar} remaining_amount_LBP={order.remaining_amount_LBP} items={order.items} date={order.date} user={order.user} status={order.status} />
							}
							
						}
					)
					}		
				</MyTable>
			</div>

			<Dialog open={open} onClose={handleClose}>
		        <DialogTitle style={{fontFamily: "'Rubik', sans-serif"}}>Add Order</DialogTitle>
		        <DialogContent>
		          <fieldset class="form-fieldset" style={{textAlign: 'left'}}>
				  	<div class="mb-3">
        		    	<label class="form-label required">رقم الإيصال</label>
        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setOrderId(e.target.value)}/>
        		  	</div>
	        		<div class="mb-3">
        		    	<label class="form-label required">اسم التاجر</label>
        		    	<input type="text" class="form-control" autocomplete="off" onChange={e => setDealerName(e.target.value)}/>
        		  	</div>
					  <div class="mb-3">
        		    	<label class="form-label required">اسم الزبون</label>
        		    	<input type="text" class="form-control" autocomplete="off" onChange={e => setClientName(e.target.value)}/>
        		  	</div>

        		  	<div class="mb-3">
        		  	  <label class="form-label required">المنطقة</label>
        		  	  <div class="form-selectgroup">
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="صيدا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">صيدا</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="صور" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">صور</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="بنت جبيل" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">بنت جبيل</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="الناقورة" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">الناقورة</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="عيتا الشعب" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">عيتا الشعب</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="حاصبيا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">حاصبيا</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="مرجعيون" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">مرجعيون</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="النبطية" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">النبطية</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="بيروت" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">بيروت</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="جزين" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">جزين</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="اقليم التفاح" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">اقليم التفاح</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="النبطية الفوقا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">النبطية الفوقا</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="الشوف" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">الشوف</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="جبال" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">جبال</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="المتن" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">المتن</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="كسروان" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">كسروان</span>
        		  	    </label>
        		  	    <label class="form-selectgroup-item">
        		  	      <input type="radio" name="region" value="الشمال" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
        		  	      <span class="form-selectgroup-label">الشمال</span>
        		  	    </label>
						{addedAreas.map(area => (
							<label class="form-selectgroup-item">
								<input type="radio" name="region" value={area} class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
								<span class="form-selectgroup-label">{area}</span>
							</label>
						))}
						<label class="form-selectgroup-item">
							<button className="btn btn-light" onClick={handleVisible}>{inputVisible ?  <AiOutlineClose /> : <AiOutlinePlus />}</button>
        		  	    </label>
							
        		  	  </div>
        		  	</div>

					<Collapse in={inputVisible}>
						<div className="mb-3">
							<label className="form-label">اسم المنطقة</label>
							<div style={{display: 'flex'}}>
								<input type="text" id="addAreaInput" class="form-control" autocomplete="off" style={{marginRight: '1rem'}} onChange={e => setInputText(e.target.value)}/>
								<button className="btn btn-dark" onClick={addArea}><AiOutlinePlus /></button>
							</div>
						</div>
					</Collapse>

					<div class="mb-3">
        		    	<label class="form-label required">الطلبية</label>
        		    	<input type="text" class="form-control" autocomplete="off" onChange={e => setItems(e.target.value)}/>
        		  	</div>

        		  	<div class="mb-3">
        		    	<label class="form-label required">الديليفيري</label>
        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setDelivery(e.target.value)}/>
        		  	</div>

					<div class="mb-3">
						<div class="form-selectgroup">
						<label class="form-selectgroup-item">
							<input type="radio" name="ordercurrency" value="dollar" class="form-selectgroup-input" onClick={e => setDeliveryCurrency(e.target.value)}/>
							<span class="form-selectgroup-label">$</span>
						</label>
						<label class="form-selectgroup-item">
							<input type="radio" name="ordercurrency" value="lebanese" class="form-selectgroup-input" onClick={e => setDeliveryCurrency(e.target.value)}/>
							<span class="form-selectgroup-label">LBP</span>
						</label>
						</div>
					</div>

        		  	<div class="mb-3">
        		    	<label class="form-label required">سعر الطلبية</label>
						<div style={{display: "flex"}}>
							<div className="input-icon">
								<span class="input-icon-addon" style={{fontSize: '16px'}}>
									<FaDollarSign />
								</span>
								<input type="number"  class="form-control" autocomplete="off" onChange={e => setOrderDollar(e.target.value)}/>
							</div>
							<div className="input-icon" style={{marginLeft: '1rem'}}>
								<span class="input-icon-addon" style={{fontSize: '14px'}}>
									LBP
								</span>
								<input type="number"  class="form-control" autocomplete="off" onChange={e => setOrderLBP(e.target.value)}/>
							</div>
						</div>
        		  	</div>

					<div class="mb-3">
        		    	<label class="form-label required">أجرة السائق</label>
        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setDriverTax(e.target.value)}/>
        		  	</div>

					  <div class="mb-3">
						<div class="form-selectgroup">
						<label class="form-selectgroup-item">
							<input type="radio" name="taxcurrency" value="dollar" class="form-selectgroup-input" onClick={e => setDriverTaxCurrency(e.target.value)}/>
							<span class="form-selectgroup-label">$</span>
						</label>
						<label class="form-selectgroup-item">
							<input type="radio" name="taxcurrency" value="lebanese" class="form-selectgroup-input" onClick={e => setDriverTaxCurrency(e.target.value)}/>
							<span class="form-selectgroup-label">LBP</span>
						</label>
						</div>
					</div>

        		  	<div class="mb-3">
        		    	<label class="form-label required">التاريخ</label>
        		    	<input type="date" class="form-control" autocomplete="off" onChange={e => setDate(e.target.value)}/>
        		  	</div>

        		  	<div class="mb-3">
        		    	<label class="form-label required">المستخدم</label>
        		    	<label class="">{user}</label>
        		  	</div>

		          </fieldset>
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