import React, { useState } from 'react';
import './favorites.css';
import { IoMdClose } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Favorites = ({ events, favorites, toggleFavorite }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [eventIdToRemove, setEventIdToRemove] = useState(null);

  const openConfirmationModal = (eventId) => {
    setEventIdToRemove(eventId);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setEventIdToRemove(null);
  };

  const removeEventFromFavorites = () => {
    toggleFavorite(eventIdToRemove);
    closeConfirmationModal();
  };

  const favoriteEvents = events.filter(event => favorites.includes(event.id));
  const hasNoFavorites = favoriteEvents.length === 0;

  return (
    <section className='favorites'>
      <div className='sectionTitle'>
        <h3 className='favoritesTitle'>Τα αγαπημένα μου</h3>
        <p className='favoritesQuantity'>{favoriteEvents.length}</p>
      </div>
      <div className={`favoritesContent ${hasNoFavorites ? 'noFavorites' : ''}`}>
        {favoriteEvents.length > 0 ? (
          favoriteEvents.map(({ id, imgSrc, eventTitle, eventLocation, eventPrice, eventDate, eventHour }) => (
            <div key={id} className='favoritesEvent'>
              <div className='favoritesEventImg'>
                <Link to={`/event/${id}`}>
                  <img src={imgSrc} alt={eventTitle} className='favoritesEventIcon' />
                </Link>
              </div>

              <div className='favoritesEventInfo'>
                <Link to={`/event/${id}`}>
                  <h4 className='eventTitle'>{eventTitle}</h4>
                </Link>
                <p><strong>Ημερομηνία:</strong> {eventDate[0].startDate} - {eventDate[0].endDate}</p>
                <p><strong>Χώρος:</strong> {eventLocation}</p>
                <p><strong>Ώρα:</strong> {eventHour}</p>
                <p><strong>Εισιτήριο:</strong> {eventPrice}</p>
              </div>

              <div className='favoriteIconBtn' onClick={() => openConfirmationModal(id)}>
                {favorites.includes(id) ? <FaHeart className='favoriteIconBtn' /> : <FaRegHeart className='favoriteIconBtn' />}
              </div>
            </div>
          ))
        ) : (
          <p className='noFavorites'>Δεν υπάρχουν αγαπημένες εκδηλώσεις.</p>
        )}
      </div>
      {showConfirmationModal && (
        <div className="confirmationModal">
          <p className='modalText'>Είστε σίγουροι ότι θέλετε να αφαιρέσετε αυτή την εκδήλωση από τα αγαπημένα;</p>
          <div className='modalButtons'>
            <button className='modalButton removeFavorite' onClick={removeEventFromFavorites}>Ναι</button>
            <button className='modalButton cancelFavorite' onClick={closeConfirmationModal}>Όχι</button>
          </div>
          <div className="closeFilters" onClick={closeConfirmationModal}>
            <IoMdClose className='closeIcon' />
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;
