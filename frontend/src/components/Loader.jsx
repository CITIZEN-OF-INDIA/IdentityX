import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="loader-container">

      <motion.div
        className="scanner-ring"
        animate={{
          rotate: 360
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
      />

      <h2>Scanning Faces...</h2>

      <p>
        Detecting • Embedding • Matching
      </p>

    </div>
  );
}

export default Loader;