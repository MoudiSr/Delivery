import React from "react"
import { BsSearch } from "react-icons/bs"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EmployeeTable({ children }) {

	return (
		<>
	    <TableContainer component={Paper} style={{marginBottom: '10vh'}}>
          	<Table sx={{ minWidth: 650 }} aria-label="simple table">
            	<TableHead>
              		<TableRow>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>رقم الإيصال</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>اسم الموظف</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>القسط</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المبلغ</TableCell>
						<TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>التاريخ</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المستخدم</TableCell>
		            </TableRow>
            	</TableHead>
            	<TableBody>
            		{ children }
            	</TableBody>
          </Table>
        </TableContainer>
		</>
	)
}