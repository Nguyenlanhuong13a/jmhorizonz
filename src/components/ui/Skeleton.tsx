import { motion } from 'framer-motion';

export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`bg-neutral-200 ${className}`}
        />
    );
};
