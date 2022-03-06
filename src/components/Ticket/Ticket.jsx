import React from 'react';
import './Ticket.scss';

const Ticket = () => {
  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__price">13 400 Р</div>
        <div className="ticket__company">
          <img src="https://pics.avs.io/99/36/S7.png" alt="" />
        </div>
      </div>
      <div className="ticket__body">
        <div className="ticket__body__info">
          <div className="info__wrapper">
            <div className="info__description">MOW – HKT</div>
            <div className="info__content">10:45 – 08:00</div>
          </div>
          <div className="info__wrapper">
            <div className="info__description">В пути</div>
            <div className="info__content">21ч 15м</div>
          </div>
          <div className="info__wrapper">
            <div className="info__description">2 пересадки</div>
            <div className="info__content">HKG, JNB</div>
          </div>
        </div>
        <div className="ticket__body__info">
          <div className="info__wrapper">
            <div className="info__description">HKT – MOW</div>
            <div className="info__content">11:20 – 00:50</div>
          </div>
          <div className="info__wrapper">
            <div className="info__description">В пути</div>
            <div className="info__content">13ч 30м</div>
          </div>
          <div className="info__wrapper">
            <div className="info__description">1 пересадка</div>
            <div className="info__content">HKG</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
