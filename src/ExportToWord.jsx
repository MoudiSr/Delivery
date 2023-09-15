import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'
import { saveAs } from 'file-saver';
import PizZipUtils from "pizzip/utils/index.js"
import Button from '@mui/material/Button'
import {BsFiletypeDocx} from "react-icons/bs"

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const ExportToWord = ({orders}) => {

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
                totalDollar += parseFloat(order.TotalInDollar.replaceAll(',', ''))
                totalLBP += parseFloat(order.TotalInLBP.replaceAll(',', ''))
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
             }); //Output the document using Data-URI
             saveAs(out, "output.docx");
           });
         };

  return (
    <Button onClick={generateDocument} variant="contained" style={{marginRight: "2rem", backgroundColor: "#3e8c4b", fontFamily: "'Rubik', sans-serif"}} startIcon={<BsFiletypeDocx />}>{"كشف حساب"}</Button>
  );
};

export default ExportToWord;
