import './App.css';
import CertificateList from './Components/Certificate-Generator/CertificateList';
import Movies from './Components/Movies/Movies';
import { initialState, reducer } from './Components/Reels/reducer';
import Reels from './Components/Reels/Reels';
import { StateProvider } from './Components/Reels/stateProvider';
import Todo from './Components/Todo';

function App() {
  return (
    // <Todo />
    // <Movies />
    // <StateProvider initialState={initialState} reducer={reducer}>
    //   <Reels />
    // </StateProvider>
    <div style={{ marginLeft: '20%' }}>
      <CertificateList />
    </div>
  );
}

export default App;
