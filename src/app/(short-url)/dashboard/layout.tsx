import { auth } from "$/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session);

  if (!session) {
    return redirect("/auth/login");
  }

  return <>{children}</>;
};

export default DashboardLayout;
