import React, { useState } from 'react'
import AddHomeSliderImageForm from '../../components/form/AddHomeSliderImageForm'
import Header from '../../components/Header'
import ManageHomeSliderTable from '../../components/table/ManageHomeSliderTable'

const AddHomeSlider = ({homeSlider, onClose}) => {
  const [showAddSlider, setShowAddSlider] = useState(true);

  return (
    <div className="overflow-y-hidden">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <ManageHomeSliderTable />
          {showAddSlider && (
          <>
          <div className="fixed inset-0 bg-black/75" onClick={onClose} ></div>
          <div  >
            <AddHomeSliderImageForm homeSlider={homeSlider} onClose ={onClose} />
          </div>
          </>
        )}
        </div>
      </div>
  )
}

export default AddHomeSlider