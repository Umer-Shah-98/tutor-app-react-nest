import React, { Children } from 'react'

const Card = (props) => {
  return (
    <div className='rounded shadow-md bg-green-300 w-32'>
          {props.Children}
    </div>
  )
}

export default Card
