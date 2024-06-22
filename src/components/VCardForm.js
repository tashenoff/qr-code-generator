import React from 'react';

const VCardForm = ({ name, setName, phone, setPhone, email, setEmail, website, setWebsite }) => {
  return (
    <div className="mb-4 flex flex-col">
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 m-2 border rounded"
      />
      <div className="inline-flex items-center  m-2">
        <span>+7</span>
        <input
          type="text"
          placeholder="Номер телефона без 8"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="ml-2 p-2 border rounded "
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 m-2 border rounded "
      />
      <input
        type="text"
        placeholder="Сайт"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="p-2 m-2 border rounded"
      />
    </div>
  );
};

export default VCardForm;
