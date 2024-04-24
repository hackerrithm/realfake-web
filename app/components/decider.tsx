"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Decider = () => {
  const [image, setImage] = useState<string | null>(null);
  const [folderName, setFolderName] = useState(null);
  const [result, setResult] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0); // Add a state for the correct count
  const [totalImages, setTotalImages] = useState(0);
  const [logoImage, setLogoImage] = useState("/blink.gif"); // Add a state for the logo image

  useEffect(() => {
    setTimeout(() => {
      setLogoImage("/group.jpeg"); // Update the logo image source 5 seconds after page load
    }, 5000);
  }, []);

  const api =
    process.env.NODE_ENV === "production"
      ? process.env.API
      : process.env.DEV_API;

  const fetchImage = async () => {
    try {
      setResult(null);
      const response = await axios.get(`${api}/image`);
      setImage(`${response.data.img}`);

      setFolderName(response.data.answer);
      setTotalImages(totalImages + 1);
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
      const resultText: string = response.data;
      setResult(response.data);
      if (resultText.toLocaleLowerCase() === "correct") {
        setCorrectCount(correctCount + 1); // Increment the correct count if the answer is correct
      }
      // You can handle the result here, e.g., show a tick or cross icon
    } catch (error) {
      console.error("Error comparing image:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <Image
          src="/real_fake_dark.png" // Replace with your logo image
          alt="Logo"
          width={200}
          height={100}
          className="rounded-full"
        />
      </div>
      {image && (
        <div className="flex justify-center mb-4 text-blue-600 text-4xl font-mono">
          <p>
            {correctCount} / {totalImages} Correct
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        {image && (
          <div>
            <Image
              src={`https://real-fake-images.s3.amazonaws.com/${image}`}
              alt="Image"
              // className="mb-4 rounded-lg"
              width={500}
              height={500}
              className="rounded-full glow"
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold"
              style={{ color: "white" }}
            >
              {result !== null
                ? result.toLocaleLowerCase() === "correct"
                  ? "✔️"
                  : "❌"
                : ""}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mt-5">
        {image && (
          <div className="flex mb-4">
            <button
              onClick={() => compareImage("real")}
              disabled={result !== undefined && result !== null}
              className="bg-green-500 text-white px-5 py-2 rounded-none ring-green-500 text-4xl hover:bg-green-600 shadow-md transition duration-300 transform hover:shadow-lg"
            >
              Real ✔️
            </button>
            <button
              onClick={() => compareImage("fake")}
              disabled={result !== undefined && result !== null}
              className="bg-red-500 text-white px-5 py-2 rounded-none ring-red-500 text-4xl hover:bg-red-600 shadow-md transition duration-300 transform hover:shadow-lg"
            >
              Fake ✖️
            </button>
          </div>
        )}
        {!image && (
          <div className="flex justify-center mb-4 text-blue-600 text-4xl font-semibold">
            <div>
              <Image
                src={logoImage}
                alt="Image"
                // className="mb-4 rounded-lg"
                width={500}
                height={500}
                className="rounded-full glow transition duration-1000"
              />
            </div>
          </div>
        )}
        <button
          onClick={fetchImage}
          className="bg-yellow-500 text-black font-mono px-4 py-2 rounded-md mb-4 text-3xl"
        >
          {image ? "Next" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Decider;
