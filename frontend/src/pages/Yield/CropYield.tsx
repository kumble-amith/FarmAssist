// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// import { useAuth } from "@/components/contexts/Auth";
// import { Label } from "@/components/ui/label";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { HashLink } from "react-router-hash-link";
// import UnAuthAlert from "./Auth";

// const CropYield = () => {
//   const { USER } = useAuth();
//   const [AI_Loading, set_AI_Loading] = useState(false);
//   const [inputs, setInputs] = useState<{
//     crop?: string;
//     area?: number;
//     N?: number;
//     P?: number;
//     K?: number;
//     T?: number;
//     H?: number;
//     pH?: number;
//     R?: number;
//   }>({});
//   const [recommendedCrops, setRecommendedCrops] = useState<any>();
//   const inputsList = [
//     { title: "Rainfall", id: "R", units: "mm", ex: "202.93", typeIP: "number" },
//     { title: "Fertiliser", id: "ppm", units: "50 to 80", ex: "55", typeIP: "number" },
//     { title: "Temperature", id: "T", units: "celsius", ex: "29.072", typeIP: "number" },
//     { title: "Nitrogen", id: "N", units: "kg/ha", ex: "90.005", typeIP: "number" },
//     { title: "Phosphorus", id: "P", units: "kg/ha", ex: "42.5", typeIP: "number" },
//     { title: "Potassium", id: "K", units: "kg/ha", ex: "43.00", typeIP: "number" }
//   ];
//   const inputsOnChange = (event: ChangeEvent<HTMLInputElement>) =>
//     setInputs({ ...inputs, [event.target.id]: event.target.value });

//   const formOnSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     set_AI_Loading(true);
//     const formData = new FormData();
//     formData.append("values", JSON.stringify({ ...inputs }));
//     try {
//       let resp = await fetch("http://127.0.0.1:5000/predictYield", {
//         method: "POST",
//         body: formData,
//       });
//       resp = await resp.json();
//       setRecommendedCrops(resp);
//       set_AI_Loading(false);

//       console.log(resp);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCropChange = (value: string) => setInputs({ ...inputs, crop: value });

//   return (
//     <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
//       <div className="mx-auto grid w-full max-w-6xl gap-2">
//         <h1 className="text-3xl font-semibold">Crop Yield AI</h1>
//       </div>
//       <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
//         <nav
//           className="grid text-sm text-muted-foreground"
//           x-chunk="dashboard-04-chunk-0"
//         >
//           <HashLink className="hover:bg-accent p-1.5" smooth to={"#Crop"}>
//             Crop and Area Values
//           </HashLink>
//           <HashLink className="hover:bg-accent p-1.5" smooth to={"#Value"}>
//             Data Values
//           </HashLink>
//         </nav>
//         <div className="grid gap-6">
//           <div className="grid gap-1">
//             <span id="Crop" className="dummy-navigator relative -top-20"></span>
//             {!USER && <UnAuthAlert />}

//             {/* New Card for Crop Selection and Area Values */}
//             <Card x-chunk="dashboard-04-chunk-1">
//               <CardHeader>
//                 <CardTitle>Select Crop and Enter Area</CardTitle>
//                 <CardDescription>
//                   Choose a crop and specify the area of your land.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-5">
//                   <div className="grid min-w-64 items-center gap-2">
//                     <Label htmlFor="crop">Crop</Label>
//                     {USER && (
//                       <Select onValueChange={handleCropChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a crop" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="rice">Rice</SelectItem>
//                           <SelectItem value="wheat">Wheat</SelectItem>
//                           <SelectItem value="maze">Maze</SelectItem>
//                           <SelectItem value="sugarcane">Sugarcane</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                     {!USER && <Input id="crop" disabled />}
//                   </div>
//                   <div className="grid min-w-64 items-center gap-2">
//                     <Label htmlFor="area">Area (ha)</Label>
//                     {USER && (
//                       <Input
//                         type="number"
//                         id="area"
//                         placeholder="Enter area"
//                         min={0}
//                         onChange={inputsOnChange}
//                         required
//                       />
//                     )}
//                     {!USER && <Input id="area" disabled />}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <div style={{ marginTop: '20px' }}></div>

//             <Card x-chunk="dashboard-04-chunk-1">
//               <CardHeader>
//                 <CardTitle>
//                   Maximise your yield by choosing the right crop
//                 </CardTitle>
//                 <CardDescription>
//                   Fill in the information about the soil and atmospheric
//                   conditions of your land.
//                 </CardDescription>
//               </CardHeader>
//               <form onSubmit={formOnSubmit}>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-5">
//                     {inputsList.map(({ id, title, units, ex, typeIP }) => (
//                       <div
//                         className="grid min-w-64 items-center gap-2"
//                         key={id}
//                       >
//                         <Label htmlFor={id}>{`${title} (${units})`}</Label>
//                         {USER && (
//                           <Input
//                             type={typeIP}
//                             step={"any"}
//                             id={id}
//                             placeholder={`Example: ${ex}`}
//                             min={0}
//                             onChange={inputsOnChange}
//                             required
//                           />
//                         )}
//                         {!USER && <Input id={id} disabled />}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="border-t px-6 py-4">
//                   {USER && <Button>Find Yield</Button>}
//                   {!USER && <Button disabled>Find Yield</Button>}
//                 </CardFooter>
//               </form>
//             </Card>
//             {(recommendedCrops || AI_Loading) && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Results</CardTitle>
//                   <CardDescription>
//                     {AI_Loading && (
//                       <div className="w-full flex justify-center">
//                         <Loader2 className="h-10 w-10 animate-spin" />
//                       </div>
//                     )}
//                     {!AI_Loading && recommendedCrops && (
//                       <CardContent>
//                         {recommendedCrops.map((item: any) => (
//                           <li>
//                             <div><strong>{item}</strong></div>
//                           </li>
//                         ))}
//                       </CardContent>
//                     )}
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CropYield;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/contexts/Auth";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { HashLink } from "react-router-hash-link";
import UnAuthAlert from "./Auth";

const CropYield = () => {
  const { USER } = useAuth();
  const [AI_Loading, set_AI_Loading] = useState(false);
  const [inputs, setInputs] = useState<{
    crop?: string;
    area?: number;
    N?: number;
    P?: number;
    K?: number;
    T?: number;
    F?: number;
    R?: number;
  }>({});
  const [recommendedCrops, setRecommendedCrops] = useState<any>();

  const inputsList = [
    { title: "Rainfall", id: "R", units: "mm", ex: "202.93", typeIP: "number" },
    {
      title: "Fertiliser",
      id: "F",
      units: "50 to 80",
      ex: "55",
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
  ];

  const inputsOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });

  const formOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    set_AI_Loading(true);
    const formData = new FormData();
    formData.append("values", JSON.stringify({ ...inputs }));
    try {
      let resp = await fetch("http://127.0.0.1:5000/predictYield", {
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

  const handleCropChange = (value: string) =>
    setInputs({ ...inputs, crop: value });

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Crop Yield AI</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#Crop"}>
            Crop and Area Values
          </HashLink>
          <HashLink className="hover:bg-accent p-1.5" smooth to={"#Value"}>
            Data Values
          </HashLink>
        </nav>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <span id="Crop" className="dummy-navigator relative -top-20"></span>
            {!USER && <UnAuthAlert />}

            {/* New Card for Crop Selection and Area Values */}
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Select Crop and Enter Area</CardTitle>
                <CardDescription>
                  Choose a crop and specify the area of your land.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-5">
                  <div className="grid min-w-64 items-center gap-2">
                    <Label htmlFor="crop">Crop</Label>
                    {USER && (
                      <Select onValueChange={handleCropChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maize">Miaze</SelectItem>
                          <SelectItem value="Rice">Rice</SelectItem>
                          <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                          <SelectItem value="Wheat">Wheat</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    {!USER && <Input id="crop" disabled />}
                  </div>
                  <div className="grid min-w-64 items-center gap-2">
                    <Label htmlFor="area">Area (ha)</Label>
                    {USER && (
                      <Input
                        type="number"
                        id="area"
                        placeholder="Enter area"
                        min={0}
                        onChange={inputsOnChange}
                        required
                      />
                    )}
                    {!USER && <Input id="area" disabled />}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div style={{ marginTop: "20px" }}></div>

            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>
                  Maximise your yield by choosing the right crop
                </CardTitle>
                <CardDescription>
                  Fill in the information about the soil and atmospheric
                  conditions of your land.
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
                  {USER && <Button>Find Yield</Button>}
                  {!USER && <Button disabled>Find Yield</Button>}
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
                      <CardContent>
                        {/* {recommendedCrops.map((item: any) => (
                          <li key={item}>
                            <div><strong>{item}</strong></div>
                          </li>
                        ))} */}
                        The Yield is {recommendedCrops} Quintal.
                      </CardContent>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
            {/* {description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                  <CardDescription>
                    {description}   
                  </CardDescription>
                </CardHeader>
              </Card>
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CropYield;
