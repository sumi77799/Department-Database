import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import { useRouter } from "next/router";
import React from "react";
import InputFull from "../InputFull";
import InputHalf from "../InputHalf";
import Select from "../Select";
import SelectSearch from "../SelectSearch";
import TextArea from "../TextArea";
import Spinner from "@/components/elements/Spinner";

const VisitsForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  departmentList,
  departments,
  errors,
  authors,
  authList,
  isFetchingResponse,
}) => {
  // console.log("ininin-------------", preloadedData);
  // console.log("ininin-------------", preloadedData?.authors);
  // console.log("ininin-------------", authors);
  const router = useRouter();
  const { resources, type } = router.query;
  const options = [
    { value: "Seminar", label: "Seminar" },
    { value: "Conference", label: "Conference" },
    { value: "Lecture", label: "Lecture" },
    { value: "Other", label: "Other" },
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
                {/* Title of the visits */}
                <InputFull
                  label="Title"
                  name="title"
                  placeholder={"e.g. Guest Lecture by Dr. Puneet Goyal"}
                  value={preloadedData?.title}
                  error={errors?.title}
                  required
                />
              </div>

              {/* description of the visits */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* link to the visits */}
              <div className="col-span-6">
                <InputFull
                  label="Link"
                  name="link"
                  placeholder={"e.g. https://www.example.com"}
                  value={preloadedData?.link}
                  error={errors?.link}
                />
              </div>

              {/* Type of the visits */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label="Type"
                  options={options}
                  name={"type"}
                  value={preloadedData?.type}
                  error={errors?.type}
                  required
                />
              </div>

              {/* venue of the visits */}
              <InputHalf
                label="Venue"
                name="venue"
                placeholder={"e.g. The Grand Ballroom, Central Park"}
                value={preloadedData?.venue}
                error={errors?.venue}
                required
              />

              {/* From Date of the visits */}
              <InputHalf
                label="From Date"
                name="from_date"
                type={"date"}
                value={preloadedData?.from_date}
                error={errors?.from_date}
                required
              />

              {/* To Date of the visits */}
              <InputHalf
                label="To Date"
                name="to_date"
                type={"date"}
                value={preloadedData?.to_date}
                error={errors?.to_date}
                required
              />

              {/* Department(s) of the visits */}
              <div className="col-span-3 ">
                <SelectSearch
                  label="Department(s)"
                  name="department"
                  setFormMultipleData={departmentList}
                  initialData={departments}
                  isDepartment={true}
                  error={errors?.department}
                  required
                  // AllData={allDepartments}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 my-auto">
                <SelectSearch
                  label="User"
                  name="user"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.user}
                  required
                  // AllData={allAuthors}
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

export default VisitsForm;
