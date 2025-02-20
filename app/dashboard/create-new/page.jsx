"use client";
import React, { useState, useContext } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import AiOutputDialog from "../_components/AiOutputDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDetailContext } from "../../_context/UserDetailContext";

function CreateNew() {
  const [aiOutputImage, setAiOutputImage] = useState("");
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log(formData);
  };

  const customToastStyle = {
    backgroundColor: "#faebd7",
    color: "#990000",
    fontSize: "18px",
    padding: "12px 25px",
    borderRadius: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    margin: "0 auto",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const GenerateAiImage = async () => {
    if (!formData.image || !formData.roomType || !formData.designType) {
      toast.error("Please select an Image, Room Type, and Design Type.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: customToastStyle,
      });
      return;
    }

    if (userDetail?.credits <= 0) {
      toast.error("You do not have enough credits to generate a design.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: customToastStyle,
      });
      return;
    }

    setIsLoading(true);

    try {
      const rawImageUrl = await SaveRawImageToFirebase();
      const result = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress.emailAddress,
      });

      console.log(result.data);
      setAiOutputImage(result.data.result);
      setOpenOutputDialog(true);

      setUserDetail((prev) => ({
        ...prev,
        credits: prev.credits - 1,
      }));
    } catch (error) {
      console.error("Error generating AI image:", error);
      toast.error("An error occurred while generating the design.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: customToastStyle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "/room-redesign/" + fileName);
    await uploadBytes(imageRef, formData.image).then((resp) => {
      console.log("File is Uploaded Successfully");
    });
    try {
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Download URL: ", downloadUrl);
      setOrgImage(downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  return (
    <div className="min-h-[1000px]">
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-slate-600 text-center mt-3">
        Transform any Room with a click. Select a Space, choose a Style and
        watch as AI instantly ReImagines your Environment.
      </p>
      <div className="grid grid-cols-1 gap-[100px] mt-[70px] md:grid-cols-2">
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        <div>
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />
          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-[80px] text-semibold text-[15px] text-white hover:text-[#439ecb] active:text-[18px]"
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            GenerateAiImage();
          }, 3000);
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-between">
            <span>Generate the Design</span>
            <img
              src="/sketch.png"
              alt="loading"
              className="w-5 h-5 animate-spin ml-5"
            />
          </div>
        ) : (
          "Generate the Design"
        )}
      </Button>
      <p className="mt-3 underline underline-offset-2 text-bold text-lg text-slate-600 text-center">
        NOTE: After the design is Created, 1 Credit will be consumed !{" "}
      </p>
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
      <ToastContainer className="h-[200px] rounded-lg text-semibold" />
    </div>
  );
}

export default CreateNew;
