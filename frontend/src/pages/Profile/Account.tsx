import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Account = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <form>
        <CardContent></CardContent>
        <CardFooter className="border-t px-6 py-4"></CardFooter>
      </form>
    </Card>
  );
};

export default Account;
