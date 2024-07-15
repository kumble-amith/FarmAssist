import { useAuth } from "@/components/contexts/Auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/database/store";
import { FormEvent, useState } from "react";

const BasicInfo = () => {
  const { USER } = useAuth();
  const [changes, setChanges] = useState({});
  const [loadingToUpdateProfile, setLoadingToUpdateProfile] = useState(false);
  const setChangesHelper = (event: any) => {
    setChanges({ ...changes, [event.target.id]: event.target.value });
  };
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingToUpdateProfile(true);
    await updateUser(USER.uid, changes); // Assuming updateUser returns a Promise
    setLoadingToUpdateProfile(false);
  };
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Basic Info</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmitForm}>
        <CardContent className="grid gap-5">
          <div className="flex w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="w-32" onChange={setChangesHelper}>
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              disabled
              value={USER.email}
            />
          </div>
          <div className="flex w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="w-32" onChange={setChangesHelper}>
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Your Name"
              value={USER.name}
              onChange={setChangesHelper}
            />
          </div>
          <div className="flex w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="location" className="w-32">
              Location
            </Label>
            <Input
              type="text"
              id="location"
              onChange={setChangesHelper}
              placeholder="Your Location"
            />
          </div>
          <div className="flex w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="location" className="w-32">
              Pincode
            </Label>
            <Input
              type="text"
              onChange={setChangesHelper}
              id="pincode"
              placeholder={USER.pincode ? USER.pincode : "Your Pincode"}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BasicInfo;
