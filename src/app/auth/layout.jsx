import { Suspense } from "react";
import SideNav from "../ui/sidenav";
import ParticlesBackground from '../auth/ParticlesBg';
export default function Layout({ children }) {
    return (
        <Suspense fallback={<>....</>}>
            <div className="w-screen h-screen bg-gradient-to-b from-[#c2cb9d]  to-[#ffffff] ">
        
                <div className="w-full h-full">
                {children}
                </div>
                
            </div>
        </Suspense>
    )
}