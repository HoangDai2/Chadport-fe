import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TUser from "../../Types/TUsers";
const DetailUser = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<TUser | null>(null);

  const GetUserDetail = async () => {
    try {
      const DetailUser = await axios.get(`http://localhost:3000/users/${id}`);
      setUserDetail(DetailUser.data);
    } catch (error) {
      console.error("Error dữ liệu user deatail", error);
    }
  };
  useEffect(() => {
    GetUserDetail();
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
          />
          <h2 className="text-2xl font-bold mt-4">User Name</h2>
          <p className="text-gray-600">user@example.com</p>
        </div>
        <div className="space-y-4">
          <DetailItem label="Phone Number" value="123-456-7890" />
          <DetailItem label="Birthday" value="01/01/1990" />
          <DetailItem label="Address" value="123 Main St, City, Country" />
          <DetailItem label="Account Status" value="Active" />
          <DetailItem label="Date Created" value="01/01/2020" />
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default DetailUser;
