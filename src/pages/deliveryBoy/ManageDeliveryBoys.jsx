import React from 'react'
import Header from '../../components/Header'
import ManageDeliveryBoysTable from '../../components/table/ManageDeliveryBoysTable'

const ManageDeliveryBoys = () => {
  return (
   
      <div className="overflow-y-hidden">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <ManageDeliveryBoysTable />
        </div>
      </div>
  )
}

export default ManageDeliveryBoys