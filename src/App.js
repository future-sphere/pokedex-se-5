import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailPage from './pages/Detail';
import LandingPage from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/detail/:name' element={<DetailPage />} />
    </Routes>
  );
}

export default App;
