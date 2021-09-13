import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import UpcomingEvent from "./components/UpcomingEvent";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  getUserDetailsById,
  getMinimalUserById,
} from "../../services/user-utils";

import "./Home.css";
import avatar_icon from "../../assets/images/avatar.png";

function NewHome({ user }) {
  const [userDetails, setUserDetails] = useState({
    name: "user",
    image: avatar_icon,
  });
  // here dummy details are used to avoid render condition and null object error
  // in future, this will be replaced with dummy elements

  async function fetchUserDetails() {
    const details = await getMinimalUserById(user.uid);
    setUserDetails(details);
  }

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div className="w-full h-screen grid grid-rows-layout-1 bg-body_blue">
      <Navbar userDetails={userDetails} />
      <div className="grid grid-cols-layout-2">
        <Sidebar />
        <Feed />
        <UpcomingEvent />
      </div>
    </div>
  );
}

export default NewHome;
