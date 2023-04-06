import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { IoMenu } from "react-icons/io5";

type Pages = "hello-world" | "projects" | "contact" | "game";

const formatedPath = (path: string) => {
  if (path === "/_error") return "404";
  if (path === "/") return "hello-world";

  const formatedPath = path.split("/")[1];
  return formatedPath;
};

const NavLinks = (props: { pages: Pages[] }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="relative w-max">
        <div
          className={`${
            !visible ? "hidden " : ""
          } absolute bottom-full min-w-max pb-4`}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <div className="flex flex-col rounded-md bg-black px-2 py-1 text-white">
            {props.pages.map((page, index) => {
              if (page === formatedPath(router.pathname)) return null;
              const link = page === "hello-world" ? "/" : page;

              return (
                <Link
                  href={link}
                  key={index}
                  className="rounded-md px-2 py-1 hover:bg-gray-500"
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className="flex w-full items-center justify-between whitespace-nowrap break-normal rounded-md bg-gray-500 px-2 py-1 capitalize text-white"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {formatedPath(router.pathname)} <IoMenu className="w-full pl-2" />
        </div>
      </div>
    </>
  );
};

export default NavLinks;
