import React, { useState, useRef, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, isWithinInterval, isBefore } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { HiFilter } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Main from '../main/Main';
import './home.css';
import Data from '../../Data';

const Home = ({ favorites, toggleFavorite, ratings, handleRating }) => {
  const [price, setPrice] = useState(50);
  const [date, setDate] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(Data);
  const [showAllEvents, setShowAllEvents] = useState(true);
  const [sortingMethod, setSortingMethod] = useState('default');
  const [filterMethod, setFilterMethod] = useState('');
  const datePickerRef = useRef(null);

  const handleIconClick = () => {
    datePickerRef.current.setFocus();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const isDateInRange = (date, startDate, endDate) => {
    return isWithinInterval(date, { start: parse(startDate, 'dd/MM/yyyy', new Date()), end: parse(endDate, 'dd/MM/yyyy', new Date()) });
  };

  const applyFilters = useCallback(() => {
    let filtered = Data.filter(event => {
      const eventProperties = Object.values(event).join(' ').toLowerCase();
      const keywordLower = keyword.toLowerCase();
      const matchesKeyword = eventProperties.includes(keywordLower);
      const matchesDate = date ? event.eventDate.some(range => 
        isDateInRange(date, range.startDate, range.endDate)
      ) : true;
      const matchesPrice = parseFloat(event.eventPrice.replace('€', '')) <= price;
      return matchesKeyword && matchesDate && matchesPrice;
    });

    if (filterMethod === 'free') {
      filtered = filtered.filter(event => parseFloat(event.eventPrice) === 0);
    } else if (filterMethod === 'old') {
      const now = new Date();
      filtered = filtered.filter(event => {
        return event.eventDate.every(range => isBefore(parse(range.endDate, 'dd/MM/yyyy', new Date()), now));
      });
    }

    setFilteredEvents(filtered);
    setShowAllEvents(false);
  }, [keyword, date, price, filterMethod]);

  const handleSearch = () => {
    applyFilters();
    sortEvents(sortingMethod);
  };

  const handleReset = () => {
    setKeyword('');
    setDate(null);
    setPrice(50);
    setFilteredEvents(Data);
    setShowAllEvents(true);
    setSortingMethod('default');
    setFilterMethod('');
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSortingMethod(e.target.value);
    handleSearch();
  };

  const handleFilterChange = (method) => {
    setFilterMethod(method);
    handleSearch();
  };

  const sortEvents = useCallback((method) => {
    let sortedEvents = [...filteredEvents];
    switch (method) {
      case 'priceAsc':
        sortedEvents.sort((a, b) => parseFloat(a.eventPrice) - parseFloat(b.eventPrice));
        break;
      case 'priceDesc':
        sortedEvents.sort((a, b) => parseFloat(b.eventPrice) - parseFloat(a.eventPrice));
        break;
      default:
        break;
    }
    setFilteredEvents(sortedEvents);
  }, [filteredEvents]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    sortEvents(sortingMethod);
  }, [sortingMethod, sortEvents]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className='home'>
      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className='smallText'>
            Εκδηλωσεις
          </span>
          <h1 data-aos="fade-up" className='homeTitle'>
            Αναζητήστε τις εκδηλώσεις σας
          </h1>
        </div>
        <div data-aos="fade-up" className="cardDiv grid">
          <div className="festInput inputDiv">
            <label htmlFor="festival">Η εκδήλωσή σας:</label>
            <div className="input flex">
              <input
                type="text"
                placeholder='εκδήλωση'
                value={keyword}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
              />
            </div>
          </div>

          <div className="dateInput inputDiv">
            <label htmlFor="date">Ημερομηνία:</label>
            <div className="input flex datePickerWrapper">
              <DatePicker
                ref={datePickerRef}
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="ηη/μμ/εεεε"
                className="date-picker"
              />
              <FaCalendarAlt className="calendarIcon" onClick={handleIconClick} />
            </div>
          </div>

          <div className="priceInput inputDiv">
            <div className="label_total flex">
              <label htmlFor="price">
                Μέγιστη τιμή (ανά άτομο):
              </label>
              <h3 className='total'>100€</h3>
            </div>
            <div className="input flex">
              <input
                type="range"
                max='100'
                min='0'
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <p className="priceDisplay"> {price}€</p>
          </div>

          <button className="filters flex" onClick={toggleFilters}>
            <HiFilter />
            <span>Φίλτρα</span>
          </button>

          <div className='searchButtons'>
            <button className="search flex" onClick={handleSearch}>
              <span>Αναζήτηση</span>
            </button>

            <button className="reset flex" onClick={handleReset}>
              <span>Επαναφορά</span>
            </button>
          </div>

          {showFilters && (
            <div className="filterOptions">
              <div className="filterOptionsTitle">
                Ταξινόμηση
              </div>
              <ul className="filterList flex">
                <li className="filterList__option">
                  <button className="option flex" onClick={() => handleFilterChange('free')}>
                    <span>Δωρεάν</span>
                  </button>
                </li>
                <li className="filterList__option">
                  <button className="option flex" onClick={() => handleFilterChange('old')}>
                    <span>Παλαιότερες</span>
                  </button>
                </li>
              </ul>
              <div className="closeFilters" onClick={toggleFilters}>
                <IoMdClose className='icon' />
              </div>

              <div className="filterOptionsFooter flex">
                <button className="search footerSearch" onClick={handleSearch}>
                  <span>Αναζήτηση</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="sortingDropdown">
          <select value={sortingMethod} onChange={handleSortingChange}>
            <option value="default">Φίλτρα & Ταξινόμηση</option>
            <option value="priceAsc">Τιμή Αύξουσα</option>
            <option value="priceDesc">Τιμή Φθίνουσα</option>
          </select>
        </div>
        <Main events={filteredEvents} 
          showAllEvents={showAllEvents} 
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          ratings={ratings}
          handleRating={handleRating}
        />
      </div>
    </section>
  );
};

export default Home;
