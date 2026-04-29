export const transitions = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth motion
};

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: transitions.ease,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(5px)',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: transitions.ease,
    },
  },
};

export const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const tapScale = {
  scale: 0.98,
};

export const dropdownVariants = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.2, ease: transitions.ease }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -10,
    transition: { duration: 0.15, ease: 'easeIn' }
  },
};
