import React from 'react';
import { FaWhatsapp, FaAddressCard, FaCalendarAlt } from 'react-icons/fa';

const TemplateSelector = ({ template, setTemplate }) => {
  return (
    <div className="flex justify-center mb-5">
      <div onClick={() => setTemplate('whatsapp')} className={`m-2 flex items-center  p-2 cursor-pointer ${template === 'whatsapp' ? 'text-green-500' : 'text-gray-500'}`}>
        <FaWhatsapp size={20} />
        <div className='ml-2'>WhatsApp</div>
      </div>
      <div onClick={() => setTemplate('vcard')} className={`m-2 p-2 flex items-center cursor-pointer ${template === 'vcard' ? 'text-blue-500' : 'text-gray-500'}`}>
        <FaAddressCard size={20} />
        <div className='ml-2'>Визитка</div>
      </div>
      <div onClick={() => setTemplate('event')} className={`m-2 p-2 flex items-center cursor-pointer ${template === 'event' ? 'text-red-500' : 'text-gray-500'}`}>
        <FaCalendarAlt size={20} />
        <div className='ml-2'>Событие</div>
      </div>
    </div>
  );
};

export default TemplateSelector;
