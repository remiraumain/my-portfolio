import NavLinks from "~/components/atoms/NavLinks";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-10 z-10 mx-auto max-w-max rounded-md bg-black p-1.5">
      <NavLinks pages={["hello-world", "projects", "contact", "game"]} />
    </nav>
  );
};

export default Navbar;
