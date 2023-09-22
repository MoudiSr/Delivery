import React from "react"
import MainNav from "./MainNav"
import BottomNav from "./BottomNav"
import { isMobile } from "react-device-detect"
import NavBar from "./NavBar"
import Button from '@mui/material/Button'
import {FaDollarSign} from "react-icons/fa"
import { BsFillPatchPlusFill } from "react-icons/bs"
import ExpensesTable from "./ExpensesTable"
import ExpensesTableRow from "./ExpensesTableRow"
import axios from "axios"
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const ExpensesPage = ({value, setValue, user}) => {
	const [expenses, setExpenses] = React.useState([])
	const [open, setOpen] = React.useState(false)

	const [date, setDate] = React.useState("")
    const [paymentType, setPaymentType] = React.useState("")
	const [amountDollar, setAmountDollar] = React.useState("")
	const [amountLBP, setAmountLBP] = React.useState(0)
	const [paymentId, setPaymentId] = React.useState(0)

	const fetchExpenses = async () => {
	    const { data } = await axios.get(
	      "https://httpservercontrol.mostspecialdelivery.tech/api/expenses/?format=json"
	    )
	    setExpenses(data)
	}
	const addExpenses = async (e) => {
		e.preventDefault()
		const data = {payment_id: paymentId, payment_type: paymentType, amount_dollar: amountDollar, amount_lbp: amountLBP, date: date, user: user}
		const response = await axios.post('https://httpservercontrol.mostspecialdelivery.tech/api/expenses/', data)
		setOpen(false)
		setDate("")
		setPaymentType("")
		setAmountDollar(0)
		setAmountLBP(0)
		setPaymentId(0)
	}

	const handleClickOpen = () => {
	    setOpen(true)
	}

	  const handleClose = () => {
	    setOpen(false)
	}

	React.useEffect(() => {
		fetchExpenses()
	}, [open])

	return (
		<>
			<MainNav />
			<div className="main-body">
				<NavBar className="navbar bg1">
					<span style={{fontSize: '1.4rem'}}>Expenses</span>
					<div>
						<Button onClick={handleClickOpen} variant="contained" style={{fontFamily: "'Rubik', sans-serif"}}><BsFillPatchPlusFill /></Button>
					</div>
				</NavBar>
				<ExpensesTable>
					{expenses.map((expense) => {
						return <ExpensesTableRow key={expense.id} payment_id={expense.payment_id} payment_type={expense.payment_type} amount_dollar={expense.amount_dollar} amount_lbp={expense.amount_lbp} date={expense.date} user={expense.user} />
					})}
				</ExpensesTable>
				<Dialog open={open} onClose={handleClose}>
			        <DialogTitle style={{fontFamily: "'Rubik', sans-serif"}}>Add Expenses</DialogTitle>
			        <DialogContent>
			        	<fieldset class="form-fieldset" style={{textAlign: 'left'}}>

							<div class="mb-3">
		        		    	<label class="form-label required">رقم الإيصال</label>
		        		    	<input type="number" class="form-control" autocomplete="off" onChange={e => setPaymentId(e.target.value)}/>
		        		  	</div>

			        		<div class="mb-3">
		        		    	<label class="form-label required">نوع الصرف</label>
		        		    	<input type="text" class="form-control" autocomplete="off" onChange={e => setPaymentType(e.target.value)}/>
		        		  	</div>

		        		  	<div class="mb-3">
								<label class="form-label required">المبلغ</label>
								<div style={{display: "flex"}}>
									<div className="input-icon">
										<span class="input-icon-addon" style={{fontSize: '16px'}}>
											<FaDollarSign />
										</span>
										<input type="number"  class="form-control" autocomplete="off" onChange={e => setAmountDollar(e.target.value)}/>
									</div>
									<div className="input-icon" style={{marginLeft: '1rem'}}>
										<span class="input-icon-addon" style={{fontSize: '14px'}}>
											LBP
										</span>
										<input type="number"  class="form-control" autocomplete="off" onChange={e => setAmountLBP(e.target.value)}/>
									</div>
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
			          <Button onClick={addExpenses} style={{fontFamily: "'Rubik', sans-serif"}}>Add</Button>
			        </DialogActions>
				</Dialog>
				{isMobile && <BottomNav value={value} setValue={setValue}/>}
			</div>
		</>
	)
}

export default ExpensesPage