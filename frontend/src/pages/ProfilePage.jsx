// frontend/src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MessageCircle, Lock } from "lucide-react";

const avatarOptions = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
];

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobile: "",
    avatar: avatarOptions[0],
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Load user details once
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        avatar: user.avatar || avatarOptions[0],
      });
    }
  }, []);

  // Input handlers
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Update Profile
const handleProfileSubmit = async (e) => {
	e.preventDefault();

	try {
		setLoadingProfile(true);

		const res = await axios.put("/auth/profile", profileForm);

		setUser(res.data);
		toast.success("Profile updated successfully");
	} catch (error) {
		toast.error(error.response?.data?.message || "Update failed");
	} finally {
		setLoadingProfile(false);
	}
};


  // Change Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.put("/auth/change-password", passwordForm);
      toast.success("Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  if (!user)
    return <p className="mt-24 text-center text-gray-300">Please login</p>;

  return (
    <>
      <div className="mt-24 container mx-auto px-4 max-w-xl space-y-10">

        {/* Avatar Area */}
        <div className="text-center">
          <h2 className="text-emerald-400 font-semibold mb-3">Choose Avatar</h2>

          {/* Big preview */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={profileForm.avatar}
              className="w-28 h-28 rounded-full border-4 border-emerald-500 shadow-lg object-cover"
              alt="Selected Avatar"
            />
            <span className="text-gray-400 text-sm mt-2">Selected Avatar</span>
          </div>

          {/* Avatar Selection */}
          <div className="flex items-center justify-center gap-4">
            {avatarOptions.map((src, i) => (
              <img
                key={i}
                src={src}
                onClick={() => setProfileForm({ ...profileForm, avatar: src })}
                className={`w-16 h-16 rounded-full cursor-pointer transition border-2 object-cover
                hover:scale-110 hover:border-emerald-400
                ${profileForm.avatar === src ? "border-emerald-500 scale-110" : "border-gray-700"}`}
              />
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleProfileSubmit}
          className="bg-gray-900 p-6 rounded-xl border border-emerald-700 space-y-4 shadow-md"
        >
          <h2 className="text-lg text-emerald-400">Profile Info</h2>

          <input
            name="name"
            value={profileForm.name}
            onChange={handleProfileChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white outline-none border border-gray-700"
            placeholder="Full Name"
          />

          <input
            name="email"
            type="email"
            value={profileForm.email}
            onChange={handleProfileChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white outline-none border border-gray-700"
            placeholder="Email"
          />

          <input
            name="mobile"
            value={profileForm.mobile}
            onChange={handleProfileChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white outline-none border border-gray-700"
            placeholder="Mobile Number"
          />

          {/* Change Password Box */}
          <div
            className="bg-gray-800 rounded-lg border border-gray-700 p-4 cursor-pointer hover:border-emerald-500 transition flex items-center gap-2"
            onClick={() => setShowPasswordModal(true)}
          >
            <Lock size={18} className="text-emerald-400" />
            <span className="text-gray-300">Change Password</span>
          </div>

          <button
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-md transition disabled:opacity-50"
            disabled={loadingProfile}
          >
            {loadingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Floating Contact Button */}
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 p-4 rounded-full text-white shadow-lg"
      >
        <MessageCircle size={25} />
      </Link>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-80 border border-emerald-700 shadow-xl space-y-4">

            <h2 className="text-lg text-emerald-400">Change Password</h2>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 outline-none"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 outline-none"
            />

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-1/2 bg-gray-700 py-2 rounded-md text-white"
              >
                Cancel
              </button>

              <button
                onClick={handlePasswordSubmit}
                className="w-1/2 bg-emerald-600 py-2 rounded-md text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;