import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = ({ movieId, movieTitle }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fungsi untuk memulai kamera
  const startCamera = () => {
    setIsCameraOn(true);
  };

  // Fungsi untuk mengambil foto
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // Fungsi untuk mengambil lokasi saat ini
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Tambahkan logika atau feedback untuk pengguna di sini
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      // Tambahkan logika atau feedback untuk pengguna di sini
    }
  };

  // Fungsi untuk menyimpan foto ke server
  const handleSavePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', dataURItoBlob(imageSrc), 'webcam-photo.png');
      formData.append("movieId", movieId);
      formData.append("movieTitle", movieTitle);
      formData.append("location", `${currentLocation.latitude}, ${currentLocation.longitude}`);
      // Kirim data foto, lokasi, dan informasi film ke server
    
      const response = await axios.post(
        "https://apipcsexpress.sppapp.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Photo uploaded:", response);
      // Tambahkan logika atau feedback untuk pengguna di sini

      // Reset state setelah berhasil diunggah
      setImageSrc(null);
      setCurrentLocation(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
      // Tambahkan logika atau feedback untuk error di sini
    }
  };
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
};

  useEffect(() => {
    // Ambil lokasi saat komponen dimuat
    getLocation();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {!isCameraOn && (
        <button
          onClick={startCamera}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
        >
          Start Camera
        </button>
      )}

      {isCameraOn && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
          />
          <button
            onClick={capture}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Capture Photo
          </button>
        </div>
      )}

      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <img
            src={imageSrc}
            alt="Captured"
            className="max-w-full rounded-lg"
          />
          <button
            onClick={handleSavePhoto}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Save Photo
          </button>
        </div>
      )}

      {/* Tampilkan informasi lokasi saat ini */}
      {/* {currentLocation && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Current Location</h2>
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Longitude: {currentLocation.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default WebcamCapture;
