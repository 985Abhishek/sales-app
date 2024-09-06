import React from 'react'
import ShowSales from '../components/forms/ShowSales'
import './ShowSalesPage.css'

const ShowSalesPage = () => {
  return (
    <div className = "showsales">
       <h1>Transaction Records</h1>  
      <ShowSales />
    </div>
  )
}

export default ShowSalesPage
