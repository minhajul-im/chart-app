import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { useSignout } from "../../api/hooks/auth/useSignout";
import { removeLocalStorage } from "../../helper/helper";
import toast from "react-hot-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const { mutate: signOutHook, isPending } = useSignout();

  const handleLogout = () => {
    signOutHook(undefined, {
      onSuccess: (res) => {
        removeLocalStorage("token");
        toast.success(res?.message || "Logout successful");
        navigate("/auth/signin");
      },
    });
  };

  return (
    <header className="border-b">
      <div className="container flex px-6 h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold">
            Brand
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  );
};
