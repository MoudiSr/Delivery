import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'
import { saveAs } from 'file-saver';
import PizZipUtils from "pizzip/utils/index.js"
import Button from '@mui/material/Button'
import {BsFiletypeDocx} from "react-icons/bs"
import axios from "axios"

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const ExportToWord = ({orders, filteredOrders}) => {

  const handleStatus = async (order) => {
		 await axios.put(`https://httpservercontrol.mostspecialdelivery.tech/api/orders/${order.id}/`, {
			id: order.id, 
      order_id: order.order_id, 
			dealer_name: order.dealer_name, 
			client_name: order.client_name, 
			location: order.location, 
			order_Dollar: order.order_Dollar, 
			order_LBP: order.order_LBP, 
			delivery: order.delivery, 
			delivery_currencyr: order.delivery_currency, 
			final_amount_LBP: order.final_amount_LBP,
			final_amount_Dollar: order.final_amount_Dollar, 
			driver_tax: order.driver_tax,
			driver_tax_Currency: order.driver_tax_Currency,
			remaining_amount_LBP: order.remaining_amount_LBP,
			remaining_amount_Dollar: order.remaining_amount_Dollar, 
			items: order.items, 
			date: order.date, 
			user: order.user,
			status: "Archived",
		}) 
	}

  const generateDocument = () => {
           loadFile("https://httpservercontrol.mostspecialdelivery.tech:4443/root/Files/tableAndLoop2.docx", function (
             error,
             content
           ) {
             if (error) {
               throw error;
             }
             var zip = new PizZip(content);
             var doc = new Docxtemplater(zip, {
               paragraphLoop: true,
               linebreaks: true
             });

             let totalDollar = 0
             let totalLBP = 0

             orders.map(order => {
                totalDollar += parseFloat(order.OrderDollar.replaceAll(',', ''))
                totalLBP += parseFloat(order.OrderLBP.replaceAll(',', ''))
             })
             doc.setData({
              "currentDate": new Date().toLocaleDateString(),
              "delivery_orders": orders,
              "total_in_dollar": totalDollar.toLocaleString(),
              "total_in_LBP": totalLBP.toLocaleString(),
              "numberOfOrders": orders.length
            });
             try {
               doc.render();
             } catch (error) {
               function replaceErrors(key, value) {
                 if (value instanceof Error) {
                   return Object.getOwnPropertyNames(value).reduce(function (
                     error,
                     key
                   ) {
                     error[key] = value[key];
                     return error;
                   },
                   {});
                 }
                 return value;
               }
               console.log(JSON.stringify({ error: error }, replaceErrors));
    
               if (error.properties && error.properties.errors instanceof Array) {
                 const errorMessages = error.properties.errors
                   .map(function (error) {
                     return error.properties.explanation;
                   })
                   .join("\n");
                 console.log("errorMessages", errorMessages);
               }
               throw error;
             }
             var out = doc.getZip().generate({
               type: "blob",
               mimeType:
                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
             });
             saveAs(out, "output.docx");
             filteredOrders.map(order => {
              orders.map(d => { 
                if (d.ID === order.order_id){
                  handleStatus(order)
                }
              })
            })
           })
         };
  

  return (
    <Button onClick={generateDocument} variant="contained" style={{marginRight: "2rem", backgroundColor: "#3e8c4b", fontFamily: "'Rubik', sans-serif"}} startIcon={<BsFiletypeDocx />}>{"كشف حساب"}</Button>
  );
};

export default ExportToWord;
