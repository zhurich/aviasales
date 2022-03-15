import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Ticket.scss';

const Ticket = ({ ticketData: { price, carrier, segments } }) => {
  const formatFlightTime = (date, durationVal) => {
    return `${moment(date).format('hh:mm')} - ${moment(date).add(durationVal, 'minutes').format('hh:mm')}`;
  };
  const formatPrice = (entryPrice) => {
    const newArr = String(entryPrice).split('');
    let formattedPrice = '';
    if (newArr.length < 6) {
      formattedPrice = [newArr.slice(0, 2), ' ', newArr.slice(2)].concat(' Р');
    } else {
      formattedPrice = [newArr.slice(0, 3), ' ', newArr.slice(3)].concat(' Р');
    }
    return formattedPrice;
  };
  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__price">{formatPrice(price)}</div>
        <div className="ticket__company">
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="" />
        </div>
      </div>
      <div className="ticket__body">
        {segments?.map((item) => {
          const { origin, date, destination, duration, stops } = item;
          const time = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
          return (
            <div className="ticket__body__info">
              <div className="info__wrapper">
                <div className="info__description">
                  {origin} – {destination}
                </div>
                <div className="info__content">{formatFlightTime(date, duration)}</div>
              </div>
              <div className="info__wrapper">
                <div className="info__description">В пути</div>
                <div className="info__content">{time}</div>
              </div>
              <div className="info__wrapper">
                <div className="info__description">
                  {stops.length !== 0 ? stops.length.toString().concat(' Пересадки') : 'Без пересадок'}
                </div>
                <div className="info__content">{stops.join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticketData: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.instanceOf(Array),
  }),
};

Ticket.defaultProps = {
  ticketData: [],
};

export default Ticket;
