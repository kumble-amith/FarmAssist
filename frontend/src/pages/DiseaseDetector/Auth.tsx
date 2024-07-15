import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
const UnAuthAlert = () => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Authentication Required</AlertTitle>
    <AlertDescription>
      Please{" "}
      <Link
        to={"/auth.register?redirectTo=/crop.disease.ai"}
        className="underline"
      >
        Sign up
      </Link>{" "}
      or{" "}
      <Link
        to={"/auth.login?redirectTo=/crop.disease.aii"}
        className="underline"
      >
        Login
      </Link>{" "}
      to use Crop Disease AI.
    </AlertDescription>
  </Alert>
);

export default UnAuthAlert;
