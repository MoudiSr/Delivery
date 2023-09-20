import React from "react"
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Collapse from '@mui/material/Collapse'
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai"
import {FaDollarSign} from "react-icons/fa"
import Button from '@mui/material/Button'


export default function OrderModal({open, handleClose, addOrder, addedAreas, addArea, inputVisible, 
    setDealerName,
    setClientName,
    setLocation,
    setOrderDollar,
    setOrderLBP,
    setDelivery,
    setDeliveryCurrency,
    setDriverTax,
    setDriverTaxCurrency,
    setItems,
    setDate,
    setOrderId,
    handleVisible,
    user
  }) {
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{fontFamily: "'Rubik', sans-serif"}}>Add Order</DialogTitle>
        <DialogContent>
          <fieldset class="form-fieldset" style={{textAlign: 'left'}}>
              <div class="mb-3">
                <label class="form-label required">رقم الإيصال</label>
                <input type="number" class="form-control" autocomplete="off" onChange={e => setOrderId(e.target.value)}/>
              </div> 
            <div class="mb-3">
                <label class="form-label required">اسم التاجر</label>
                <input type="text" class="form-control" autocomplete="off" onChange={e => setDealerName(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label class="form-label required">اسم الزبون</label>
                <input type="text" class="form-control" autocomplete="off" onChange={e => setClientName(e.target.value)}/>
              </div>

              <div class="mb-3">
                <label class="form-label required">المنطقة</label>
                <div class="form-selectgroup">
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="صيدا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">صيدا</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="صور" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">صور</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="بنت جبيل" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">بنت جبيل</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="الناقورة" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">الناقورة</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="عيتا الشعب" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">عيتا الشعب</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="حاصبيا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">حاصبيا</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="مرجعيون" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">مرجعيون</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="النبطية" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">النبطية</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="بيروت" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">بيروت</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="جزين" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">جزين</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="اقليم التفاح" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">اقليم التفاح</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="النبطية الفوقا" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">النبطية الفوقا</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="الشوف" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">الشوف</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="جبال" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">جبال</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="المتن" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">المتن</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="كسروان" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">كسروان</span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input type="radio" name="region" value="الشمال" class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                    <span class="form-selectgroup-label">الشمال</span>
                  </label>
                {addedAreas.map(area => (
                    <label class="form-selectgroup-item">
                        <input type="radio" name="region" value={area} class="form-selectgroup-input" onClick={e => setLocation(e.target.value)}/>
                        <span class="form-selectgroup-label">{area}</span>
                    </label>
                ))}
                <label class="form-selectgroup-item">
                    <button className="btn btn-light" onClick={handleVisible}>{inputVisible ?  <AiOutlineClose /> : <AiOutlinePlus />}</button>
                  </label>
                    
                </div>
              </div>

            <Collapse in={inputVisible}>
                <div className="mb-3">
                    <label className="form-label">اسم المنطقة</label>
                    <div style={{display: 'flex'}}>
                        <input type="text" id="addAreaInput" class="form-control" autocomplete="off" style={{marginRight: '1rem'}} onChange={e => setInputText(e.target.value)}/>
                        <button className="btn btn-dark" onClick={addArea}><AiOutlinePlus /></button>
                    </div>
                </div>
            </Collapse>

            <div class="mb-3">
                <label class="form-label required">الطلبية</label>
                <input type="text" class="form-control" autocomplete="off" onChange={e => setItems(e.target.value)}/>
              </div>

              <div class="mb-3">
                <label class="form-label required">الديليفيري</label>
                <input type="number" class="form-control" autocomplete="off" onChange={e => setDelivery(e.target.value)}/>
              </div>

            <div class="mb-3">
                <div class="form-selectgroup">
                <label class="form-selectgroup-item">
                    <input type="radio" name="ordercurrency" value="dollar" class="form-selectgroup-input" onClick={e => setDeliveryCurrency(e.target.value)}/>
                    <span class="form-selectgroup-label">$</span>
                </label>
                <label class="form-selectgroup-item">
                    <input type="radio" name="ordercurrency" value="lebanese" class="form-selectgroup-input" onClick={e => setDeliveryCurrency(e.target.value)}/>
                    <span class="form-selectgroup-label">LBP</span>
                </label>
                </div>
            </div>

              <div class="mb-3">
                <label class="form-label required">سعر الطلبية</label>
                <div style={{display: "flex"}}>
                    <div className="input-icon">
                        <span class="input-icon-addon" style={{fontSize: '16px'}}>
                            <FaDollarSign />
                        </span>
                        <input type="number"  class="form-control" autocomplete="off" onChange={e => setOrderDollar(e.target.value)}/>
                    </div>
                    <div className="input-icon" style={{marginLeft: '1rem'}}>
                        <span class="input-icon-addon" style={{fontSize: '14px'}}>
                            LBP
                        </span>
                        <input type="number"  class="form-control" autocomplete="off" onChange={e => setOrderLBP(e.target.value)}/>
                    </div>
                </div>
              </div>

            <div class="mb-3">
                <label class="form-label required">أجرة السائق</label>
                <input type="number" class="form-control" autocomplete="off" onChange={e => setDriverTax(e.target.value)}/>
              </div>

              <div class="mb-3">
                <div class="form-selectgroup">
                <label class="form-selectgroup-item">
                    <input type="radio" name="taxcurrency" value="dollar" class="form-selectgroup-input" onClick={e => setDriverTaxCurrency(e.target.value)}/>
                    <span class="form-selectgroup-label">$</span>
                </label>
                <label class="form-selectgroup-item">
                    <input type="radio" name="taxcurrency" value="lebanese" class="form-selectgroup-input" onClick={e => setDriverTaxCurrency(e.target.value)}/>
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
                <label class="">{user}</label>
              </div>

          </fieldset>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{fontFamily: "'Rubik', sans-serif"}}>Cancel</Button>
          <Button onClick={addOrder} style={{fontFamily: "'Rubik', sans-serif"}}>Add</Button>
        </DialogActions>
    </Dialog>
    )
}