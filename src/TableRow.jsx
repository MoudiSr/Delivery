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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function MyTableRow({id, order_id, dealer_name, client_name, location, order_price, order_currency, delivery_LBP, delivery_Dollar, final_amount_LBP, final_amount_Dollar, driver_tax, driver_tax_Currency, remaining_amount_LBP, remaining_amount_Dollar, items, date, user, status}) {
	
	const { setOrders, fetchOrders } = React.useContext(OrdersContext)

	const handleDelete = async (e) => {
		e.preventDefault()
		setOpen(false)
		await axios.delete(`http://209.97.175.170:8000/api/orders/${id}/`)
		fetchOrders()
	}

	const handleStatus = async (e) => {
		e.preventDefault()
		setOpen1(false)
		await axios.put(`http://209.97.175.170:8000/api/orders/${id}/`, {
			id, 
			order_id, 
			dealer_name, 
			client_name, 
			location, 
			order_price, 
			order_currency, 
			delivery_LBP, 
			delivery_Dollar, 
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

	const [open, setOpen] = React.useState(false)

	const [open1, setOpen1] = React.useState(false)

	return (
		<>
		<TableRow>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{order_id}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{dealer_name}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{client_name}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{location}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{items}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{order_price.toLocaleString()}{order_currency === 'dollar' ? '$' : " LBP"}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{delivery_Dollar.toLocaleString()} $ / {delivery_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{final_amount_Dollar.toLocaleString()} $ / {final_amount_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{driver_tax.toLocaleString()}{driver_tax_Currency === 'dollar' ? '$' : ' LBP'}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{remaining_amount_Dollar.toLocaleString()} $ / {remaining_amount_LBP.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', fontFamily: "'Rubik', sans-serif" }}>{date}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{user}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>
				<span className={status === 'Pending' ? "status status-yellow" : "status status-green"}>
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
		</>
	)
}