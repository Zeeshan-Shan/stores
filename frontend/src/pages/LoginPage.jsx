import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			toast.success("Welcome back!");
		} catch (error) {
			toast.error("Invalid email or password");
		}
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
						Welcome Back
					</h2>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Login to <span className="text-indigo-600 font-medium">Electronic Items</span>
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
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-600
									rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
									focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* FORGOT PASSWORD */}
						<div className="text-right">
							<Link
								to="/forgot-password"
								className="text-sm text-indigo-600 hover:underline"
							>
								Forgot password?
							</Link>
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
									Logging in...
								</>
							) : (
								<>
									<LogIn size={18} />
									Login
								</>
							)}
						</button>
					</form>

					{/* FOOTER */}
					<p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
						Not a member?{" "}
						<Link
							to="/signup"
							className="text-indigo-600 font-medium hover:underline"
						>
							Sign up now <ArrowRight className="inline w-4 h-4" />
						</Link>
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
