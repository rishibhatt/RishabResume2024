import React, { useEffect, useState } from "react";
import { fetchRandomFact } from "../../utils/utils";
const RandomFacts = () => {
  const [fact, setFact] = useState("Ready for Fact !");
  async function fetchData() {
    try {
      const result = await fetchRandomFact();
      setFact(result);
      console.log(fact);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleFacts = () => {
    fetchData();
  };

  return (
    <>
      <div className="p-10 py-20 text-center bg-[#353639] border-b border-gray-300 text-[#EAEAE8]">
        <div className="flex justify-center gap-10">
          <h2 className="text-3xl font-playFair ">
            A Little Something for You!
          </h2>{" "}
        </div>

        <div className="p-5">
          <span className="text-[#A8DADC] font-spirax text-xl">" {fact} "</span>{" "}
        </div>
        <button onClick={handleFacts} className="border border-white p-4">
          CLICK HERE
        </button>
      </div>
    </>
  );
};

export default RandomFacts;
