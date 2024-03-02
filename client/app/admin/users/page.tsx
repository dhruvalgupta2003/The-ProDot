"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import Heading from "../../../app/utils/Heading";
import CreateDealer from "../../components/Admin/Dealer/CreateDealer"
type Props = {};

const page = (props: Props) => {
    return (
        <div>
          <Heading
            title="Elearning-Admin"
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords="Programming, MERN, Redux, Machine Learning"
          />
          <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashboardHeader />
              <CreateDealer />
            </div>
          </div>
        </div>
    )
};

export default page;
