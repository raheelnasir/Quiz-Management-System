"use client";
import Cookies from "js-cookie";

import { decryptObject } from "@/GlobalFunctions";
import { AuthContext } from "@/app/context/AuthContext";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { userAuth, setUserAuthData } = useContext(AuthContext);

  useEffect(() => {
    const encryptedUserAuth = Cookies.get("UserAuth");
    if (encryptedUserAuth) {
      const decryptedUserAuth = decryptObject(encryptedUserAuth);
      let parsedUserAuth;
      try {
        parsedUserAuth = JSON.parse(decryptedUserAuth);
      } catch (error) {
        parsedUserAuth = decryptedUserAuth;
      }
      setUserAuthData(parsedUserAuth);
    }
  }, []);
  const handleLogout = (e) => {
    Cookies.remove("UserAuth");
    Cookies.remove("X-CSRF");

    setUserAuthData({
      userName: "",
      uId: "",
      userStatus: "",
      userRole: "",
      userType: "",
    });
    router.push("/auth");
  };
  return (
    <nav className="shadow  lg:sticky top-0 z-50">
      {/* Drawer */}
      <div className="drawer z-20">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="navbar-start">
              <label htmlFor="my-drawer" className="drawer-button">
                <div role="button" className="btn btn-ghost btn-circle">
                  <div className="drawer-content ">
                    <svg
                      className="swap-on fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            <ul className="menu bg-base-200 w-100 rounded-box">
              <li>
                <Link href={"/"} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </Link>
              </li>

            </ul>
          </ul>
        </div>
      </div>

      {/* Narrow */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="drawer-button">
            <div role="button" className="btn btn-ghost btn-circle">
              <div className="drawer-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
            </div>
          </label>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Quiz</a>
          <a href=""> </a>
        </div>

        <div className="navbar-end">
          {userAuth && userAuth.userRole === "Admin" ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className=""
                >
                  <div className="">
                    <button className="btn purple">Menu</button>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="">
                    <a className="justify-between btn mb-2" href="/adminpanel">
                      Admin Dashboard
                    </a>
                  </li>
                  <li>
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            ""
          )}

          {userAuth &&
            userAuth.userRole === "user" &&
            userAuth.userRole.length > 1 ? (
            <div>
              <Link
                href={"/quiz"}
                className="btn "
                style={{ backgroundColor: "var(--purple)", color: "white" }}
              >
                Start Quiz
              </Link>
              <button
                className="btn"
                onClick={handleLogout}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* MODAL */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-error  mr-2"
                onClick={handleLogout}
                style={{ color: "white" }}
              >
                Logout{" "}
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </nav>
  );
};

export default Navbar;
