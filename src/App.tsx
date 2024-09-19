import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlesByDestination from './pages/ArticlesByDestination';
import DestinationsPage from './pages/Destinations';
import ArticlesByTheme from './pages/ArticlesByTheme';
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/api/home" element={<Home />} />
        {/* Ajoutez d'autres routes ici */}
        <Route path='api/articles/destination/:id' element={<ArticlesByDestination />} />
        <Route path='api/destinations' element={<DestinationsPage />} />
        <Route path='api/articles/theme/:id' element={<ArticlesByTheme />} />
        <Route path='api/destination/:id' element={<ArticlesByDestination />} />
        <Route path='api/theme/:id' element={<ArticlesByTheme />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
