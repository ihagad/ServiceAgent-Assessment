import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;