import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const AnimatedCounter = ({ value, title, icon, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    // Create our own intersection observer if the library isn't available
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isInView) {
      // Start the counter animation
      let start = 0;
      const duration = 2000; // ms
      const end = parseInt(value);
      const increment = end / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.min(Math.floor(start), end));
        
        if (start >= end) {
          clearInterval(timer);
        }
      }, 16);
      
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.8, 
          delay: delay,
          ease: "easeOut"
        }
      });
      
      return () => clearInterval(timer);
    }
  }, [controls, isInView, value, delay]);
  
  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{count.toLocaleString()}</div>
      <div className="stat-title">{title}</div>
    </motion.div>
  );
}

export default AnimatedCounter
