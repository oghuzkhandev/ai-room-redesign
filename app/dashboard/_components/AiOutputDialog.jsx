import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";

export function AiOutputDialog({ openDialog, closeDialog, aiImage, orgImage }) {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            It's all done. Here is your new room made according to your wishes. Have fun!
          </AlertDialogTitle>
          <div className>
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: aiImage,
              }}
              secondImage={{
                imageUrl: orgImage,
              }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={() => closeDialog(false)}>
              Close
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
