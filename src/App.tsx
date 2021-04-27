import React from 'react';
import './App.css';
import Pokemon from './components/Pokemon';

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<Pokemon />
			</div>
		);
	}
}


export default App;
