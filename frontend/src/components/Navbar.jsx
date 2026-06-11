import toast from "react-hot-toast";

export default function Navbar() {

  return (

    <div className="
    flex
    justify-between
    items-center
    mb-8
    ">

      <div>

        <h1 className="text-4xl font-bold">
          CodeRefine 🚀
        </h1>

        <p className="text-gray-400">

          AI-Powered Code Review

        </p>

      </div>


      <div className="flex gap-3">

        <button
          className="
          bg-indigo-600
          px-4
          py-2
          rounded-lg
          "
          onClick={() => {

            window.location.href =
              "/dashboard";

          }}
        >
          Dashboard
        </button>


        <button
          className="
          bg-green-600
          px-4
          py-2
          rounded-lg
          "
          onClick={() => {

            window.location.href =
              "/history";

          }}
        >
          History
        </button>


        <button
          className="
          bg-red-600
          px-4
          py-2
          rounded-lg
          "
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            toast.success(
              "Logged Out"
            );

            setTimeout(() => {

              window.location.href =
                "/";

            },1000);

          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}