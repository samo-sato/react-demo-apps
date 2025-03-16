import React from 'react';
import { copyToClipboard } from '../../genericFunctions.js';
import { useRef, useState } from 'react';

import './ApiTester.css';

// API server endpoint url
const portNumber = process.env.REACT_APP_BACKEND_PORT;
const portSegment = portNumber ? `:${portNumber}` : '';
const backendRoot = `${window.location.protocol}//${window.location.hostname}${portSegment}`;
const path = `${process.env.REACT_APP_BASE_PATH}/api/make-request`;
const resource = `${backendRoot}${path}`;

export function ApiTester() {

  // Loading animation effect
  let intervalID;
  function loadingEffectStart() {
    const container = document.getElementById('arrows');
    const arrows = container.childNodes;
    const steps = arrows.length + 1; // Steps is total number of frames in animations, +1 is accounting for the (comment not finished yet)

    // Making all arrows in parent container invisible
    const hideArrows = () => {
      arrows.forEach((arrow) => {
        arrow.style.opacity = 0;
      });
    };

    hideArrows() // First step - making all arrows invisible

    let step = 0;
    intervalID = setInterval(() => { // Loop arrows in order to make them isible one by one

      if (step < steps - 1) { // Make arrow visible, and after all are visible hide them again
        arrows[step].style.opacity = 1;
      } else {
        hideArrows();
      }

      step++; // Incrementing the step counter

      if (step >= steps) { // Reseting the step counter
        step = 0;
      }

    }, 150);
  }

  // Stop loading animation effect
  function loadingEffectStop() {
    document.getElementById('arrows').childNodes.forEach((arrow) => {
      arrow.style.opacity = 1;
    });
    clearInterval(intervalID);
  }

  // useRef
  const inputs = {};
  inputs.url = useRef(null);
  inputs.method = useRef(null);
  inputs.headers = useRef(null);
  inputs.body = useRef(null);
  const textareaHeaders = useRef(null);
  const textareaBody = useRef(null);

  // useState
  const [errors, setErrors] = useState('');
  const [responseCode, setResponseCode] = useState('');
  const [responseStatusText, setResponseStatusText] = useState('');
  const [responseHeaders, setResponseHeaders] = useState('');
  const [responseBody, setResponseBody] = useState('');

  // Textholder on html button for copying textarea content to clipboard
  const copyButtonText = 'Copy to Clipboard';

  function makeHttpRequest() {
    return new Promise((resolve, reject) => {

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      const body = JSON.stringify({
          inputUrl: inputs.url.current.value,
          inputMethod: inputs.method.current.value,
          inputHeaders: inputs.headers.current.value,
          inputBody: inputs.body.current.value
        });

      const options = {
        method: 'POST',
        headers: headers,
        body: body
      };

      fetch(resource, options)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        });

    });
  }

  function handleMakeRequest() {

    loadingEffectStart(); // Loading animation starts

    makeHttpRequest()
      .then(response => {
        response.json()
          .then(bodyJson => {
            if (bodyJson.success) {
              console.log('Validation ok');
              loadingEffectStop(); // Loading animation stops
              setErrors(''); // Removing possible error messages from html page
              setResponseCode(bodyJson.data.statusCode)
              setResponseStatusText(bodyJson.data.statusText)
              setResponseHeaders(bodyJson.data.responseHeaders)
              setResponseBody(bodyJson.data.responseBody)
            } else { // Remove old results and add error message for user
              setResponseCode('');
              setResponseStatusText('');
              setResponseHeaders('');
              setResponseBody('');
              setErrors(bodyJson.errors.map((err, index) => {
                console.log(`Error: ${err}`);
                loadingEffectStop(); // Loading animation stops
                return <p key={index}>{err}</p>;
              }));
            }
          })
      })
      .catch(error => {
        loadingEffectStop(); // Loading animation stops
        setErrors('Fetch error');
        console.log(error);
      })
  }

  return (

    <>
      <div className="ApiTesterCSS">
        <div className="tab">
          <div className="col">
            <h2>Make request</h2>
            <div className="colBody">
              <p>URL endpoint</p>
              <input type="text" className="urlInput bottomMargin" ref={inputs.url} />
              <br />
              <br />
              <select ref={inputs.method}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <span className="leftMargin">method selected</span>
              <br />
              <br />
              <p>Headers (as JSON with double quotes)</p>
              <textarea ref={inputs.headers} placeholder='Example: {"Content-Type": "application/json"}'>
              </textarea>
              <br />
              <br />
              <p>Body</p>
              <textarea ref={inputs.body}>
              </textarea>
              <br />
              <br />
              <button onClick={handleMakeRequest}>Make request!</button>
              <div className="err">
                { errors }
              </div>
            </div>
          </div>
          <div>
            <div id="arrows">
              { /* Generating `chain` of arrow symbols */ }
              {
                Array.from({ length: 3 }, (_, i) => (
                  <span className="arrow" key={i}>&gt;</span>
                ))
              }
            </div>
          </div>
          <div className="col">
            <h2>View response</h2>
            <div className="colBody">
              <p>Status code<input value={responseCode} disabled={true} className="leftMargin" /></p>
              <br />
              <p>Status text<input value={responseStatusText} disabled={true} className="leftMargin" /></p>
              <br />
              <p>Response headers</p>
              <textarea value={responseHeaders} disabled={true} ref={textareaHeaders}></textarea>
              <button onClick={() => copyToClipboard(textareaHeaders.current.value, document.getElementById('clipboardMsgH'))}>{copyButtonText}</button>
              <span id="clipboardMsgH" className="leftMargin"></span>
              <br />
              <br />
              <p>Response body</p>
              <textarea value={responseBody} disabled={true} ref={textareaBody}></textarea>
              <button onClick={() => copyToClipboard(textareaBody.current.value, document.getElementById('clipboardMsgB'))}>{copyButtonText}</button>
              <span id="clipboardMsgB" className="leftMargin"></span>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
