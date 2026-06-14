import './App.css';
import { AccordionGroup } from './components/Accordion';
import { HamburgerMenu } from './components/HamburgerMenu';
import { Text } from './components/Text';

function App() {
	return (
		<>
			<Text text="Sign In" />
			<HamburgerMenu />
			<AccordionGroup />
		</>
	);
}

export default App;
