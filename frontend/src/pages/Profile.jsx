import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await api.get(
          "/users/me"
        );

      setUser(
        response.data
      );

    }

    catch {

      alert(
        "Cannot load profile"
      );

    }

  };

  if (!user) {

    return (
      <h1>Loading...</h1>
    );

  }

  return (

    <div className="
    min-h-screen
    bg-slate-950
    text-white
    p-8
    ">

      <Navbar />

      <div className="
      bg-slate-900
      p-8
      rounded-xl
      border
      border-slate-700
      max-w-xl
      mx-auto
      ">

        <h1 className="
        text-3xl
        font-bold
        mb-6
        ">
          Profile
        </h1>

        <p className="mb-4">

          <strong>Name:</strong>

          {" "}

          {user.name}

        </p>

        <p>

          <strong>Email:</strong>

          {" "}

          {user.email}

        </p>

      </div>

    </div>

  );

}