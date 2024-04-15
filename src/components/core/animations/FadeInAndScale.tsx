import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

type FadeInAndScaleProps = {
  children: React.ReactNode;
  delay?: number;
};

export const FadeInAndScale = ({ children, delay = 0 }: FadeInAndScaleProps) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants} transition={{ delay }}>
      {children}
    </motion.div>
  );
};
