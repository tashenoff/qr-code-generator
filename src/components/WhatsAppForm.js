import React from 'react';

const WhatsAppForm = ({ phone, setPhone }) => {
  return (
    <div className="mb-4">
      <div className="inline-flex items-center ">
        <span>+7</span>
        <input
          type="text"
          placeholder="Номер телефона без 8"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="ml-2 p-2 border rounded "
        />
      </div>
    </div>
  );
};

export default WhatsAppForm;
