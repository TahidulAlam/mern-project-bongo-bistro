/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const Axios = useAxiosSecure();
  const { data: paymentsData = [], refetch } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      try {
        console.log(user.email);
        const response = await Axios.get(`/api/bb/payments/${user.email}`);
        refetch();
        // console.log(response);
        return response.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
        // throw error;
      }
    },
  });
  return (
    <div>
      <Heading
        mainTitle={"Payment Heistory"}
        subTitle={"Your all payment"}
      ></Heading>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Transection Id</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((dd, index) => (
              <tr key={dd._id}>
                <th>{index + 1}</th>
                <td>{dd.email}</td>
                <td>{dd.transectionId}</td>
                <td>{dd.price}</td>
                <td>{dd.status}</td>
                <td>{dd.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
