import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Profile id='1' />} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
