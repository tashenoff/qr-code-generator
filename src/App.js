import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { FaWhatsapp, FaAddressCard, FaCalendarAlt } from 'react-icons/fa';

const App = () => {
  const [template, setTemplate] = useState('whatsapp');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [qrColor, setQrColor] = useState('#000000');

  const generateQRCode = () => {
    let data = '';
    if (template === 'whatsapp') {
      data = `https://wa.me/7${phone}`;
    } else if (template === 'vcard') {
      data = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:+7${phone}\nEMAIL:${email}\nURL:${website}\nEND:VCARD`;
    } else if (template === 'event') {
      const formatDateTime = (date, time) => {
        return `${date.replace(/-/g, '')}T${time.replace(/:/g, '')}00`;
      };
      const startDate = formatDateTime(eventStartDate, eventStartTime);
      const endDate = formatDateTime(eventEndDate, eventEndTime);
      data = `BEGIN:VEVENT\nSUMMARY:${eventName}\nDTSTART:${startDate}\nDTEND:${endDate}\nEND:VEVENT`;
    }
    setQrCodeData(data);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')?.innerHTML;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>QR Code Generator</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div onClick={() => setTemplate('whatsapp')} style={{ margin: '0 10px', cursor: 'pointer' }}>
          <FaWhatsapp size={50} color={template === 'whatsapp' ? 'green' : 'grey'} />
          <div>WhatsApp</div>
        </div>
        <div onClick={() => setTemplate('vcard')} style={{ margin: '0 10px', cursor: 'pointer' }}>
          <FaAddressCard size={50} color={template === 'vcard' ? 'blue' : 'grey'} />
          <div>Визитка</div>
        </div>
        <div onClick={() => setTemplate('event')} style={{ margin: '0 10px', cursor: 'pointer' }}>
          <FaCalendarAlt size={50} color={template === 'event' ? 'red' : 'grey'} />
          <div>Событие</div>
        </div>
      </div>
      {template === 'whatsapp' && (
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span>+7</span>
            <input
              type="text"
              placeholder="7781647391"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </div>
        </div>
      )}
      {template === 'vcard' && (
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
            <span>+7</span>
            <input
              type="text"
              placeholder="7781647391"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Сайт"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
      )}
      {template === 'event' && (
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Название события"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="time"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="time"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
      )}
      <input
        type="color"
        value={qrColor}
        onChange={(e) => setQrColor(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <div>
        <button onClick={generateQRCode} style={{ marginRight: '10px' }}>
          Генерировать QR код
        </button>
        {qrCodeData && (
          <div>
            <div id="qr-code" style={{ margin: '20px auto', width: '256px', height: '256px' }}>
              <QRCode value={qrCodeData} renderAs="svg" size={256} fgColor={qrColor} />
            </div>
            <button onClick={downloadQRCode}>Скачать QR код</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
