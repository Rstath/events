import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './news.css';
import bridgeImg from '../../Assets/bridge.jpg';
import carnivalImg from '../../Assets/carnival.jpg';
import castleImg from '../../Assets/castle.jpg';
import cityImg from '../../Assets/homeBackground.jpeg';
import romanImg from '../../Assets/roman.jpg';
import wineryImg from '../../Assets/winery.jpg';

const News = () => {
  const monuments = [
    {
      name: "Γέφυρα Ρίου-Αντιρρίου",
      description: "Η Γέφυρα Ρίου-Αντιρρίου είναι μία από τις μεγαλύτερες καλωδιωτές γέφυρες στον κόσμο.",
      imgSrc: bridgeImg,
    },
    {
      name: "Πατρινό Καρναβάλι",
      description: "Το Πατρινό Καρναβάλι είναι ένα από τα μεγαλύτερα και πιο διάσημα στην Ελλάδα, προσελκύοντας χιλιάδες επισκέπτες κάθε χρόνο.",
      imgSrc: carnivalImg,
    },
    {
      name: "Μεσαιωνικό Κάστρο",
      description: "Το Κάστρο της Πάτρας προσφέρει μια ματιά στο μεσαιωνικό παρελθόν της πόλης.",
      imgSrc: castleImg,
    },
    {
      name: "Πόλη της Πάτρας",
      description: "Η πόλη της Πάτρας, ένας ζωντανός κόμβος με πλούσια ιστορία και όμορφα τοπία.",
      imgSrc: cityImg,
    },
    {
      name: "Ρωμαϊκό Ωδείο",
      description: "Το Ρωμαϊκό Ωδείο της Πάτρας είναι ένα αρχαίο θέατρο που ακόμα χρησιμοποιείται για παραστάσεις.",
      imgSrc: romanImg,
    },
    {
      name: "Οινοποιείο Αχάια Κλάους",
      description: "Ένα ιστορικό οινοποιείο γνωστό για το κρασί Μαυροδάφνη.",
      imgSrc: wineryImg,
    },
  ];

  return (
    <div className="news">
      <div className="newsContent">
        <h1 className="newsTitle">Λίγα λόγια για την Πάτρα</h1>
        <p className="newsDescription">
          Η Πάτρα είναι μια ζωντανή πόλη στη Δυτική Ελλάδα, γνωστή για την πλούσια ιστορία της, τα πολιτιστικά φεστιβάλ και τα όμορφα τοπία.
        </p>
        <div className="swiper-container">
          <Swiper spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
            {monuments.map((monument, index) => (
              <SwiperSlide key={index}>
                <div className="slideContent">
                  <img src={monument.imgSrc} alt={monument.name} className="slideImage" />
                  <h3 className="slideTitle">{monument.name}</h3>
                  <p className="slideDescription">{monument.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default News;
