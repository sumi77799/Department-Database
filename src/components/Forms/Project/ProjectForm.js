import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputFull from "../InputFull";
import InputHalf from "../InputHalf";
import Select from "../Select";
import SelectSearch from "../SelectSearch";
import TextArea from "../TextArea";
import Spinner from "@/components/elements/Spinner";

const ProjectForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  aternativeFunciton3,
  formRef,
  authList,
  departmentList,
  departments,
  errors,
  authors,
  isFetchingResponse,
}) => {
  const router = useRouter();
  const { resources, type } = router.query;
  const [projectStatus, setProjectStatus] = useState(
    preloadedData?.status ?? ""
  );
  const handleProjectStatusChange = (value) => {
    setProjectStatus(value);
  };
  const statusOptions = [
    { value: "ONGOING", label: "ONGOING" },
    { value: "COMPLETED", label: "COMPLETED" },
    { value: "CANCELLED", label: "CANCELLED" },
  ];

  return (
    <div className="mt-5 md:col-span-2 md:mt-0 w-2/3">
      <form
        action="#"
        method="POST"
        ref={formRef}
        onSubmit={(e) => aternativeFunciton2(e, formRef.current)}
      >
        <div className=" shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                {/* Title of the project */}
                <InputFull
                  label="Title"
                  name="title"
                  placeholder={
                    "e.g. An Analysis of the Impact of Online Learning on Student Performance."
                  }
                  value={preloadedData?.title}
                  error={errors?.title}
                  required={true}
                />
              </div>

              {/* description of the project */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* link to the project */}
              <div className="col-span-6">
                <InputFull
                  label="Link"
                  name="link"
                  placeholder={"e.g. https://www.example.com"}
                  value={preloadedData?.link}
                />
              </div>

              {/* Type of the project */}
              {/* <div className="col-span-6 sm:col-span-3">
                <Select
                  label="Type"
                  options={objectTypes}
                  name={"type"}
                  // value={preloadedData?.type}
                  error={errors?.type}
                  required={true}
                />
              </div> */}

              {/* Status of the project */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label={"Status"}
                  options={statusOptions}
                  name={"status"}
                  value={preloadedData?.status}
                  handlePublicationStatusChange={handleProjectStatusChange}
                  error={errors?.status}
                  required={true}
                />
              </div>

              {/* Investor of the project */}
              <InputHalf
                label="Investor"
                name="investors"
                placeholder={"e.g. IIT ROPAR, Sequoia Capital, Accel Partners"}
                value={preloadedData?.investors}
                error={errors?.investors}
                required={true}
              />

              {/* Start date of the project */}
              <InputHalf
                label="Start Date"
                name="start_date"
                type={"date"}
                value={preloadedData?.start_date}
                error={errors?.start_date}
                required={projectStatus !== "CANCELLED" ? true : false}
              />

              {/* End date of the project */}
              <InputHalf
                label="End Date"
                name="end_date"
                type={"date"}
                value={preloadedData?.end_date}
                error={errors?.end_date}
                required={projectStatus === "COMPLETED" ? true : false}
                disabled={projectStatus === "COMPLETED" ? false : true}
                style={
                  projectStatus === "COMPLETED"
                    ? ""
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }
              />

              <InputHalf
                label="Code"
                name="code"
                caveat={
                  "Code for the project up to five alpha numeric characters"
                }
                placeholder={"e.g. 301"}
                value={preloadedData?.code}
                error={errors?.code}
                required={true}
              />

              {/* Funding of the project */}
              <InputHalf
                label="Amount Invested"
                name="amount_invested"
                caveat={"Only enter amount in Rupees"}
                placeholder={"e.g. 50000"}
                value={preloadedData?.amount_invested}
                error={errors?.amount_invested}
                required={true}
              />

              {/* members of the project */}
              <div className="col-span-6 sm:col-span-3 my-auto">
                <SelectSearch
                  label="Members"
                  name="members"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.members}
                  required={true}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 my-auto">
                <SelectSearch
                  label="Department(s)"
                  name="department"
                  setFormMultipleData={departmentList}
                  initialData={departments}
                  isDepartment={true}
                  error={errors?.department}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <ButtonAlternative
              style={`ml-2 ${isFetchingResponse ? "cursor-not-allowed" : ""}`}
              onClick={
                !preloadedData ? aternativeFunciton1 : () => router.back()
              }
              disabled={isFetchingResponse}
            >
              {!isFetchingResponse &&
                (preloadedData ? "Cancel" : "Save as Draft")}
              {isFetchingResponse && (
                <>
                  {"Submiting "}
                  <Spinner />
                </>
              )}
            </ButtonAlternative>
            <ButtonPrimary
              type={"submit"}
              onClick={aternativeFunciton2}
              style={`${isFetchingResponse ? "cursor-not-allowed" : ""}`}
              disabled={isFetchingResponse}
            >
              {!isFetchingResponse &&
                (preloadedData ? "Save as Draft" : "Submit")}
              {isFetchingResponse && (
                <>
                  {"Submiting "}
                  <Spinner />
                </>
              )}
            </ButtonPrimary>
            {/* {type === "Draft" && (
              <ButtonPrimary style={"ml-2"} onClick={aternativeFunciton3}>
                Submit
              </ButtonPrimary>
            )} */}
            {typeof errors === "string" || errors instanceof String ? (
              <p
                className={`mt-1 text-xs text-red-600 dark:text-red-500 ${
                  errors ? "" : "invisible"
                }`}
              >
                <span className="font-medium ">Oops!</span> {errors}
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
