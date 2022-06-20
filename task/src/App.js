import React from 'react'
import Form from './Form'

export default function App(props) {
  
  return (
    <div>
      <h1>Crud Operation {props.name} </h1>
      <Form />
    </div>
  )
}
