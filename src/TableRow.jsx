import React from "react"
import { BsCheckLg, BsFillTrashFill } from "react-icons/bs"
import axios from "axios"
import { OrdersContext } from "./Delivery"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OrderModal from "./OrderModal"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function MyTableRow({id, order_id, dealer_name, client_name, location, order_Dollar, order_LBP, delivery, delivery_currency, final_amount_LBP, final_amount_Dollar, driver_tax, driver_tax_Currency, remaining_amount_LBP, remaining_amount_Dollar, items, date, user, status}) {
	
	const { setOrders, fetchOrders } = React.useContext(OrdersContext)

	const [dealerName, setDealerName] = React.useState(dealer_name)
	const [clientName, setClientName] = React.useState(client_name)
	const [locationState, setLocation] = React.useState(location)
	const [orderDollar, setOrderDollar] = React.useState(order_Dollar)
	const [orderLBP, setOrderLBP] = React.useState(order_LBP)
	const [deliveryState, setDelivery] = React.useState(delivery)
	const [deliveryCurrency, setDeliveryCurrency] = React.useState(delivery_currency)
	const [driverTax, setDriverTax] = React.useState(driver_tax)
	const [driverTaxCurrency, setDriverTaxCurrency] = React.useState(driver_tax_Currency)
	const [itemsState, setItems] = React.useState(items)
	const [dateState, setDate] = React.useState(date)
	const [orderId, setOrderId] = React.useState(order_id)
	const [statusState, setStatus] = React.useState(status)

	const handleClose = () => {
	    setEditOpen(false)
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

	const [inputVisible, setInputVisible] = React.useState(false)
	
	const [addedAreas, setAddedAreas] = React.useState([])

	const handleVisible = () => {
		setInputVisible(prevVisible => !prevVisible)
	}

	const handleDelete = async (e) => {
		e.preventDefault()
		setOpen(false)
		await axios.delete(`https://httpservercontrol.mostspecialdelivery.tech/api/orders/${id}/`)
		fetchOrders()
	}

	const handleStatus = async (e) => {
		e.preventDefault()
		setOpen1(false)
		await axios.put(`https://httpservercontrol.mostspecialdelivery.tech/api/orders/${id}/`, {
			id, 
			order_id, 
			dealer_name, 
			client_name, 
			location, 
			order_Dollar, 
			order_LBP, 
			delivery, 
			delivery_currency, 
			final_amount_LBP,
			final_amount_Dollar, 
			driver_tax,
			driver_tax_Currency,
			remaining_amount_LBP,
			remaining_amount_Dollar, 
			items, 
			date, 
			user,
			status: "Done",
		})
		fetchOrders()
	}
	
	const editOrder = async (e) => {
		e.preventDefault()

		let finalAmountInDollar = deliveryCurrency === 'dollar' ? parseFloat(deliveryState) : 0
		finalAmountInDollar += parseFloat(orderDollar)

		let finalAmountInLBP = deliveryCurrency !== 'dollar' ? parseFloat(deliveryState) : 0
		finalAmountInLBP += parseFloat(orderLBP)

		let remainingAmountInDollar = deliveryCurrency === 'dollar' ? parseFloat(deliveryState) : 0
		remainingAmountInDollar -= driverTaxCurrency === 'dollar' ? parseFloat(driverTax) : 0

		let remainingAmountInLBP = deliveryCurrency !== 'dollar' ? parseFloat(deliveryState) : 0
		remainingAmountInLBP -= driverTaxCurrency !== 'dollar' ? parseFloat(driverTax) : 0


		setEditOpen(false)
		await axios.put(`https://httpservercontrol.mostspecialdelivery.tech/api/orders/${id}/`, {
			id, 
			order_id: orderId, 
			dealer_name: dealerName, 
			client_name: clientName, 
			location: locationState, 
			order_Dollar: orderDollar, 
			order_LBP: orderLBP, 
			delivery: deliveryState, 
			delivery_currency: deliveryCurrency, 
			final_amount_LBP: finalAmountInLBP,
			final_amount_Dollar: finalAmountInDollar, 
			driver_tax: driverTax,
			driver_tax_Currency: driverTaxCurrency,
			remaining_amount_LBP: remainingAmountInLBP,
			remaining_amount_Dollar: remainingAmountInDollar, 
			items: itemsState, 
			date: dateState, 
			user,
			status: statusState,	
		})
		fetchOrders()
	}

	const [open, setOpen] = React.useState(false)

	const [open1, setOpen1] = React.useState(false)

	const [editOpen, setEditOpen] = React.useState(false)
	const type = "edit"


	return (
		<>
		<TableRow>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{order_id}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{dealer_name}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{client_name}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{location}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{items}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{order_Dollar.toLocaleString()} $ / {order_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{delivery.toLocaleString()}{delivery_currency === 'dollar' ? '$' : " LBP"}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{final_amount_Dollar.toLocaleString()} $ / {final_amount_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{driver_tax.toLocaleString()}{driver_tax_Currency === 'dollar' ? '$' : ' LBP'}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{remaining_amount_Dollar.toLocaleString()} $ / {remaining_amount_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', fontFamily: "'Rubik', sans-serif" }}>{date}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{user}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>
				<span className={status === 'Pending' ? "status status-yellow" : status === 'Done' ? "status status-green" : status === 'Archived' ? "status status-azure" : "status status-red"}>
				  <span className={status === 'Pending' ? "status-dot status-dot-animated" : "status-dot"}></span>
				  {status}
				</span>
			</TableCell>
			<TableCell align="center">
				<div className="dropdown">
					<a href="#" className="btn btn-dark" role="button" data-bs-toggle="dropdown">Actions</a>
					<div class="dropdown-menu">
						<label class="dropdown-item">
							{status === "Pending" && <button className="btn btn-success"  style={{ width: '100%'}} onClick={() => setOpen1(true)}>Finish</button>}
						</label>
						<label class="dropdown-item">
							<button className="btn btn-primary" onClick={() => setEditOpen(true)} style={{ width: '100%'}}>Edit</button>
						</label>
						<label class="dropdown-item">
							<button className="btn btn-danger" onClick={() => setOpen(true)} style={{ width: '100%'}}>Delete</button>
						</label>
					</div>
				</div>
			</TableCell>
		</TableRow>

		<Dialog open={open} onClose={() => setOpen(false)} keepMounted>
	        <DialogTitle style={{textAlign: 'left'}}>
	          <h5>Confirm</h5>
	          <div class="modal-status bg-danger"></div>
	        </DialogTitle>
	        <DialogContent>
	          <DialogContentText style={{textAlign: 'left'}}>
	            <div className="text-secondary">Are you sure, you want to delete this order ?</div>
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={() => setOpen(false)} style={{color: '#242424'}}>Cancel</Button>
	          <Button onClick={handleDelete} autoFocus variant="contained" style={{backgroundColor: '#d63d39'}}>
	            Delete
	          </Button>
	        </DialogActions>
	      </Dialog>

	      <Dialog open={open1} onClose={() => setOpen1(false)} keepMounted>
	        <DialogTitle style={{textAlign: 'left'}}>
	          <h5>Confirm</h5>
	          <div class="modal-status bg-success"></div>
	        </DialogTitle>
	        <DialogContent>
	          <DialogContentText style={{textAlign: 'left'}}>
	            <div className="text-secondary">Are you sure, you want to continue this operation ?</div>
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={() => setOpen1(false)} style={{color: '#242424'}}>Cancel</Button>
	          <Button onClick={handleStatus} autoFocus variant="contained" style={{backgroundColor: '#3e8c4b'}}>
	            OK
	          </Button>
	        </DialogActions>
	      </Dialog>

		  <OrderModal open={editOpen} 
				handleClose={handleClose} 
				addOrder={editOrder} 
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
				setStatus={setStatus}
				status={statusState}
			/>

		</>
	)
}