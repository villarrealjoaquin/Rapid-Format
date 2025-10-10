import type { ReactNode } from "react";
import { AppSidebar } from "../AppSidebar/AppSidebar";
import Header from "../Header/Header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

export default function FormatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex-1 bg-transparent overflow-y-auto">
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </>
  )
}