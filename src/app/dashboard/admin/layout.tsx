export default async function AdminDashboardLayout({ children }) {
  const token = cookies().get("adminAccess")?.value;

  if (!token) return redirect("/login");

  const user = getUserFromToken(token);

  if (!user || user.role !== "admin") {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <AdminNavbar user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
