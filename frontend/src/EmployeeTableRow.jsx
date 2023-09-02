import React from "react"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export default function EmployeeTableRow({paymentId, name, payment, quantity, currency,date,  user}) {

	return (
		<TableRow>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{paymentId}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{name}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{payment}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{quantity.toLocaleString()} {currency === 'dollar' ? '$' : 'LBP'}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{date}</TableCell>
			<TableCell align="center" style={{ fontWeight: '700', fontFamily: "'Rubik', sans-serif" }}>{user}</TableCell>
		</TableRow>
		
	)
}