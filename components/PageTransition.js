// components/PageTransition.js
import { motion } from "framer-motion";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
