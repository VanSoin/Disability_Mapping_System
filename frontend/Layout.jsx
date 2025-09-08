import React from "react";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
export default function Layout() {
 return (
 <div className="flex h-screen bg-gradient-to-r from-[#d4c084] to-[#e60202]">
 <Sidebar>
 <SidebarItem
 icon={<LayoutDashboard size={20} />}
 text="Location"
 path="/upload"
 active
 />
 </Sidebar>
 <div className="flex-grow bg-gradient-to-r from-[#d4c084] to-[#e60202] p-4">
   <Outlet /> {/* This renders the active page content */}
 </div>
 </div>
 );
}
