import React, { useState } from "react";
import Script from "next/script";
import Dropdown from "../components/dropdown";
import { useRouter } from "next/router";

import getConstants from "../constants";

const HomePage = () => {
  const categoryOptions = getConstants().CATEGORY_OPTIONS;
  const genderOptions = getConstants().GENDER_OPTIONS;
  const roundNumberOptions = getConstants().ROUND_NUMBER_OPTIONS;
  const examOptions = getConstants().EXAM_OPTIONS;
  const stateOptions = getConstants().STATE_OPTIONS;

  const [rank, setRank] = useState(0);
  const [roundNumber, setRoundNumber] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [exam, setExam] = useState("");
  const [stateName, setStateName] = useState("");
  const router = useRouter();

  const handleCategoryDropdownChange = (selectedOption) => {
    setCategory(selectedOption.label);
  };

  const handleRoundNumberDropdownChange = (selectedOption) => {
    setRoundNumber(selectedOption.label);
  };

  const handleGenderDropdownChange = (selectedOption) => {
    setGender(selectedOption.label);
  };

  const handleExamDropdownChange = (selectedOption) => {
    setExam(selectedOption.label);
  };

  const handleStateNameDropdownChange = (selectedOption) => {
    setStateName(selectedOption.label);
  };

  const handleRankChange = (event) => {
    const enteredRank = event.target.value;
    setRank(enteredRank);
  };

  const handleSubmit = () => {
    const queryParams = {
      rank,
      category,
      roundNumber,
      exam,
      gender,
      stateName,
    };

    router.push(`/college_predictor?${new URLSearchParams(queryParams)}`);
  };

  const isSubmitDisabled =
    rank <= 0 ||
    !category ||
    !roundNumber ||
    (exam !== "NEET" && (!gender || !stateName));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-2 border-red-500 p-6 max-w-xl w-full">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FHGVRT52L7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FHGVRT52L7');
          `}
        </Script>
        <h1 className="text-xl font-semibold mb-4 text-center">
          {getConstants().TITLE}
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="mr-2 font-semibold text-gray-700">
              {getConstants().EXAM_LABEL}
            </label>
            <div className="w-full md:w-3/4">
              <Dropdown options={examOptions} onChange={handleExamDropdownChange} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="mr-2 font-semibold text-gray-700">
              {getConstants().CATEGORY_LABEL}
            </label>
            <div className="w-full md:w-3/4">
              <Dropdown
                options={categoryOptions}
                onChange={handleCategoryDropdownChange}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="mr-2 font-semibold text-gray-700">
              {exam === "NEET"
                ? getConstants().NEET_RANK_LABEL + "(" + exam + "):"
                : getConstants().RANK_LABEL + "(" + exam + "):"}
            </label>
            <input
              type="number"
              value={rank}
              onChange={handleRankChange}
              className="border border-gray-300 rounded px-2 py-1 w-24"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="mr-2 font-semibold text-gray-700">
              {getConstants().ROUND_NUMBER_LABEL}
            </label>
            <Dropdown
              options={roundNumberOptions}
              onChange={handleRoundNumberDropdownChange}
            />
          </div>
          {exam !== "NEET" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="mr-2 font-semibold text-gray-700">
                  {getConstants().GENDER_LABEL}
                </label>
                <Dropdown
                  options={genderOptions}
                  onChange={handleGenderDropdownChange}
                  isDisabled={exam === "NEET"}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="mr-2 font-semibold text-gray-700">
                  {getConstants().STATE_LABEL}
                </label>
                <Dropdown
                  options={stateOptions}
                  onChange={handleStateNameDropdownChange}
                  isDisabled={exam === "NEET"}
                />
              </div>
            </>
          )}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
