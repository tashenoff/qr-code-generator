import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { toPng, toSvg } from 'html-to-image';

const QRCodeDisplay = ({ qrCodeData, qrColor }) => {
  const [downloadFormat, setDownloadFormat] = useState('svg'); // По умолчанию скачиваем SVG
  const qrCodeRef = useRef(null);

  const downloadQRCode = async () => {
    const svgElement = qrCodeRef.current.querySelector('svg');

    if (downloadFormat === 'svg') {
      // Сохранение SVG
      const svg = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      link.click();
      URL.revokeObjectURL(url);
    } else if (downloadFormat === 'png') {
      // Сохранение PNG
      try {
        const dataUrl = await toPng(svgElement, { width: svgElement.clientWidth * 1.5, height: svgElement.clientHeight * 1.5 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      } catch (error) {
        console.error('Ошибка при сохранении PNG:', error);
      }
    }
  };

  return (
    <div className="my-4">
      {qrCodeData ? (
        <div>
          <div ref={qrCodeRef} className="m-auto w-64 h-64">
            <QRCode value={qrCodeData} renderAs="svg" size={256} fgColor={qrColor} />
          </div>
          <div className="flex items-center justify-center mt-4">
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value)}
              className="mr-2 p-2 bg-gray-100 rounded"
            >
              <option value="svg">SVG</option>
              <option value="png">PNG</option>
            </select>
            <button onClick={downloadQRCode} className="px-4 py-2 bg-blue-500 text-white rounded">
              Скачать QR код в {downloadFormat.toUpperCase()}
            </button>
          </div>
        </div>
      ) : (
        <div className="m-auto w-64 h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Здесь будет QR код</span>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
