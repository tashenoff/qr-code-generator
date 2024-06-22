import React from 'react';

const EventForm = ({
  eventName,
  setEventName,
  eventStartDate,
  setEventStartDate,
  eventEndDate,
  setEventEndDate,
  eventStartTime,
  setEventStartTime,
  eventEndTime,
  setEventEndTime,
}) => {
  return (
    <div className="mb-4 flex flex-col">
      <input
        type="text"
        placeholder="Название события"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="p-2 m-2 border rounded"
      />
      <input
        type="date"
        value={eventStartDate}
        onChange={(e) => setEventStartDate(e.target.value)}
        className="p-2 m-2 border rounded"
      />
      <input
        type="time"
        value={eventStartTime}
        onChange={(e) => setEventStartTime(e.target.value)}
        className="p-2 m-2 border rounded"
      />
      <input
        type="date"
        value={eventEndDate}
        onChange={(e) => setEventEndDate(e.target.value)}
        className="p-2 m-2 border rounded"
      />
      <input
        type="time"
        value={eventEndTime}
        onChange={(e) => setEventEndTime(e.target.value)}
        className="p-2 m-2 border rounded"
      />
    </div>
  );
};

export default EventForm;
