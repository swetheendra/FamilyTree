import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';
import Entry from './Entry';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
