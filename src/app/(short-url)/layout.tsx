import DashboardNavbar from "@/components/navbar-dashboard";
import { ChildrenProps } from "$/types";

export const metadata = {
  title: "Dashboard - Settings | SleekLink",
  description:
    "Explore and manage your shortened URLs and account information in the dashboard.",
};

export default function RedirectLayout({ children }: ChildrenProps) {
  return (
    <section>
      <DashboardNavbar />
      {children}
    </section>
  );
}
