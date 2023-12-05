/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../../assets/bb-logo.png";
import { NavLink } from "react-router-dom";
import Container from "../shared/Container";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const { cartData } = useCart();
  // const [isAdmin] = useAdmin();
  const data = cartData?.length;
  // console.log(data);
  return (
    <div>
      <Container>
        <div className="navbar text-white bg-black bg-opacity-40 uppercase w-[90vw] py-3 mx-auto fixed top-0 left-0 right-0 z-20 font-semibold flex justify-between">
          <div className="">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"}>Menu</NavLink>
                </li>
                <li>
                  <NavLink to={"/ourShop/popular"}>Our Shop</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact us</NavLink>
                </li>
              </ul>
            </div>
            <a className="flex justify-center items-center text-3xl font-bold">
              <img src={logo} alt="" className="w-16 font-semibold p-2" /> Bongo
              Bistro
            </a>
          </div>
          <div className=" hidden lg:flex items-center">
            <ul className="menu menu-horizontal items-center flex">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/menu"}>Menu</NavLink>
              </li>
              <li>
                <NavLink to={"/ourShop/popular"}>Our Shop</NavLink>
              </li>
              <li>
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {data}
                  </span>
                  <NavLink to={"/dashboard/cart"}>Cart</NavLink>
                </div>
              </li>
              <li>
                <NavLink to={"/contact"}>Contact us</NavLink>
              </li>
              <li>
                {user?.email ? (
                  <NavLink to={"/dashboard"}>dashboard</NavLink>
                ) : (
                  " "
                )}
              </li>
              <li>
                <div>
                  {user?.email ? (
                    <button className="btn btn-sm" onClick={() => logOut()}>
                      Sign Out
                    </button>
                  ) : (
                    <NavLink to={"/login"} className="btn btn-success btn-sm">
                      Log In
                    </NavLink>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
