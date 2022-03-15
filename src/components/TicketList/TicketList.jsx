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
  useEffect(() => {}, [filters]);

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
    const enabledFilters = [];
    availableFilters.map((item) => (item.enabled ? enabledFilters.push(item.title) : null));
    if (enabledFilters.includes('all')) return unFilteredTickets;
    const filterTicketsByCount = (filterName) => {
      let transfers = null;
      switch (filterName) {
        case 'without':
          transfers = 0;
          break;
        case 'one':
          transfers = 1;
          break;
        case 'two':
          transfers = 2;
          break;
        case 'three':
          transfers = 3;
          break;
        default:
          break;
      }
      const afterFilter = unFilteredTickets.filter(
        (el) => el.segments[0].stops.length === transfers && el.segments[1].stops.length === transfers
      );
      filteredTickets.push(...afterFilter);
    };
    enabledFilters.map((item) => filterTicketsByCount(item));
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
