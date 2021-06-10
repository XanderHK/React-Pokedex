import React from 'react';
import './App.css';
import Pokemon from './components/Pokemon';

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<h1>Hello, world!</h1>
				<Pokemon />
			</div>
		);
	}
}


export default App;
