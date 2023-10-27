import React from 'react'

export function Input(props) {

  const options = [] // options for dropwodn menu
  let defaultOption = props.data.types[props.data.type] // loading items for dropdown menu from react state via props

  // constructing dropdown menu from given items
  props.data.types.forEach((option) => {
    options.push(<option key={option} value={option}>{option}</option>)
  })

  return (
    <div>
      <input type="number" value={props.data.count} className="numInput rightMargin" onChange={props.handleChange} name="count" />
      <select onChange={props.handleChange} value={defaultOption} name="type" className="rightMargin">
        {options}
      </select>
      <input type="checkbox" className="checkInput" checked={props.data.firstWords} onChange={props.handleChange} name="firstWords" id="firstWordsCheckbox" />
      <label htmlFor="firstWordsCheckbox">Always begin with "<i>Lorem ipsum</i>"</label>
    </div>
  )
}
