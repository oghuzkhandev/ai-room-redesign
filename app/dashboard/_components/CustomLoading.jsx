import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-bold">
              Redesigning your room... Please Wait 🙏
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center justify-center my-10">
            <Image
              src={"/loading.gif"}
              alt="loading"
              width={150}
              height={150}
            />
            <p className="text-lg font-semibold">
              We are trying to make the best design for you. 💯
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CustomLoading;
