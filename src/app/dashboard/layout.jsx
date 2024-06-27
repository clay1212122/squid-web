import { Suspense } from "react";
import SideNav from "../ui/sidenav";

export default function Layout({ children }) {
    return (
        <Suspense fallback={<>....</>}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                {children}
            </div>
        </Suspense>
    )
}