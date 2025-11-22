import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const verifypremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.ispremium) {
      setIsUserPremium(true);
    }
  };
  const handlebuyclick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        {
          withCredentials: true,
        }
      );

      //It should Open the dialogue box here
      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "DevTinder",
        description: "Connect to other developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes?.firstname + " " + notes?.lastname,
          email: notes?.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifypremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error in buying plan: ", error);
    }
  };

  return isUserPremium ? (
    "You are Already a premium User"
  ) : (
    <div className="min-h-scree flex justify-center items-center p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10">
          Choose Your Plan
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Silver Plan */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-8 border-gray-400">
            <h2 className="text-2xl font-bold text-gray-700 text-center">
              Silver
            </h2>
            <p className="text-center text-gray-500 mt-2">Basic Access</p>
            <h3 className="text-3xl font-bold text-center mt-4">₹199/month</h3>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Unlimited Swipes</li>
              <li>✔ Basic Chats</li>
              <li>✔ See who visited your profile</li>
              <li>✘ No Priority Matching</li>
              <li>✘ No Profile Boost</li>
            </ul>

            <button
              onClick={() => handlebuyclick("silver")}
              className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Choose Silver
            </button>
          </div>

          {/* Gold Plan */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-8 border-yellow-500 scale-105">
            <h2 className="text-2xl font-bold text-yellow-600 text-center">
              Gold
            </h2>
            <p className="text-center text-gray-500 mt-2">Most Popular</p>
            <h3 className="text-3xl font-bold text-center mt-4">₹399/month</h3>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Unlimited Swipes</li>
              <li>✔ Unlimited Chats</li>
              <li>✔ See who likes you</li>
              <li>✔ Priority Matching</li>
              <li>✘ No Profile Boost</li>
            </ul>

            <button
              onClick={() => handlebuyclick("gold")}
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
            >
              Choose Gold
            </button>
          </div>

          {/* Platinum Plan */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-8 border-indigo-600">
            <h2 className="text-2xl font-bold text-indigo-600 text-center">
              Platinum
            </h2>
            <p className="text-center text-gray-500 mt-2">VIP Features</p>
            <h3 className="text-3xl font-bold text-center mt-4">₹699/month</h3>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Unlimited Everything</li>
              <li>✔ See who likes you instantly</li>
              <li>✔ Profile Boost (Weekly)</li>
              <li>✔ Top Search Ranking</li>
              <li>✔ Premium Badge</li>
            </ul>

            <button
              onClick={() => handlebuyclick("platinum")}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              Choose Platinum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
