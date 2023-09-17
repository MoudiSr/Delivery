import React from "react"
import { BsSearch } from "react-icons/bs"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';



export default function MyTable({children, setQuery, setStatus, status, selectionRange, handleSelect}) {

	return (
		<>

		<div class="wrapper">
			<div class="icon">
				<BsSearch />
			</div>
			<input type="text" className="form-control input" style={{marginBottom: '1rem'}} placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
		</div>
		
		<div style={{display: 'flex', marginBottom: '1rem'}}>
		
			<DateRangePicker 
				ranges={[selectionRange]}
				onChange={handleSelect}
			/>
			<select className="form-select" style={{marginLeft: '.5rem', borderRadius: '1rem'}} onChange={e => setStatus(parseInt(e.target.value, 10))} value={status}>
				<option value="1">All</option>
				<option value="2">Done</option>
				<option value="3">Pending</option>
			</select>
		</div>
	    <TableContainer component={Paper} style={{marginBottom: '10vh'}}>
          	<Table sx={{ minWidth: 650 }} aria-label="simple table">
            	<TableHead>
              		<TableRow>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>رقم الإيصال</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>اسم التاجر</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>اسم الزبون</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المنطقة</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>الطلبية</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>سعر الطلبية</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>ديليفيري</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المبلغ النهائي</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>أجرة السائق</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المتبقي للشركة</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>التاريخ</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>المستخدم</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>الحالة</TableCell>
		                <TableCell align="center" style={{ fontWeight: '700', whiteSpace: 'nowrap', backgroundColor: "#f8fafc", color: "#797f8b", fontFamily: "'Rubik', sans-serif" }}>اجراءات</TableCell>
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