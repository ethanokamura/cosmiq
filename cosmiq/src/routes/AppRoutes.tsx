import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import Summary from '../pages/Summary';
import Edit from '../pages/Edit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/edit" element={<Edit />} />
      {/* <Route path="/profile/:username" element={<Edit />} /> */}
    </Routes>
  );
};

export default AppRoutes;
