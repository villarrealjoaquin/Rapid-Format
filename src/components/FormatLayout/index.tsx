import type { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Toaster } from "../ui/sonner";

export default function FormatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}