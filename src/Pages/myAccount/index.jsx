import Layout from "../../Components/Layout";

const MyAccount = () => {
  return (
    <Layout>
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="../../assets/profile/profile.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />


            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">John Doe</h1>
              <p className="text-lg text-white/80">johndoe@example.com</p>
            </div>
          </div>

          {/* Edit Button */}
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-md text-sm">
            Edit Profile
          </button>
        </div>

        {/* Account Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Account Details
          </h2>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">Username</p>
            <p className="text-gray-800">john_doe_123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Phone</p>
            <p className="text-gray-800">(123) 456-7890</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Address</p>
            <p className="text-gray-800">123 Main Street, Cityville, Country</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg w-full md:w-auto shadow-md">
            Log Out
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full md:w-auto shadow-md">
            Change Password
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
