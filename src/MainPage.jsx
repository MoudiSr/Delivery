import React from "react"
import MainNav from "./MainNav"
import BottomNav from "./BottomNav"
import { isMobile } from "react-device-detect"

const MainPage = ({value, setValue}) => {
	const [orders, setOrders] = React.useState([])
	const [employees, setEmployees] = React.useState([])
	const [deliveryAmountInDollar, setDeliveryAmountInDollar] = React.useState(0)
	const [deliveryAmountInLBP, setDeliveryAmountInLBP] = React.useState(0)
	const [expensesInDollar, setExpensesInDollar] = React.useState(0)
	const [expensesInLBP, setExpensesInLBP] = React.useState(0)
	const [profitInDollar, setProfitInDollar] = React.useState(0)
	const [profitInLBP, setProfitInLBP] = React.useState(0)
	const [expenses, setExpenses] = React.useState([])

	const fetchOrders = async () => {
	    
		const response = await fetch("https://httpservercontrol.mostspecialdelivery.tech/api/orders/?format=json")
		const jsonData = await response.json()
	    setOrders(jsonData)

	    setDeliveryAmountInDollar(0)
		setDeliveryAmountInLBP(0)
	    orders.map((order) => {
			setDeliveryAmountInDollar(prevAmount => order.delivery_currency === "dollar" ? prevAmount+order.delivery : prevAmount+0)
			setDeliveryAmountInLBP(prevAmount => order.delivery_currency !== "dollar" ? prevAmount+order.delivery : prevAmount+0)
		})
	}
	

	const fetchEmployees = async () => {
	    
		const response = await fetch("https://httpservercontrol.mostspecialdelivery.tech/api/employees/?format=json")
		const jsonData = await response.json()
	    setEmployees(jsonData)

		const response1 = await fetch("https://httpservercontrol.mostspecialdelivery.tech/api/expenses/?format=json")
		const jsonData1 = await response1.json()
	    setExpenses(jsonData1)

        setExpensesInDollar(0)
		setExpensesInLBP(0)
        employees.map((employee) => {
			if (employee.currency === 'dollar') {
				setExpensesInDollar(prevExpenses => prevExpenses+employee.quantity)
			} else {
				setExpensesInLBP(prevExpenses => prevExpenses+employee.quantity)
			}
    	}) 

		expenses.map((exp) => {
			setExpensesInDollar(prevExpenses => prevExpenses+exp.amount_dollar)
			setExpensesInLBP(prevExpenses => prevExpenses+exp.amount_lbp)
		})

		orders.map((order) => {
			if (order.driver_tax_Currency === 'dollar'){
				setExpensesInDollar(prevExpenses => prevExpenses+order.driver_tax)
			} else {
				setExpensesInLBP(prevExpenses => prevExpenses+order.driver_tax)
			}
		})
    	setProfitInDollar(deliveryAmountInDollar-expensesInDollar)
		setProfitInLBP(deliveryAmountInLBP-expensesInLBP)
	}


	React.useEffect(() => {
		fetchOrders()
		fetchEmployees()
	}, [orders])
	

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