import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MessageCircle, Lock } from "lucide-react";

const avatarOptions = ["avatar1.png","avatar2.png","avatar3.png","avatar4.png","avatar5.png"];

const Field = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 outline-none"
    />
  </div>
);
const ProfilePage = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [profileForm, setProfileForm] = useState({ name:"", email:"", mobile:"", avatar:avatarOptions[0] });
  const [addressForm, setAddressForm] = useState({ fullName:"", phone:"", street:"", city:"", state:"", pincode:"" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword:"", newPassword:"", confirmPassword:"" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({ name:user.name||"", email:user.email||"", mobile:user.mobile||"", avatar:user.avatar||avatarOptions[0] });
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
    toast.success("Address saved");
  };

  const updatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return toast.error("Passwords do not match");

    await axios.put("/auth/change-password", passwordForm);
    toast.success("Password updated");
    setShowPasswordModal(false);
  };

  if (!user) return <p className="mt-24 text-center text-gray-400">Please login</p>;

  return (
    <>
      <div className="mt-24 max-w-3xl mx-auto px-4 space-y-12">

        {/* PROFILE CARD */}
        <div className="bg-gray-900 border border-emerald-700 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-emerald-400">Profile Details</h2>

        {/* BIG AVATAR PREVIEW */}
<div className="flex justify-center">
  <img
    src={profileForm.avatar}
    alt="Selected Avatar"
    className="w-28 h-28 rounded-full border-4 border-emerald-500 shadow-lg object-cover"
  />
</div>

          <div className="flex justify-center gap-4">
            {avatarOptions.map((a) => (
              <img
                key={a}
                src={a}
                onClick={() => setProfileForm({ ...profileForm, avatar: a })}
                className={`w-14 h-14 rounded-full cursor-pointer border-2 ${profileForm.avatar===a?"border-emerald-500":"border-gray-700"}`}
              />
            ))}
          </div>

          <form onSubmit={updateProfile} className="grid md:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" value={profileForm.name} onChange={(e)=>setProfileForm({...profileForm,name:e.target.value})}/>
            <Field label="Email Address" name="email" value={profileForm.email} onChange={(e)=>setProfileForm({...profileForm,email:e.target.value})}/>
            <Field label="Mobile Number" name="mobile" value={profileForm.mobile} onChange={(e)=>setProfileForm({...profileForm,mobile:e.target.value})}/>
            
            <div
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md cursor-pointer border border-gray-700 hover:border-emerald-500 md:col-span-2"
            >
              <Lock size={16}/> Change Password
            </div>

            <button className="md:col-span-2 bg-emerald-600 py-2 rounded-md text-white">
              Save Profile
            </button>
          </form>
        </div>

        {/* ADDRESS CARD */}
        <div className="bg-gray-900 border border-emerald-700 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-emerald-400">Delivery Address</h2>

          <form onSubmit={updateAddress} className="grid md:grid-cols-2 gap-5">
            <Field label="Receiver Name" name="fullName" value={addressForm.fullName} onChange={(e)=>setAddressForm({...addressForm,fullName:e.target.value})}/>
            <Field label="Phone Number" name="phone" value={addressForm.phone} onChange={(e)=>setAddressForm({...addressForm,phone:e.target.value})}/>
            <Field label="House / Street" name="street" value={addressForm.street} onChange={(e)=>setAddressForm({...addressForm,street:e.target.value})} className="md:col-span-2"/>
            <Field label="City" name="city" value={addressForm.city} onChange={(e)=>setAddressForm({...addressForm,city:e.target.value})}/>
            <Field label="State" name="state" value={addressForm.state} onChange={(e)=>setAddressForm({...addressForm,state:e.target.value})}/>
            <Field label="Pincode" name="pincode" value={addressForm.pincode} onChange={(e)=>setAddressForm({...addressForm,pincode:e.target.value})}/>

            <button className="md:col-span-2 bg-emerald-600 py-2 rounded-md text-white">
              Save Address
            </button>
          </form>
        </div>
      </div>

     
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-80 space-y-4 relative">
            <button onClick={()=>setShowPasswordModal(false)} className="absolute top-2 right-2 text-gray-400">✕</button>
            <Field label="Current Password" type="password" onChange={(e)=>setPasswordForm({...passwordForm,currentPassword:e.target.value})}/>
            <Field label="New Password" type="password" onChange={(e)=>setPasswordForm({...passwordForm,newPassword:e.target.value})}/>
            <Field label="Confirm Password" type="password" onChange={(e)=>setPasswordForm({...passwordForm,confirmPassword:e.target.value})}/>
            <button onClick={updatePassword} className="bg-emerald-600 py-2 rounded-md text-white w-full">
              Update Password
            </button>
          </div>
        </div>
      )}

      <Link to="/contact" className="fixed bottom-6 right-6 bg-emerald-600 p-4 rounded-full text-white">
        <MessageCircle />
      </Link>
    </>
  );
};

export default ProfilePage;