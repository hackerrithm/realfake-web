"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Decider = () => {
  const [image, setImage] = useState<string | null>(null);
  const [folderName, setFolderName] = useState(null);
  const [result, setResult] = useState<string | null>(null);
  const api = process.env.NODE_ENV === "production" ? process.env.API : process.env.DEV_API;

  const fetchImage = async () => {
    try {
      setResult(null);
      console.log("api: " + api);
      const response = await axios.get(`${api}/image`);
      setImage(`${response.data.img}`);

      setFolderName(response.data.answer);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const compareImage = async (answer: string) => {
    try {
      const response = await axios.post(`${api}/compare`, {
        answer: answer,
        img: image,
      });
      setResult(response.data);
      console.log("Comparison result:", result);
      // You can handle the result here, e.g., show a tick or cross icon
    } catch (error) {
      console.error("Error comparing image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {image && (
        <div>
          <Image
            src={`https://real-fake-images.s3.amazonaws.com/${image}`}
            alt="Image"
            className="mb-4 rounded-lg"
            width={400}
            height={400}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold"
            style={{ color: "white" }}
          >
            {result}
          </div>
        </div>
      )}

      <button
        onClick={fetchImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {image ? "Another" : "start"}
      </button>

      {image && (
        <div className="flex space-x-4">
          <button
            onClick={() => compareImage("real")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Real
          </button>
          <button
            onClick={() => compareImage("fake")}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Fake
          </button>
        </div>
      )}
    </div>
  );
};

export default Decider;
