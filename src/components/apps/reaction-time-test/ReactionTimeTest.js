import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { showHideHtml } from '../../genericFunctions.js'

import './ReactionTimeTest.css'

export function ReactionTimeTest() {

  // ***************************************************************************

    // useEffect ran twice workaround
    const effectRan = useRef(false)
    useEffect(() => {
      //console.log(effectRan.current)
      if (effectRan.current === false) {

        // code to execute goes here...
        setJsxContent(page['first']) // render the first page with initial instruction

        return () => {
          effectRan.current = true
        }
      }

    }, [])

  // ***************************************************************************

  const [jsxContent, setJsxContent] = useState('Loading...') // page content will be changed here
  const [diff, setDiff] = useState(null)

  let timeStart = null // timestamp of prompt
  let timeEnd = null // timestamp of user reaction on the prompt
  let cheating = false // user is cheating or not

  const minWaitingTime = 1000 // minimum time user waits for the prompt
  const maxWaitingTime = 3000 // maximum time user waits for the prompt since minWaitingTime expires
  const promptText = 'Click now!'

  const buttonRef = useRef(null)

  // calculating random time length user waits for the prompt (based on constants minWaitingTime and maxWaitingTime)
  function randomize() {
    return Math.ceil((Math.random() * maxWaitingTime) + minWaitingTime)
  }

  // "be ready" page
  function handleStart(e) {
    cheating = false
    setJsxContent(page['ready'])
    setTimeout(() => {
      promptAction()
    }, randomize())
  }

  // "user is cheating" page (because user acted before he was prompted)
  function handleCheat(e) {
    cheating = true
    setJsxContent(page['cheat'])
  }

  // "prompting the user" page - user is prompted to react
  function promptAction() {
    if (cheating === false) {
      // setFirstTimestamp(new Date().getTime()) // saving current timestamp (time measuring started)
      timeStart = new Date().getTime()
      setJsxContent(page['prompt'])
    }
  }

  // user reacted on the prompt
  function handlePrompt(e) {
    timeEnd = new Date().getTime() // current timestamp value
    const newDiff = timeEnd - timeStart
    setDiff(newDiff) // Update the diff state variable
  }

  // jsx instructions for user (to be used in function)
  const jsxInstructions = (
    <ol>
      <li key={1}>Click in the box</li>
      <li key={2}>Wait and be ready to click in the box again when prompted</li>
      <li key={3}>Click immediately when prompted with message "{promptText}"</li>
      <ul>
        <li>The prompt "{promptText}" will be shown not sooner than {minWaitingTime/1000} second but not later than {maxWaitingTime/1000} seconds</li>
        <li>Do not click sooner then prompted</li>
      </ul>
      <li key={4}>Your reaction time will be shown</li>
    </ol>
  )

  // copy result to clipboard after user check the checkbox and result if already defined
  function handleCopy() {
    if (diff && document.getElementById('copyCheckbox').checked) {
      navigator.clipboard.writeText(diff)
    }
  }

  useEffect(() => { // page with results (need to use useEffect in order to show the page on state variable update)
    if (diff) {
      setJsxContent(page['result'])
      if (document.getElementById('copyCheckbox').checked) { // copy result into clipboard if checkbox checked
        navigator.clipboard.writeText(diff)
      }
    }
  }, [diff])

  const page = {}
  page['first'] = <button ref={buttonRef} onClick={handleStart}>Click here to start the test</button>
  page['ready'] = <button ref={buttonRef} onClick={handleCheat}>Be ready!</button>
  page['cheat'] = <button ref={buttonRef} onClick={handleStart}>Click only when prompted!<br />Click to restart the test.</button>
  page['prompt'] = <button ref={buttonRef} onClick={handlePrompt}><b style={{fontSize: '2.5em'}}>{promptText}</b></button>
  page['result'] = <button ref={buttonRef} onClick={handleStart}>Your reaction time was<br /><b style={{fontSize: '1.6em'}}>{diff !== null ? `${diff} milliseconds` : 'N/A'}</b><br />Click again to restart the test</button>

  return (
    <div className="ReactionTimeTestCSS">
      <div id="btnContainer">
        {/* here goes content */}
        {jsxContent}
      </div>
      <br />
      <input type="checkbox" id="copyCheckbox" onClick={handleCopy} /><label htmlFor="copyCheckbox">Copy result to clipboard</label>
      <br />
      <br />
      { showHideHtml(jsxInstructions, 'instructions') }
    </div>
  )
}
