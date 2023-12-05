/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/headers/Navbar";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  // console.log("admin: ", isAdmin);
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2 divide-y">
            {/* Sidebar content here */}
            <li>
              <NavLink to={"userHome"}>User Home</NavLink>
            </li>
            <li>
              <NavLink to={"reservation"}>Reservation</NavLink>
            </li>
            <li>
              <NavLink to={"paymentHistory"}>PaymentHistory</NavLink>
            </li>
            <li>
              <NavLink to={"addReview"}>Add Review</NavLink>
            </li>
            <li>
              <NavLink to={"cart"}>Cart</NavLink>
            </li>
            <li>
              <NavLink to={"mybooking"}>My Booking</NavLink>
            </li>
            <br className="text-black w-full bg-black" />

            {isAdmin ? (
              <>
                <li>
                  <NavLink to={"adminHome"}>Admin Home</NavLink>
                </li>
                <li>
                  <NavLink to={"addItems"}>Add Items</NavLink>
                </li>
                <li>
                  <NavLink to={"manageItems"}>Manage Items</NavLink>
                </li>
                <li>
                  <NavLink to={"manageBookings"}>Manage Bookings</NavLink>
                </li>
                <li>
                  <NavLink to={"allUsers"}>All Users</NavLink>
                </li>
              </>
            ) : (
              " "
            )}
            {/* <>
              <li>
                <NavLink to={"adminHome"}>Admin Home</NavLink>
              </li>
              <li>
                <NavLink to={"addItems"}>Add Items</NavLink>
              </li>
              <li>
                <NavLink to={"manageItems"}>Manage Items</NavLink>
              </li>
              <li>
                <NavLink to={"manageBookings"}>Manage Bookings</NavLink>
              </li>
              <li>
                <NavLink to={"allUsers"}>All Users</NavLink>
              </li>
            </> */}
            <br className="text-black w-full bg-black" />

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
    </div>
  );
};

export default Dashboard;
