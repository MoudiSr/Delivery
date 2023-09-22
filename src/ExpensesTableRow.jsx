import React from "react"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export default function EmployeeTableRow({payment_id, payment_type, amount_dollar, amount_lbp, date, user}) {

	return (
		<TableRow>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{payment_id}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{payment_type}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{amount_dollar.toLocaleString()} $ / {amount_lbp.toLocaleString()} LBP</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{date}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{user}</TableCell>
		</TableRow>
		
	)
}