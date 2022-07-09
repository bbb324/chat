import React from 'react';
import ReactDom from 'react-dom';
import App from './component/App'
import './style.less';
console.log(document.getElementById('root'))
ReactDom.render(<App />, document.getElementById('root'))