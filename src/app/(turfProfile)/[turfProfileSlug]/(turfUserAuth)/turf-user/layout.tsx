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
