import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/contexts/Auth";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { HashLink } from "react-router-hash-link";
import NPKAccordion from "./NPKAccordion";
import ATMAccordion from "./ATMAccordion";
import UnAuthAlert from "./UnAuthAlert";

const CropAdviser = () => {
  const { USER } = useAuth();
  const [AI_Loading, set_AI_Loading] = useState(false);
  // const [AI_Results, set_AI_Results] = useState<any>(null);
  const [inputs, setInputs] = useState<{
    N?: number;
    P?: number;
    K?: number;
    T?: number;
    H?: number;
    pH?: number;
    R?: number;
  }>({});
  const [recommendedCrops, setRecommendedCrops] = useState<any>();
  const inputsList = [
    {
      title: "Nitrogen",
      id: "N",
      units: "kg/ha",
      ex: "90.005",
      typeIP: "number",
    },
    {
      title: "Phosphorus",
      id: "P",
      units: "kg/ha",
      ex: "42.5",
      typeIP: "number",
    },
    {
      title: "Potassium",
      id: "K",
      units: "kg/ha",
      ex: "43.00",
      typeIP: "number",
    },
    {
      title: "Temperature",
      id: "T",
      units: "celsius",
      ex: "29.072",
      typeIP: "number",
    },
    {
      title: "Humidity",
      id: "H",
      units: "percentage",
      ex: "82.1674",
      typeIP: "number",
    },
    { title: "pH", id: "pH", units: "0 to 14", ex: "6.9567", typeIP: "number" },
    { title: "Rainfall", id: "R", units: "mm", ex: "202.93", typeIP: "number" },
    {
      title: "Recent Crop",
      id: "CR",
      units: "Name",
      ex: "Wheat",
      typeIP: "text",
    },
  ];
  const inputsOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });

  // const formOnSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   set_AI_Loading(true);
  //   setRecommendedCrops(await fetch('https://127.0.0.1/5000/predict'))
  //   // set_AI_Results(JSON.stringify(inputs));
  //   set_AI_Loading(false);
  // };
  const formOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    set_AI_Loading(true);
    const formData = new FormData();
    formData.append("values", JSON.stringify({ ...inputs }));
    try {
      let resp = await fetch("http://127.0.0.1:5000/predictCrop", {
        method: "POST",
        body: formData,
      });
      resp = await resp.json();
      setRecommendedCrops(resp);
      set_AI_Loading(false);

      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Crop Adviser AI</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#AI"}>
            AI
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#NPK"}>
            NPK Values of Soil
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#ATM"}>
            Atmospheric Factors
          </HashLink>
        </nav>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <span id="AI" className="dummy-navigator relative -top-20"></span>
            {!USER && <UnAuthAlert />}
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>
                  Find out the most suitable crop to grow in your area
                </CardTitle>
                <CardDescription>
                  Fill in the information about the soil and atmospheric
                  conditions of the your land.
                </CardDescription>
              </CardHeader>
              <form onSubmit={formOnSubmit}>
                <CardContent>
                  <div className="flex flex-wrap gap-5">
                    {inputsList.map(({ id, title, units, ex, typeIP }) => (
                      <div
                        className="grid min-w-64 items-center gap-2"
                        key={id}
                      >
                        <Label htmlFor={id}>{`${title} (${units})`}</Label>
                        {USER && (
                          <Input
                            type={typeIP}
                            step={"any"}
                            id={id}
                            placeholder={`Example: ${ex}`}
                            min={0}
                            onChange={inputsOnChange}
                            required
                          />
                        )}
                        {!USER && <Input id={id} disabled />}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  {USER && <Button>Find Crop</Button>}
                  {!USER && <Button disabled>Find Crop</Button>}
                </CardFooter>
              </form>
            </Card>
            {(recommendedCrops || AI_Loading) && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>
                    {AI_Loading && (
                      <div className="w-full flex justify-center">
                        <Loader2 className="h-10 w-10 animate-spin" />
                      </div>
                    )}
                    {!AI_Loading && recommendedCrops && (
                      <ol>
                        <CardContent>
                          {recommendedCrops.map((item: any) => (
                            <li key={item}>
                              <strong>{item}</strong>
                            </li>
                          ))}
                        </CardContent>
                      </ol>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
          <NPKAccordion />
          <ATMAccordion />
        </div>
      </div>
    </main>
  );
};

export default CropAdviser;
