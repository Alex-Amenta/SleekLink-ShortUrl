"use client";
import { usePathname } from "next/navigation";

const BackgroundPage = () => {
  const pathname = usePathname();
  const bgColorRgba =
    pathname === "/url-inactive" ? "rgba(255,0,0,38%)" : "rgba(0,255,10,38%)";

  return (
    <>
      <div className="absolute bottom-0 -z-10 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:22px_24px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div
        className={`absolute top-0 left-0 -z-10 h-screen w-screen`}
        style={{
          background: `radial-gradient(100% 50% at 50% 0%, ${bgColorRgba} 0%, rgba(0,163,255,0) 70%, rgba(0,163,255,0) 100%)`,
        }}
      ></div>
    </>
  );
};

export default BackgroundPage;
