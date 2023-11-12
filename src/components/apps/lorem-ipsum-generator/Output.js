import React from 'react'
import { copyToClipboard, showHideHtml } from '../../genericFunctions.js'

export function Output(props) {

  // copy result to clipboard
  const handleCopyClickcopy = () => {
    copyToClipboard(props.outputString, document.getElementById('clipboardMessage'))
  }

  // formating complete list of source words as JSX
  const jsxWordList = () => {
    let list = []
    props.wordList.forEach((word, index) => { // infobox content
      let inner = index + ' => ' + word // content item (row)
      list.push(<p key={index}>{inner}</p>) // adding item to array
    })
    return <div>{list}</div>
  }

  return (
    <div>
      <p>Output:</p>
      <textarea defaultValue={props.outputString} disabled={true}></textarea>
      <button onClick={handleCopyClickcopy}>Copy to clipboard</button>
      <span id="clipboardMessage" className="leftMargin"></span>
      <p>Number of characters <span title='Including dots, spaces and line breaks' style={{cursor: 'help'}}>(?)</span>: <b>{props.charCount}</b></p>
      { showHideHtml(jsxWordList(), 'words') }
    </div>
  )
}
