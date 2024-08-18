import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEditPage from './Components/ListEditPage';
import RoulettePage from './Components/RoulettePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListEditPage />} />
        <Route path="/edit" element={<ListEditPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
      </Routes>
    </Router>
  );
};

export default App;
