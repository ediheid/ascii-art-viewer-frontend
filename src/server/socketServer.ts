import axios from "axios";
import { io, Socket } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadFile(file: File, interval: number): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("interval", interval.toString());

  try {
    await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 10000,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        alert("The request timed out. Please try again later.");
      } else {
        alert("Error uploading file: " + error.message);
      }
    } else {
      alert("Unexpected error occurred.");
    }
  }
}

export async function startPrintingProcess(
  file: File,
  interval: number
): Promise<{ socketConnection: Socket }> {
  if (!file || interval < 50 || interval > 2000)
    throw new Error("Invalid file or interval");

  await uploadFile(file, interval);

  const socketConnection = io(API_BASE_URL);

  socketConnection.emit("startPrinting", file.name, interval);

  return { socketConnection };
}
