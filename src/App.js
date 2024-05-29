import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import Home from './Components/home/Home';
import EventDetails from './Components/eventDetails/EventDetails';
import Footer from './Components/footer/Footer';
import Favorites from './Components/favorites/Favorites';
import News from './Components/news/News';
import Data from './Data';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem('ratings');
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  const toggleFavorite = (eventId) => {
    setFavorites(
      favorites.includes(eventId)
        ? favorites.filter((id) => id !== eventId)
        : [...favorites, eventId]
    );
  };

  const handleRating = (eventId, rating) => {
    setRatings({ ...ratings, [eventId]: rating });
  };

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                events={Data}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                ratings={ratings}
                handleRating={handleRating}
              />
            }
          />
          <Route
            path='/news'
            element={<News />}
          />
          <Route
            path='/event/:id'
            element={
              <EventDetails
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                ratings={ratings}
                handleRating={handleRating}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                events={Data}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
