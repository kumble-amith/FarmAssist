import { useEffect, useState } from "react";
import { useAuth } from "@/components/contexts/Auth";
import { Loader2 } from "lucide-react";
import BasicInfo from "./BasicInfo";
import Account from "./Account";
import Notifications from "./Notifications";

const Profile = () => {
  const { USER } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("basic");

  useEffect(() => {
    const setLoadingHelper = async () => {
      await new Promise((res) => setTimeout(res, 2000));
      setLoading(false);
    };
    setLoadingHelper();
  }, [USER]);

  const setTabHelper = (event: any) => setTab(event.target.id);
  return (
    <>
      {loading && (
        <main>
          <div className="flex justify-center m-10">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        </main>
      )}
      {!loading && (
        <>
          {USER && (
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
              <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">{USER.name}</h1>
              </div>
              <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav
                  className="grid text-sm text-muted-foreground"
                  x-chunk="dashboard-04-chunk-0"
                >
                  <p
                    className="hover:bg-accent p-1.5 cursor-pointer"
                    id="basic"
                    onClick={setTabHelper}
                  >
                    Basic Info
                  </p>
                  <p
                    className="hover:bg-accent p-1.5 cursor-pointer"
                    id="account"
                    onClick={setTabHelper}
                  >
                    Account
                  </p>
                  <p
                    className="hover:bg-accent p-1.5 cursor-pointer"
                    id="notifications"
                    onClick={setTabHelper}
                  >
                    Notifications
                  </p>
                </nav>
                <div className="grid gap-6">
                  <div className="grid gap-1">
                    {tab == "basic" && <BasicInfo />}
                    {tab == "account" && <Account />}
                    {tab == "notifications" && <Notifications />}
                  </div>
                </div>
              </div>
            </main>
          )}
          {!USER && (
            <main>
              <div className="flex justify-center m-10">
                <h2>User not found</h2>
              </div>
            </main>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
