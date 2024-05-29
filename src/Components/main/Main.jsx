import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import { IoLocationOutline } from 'react-icons/io5';
import { BsClipboardCheck } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { isBefore, parse } from 'date-fns';

const Main = ({ events, favorites, toggleFavorite, ratings, handleRating }) => {
  const handleMouseEnter = (id) => {
    const eventLocationElement = document.getElementById(`location-${id}`);
    const eventButtonElement = document.getElementById(`button-${id}`);

    if (eventLocationElement && eventButtonElement) {
      eventLocationElement.style.visibility = 'visible';
      eventButtonElement.style.visibility = 'visible';
    }
  };

  const handleMouseLeave = (id) => {
    const eventLocationElement = document.getElementById(`location-${id}`);
    const eventButtonElement = document.getElementById(`button-${id}`);

    if (eventLocationElement && eventButtonElement) {
      eventLocationElement.style.visibility = 'hidden';
      eventButtonElement.style.visibility = 'hidden';
    }
  };

  const isEventPast = (eventDate) => {
    const endDate = parse(eventDate[eventDate.length - 1].endDate, 'dd/MM/yyyy', new Date());
    return isBefore(endDate, new Date());
  };

  return (
    <section className='main'>
      <div className='sectionTitle'>
        <h3 className='title'>Όλες οι εκδηλώσεις</h3>
      </div>
      <div className='sectionContent grid'>
        {events.map(({ id, imgSrc, eventTitle, eventLocation, eventCategory, eventPrice, eventDate, eventDescription }) => {
          const pastEvent = isEventPast(eventDate);
          return (
            <div key={id} className={`singleEvent ${pastEvent ? 'pastEvent' : ''}`} onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={() => handleMouseLeave(id)}>             

              <div className="eventTopPart">
                <div className='favoriteIcon' onClick={() => toggleFavorite(id)}>
                  {favorites.includes(id) ? <FaHeart className='favoriteIcon' /> : <FaRegHeart className='favoriteIcon' />}
                </div>

                <div className='imageDiv'>
                  <img src={imgSrc} alt={eventTitle} className='eventIcon' />
                </div>
              </div>
              
              <div className="eventMandatoryInfo">
                <p className='eventPrice'>{eventPrice}</p>
                <div className='ratings'>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span key={index} onClick={() => handleRating(id, index)}>
                      {index <= (ratings[id] || 0) ? <FaStar className='star' /> : <FaRegStar className='star' />}
                    </span>
                  ))}
                </div>
              </div>
              <div className='eventInfo'>
                <div className='eventLocationDiv' id={`location-${id}`} style={{ visibility: 'hidden' }}>
                  <IoLocationOutline className='icon eventLocationIcon' />
                  <span className='eventLocation'>{eventLocation}</span>
                </div>
                <Link to={`/event/${id}`} className='button flex' id={`button-${id}`} style={{ visibility: 'hidden' }}>
                  ΛΕΠΤΟΜΕΡΕΙΣ
                  <BsClipboardCheck className='icon' />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
