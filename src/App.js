import { Provider } from 'react-redux';
import './App.css';
import CertificateList from './Components/Certificate-Generator/CertificateList';
import Movies from './Components/Movies/Movies';
import { initialState, reducer } from './Components/Reels/reducer';
import Reels from './Components/Reels/Reels';
import { StateProvider } from './Components/Reels/stateProvider';
import AppCart from './Components/Shopping-Cart/AppCart';
import store from './Components/Shopping-Cart/redux/store';
import AppThunk from './Components/thunk/AppThunk';
import Todo from './Components/Todo';
import storeUser from './Components/thunk/store'
function App() {
  return (
    // <Todo />
    // <Movies />
    // <StateProvider initialState={initialState} reducer={reducer}>
    //   <Reels />
    // </StateProvider>
    // <div style={{ marginLeft: '20%' }}>
    //   <CertificateList />
    // </div>
    <Provider store={store}>
      <AppCart />
    </Provider>
    // <Provider store={storeUser}>
    //   <AppThunk />
    // </Provider>
  );
}

export default App;
