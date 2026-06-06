import { motion } from "framer-motion";
import { FaUserCheck } from "react-icons/fa";

function ResultList({ names }) {

  if (!names || names.length === 0) {
    return null;
  }

  return (
    <div className="results-section">

      <h2>Detected People</h2>

      <div className="results-grid">

        {names.map((name, index) => (

          <motion.div
            key={index}
            className="person-card"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.15
            }}
          >
            <FaUserCheck />

            <span>{name}</span>

          </motion.div>

        ))}

      </div>

      <div className="count-card">
        Recognized Faces : {names.length}
      </div>

    </div>
  );
}

export default ResultList;