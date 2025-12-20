import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Lock,
  User,
  MapPin,
  LogOut,
  Package
} from "lucide-react";

const avatarOptions = [
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
];

const Field = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
      {label}
    </label>
    <input
      {...props}
      className="
        w-full px-3 py-2 rounded-md
        bg-white dark:bg-slate-900
        border border-slate-300 dark:border-slate-600
        text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-indigo-500
        outline-none
      "
    />
  </div>
);

const SidebarItem = ({ active, icon: Icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm
      ${active ? "bg-slate-100 dark:bg-slate-700 font-semibold" : "hover:bg-slate-100 dark:hover:bg-slate-700"}
      ${danger ? "text-red-600 hover:bg-red-50" : ""}
    `}
  >
    <Icon size={16} />
    {label}
  </button>
);

const ProfilePage = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [activeTab, setActiveTab] = useState("profile");

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobile: "",
    avatar: avatarOptions[0],
  });

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        mobile: user.mobile || "",
        avatar: user.avatar || avatarOptions[0],
      });
      if (user.address) setAddressForm(user.address);
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await axios.put("/auth/profile", profileForm);
    setUser(res.data);
    toast.success("Profile updated");
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    const res = await axios.put("/auth/address", addressForm);
    setUser(res.data);
    toast.success("Address updated");
  };

  const updatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return toast.error("Passwords do not match");

    await axios.put("/auth/change-password", passwordForm);
    toast.success("Password updated");
  };
  const handleLogout=()=>{
	useUserStore.getState().logout();
	toast.success("Logged out successfully");
	Navigate("/login");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 bg-white dark:bg-slate-800 border rounded-lg p-4 h-fit sticky top-28">
          <div className="flex items-center gap-3 pb-4 border-b mb-4">
            <img src={profileForm.avatar} className="w-14 h-14 rounded-full border" />
            <div>
              <p className="text-xs text-slate-500">Hello</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>

          <div className="space-y-1">
            <SidebarItem
              label="My Profile"
              icon={User}
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />

            <Link to="/my-orders">
              <SidebarItem label="My Orders" icon={Package} />
            </Link>

            <SidebarItem
              label="Addresses"
              icon={MapPin}
              active={activeTab === "address"}
              onClick={() => setActiveTab("address")}
            />

            <SidebarItem
              label="Change Password"
              icon={Lock}
              active={activeTab === "password"}
              onClick={() => setActiveTab("password")}
            />

            <SidebarItem
              label="Logout"
              icon={LogOut}
              onClick={handleLogout}
              danger
            />
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="md:col-span-3 bg-white dark:bg-slate-800 border rounded-lg p-6">

          {activeTab === "profile" && (
            <form onSubmit={updateProfile} className="space-y-6">
              <h2 className="text-lg font-semibold border-b pb-3">
                Personal Information
              </h2>

              <div className="flex gap-3">
                {avatarOptions.map((a) => (
                  <img
                    key={a}
                    src={a}
                    onClick={() => setProfileForm({ ...profileForm, avatar: a })}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                      profileForm.avatar === a
                        ? "border-indigo-500"
                        : "border-slate-300"
                    }`}
                  />
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                />
                <Field label="Email Address" value={profileForm.email} disabled />
                <Field
                  label="Mobile Number"
                  value={profileForm.mobile}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, mobile: e.target.value })
                  }
                />
              </div>

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md">
                Save Changes
              </button>
            </form>
          )}

          {activeTab === "address" && (
            <form onSubmit={updateAddress} className="space-y-5">
              <h2 className="text-lg font-semibold border-b pb-3">
                Delivery Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full Name" value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} />
                <Field label="Phone" value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />
                <Field label="Street" className="md:col-span-2"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} />
                <Field label="City" value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                <Field label="State" value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} />
                <Field label="Pincode" value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} />
              </div>

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md">
                Save Address
              </button>
            </form>
          )}

          {activeTab === "password" && (
            <div className="max-w-md space-y-4">
              <h2 className="text-lg font-semibold border-b pb-3">
                Change Password
              </h2>

              <Field label="Current Password" type="password"
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
              <Field label="New Password" type="password"
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
              <Field label="Confirm Password" type="password"
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />

              <button
                onClick={updatePassword}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md"
              >
                Update Password
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;

