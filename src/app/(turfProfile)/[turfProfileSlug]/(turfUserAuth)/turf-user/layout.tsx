import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function TurfUserAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
