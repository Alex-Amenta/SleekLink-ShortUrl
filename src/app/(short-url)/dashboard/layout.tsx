import { auth } from "$/auth";
import { ChildrenProps } from "$/types";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ChildrenProps }) => {
  const session = await auth();
  console.log(session);

  if (!session) {
    return redirect("/auth/login");
  }

  return <>{children}</>;
};

export default DashboardLayout;
