import React from 'react'
import CompanyIdentifier from './CompanyIdentifier'
import CompanyDetails from './CompanyDetails'

const CompanyInfo = () => {
  return (
    <div className='flex flex-col gap-10'>
        <CompanyIdentifier/>
        <CompanyDetails/>
    </div>
  )
}

export default CompanyInfo