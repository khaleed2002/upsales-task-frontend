import { Button } from "@/components/ui/button";
import { useAuth } from "../../../hooks";

export const LogoutBtn = () => {
    const { logout } = useAuth();
    return <Button onClick={logout}>Logout</Button>;
};

export default LogoutBtn;
