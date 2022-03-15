import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTicketsLimit } from '../../store/ticketsSlice';
import './ShowMore.scss';

const ShowMore = () => {
  const dispatch = useDispatch();
  const { showedTicketsLimit } = useSelector((state) => state.tickets);

  return (
    <div className="show-more">
      <button
        type="button"
        onClick={() => dispatch(setTicketsLimit(showedTicketsLimit + 5))}
        className="show-more__button"
      >
        Показать ещё 5 билетов!
      </button>
    </div>
  );
};

export default ShowMore;
