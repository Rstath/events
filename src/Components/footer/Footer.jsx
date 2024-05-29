import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <div className="footer__section">
          <h4>Σχετικά με εμάς</h4>
          <p>Παρέχουμε τις καλύτερες εμπειρίες σε όλες τις πατρινές εκδηλώσεις. Μείνετε συντονισμένοι με τις τελευταίες εκδηλώσεις και νέα.</p>
          <a href="tel:+302610123456" className="phone-link">
            <FaPhoneAlt className="phone-icon" /> 2610 123 456
          </a>
        </div>
        <div className="footer__section">
          <h4>Γρήγορη Πρόσβαση</h4>
          <ul>
            <li><Link to="/">Αρχική</Link></li>
            <li><Link to="/favorites">Αγαπημένα</Link></li>
            <li><Link to="/news">Νέα</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Ακολουθήστε μας</h4>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Events. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
