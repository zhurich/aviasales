import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../Ticket';
import { ShowMore } from '../ShowMore';
import { Spinner } from '../Spinner';
import './TicketList.scss';
import { fetchTickets } from '../../store/ticketsSlice';

const TicketList = () => {
  const dispatch = useDispatch();
  const { tickets, searchId, status, showedTicketsLimit, stop } = useSelector((state) => state.tickets);
  const { tabs } = useSelector((state) => state.tab);
  const activeTab = tabs.find((el) => el.enabled);
  const { filters } = useSelector((state) => state.filter);

  useEffect(() => {
    if (searchId !== null) dispatch(fetchTickets(searchId));
  }, [searchId, dispatch]);

  useEffect(() => {
    let interval = null;
    if (!stop) {
      interval = setInterval(() => {
        dispatch(fetchTickets(searchId));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stop, dispatch, searchId]);

  const sortByTab = (tab, unsortedTickets) => {
    const copyTickets = [...unsortedTickets];
    let sortedTickets = null;
    if (tab.title === 'fast') {
      sortedTickets = copyTickets.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    } else if (tab.title === 'cheap') {
      sortedTickets = copyTickets.sort((a, b) => a.price - b.price);
    } else if (tab.title === 'optimal') {
      sortedTickets = copyTickets.sort(
        (a, b) =>
          a.price * (a.segments[0].duration + a.segments[1].duration) -
          b.price * (b.segments[0].duration + b.segments[1].duration)
      );
    }
    return sortedTickets;
  };

  const filterByTransfers = (availableFilters, unFilteredTickets) => {
    const filteredTickets = [];
    const enabledFilters = availableFilters.map(item => item.enabled ? item.title : null);
    if (enabledFilters.includes('all')) return unFilteredTickets;
    const ticketFilterFunc = (transfers) => {
      return unFilteredTickets.filter((el) => el.segments[0].stops.length === transfers && el.segments[1].stops.length === transfers);
    }
    enabledFilters.map(item => {
      if (item === 'without') filteredTickets.push(...ticketFilterFunc(0))
      else if (item === 'one') filteredTickets.push(...ticketFilterFunc(1))
      else if (item === 'two') filteredTickets.push(...ticketFilterFunc(2))
      else if (item === 'three') filteredTickets.push(...ticketFilterFunc(3))
      return filteredTickets
    })
    return filteredTickets;
  };

  const sortedFilteredTickets = filterByTransfers(filters, sortByTab(activeTab, tickets));

  return (
    <div className="ticket-list">
      {status === 'loading' ? <Spinner /> : null}
      {sortedFilteredTickets?.slice(0, showedTicketsLimit).map((ticketData) => {
        return <Ticket key={uuidv4()} ticketData={ticketData} />;
      })}
      {(sortedFilteredTickets.length !== 0 && <ShowMore />) || (
        <div className="no-flights">Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
    </div>
  );
};

export default TicketList;
