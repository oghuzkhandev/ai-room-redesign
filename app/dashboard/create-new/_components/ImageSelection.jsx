"use client";
import React, { useState } from "react";
import Image from "next/image";

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState();

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    selectedImage(selectedFile);
  };

  return (
    <div>
      <label className="text-slate-400 font-semibold">
        {" "}
        Select Image of your Room*
      </label>
      <div className="mt-5">
        <label htmlFor="upload-image">
          <div
            className={`relative w-full h-[600px] border rounded-xl border-dotted flex justify-center items-center bg-slate-200 border-primary cursor-pointer hover:shadow-xl ${
              file ? "bg-white" : ""
            }`}
          >
            {!file ? (
              <Image
                src="/image-upload.png"
                alt="default"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="uploded-image"
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
