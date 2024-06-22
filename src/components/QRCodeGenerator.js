import React, { useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import TemplateSelector from './TemplateSelector';
import WhatsAppForm from './WhatsAppForm';
import VCardForm from './VCardForm';
import EventForm from './EventForm';

const QRCodeGenerator = () => {
    const [template, setTemplate] = useState('whatsapp');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
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
        <>
            <h2 className="text-2xl mb-5">QR Code Generator</h2>
            <div className="text-center grid lg:grid-cols-2 p-5 bg-white">
                <div className="my-4 flex flex-col">

                    <TemplateSelector template={template} setTemplate={setTemplate} />
                    {template === 'whatsapp' && (
                        <WhatsAppForm phone={phone} setPhone={setPhone} />
                    )}
                    {template === 'vcard' && (
                        <VCardForm
                            name={name}
                            setName={setName}
                            phone={phone}
                            setPhone={setPhone}
                            email={email}
                            setEmail={setEmail}
                            website={website}
                            setWebsite={setWebsite}
                        />
                    )}
                    {template === 'event' && (
                        <EventForm
                            eventName={eventName}
                            setEventName={setEventName}
                            eventStartDate={eventStartDate}
                            setEventStartDate={setEventStartDate}
                            eventEndDate={eventEndDate}
                            setEventEndDate={setEventEndDate}
                            eventStartTime={eventStartTime}
                            setEventStartTime={setEventStartTime}
                            eventEndTime={eventEndTime}
                            setEventEndTime={setEventEndTime}
                        />
                    )}
                    <div className="mb-4 p-5 flex items-center w-full justify-center">
                        <label htmlFor="qr-code">Выберите цвет</label>
                        <input
                            type="color"
                            value={qrColor}
                            onChange={(e) => setQrColor(e.target.value)}
                            className="ml-5"
                        />
                    </div>
                    <button
                        onClick={generateQRCode}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Генерировать QR код
                    </button>
                </div>
                <div>
                    <QRCodeDisplay
                        qrCodeData={qrCodeData}
                        qrColor={qrColor}
                        downloadQRCode={downloadQRCode}
                    />
                </div>
            </div>
        </>
    );
};

export default QRCodeGenerator;
