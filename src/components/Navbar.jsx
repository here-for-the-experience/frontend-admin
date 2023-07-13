import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useGlobalState } from "../Context";
import { prefix } from "../prefix";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [user, setUser] = useGlobalState("user");
  const logout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    window.location.pathname = "/login";
  };

  return (
    <div className="flex justify-between items-center border-b border-b-black py-2 px-4 lg:p-4 lg:px-24">
      <button
        className="font-medium"
        onClick={() => (window.location.pathname = "/")}
      >
        Vaccination
      </button>
      <Menubar>
        {isLoggedIn ? (
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              {user.name}
            </MenubarTrigger>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                window.location.pathname = "/register";
              }}
              className="cursor-pointer"
            >
              Register for vaccine
            </MenubarTrigger>
          </MenubarMenu>
        )}
        {user.name ? (
          <MenubarMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarTrigger className="cursor-pointer">
                  Logout
                </MenubarTrigger>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => logout()}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">Login</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => (window.location.pathname = "/login")}
              >
                Using Email-Password
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Using social media</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Google</MenubarItem>
                  <MenubarItem>Facebook</MenubarItem>
                  <MenubarItem>Github</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>
    </div>
  );
}

export default Navbar;
