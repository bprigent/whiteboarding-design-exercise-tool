import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import ExercisePage from './pages/ExercisePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new" element={<FormPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
      </Routes>
    </div>
  );
}

export default App;


