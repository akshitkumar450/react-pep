import './App.css';
import Movies from './Components/Movies/Movies';
import { initailState, reducer } from './Components/Reels/reducer';
import Reels from './Components/Reels/Reels';
import { StateProvider } from './Components/Reels/stateProvider';
import Todo from './Components/Todo';

function App() {
  return (
    // <Todo />
    // <Movies />
    <StateProvider initialState={initailState} reducer={reducer}>
      <Reels />
    </StateProvider>
  );
}

export default App;
