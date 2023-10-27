import React from 'react'
import { List } from './List'
import { AddToList } from './AddToList'
import { useState } from 'react'

import './FavoriteSymbols.css'

/*
Emoji data source credit:

The MIT License (MIT)

Copyright (c) 2019 Mu-An Chiou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/muan/unicode-emoji-json
*/
const emojidb = require('./emojidb.json') // JSON database with symbols

export function FavoriteSymbols() {

  //console.log(emojidb['😀'])

  // name of main cookie variable - we will save symbols into it
  const cookieName = 'symbols'

  // how to reset cookie
  // document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure'

  // get data from cookie variable based on cookie variable name
  const getCookie = (name) => {
    const prefix = `${name}=`
    const decoded = decodeURIComponent(document.cookie)
    const arr = decoded.split('; ')
    let result
    arr.forEach(val => {
      if (val.indexOf(prefix) === 0) result = val.substring(prefix.length)
    })
    return result
  }

  // load saved items (list of symbols) from cookies - returns symbols (as objects) wrapped in array
  // otherwise return empty array
  const loadItems = () => {
    const myCookie = getCookie(cookieName) // load raw cookie string with "symbols"
    if (myCookie) { // if cookie with given name exists
      const symbols = JSON.parse(myCookie) // parse the cookie as an array/object
      if (typeof symbols === 'object') { // if parsed value is array/object
        return symbols // return symbols (should be in form of array with objects in it)
      }
    }
    return [] // otherwise return empty array (probably no symbols are saved, or something else went wrong)
  }

  // state(s)
  const [symbols, setSymbols] = useState(loadItems())
  const [msg, setMsg] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // reset main user input field
  const resetInputfield = () => {
    document.getElementById('symbol-input').value = ''
  }

  // save symbols to cookie
  // input format: array of objects
  const saveItems = (array) => {
    document.cookie = cookieName + `=${JSON.stringify(encodeSymbols(array))}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure` // save new set of symbols to cookie
    return array.length
  }

  // encode symbols in array (make it safe for storing it in cookies and loading it from cookies)
  function encodeSymbols(symbols) {
    const encodedSymbols = symbols.map((value) => { return {symbol: encodeURIComponent(value.symbol)} })
    return encodedSymbols
  }

  // save new symbol (in form of objet) to cookie
  const addSymbol = (string) => {
    // load existing symbols from cookie
    const symbols = loadItems() // load old symbols from cookie
    const newSymbol = { // create object with new symbol
      symbol: string // value of new symbol (symbol itself)
    }
    symbols.push(newSymbol) // add new symbol to old symbols
    return saveItems(symbols) // save encoded symbols to cookie and return count of currently saved symbols
  }

  // check if same symbol is already saved in cookies
  const isDuplicate = (symbol) => {
    const items = loadItems()
    for (let i = 0; i < items.length; i++) {
      if (items[i].symbol === symbol) {
        return true
      }
    }
    return false
  }

  // adds new symbol to cookie
  const handleAdd = () => {
    const inputVal = document.getElementById('symbol-input').value // extract value from user input field

    let errString

    // input length validation
    // inputVal.length !== String.fromCodePoint(inputVal.codePointAt(0)).length
    // 👩‍❤️‍💋‍👩 (length === 11 WTF)
    if (inputVal.length === 0) {
      errString = 'Invalid string length'
      const msg = <span className="err">{errString}</span>
      setMsg(msg) // status message for user
      return false
    }

    // duplicity check
    if (isDuplicate(inputVal)) {
      errString = 'Duplicity'
      const msg = <span className="err">{errString}</span>
      setMsg(msg) // status message for user
      return
    }

    const count = addSymbol(inputVal) // add value to cookie
    if (typeof count === 'number' && count >= 0) {
      setSymbols(loadItems()) // update react state (so the list of symbols if rendered immediately)
      const msg = <span>Symbol <b>{inputVal}</b> added, new total: {count}</span>
      setMsg(msg) // status message for user
      resetInputfield()
    } else {
      errString = 'Adding symbol to cookies failed'
      const msg = <span className="err">{errString}</span>
      setMsg(msg) // status message for user
      throw new Error(errString)
    }
  }

  const handleSaveResult = (e) => {
    let emojiToSave = e.target.attributes.emoji.value
    let index = e.target.attributes.index.value
    document.getElementById('symbol-input').value = emojiToSave
    handleAdd()
    renderResultItemEffect(index)
  }

  const handleCopyResult = (e) => {

    // copy value to clipboard
    navigator.clipboard.writeText(e.target.innerHTML)
      .then(resolved => {
        // after click effect
        let index = e.target.attributes.index.value
        renderResultItemEffect(index)
      })
  }

  // makes style effect after user makes action on result item (eg. copy to clipboard or saving to cookie)
  const renderResultItemEffect = (index) => {
    let resultElement = document.getElementById('resultItem' + index)
    resultElement.style.backgroundColor = 'lime'
    setTimeout(() => {
      resultElement.style.backgroundColor = ''
    }, 200)
  }

  // add symbol on enter
  const handleEnter = (e) => {
    if (e.charCode === 13) {
      handleAdd()
    }
  }

  // search for symbol from json emoji list
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase()
    let results = []
    if (input.length > 2) {
      Object.keys(emojidb).forEach((value, index) => {
        if (emojidb[value].name.toLowerCase().includes(input)) {
          results.push(
            {
              emoji: value,
              name: emojidb[value].name
            }
          )
        }
      })
    }
    setSearchResults(results)
  }

  // handle symbol removal event
  const handleRemove = (e) => {
    const symbol = e.target.attributes.symbol.value
    removeSymbol(symbol)
  }

  // remove symbol from cookie JSON based on symbol code (in unicode)
  const removeSymbol = (string) => {
    let symbols = loadItems()
    symbols = symbols.filter(item => item.symbol !== string)
    saveItems(symbols)
    const count = symbols.length
    setSymbols(loadItems()) // update react state (so the list of symbols if rendered immediately)
    const msg = <span>Symbol <b>{string}</b> removed, new total count = {count}</span>
    setMsg(msg)
  }

  return (
    <div className="FavoriteSymbolsCSS">
      <List symbols={symbols} handleRemove={handleRemove} />
      <AddToList handleAdd={handleAdd} handleEnter={handleEnter} handleSearch={handleSearch} msg={msg} searchResults={searchResults} handleSaveResult={handleSaveResult} handleCopyResult={handleCopyResult} />
    </div>
  )
}
