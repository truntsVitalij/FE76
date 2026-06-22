import './App.css';
import { Title } from './components/Title';
import { HamburgerMenu } from './components/HamburgerMenu';
import { List } from './components/List';
import { ACCORDION_DATA } from './data/accordion';

function App() {
	return (
		<div className="app-container">
			<Title>Sign In</Title>
			<HamburgerMenu />
			<List list={ACCORDION_DATA} />
		</div>
	);
}

export default App;
