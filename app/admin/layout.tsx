import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./_components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/auth/login");
  }

  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData?.user?.email;

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] text-gray-900 font-sans">
      <AdminSidebar userEmail={userEmail} />
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
