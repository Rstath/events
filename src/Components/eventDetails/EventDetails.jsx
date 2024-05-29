import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Data from '../../Data';
import { MdArrowBackIos } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import './eventDetails.css';

const EventDetails = ({ favorites, toggleFavorite, ratings, handleRating }) => {
  const { id } = useParams();
  const eventId = parseInt(id);
  const event = Data.find((event) => event.id === eventId);

  if (!event) {
    return <div>Η εκδήλωση δεν βρέθηκε.</div>;
  }

  const renderDate = (startDate, endDate) => {
    try {
      const [startDay, startMonth, startYear] = startDate.split('/');
      const [endDay, endMonth, endYear] = endDate.split('/');

      const start = new Date(startYear, startMonth - 1, startDay);
      const end = new Date(endYear, endMonth - 1, endDay);

      if (isNaN(start) || isNaN(end)) {
        return 'Invalid date format';
      }

      if (start.toDateString() === end.toDateString()) {
        return start.toLocaleDateString();
      } else {
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      }
    } catch (error) {
      return 'Error parsing dates';
    }
  };

  const isPastEvent = () => {
    if (!event.eventDate || !event.eventDate[0]) {
      return false;
    }
    const endDate = new Date(event.eventDate[0].endDate.split('/').reverse().join('/'));
    const currentDate = new Date();
    return endDate < currentDate;
  };

  const isActiveEvent = () => {
    if (!event.eventDate || !event.eventDate[0]) {
      return false;
    }
    const startDate = new Date(event.eventDate[0].startDate.split('/').reverse().join('/'));
    const endDate = new Date(event.eventDate[0].endDate.split('/').reverse().join('/'));
    const currentDate = new Date();
    return startDate <= currentDate && endDate >= currentDate;
  };

  return (
    <div className={`eventDetails ${isPastEvent() ? 'pastEvent' : ''} ${isActiveEvent() ? 'activeEvent' : ''}`}>
      <div className='backButtonWrapper'>
        <Link to='/' className='backButton'>
          <MdArrowBackIos className='backIcon' />
          Αρχική
        </Link>
      </div>
      <div className='eventDetailsBody'>
        <img src={event.imgSrc} alt={event.eventTitle} />
        <div className='favoriteIcon' onClick={() => toggleFavorite(eventId)}>
          {favorites.includes(eventId) ? <FaHeart className='favoriteIcon' /> : <FaRegHeart className='favoriteIcon' />}
        </div>
        <div className='eventDetailsInfo'>
          <div className='eventDetailsHeader'>
            <h2>{event.eventTitle}</h2>
            {isPastEvent() && <span className='pastEvent eventDetailsTag'>Παλιά εκδήλωση</span>}
            {isActiveEvent() && <span className='activeEvent eventDetailsTag'>Σε εξέλιξη</span>}
          </div>
          <p><strong>Ημερομηνία:</strong> {renderDate(event.eventDate[0].startDate, event.eventDate[0].endDate)}</p>
          <p><strong>Χώρος:</strong> {event.eventLocation}</p>
          <p><strong>Ώρα:</strong> {event.eventHour}</p>
          <p><strong>Εισιτήριο:</strong> {event.eventPrice}</p>
          <p><strong>Περιγραφή:</strong> {event.eventDescription}</p>
          <div className='eventDetailsRatings ratings'>
            <p><strong>Αξιολογήστε:</strong></p>
            {[1, 2, 3, 4, 5].map((index) => (
              <span key={index} onClick={() => handleRating(eventId, index)}>
                {index <= (ratings[eventId] || 0) ? <FaStar className='star' /> : <FaRegStar className='star' />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
