import ReactDOM from 'react-dom'

import { FormGenerator } from './components/form-generator'

ReactDOM.render(<FormGenerator schema={{ fields: [] }} />, document.querySelector('#app'))
