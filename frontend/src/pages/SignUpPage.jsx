import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const getPasswordStrength = (password) => {
	let score = 0;

	if (password.length >= 8) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
	if (score === 2) return { label: "Medium", color: "bg-yellow-400", width: "w-2/4" };
	return { label: "Strong", color: "bg-green-500", width: "w-full" };
};

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore(); 
	const strength = getPasswordStrength(formData.password);

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData); 
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
			<motion.div
				className="w-full max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				{/* HEADER */}
				<div className="text-center mb-6">
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white">
						Create Account
					</h2>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Join <span className="text-indigo-600 font-medium">Electronic Items</span>
					</p>
				</div>

				{/* CARD */}
				<motion.div
					className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 px-6 py-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.15 }}
				>
					<form onSubmit={handleSubmit} className="space-y-5">

						{/* NAME */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Full Name
							</label>
							<div className="mt-1 relative">
								<User className="absolute left-3 top-2.5 text-slate-400" size={18} />
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-600
									rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
									focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="John Doe"
								/>
							</div>
						</div>

						{/* EMAIL */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Email Address
							</label>
							<div className="mt-1 relative">
								<Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
								<input
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-600
									rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
									focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="you@example.com"
								/>
							</div>
						</div>

						{/* PASSWORD */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Password
							</label>
							<div className="mt-1 relative">
								<Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
								<input
									type="password"
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className="w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-600
									rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
									focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="••••••••"
								/>
							</div>

							{/* PASSWORD STRENGTH */}
							<div className="mt-2">
								<div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded">
									<div
										className={`h-2 rounded ${strength.color} ${strength.width} transition-all`}
									/>
								</div>
								<p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
									Password strength:{" "}
									<span className="font-medium">{strength.label}</span>
								</p>
							</div>
						</div>

						{/* CONFIRM PASSWORD */}
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Confirm Password
							</label>
							<div className="mt-1 relative">
								<Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
								<input
									type="password"
									required
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									className="w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-600
									rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
									focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* BUTTON */}
						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center gap-2 py-2.5
							bg-indigo-600 text-white font-medium rounded-md
							hover:bg-indigo-700 transition disabled:opacity-50"
						>
							{loading ? (
								<>
									<Loader className="animate-spin" size={18} />
									Creating account...
								</>
							) : (
								<>
									<UserPlus size={18} />
									Sign Up
								</>
							)}
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-indigo-600 font-medium hover:underline"
						>
							Login here <ArrowRight className="inline w-4 h-4" />
						</Link>
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
