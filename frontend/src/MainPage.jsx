import React from "react"
import MainNav from "./MainNav"
import BottomNav from "./BottomNav"
import { isMobile } from "react-device-detect"
import axios from "axios"

const MainPage = ({value, setValue}) => {
	const [orders, setOrders] = React.useState([])
	const [employees, setEmployees] = React.useState([])
	const [deliveryAmountInDollar, setDeliveryAmountInDollar] = React.useState(0)
	const [deliveryAmountInLBP, setDeliveryAmountInLBP] = React.useState(0)
	const [expensesInDollar, setExpensesInDollar] = React.useState(0)
	const [expensesInLBP, setExpensesInLBP] = React.useState(0)
	const [profitInDollar, setProfitInDollar] = React.useState(0)
	const [profitInLBP, setProfitInLBP] = React.useState(0)

	const fetchOrders = async () => {
	    const { data } = await axios.get(
	      "http://192.168.88.19:8000/api/orders/?format=json"
	    )
	    setOrders(data)

	    setDeliveryAmountInDollar(0)
		setDeliveryAmountInLBP(0)
	    orders.map((order) => {
			setDeliveryAmountInDollar(prevAmount => prevAmount+order.delivery_Dollar)
			setDeliveryAmountInLBP(prevAmount => prevAmount+order.delivery_LBP)
		})
	}
	

	const fetchEmployees = async () => {
	    const { data } = await axios.get(
	      "http://192.168.88.19:8000/api/employees/?format=json"
	    )
	    setEmployees(data)

        setExpensesInDollar(0)
		setExpensesInLBP(0)
        employees.map((employee) => {
			if (employee.currency === 'dollar') {
				setExpensesInDollar(prevExpenses => prevExpenses+employee.quantity)
			} else {
				setExpensesInLBP(prevExpenses => prevExpenses+employee.quantity)
			}
    	})
    	setProfitInDollar(deliveryAmountInDollar-expensesInDollar)
		setProfitInLBP(deliveryAmountInLBP-expensesInLBP)
	}


	fetchOrders()
	fetchEmployees()
	

	return (
		<>
			<MainNav />
			<div className="main-body">
				<div className={isMobile ? "block" : "flex"}>
					<div className="card" style={{margin: '1rem', width: '85vw', textAlign: 'left'}}>
						<div className="card-body">
							<h3 class="card-title">Delivery Amount</h3>
	    					<p class="text-secondary">Dollar: {deliveryAmountInDollar.toLocaleString()}$</p>
							<p class="text-secondary">Lebanese: {deliveryAmountInLBP.toLocaleString()} LBP</p>
						</div>
					</div>
					<div className="card" style={{margin: '1rem', width: '85vw', textAlign: 'left'}}>
						<div className="card-body">
							<h3 class="card-title">Expenses</h3>
	    					<p class="text-secondary">Dollar: {expensesInDollar.toLocaleString()}$</p>
							<p class="text-secondary">Lebanese: {expensesInLBP.toLocaleString()} LBP</p>
						</div>
					</div>
					<div className="card" style={{margin: '1rem', width: '85vw', textAlign: 'left'}}>
						<div className="card-body">
							<h3 class="card-title">Profit</h3>
	    					<p class="text-secondary">Dollar: {profitInDollar.toLocaleString()}$</p>
							<p class="text-secondary">Lebanese: {profitInLBP.toLocaleString()} LBP</p>
						</div>
					</div>
				</div>
				{isMobile && <BottomNav value={value} setValue={setValue}/>}
			</div>
		</>
	)
}

export default MainPage