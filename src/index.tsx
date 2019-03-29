import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Clearfix } from './styles'
import * as serviceWorker from './serviceWorker'

const app = (
  <>
    <Clearfix />
    <App />
  </>
)
const Root = window.document.getElementById('Root')
ReactDOM.render(app, Root)

serviceWorker.unregister()
