import React from 'react'

// takes value to be copied to clipboard and element in which it displays message about successful copying to clipboard
export function copyToClipboard(valueToBeCopied, displayElement) {
  navigator.clipboard.writeText(valueToBeCopied)
    .then(result => {
      displayElement.innerHTML = 'Copied!'
      setTimeout(() => {
        displayElement.innerHTML = ''
      }, 1500)
    })
    .catch(error => {
      console.error(error)
    })
}

// takes jsxContent and title and renders clickable title which will show/hide jsx content under the title
export function showHideHtml(jsxContent, title) {

  // toggle visibility of element
  const toggleContent = () => {
    const elm = document.getElementById('showHideBlock')
    if (elm.style.display === 'none') { // toggling
      elm.style.display = 'inline'
    } else {
      elm.style.display = 'none'
    }
  }

  const heading = (
    <p className="fakeAnchor" onClick={toggleContent}>
      <b>Show/hide {title}</b>
    </p>
  )

  return (
    <div>
      { heading }
      <div style={{display: 'none'}} id="showHideBlock">
        { jsxContent }
      </div>
    </div>
  )
}
