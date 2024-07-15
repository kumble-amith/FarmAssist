"use client";
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { useAuth } from "@/components/contexts/Auth";
import { HashLink } from "react-router-hash-link";
import UnAuthAlert from "./Auth";
import { FormEvent, useState, useRef } from "react";
import Webcam from "react-webcam";

const Disease = () => {
  const { USER } = useAuth();
  const [AI_Loading, set_AI_Loading] = useState(false);
  const [AI_Results, set_AI_Results] = useState<any>(null);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const plants = ["Wheat", "Rice", "Mango", "Corn", "Coffee"].sort();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setCapturedImage(URL.createObjectURL(e.target.files[0]));
      setIsImageUploaded(true);
    }
  };
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    imageSrc  && setCapturedImage(imageSrc );
    setWebcamActive(false);
    setIsImageUploaded(true);
  };

  const removeCapturedPhoto = () => {
    setCapturedImage(null);
    setIsImageUploaded(false);
  };

  const formOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    set_AI_Loading(true);
    if (image) {
      const data = await convertBase64(image);
      const cropFromUser = selectedPlant;
      const response = await fetch("http://localhost:5000/predictDisease", {
        method: "POST",
        body: JSON.stringify({
          file: data,
          crop: cropFromUser,
        }),
        headers: new Headers({
          "content-type": "application/json",
        }),
      });

      // console.log(response);
      let res = await response.json();

      set_AI_Loading(false);
      set_AI_Results({
        diseaseName: res[0].toUpperCase(),
        diseaseDescription: res[1],
      });
      // console.log(res[0]);
    }
  };

  const handlePlantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(e.target.value);
  };

  return(
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Crop Disease AI</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid text-sm text-muted-foreground">
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#AI"}>
            Plant and Image
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#DSA"}>
            Results
          </HashLink>
        </nav>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <span id="AI" className="dummy-navigator relative -top-20"></span>
            {!USER && <UnAuthAlert />}
            <Card>
              <CardHeader>
                <CardTitle>Find out the disease of your plant</CardTitle>
                <div style={{ marginTop: "20px" }}></div>
                <CardDescription>
                  <strong>Choose the plant</strong>
                </CardDescription>
                <div
                  className="dropdown"
                  style={{ width: "50%", textAlign: "center" }}
                >
                  <select
                    value={selectedPlant}
                    onChange={handlePlantChange}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <option value="" disabled>
                      Select Plant
                    </option>
                    {plants.map((plant, index) => (
                      <option key={index} value={plant}>
                        {plant}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginTop: "20px" }}></div>
                <div className="upload">
                  <h3>
                    <strong>Upload Image</strong>
                  </h3>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" style={{ width: "50%" }}>
                      Upload Image
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>Upload Image</SheetTitle>
                      <SheetDescription>
                        Choose a file or take a photo
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="file-upload" className="text-right">
                          Choose file
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="take-photo" className="text-right">
                          Take photo
                        </Label>
                        <Button
                          onClick={() => setWebcamActive(true)}
                          className="w-full"
                        >
                          Open Webcam
                        </Button>
                      </div>
                      {webcamActive && (
                        <div className="grid gap-4">
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                          />
                          <Button onClick={capturePhoto}>Capture Photo</Button>
                        </div>
                      )}
                      {capturedImage && (
                        <div className="grid gap-4">
                          <img
                            src={capturedImage}
                            alt="Captured"
                            className="max-w-full"
                          />
                          <Button
                            variant="destructive"
                            onClick={removeCapturedPhoto}
                          >
                            Cancel Photo
                          </Button>
                        </div>
                      )}
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          type="button"
                          onClick={() => setWebcamActive(false)}
                        >
                          Done
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <div style={{ marginTop: "20px" }}></div>
                {capturedImage && (
                  <img
                    src={capturedImage}
                    alt="Uploaded"
                    className="mb-4"
                    style={{
                      height: "400px",
                      width: "400px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Button
                  type="submit"
                  disabled={!isImageUploaded}
                  onClick={formOnSubmit}
                  style={{ width: "50%" }}
                >
                  Submit
                </Button>
              </CardHeader>
            </Card>
            {(AI_Results || AI_Loading) && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <div style={{ marginTop: "20px" }}></div>
                  <CardDescription>
                    {AI_Loading && (
                      <div className="w-full flex justify-center">
                        {/* <Loader2 className="h-10 w-10 animate-spin" /> */}
                      </div>
                    )}
                    {!AI_Loading && AI_Results && (
                      <div>
                        <p>
                          <strong>Disease:</strong> {AI_Results.diseaseName}
                        </p>
                        <div style={{ marginTop: "20px" }}></div>
                        <p>{AI_Results.diseaseDescription}</p>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Disease;
