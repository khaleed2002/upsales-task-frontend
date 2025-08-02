import { LogoutBtn } from "../features/authentication/components";
import EntityWrapper from "@/features/Entry/components/EntityWrapper";
export const Home = () => {
    return (
        <div className="w-screen flex flex-col h-full flex-1">
            <header className="w-full border-b flex justify-end items-center p-4 h-[10%]">
                <LogoutBtn />
            </header>
            <EntityWrapper />
        </div>
    );
};

export default Home;
