import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';
import Entry from './Entry';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Entry} render={(props) => <Entry {...props} />}  />
        <Route path='/profile/:id' Component={Profile} render={(props) => <Profile {...props}/>} />
      </Routes>
    </div>
  );
}

export default App;
