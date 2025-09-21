import React from "react";
import CameraViewport from "./components/CameraViewport";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Student Attendance Hub</h1>
      <CameraViewport />
    </div>
  );
}

export default App;

