import PulseLoader from "react-spinners/PulseLoader";
import React , { useState } from 'react'

export const Loading = () => {
    let [loading, setLoading] = useState(true);

  return (

    <div className="sweet-loading mt-[150px] flex justify-center">
        <PulseLoader 
        color="red"
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader" />
    </div>
    
  )
}
