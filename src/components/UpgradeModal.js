import React from "react";
import styles from "../styles/UpgradeModal.module.css"; // create or adjust as needed
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const plans = [
  { id: 1, name: "Premium", price: 19.99, description: "Best for investors", features: ["All AI features", "Priority support"], stripePriceId: "price_1" },
  { id: 2, name: "Pro", price: 9.99, description: "Great for beginners", features: ["AI Chatbot", "Basic support"], stripePriceId: "price_2" },
];

export default function UpgradeModal({ isOpen, onClose }) {
  const handleUpgrade = (priceId) => {
    alert("Upgrade logic here for " + priceId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className={styles.overlay} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className={styles.modal} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <button className={styles.closeButton} onClick={onClose}><X size={20} /></button>
            <h2>Upgrade Your Plan</h2>
            {plans.map((plan) => (
              <div key={plan.id} className={styles.plan}>
                <h3>{plan.name}</h3>
                <p>${plan.price}/mo</p>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((f, i) => <li key={i}>✅ {f}</li>)}
                </ul>
                <button onClick={() => handleUpgrade(plan.stripePriceId)} className={styles.upgradeButton}>
                  Upgrade to {plan.name}
                </button>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
