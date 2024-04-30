import React, { useState } from "react";
import Script from "next/script";
import Dropdown from "../components/dropdown";
import { useRouter } from "next/router";
import getConstants from "../constants";

const ScholarshipPage = () => {
  const categoryOptions = getConstants().SCHOLARSHIP_CATEGORY_OPTIONS || [];

  const genderOptions = getConstants().SCHOLARSHIP_GENDER_OPTIONS || [];

  const statusOptions = getConstants().SCHOLARSHIP_STATUS_OPTIONS;

  const gradeOptions = getConstants().GRADE_OPTIONS;

  const stateOptions = getConstants().STATE_OPTIONS;

  const familyincomeOptions = getConstants().FAMILY_INCOME_OPTIONS;

  const cityOptions = getConstants().CITY_OPTIONS;

  const streamOptions = getConstants().STREAM_OPTIONS;

  const [familyIncome, setFamilyIncome] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [grade, setGrade] = useState("");
  const [stream, setStream] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const router = useRouter();

  function incomeValueToFloat(value) {
    return parseFloat(value.split("_")[0]);
  }

  const handleCategoryDropdownChange = (selectedOption) => {
    setCategory(selectedOption.label);
  };

  const handleStatusDropdownChange = (selectedOption) => {
    setStatus(selectedOption.label);
  };

  const handleGradeDropdownChange = (selectedOption) => {
    setGrade(selectedOption.label);
  };

  const handleGenderDropdownChange = (selectedOption) => {
    setGender(selectedOption.label);
  };

  const handleStreamDropdownChange = (selectedOption) => {
    setStream(selectedOption.label);
  };

  const handleStateNameDropdownChange = (selectedOption) => {
    setStateName(selectedOption.label);
  };

  const handleCityNameDropdownChange = (selectedOption) => {
    setCityName(selectedOption.label);
  };

  const handleFamilyIncomeChange = (selectedOption) => {
    const floatValue = incomeValueToFloat(selectedOption.value);
    setFamilyIncome(floatValue);
  };

  const handleSubmit = () => {
    router.push(
      `/scholarship_finder?status=${status}&category=${category}&familyIncome=${familyIncome}&stream=${stream}&grade=${grade}&stateName=${stateName}&cityName=${cityName}&gender=${gender}`
    );
  };

  const isSubmitDisabled =
    !familyIncome ||
    !category ||
    !status ||
    !gender ||
    !stateName ||
    !cityName ||
    !stream ||
    !grade;

  return (
    <div className="flex flex-col h-screen  ">
      <div className="flex justify-center items-center flex-col flex-grow px-10">
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
        <div className="md:text-xl  text-xl flex flex-col items-center p-5 m-10  border border-gray-300 shadow-lg rounded-lg">
        <div className="w-full">
          <h1 className="text-2xl text-center font-semibold">
            {getConstants().SCHOLARSHIP_TITLE}
          </h1>
          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().STATUS_LABEL}
          </label>
          <Dropdown
            options={statusOptions}
            onChange={handleStatusDropdownChange}
          />
          </div>
          <div className="w-full  gap-2 flex flex-col sm:flex-row items-center m-2">

          <div className="w-full">

          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().GRADE_LABEL}
          </label>
          <Dropdown
            options={gradeOptions}
            onChange={handleGradeDropdownChange}
          />
          </div>
          <div className="w-full">

          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().STREAM_LABEL}
          </label>
          <Dropdown
            options={streamOptions}
            onChange={handleStreamDropdownChange}
          />
          </div>
          </div>


          <div className="w-full">

          <label className="font-semibold text-md text-gray-700">
            {getConstants().CATEGORY_LABEL}
          </label>
          <br />
          <label className="font-medium text-sm text-gray-700 m-2 block">
            {getConstants().CATEGORY_HELP_TEXT}
          </label>
          <Dropdown
            options={categoryOptions}
            onChange={handleCategoryDropdownChange}
          />
          </div>
          <div className="w-full  gap-2 flex flex-col sm:flex-row items-center m-2">

          <div className="w-full">

          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().GENDER_LABEL}
          </label>
          <Dropdown
            options={genderOptions}
            onChange={handleGenderDropdownChange}
          />
          </div>

          <div className="w-full">
          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().STATE_LABEL}
          </label>
          <Dropdown
            options={stateOptions}
            onChange={handleStateNameDropdownChange}
          />

          </div>
          </div>

          <div className="w-full">

          <label className="block text-md font-semibold text-gray-700 m-2">
            {getConstants().CITY_LABEL}
          </label>
          <Dropdown
            options={cityOptions}
            onChange={handleCityNameDropdownChange}
          />
          </div>
          <div className="w-full m-2">

          <label className="text-md font-semibold text-gray-700 ">
            {getConstants().FAMILY_INCOME_LABEL}
          </label>
          <br />
          <label className="block m-2 text-sm font-medium text-gray-700">
            {getConstants().FAMILY_INCOME_HELP_TEXT}
          </label>
          <label className="block m-2 text-sm font-medium text-gray-700">
            {getConstants().FAMILY_INCOME_HELP_TEXT_TWO}
          </label>
          <Dropdown
            options={familyincomeOptions}
            onChange={handleFamilyIncomeChange}
          />
          </div>
          <p />
          <p />
          <button
            className={"mt-2 px-5 py-2 rounded-lg bg-red-600 text-white cursor-pointer hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 disabled:cursor-not-allowed"}
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

export default ScholarshipPage;
