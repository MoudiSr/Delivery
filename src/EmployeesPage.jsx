import React from "react"
import MainNav from "./MainNav"
import BottomNav from "./BottomNav"
import { isMobile } from "react-device-detect"
import NavBar from "./NavBar"
import Button from '@mui/material/Button'
import { BsFillPatchPlusFill } from "react-icons/bs"
import EmployeeTable from "./EmployeeTable"
import EmployeeTableRow from "./EmployeeTableRow"
import axios from "axios"
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const EmployeesPage = ({value, setValue, user}) => {
	const [employees, setEmployees] = React.useState([])
	const [open, setOpen] = React.useState(false)

	const [name, setName] = React.useState("")
	const [date, setDate] = React.useState("")
	const [payment, setPayment] = React.useState("")
	const [quantity, setQuantity] = React.useState(0)
	const [currency, setCurrency] = React.useState("")
	const [paymentId, setPaymentId] = React.useState(0)

	const fetchEmployees = async () => {
	    const { data } = await axios.get(
	      "https://143.198.216.137/api/employees/?format=json"
	    )
	    setEmployees(data)
	}
	const addEmployee = async (e) => {
		e.preventDefault()
		const data = {payment_id: paymentId, name: name, payment: payment, quantity: quantity, currency: currency, date: date, user: user}
		const response = await axios.post('https://143.198.216.137/api/employees/', data)
		setOpen(false)
		setName("")
		setPayment("")
		setQuantity(0)
		setCurrency("")
		setDate("")
	}

	const handleClickOpen = () => {
	    setOpen(true)
	}

	  const handleClose = () => {
	    setOpen(false)
	}

	React.useEffect(() => {
		fetchEmployees()
	}, [open])

	return (
		<>
			<MainNav />
			<div className="main-body">
				<NavBar className="navbar bg1">
					<span style={{fontSize: '1.4rem'}}>Employees</span>
					<div>
						<Button onClick={handleClickOpen} variant="contained" style={{fontFamily: "'Rubik', sans-serif"}}><BsFillPatchPlusFill /></Button>
					</div>
				</NavBar>
				<EmployeeTable>
					{employees.map((employee) => {
						return <EmployeeTableRow key={employee.id} paymentId={employee.payment_id} name={employee.name} payment={employee.payment} quantity={employee.quantity} currency={employee.currency} date={employee.date} user={employee.user}/>
					})}
				</EmployeeTable>
				<Dialog open={open} onClose={handleClose}>
			        <DialogTitle style={{fontFamily: "'Rubik', sans-serif"}}>Add Payment</DialogTitle>
			        <DialogContent>
			        	<fieldset class="form-fieldset" style={{textAlign: 'left'}}>

							<div class="mb-3">
		        		    	<label class="form-label required">رقم الإيصال</label>
		        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setPaymentId(e.target.value)}/>
		        		  	</div>

			        		<div class="mb-3">
		        		    	<label class="form-label required">اسم الموظف</label>
		        		    	<input type="text" class="form-control" autocomplete="off" onChange={e => setName(e.target.value)}/>
		        		  	</div>

		        		  	<div class="mb-3">
		        		  	  <label class="form-label required">القسط</label>
		        		  	  <div class="form-selectgroup">
		        		  	    <label class="form-selectgroup-item">
		        		  	      <input type="radio" name="payment" value="سلفة" class="form-selectgroup-input" onClick={e => setPayment(e.target.value)}/>
		        		  	      <span class="form-selectgroup-label">سلفة</span>
		        		  	    </label>
		        		  	    <label class="form-selectgroup-item">
		        		  	      <input type="radio" name="payment" value="معاش" class="form-selectgroup-input" onClick={e => setPayment(e.target.value)}/>
		        		  	      <span class="form-selectgroup-label">معاش</span>
		        		  	    </label>
		        		  	  </div>
		        		  	</div>

		        		  	<div class="mb-3">
		        		    	<label class="form-label required">المبلغ</label>
		        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setQuantity(e.target.value)} />
		        		  	</div>

		        		  	<div class="mb-3">
		        		  	  <label class="form-label required">العملة</label>
		        		  	  <div class="form-selectgroup">
		        		  	    <label class="form-selectgroup-item">
		        		  	      <input type="radio" name="currency" value="dollar" class="form-selectgroup-input" onClick={e => setCurrency(e.target.value)}/>
		        		  	      <span class="form-selectgroup-label">$</span>
		        		  	    </label>
		        		  	    <label class="form-selectgroup-item">
		        		  	      <input type="radio" name="currency" value="lebanese" class="form-selectgroup-input" onClick={e => setCurrency(e.target.value)}/>
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
								<label>{user}</label>
		        		  	</div>

			        	</fieldset>
			        </DialogContent>
			        <DialogActions>
			          <Button onClick={handleClose} style={{fontFamily: "'Rubik', sans-serif"}}>Cancel</Button>
			          <Button onClick={addEmployee} style={{fontFamily: "'Rubik', sans-serif"}}>Add</Button>
			        </DialogActions>
				</Dialog>
				{isMobile && <BottomNav value={value} setValue={setValue}/>}
			</div>
		</>
	)
}

export default EmployeesPage