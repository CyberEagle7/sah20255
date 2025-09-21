import React, { useRef, useState } from "react";
import jsQR from "jsqr";
import { createClient } from "@supabase/supabase-js";

// Supabase setup (from .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CameraViewport = () => {
  const videoRef = useRef(null);
  const [scanResult, setScanResult] = useState("No QR code scanned yet");
  const [scanning, setScanning] = useState(false);
  const [animationFrameId, setAnimationFrameId] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true);
      await videoRef.current.play();
      setScanning(true);
      scanFrame();
    } catch (err) {
      setScanResult("Camera not accessible: " + err.message);
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };

  const scanFrame = async () => {
    if (!videoRef.current || !scanning) return;

    const video = videoRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        const data = code.data;
        setScanResult("Scanned: " + data);

        try {
          const { data: existing } = await supabase
            .from("qr_scans")
            .select("*")
            .eq("code", data)
            .limit(1);

          if (!existing || existing.length === 0) {
            await supabase.from("qr_scans").insert([{ code: data }]);
          }
        } catch (err) {
          console.error("Supabase insert error:", err);
        }

        stopCamera();
        return; // Stop scanning after successful scan
      }
    }

    setAnimationFrameId(requestAnimationFrame(scanFrame));
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-lg font-bold mb-2">Camera QR Scanner</h2>
      <video
        ref={videoRef}
        className="w-full max-w-md border-2 border-black mb-2"
        playsInline
      />
      <div className="font-semibold mb-2">{scanResult}</div>
      {!scanning ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={startCamera}
        >
          Start Camera & Scan
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={stopCamera}
        >
          Stop Camera
        </button>
      )}
    </div>
  );
};

export default CameraViewport;
