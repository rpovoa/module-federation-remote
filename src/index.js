import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
 
const App = () => (
<div>
<h2>Remote App</h2>
<Button />
</div>
);
 
ReactDOM.render(<App />, document.getElementById('root'));