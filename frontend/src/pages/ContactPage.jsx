import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const { user } = useUserStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/contact", form);
      toast.success("Message sent!");
      setForm((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="mt-24 container mx-auto px-4 max-w-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-semibold text-center text-emerald-400 mb-6">
        Contact Support
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-70 backdrop-blur-md border border-emerald-700 rounded-xl p-6 space-y-5 shadow-lg"
      >

        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-1 flex items-center gap-2">
            <User size={18} className="text-emerald-400" /> Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-1 flex items-center gap-2">
            <Mail size={18} className="text-emerald-400" /> Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-300 mb-1 flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-400" /> Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-3 py-2 h-32 rounded-md bg-gray-800 text-gray-100 border border-gray-700 outline-none focus:border-emerald-500 resize-none"
            required
          ></textarea>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-2 rounded-md disabled:opacity-50 text-white text-lg transition"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Message <Send size={18} />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactPage;