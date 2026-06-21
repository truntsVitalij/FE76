import { PostList } from './components/PostList';
import { POSTS } from './data/posts';

function App() {
	return (
		<div className="app">
			<PostList posts={POSTS} />
		</div>
	);
}

export default App;
