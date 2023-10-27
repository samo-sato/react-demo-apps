import React from 'react'
import { copyToClipboard } from '../../genericFunctions.js'

export function List(props) {

  const handleCopy = (e) => {
    let index = e.target.attributes.index.value
    copyToClipboard(e.target.innerHTML, document.getElementById(`msgContainer${index}`))
  }

  const items = []
  props.symbols.forEach((value, index) => {
    items.push(
      <div key={index} className="mainContainer">
        <div className="symbolContainer" onClick={handleCopy} index={index} title="Copy symbol to clipboard" >
          {value.symbol}
        </div>
        <div className="bottomContainer">
          <div id={'msgContainer' + index} className="msgContainer">
          </div>
          <div className="buttonContainer">
            <span onClick={props.handleRemove} title="Remove this symbol" symbol={value.symbol} role="img" aria-label="Remove">❌</span>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div id="list">
      {items.length > 0 ? items : <p>List is empty</p>}
    </div>
  )
}
