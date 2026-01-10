import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import './index.css';

function App() {
  return (
    <div className="app-main">
      <VideoBackground />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
