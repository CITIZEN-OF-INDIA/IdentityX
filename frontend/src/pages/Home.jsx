import { useState } from "react";

import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";
import ResultList from "../components/ResultList";

function Home() {

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState([]);

  return (
    <div className="home">

      <div className="hero">

        <h1>
          IDENTITY X
        </h1>

        <p>
          AI Face Recognition System
        </p>

      </div>

      <UploadBox
        setResults={setResults}
        setLoading={setLoading}
      />

      {
        loading &&
        <Loader />
      }

      {
        !loading &&
        <ResultList
          names={results}
        />
      }

    </div>
  );
}

export default Home;