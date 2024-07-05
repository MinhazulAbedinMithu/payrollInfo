import React from 'react'

const SideHeading = ({title, subTitle="Tell us more about your payroll"}:any) => {
  return (
    <div className="my-4 min-w-[225px]">
        <h4 className="text-blue-600 font-semibold">
            {title}
        </h4>
        <p className="text-gray-500">{subTitle}</p>
    </div>
  )
}

export default SideHeading