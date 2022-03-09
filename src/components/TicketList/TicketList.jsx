import React from 'react';
import { Ticket } from '../Ticket';
import { ShowMore } from '../ShowMore';
import './TicketList.scss';

const TicketList = () => {
  return (
    <div className="ticket-list">
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <ShowMore />
    </div>
  );
};

export default TicketList;
