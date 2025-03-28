import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = () => {
  const [scanData, setScanData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const scannerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (scanning && containerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
      
      const startScanning = async () => {
        try {
          await scannerRef.current.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }
            },
            onScanSuccess,
            onScanFailure
          );
        } catch (err) {
          console.error("QR Scanner error:", err);
        }
      };

      startScanning();

      return () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current.stop()
            .catch(err => console.error("Error stopping scanner:", err));
        }
      };
    }
  }, [scanning]);

  const onScanSuccess = (decodedText) => {
    try {
      const parsed = JSON.parse(decodedText);
      setScanData(parsed);
      setScanning(false);
      
      // Stop the scanner
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop()
          .catch(err => console.error("Error stopping scanner:", err));
      }
      
      // Add to checked-in attendees
      setAttendees(prev => [
        ...prev, 
        {
          id: parsed.id,
          name: parsed.name,
          email: parsed.email,
          event: parsed.event,
          checkInTime: new Date().toLocaleTimeString()
        }
      ]);
    } catch (e) {
      console.error("Failed to parse QR data:", e);
    }
  };

  const onScanFailure = (error) => {
    // Just ignore failures - we don't need to log these as they happen frequently
  };

  const handleStartScan = () => {
    setScanData(null);
    setScanning(true);
  };

  return (
    <div className="scanner-container">
      <h1>QR Code Scanner</h1>
      <p>Scan attendee tickets for check-in</p>
      
      {scanning ? (
        <div className="qr-reader" ref={containerRef}>
          <div id="reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
          <p>Align QR code within the frame</p>
        </div>
      ) : (
        <div className="scan-result">
          <h2>Attendee Checked In!</h2>
          {scanData && (
            <div className="attendee-info">
              <p><strong>Name:</strong> {scanData.name}</p>
              <p><strong>Email:</strong> {scanData.email}</p>
              <p><strong>Event:</strong> {scanData.event}</p>
              <p><strong>Ticket ID:</strong> {scanData.id}</p>
            </div>
          )}
          <button className="btn btn-primary" onClick={handleStartScan}>
            Scan Next Ticket
          </button>
        </div>
      )}
      
      {attendees.length > 0 && (
        <div className="attendee-list">
          <h2>Recent Check-ins</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr key={index}>
                  <td>{attendee.name}</td>
                  <td>{attendee.checkInTime}</td>
                  <td>{attendee.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
