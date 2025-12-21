import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import ShippingProgress from "../components/ShippingProgress";
import LoyaltyPointsCard from "../components/LoyaltyPointsCard";
import SecureCheckoutBadges from "../components/SecureCheckoutBadges";
import InvoicePreview from "../components/InvoicePreview";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    
    <div className="bg-slate-100 dark:bg-slate-950 pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <>
                <div
                  className="
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    rounded-2xl shadow-sm p-6 space-y-6
                  "
                >
                  {cart.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>

                <PeopleAlsoBought />
              </>
            )}
          </motion.div>

          {/* SUMMARY */}
          {cart.length > 0 && (
            <motion.div
              className="space-y-6 lg:sticky lg:top-32 h-fit"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <OrderSummary />
              <GiftCouponCard />
              <ShippingProgress currentStep={1} />
              {/* <LoyaltyPointsCard points={180} /> */}
              {/* <SecureCheckoutBadges /> */}
              {/* <InvoicePreview order={{ id: "ORD123", total: 2499 }} /> */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

/* EMPTY CART UI */
const EmptyCartUI = () => (
  <motion.div
    className="
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-2xl shadow-sm
      flex flex-col items-center justify-center
      py-20 px-6 text-center
    "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
      <ShoppingCart className="h-16 w-16 text-slate-400" />
    </div>

    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
      Your cart is empty
    </h3>

    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
      Looks like you haven’t added anything yet.
      Start exploring our electrical products.
    </p>

    <Link
      to="/"
      className="
        mt-6 inline-flex items-center gap-2
        bg-linear-to-r from-emerald-500 to-teal-500
        text-white font-medium
        px-8 py-3 rounded-full
        hover:opacity-90 transition
      "
    >
      Start Shopping
    </Link>
  </motion.div>
);

