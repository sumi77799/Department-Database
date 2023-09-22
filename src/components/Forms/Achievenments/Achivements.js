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

const AchivenmentsForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  authors,
  authList,
  departmentList,
  departments,
  errors,
  isFetchingResponse,
}) => {
  const router = useRouter();
  const { resources, type } = router.query;

  const typeOptions = [
    { value: "Hackthon", label: "Hackthon" },
    { value: "Competition", label: "Competition" },
    { value: "Internship", label: "Internship" },
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
                {/* Title of the achievement */}
                <InputFull
                  label="Title"
                  name="title"
                  placeholder={"e.g. National Science Olympiad Gold Medal"}
                  value={preloadedData?.title}
                  error={errors?.title}
                  required={true}
                />
              </div>

              {/* description of the achievement */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* type of the achievement */}
              <div className="col-span-6 ">
                <Select
                  label={"Achievement Type"}
                  options={typeOptions}
                  name={"type"}
                  value={preloadedData?.type}
                  error={errors?.type}
                  required={true}
                />
              </div>

              {/* Date of the achievement */}
              {/* <InputHalf
                label="Date"
                type={"date"}
                name="date"
                value={preloadedData?.date}
                error={errors?.date}
                required={true}
              /> */}

              <div className="col-span-6">
                {/* Date of the achievement */}
                <InputHalf
                  label="Date"
                  type={"date"}
                  name="date"
                  value={preloadedData?.date}
                  error={errors?.date}
                  required={true}
                />
              </div>

              {/* Authors of the achievement */}
              <div className="col-span-3 ">
                <SelectSearch
                  label="Participants"
                  name="participants"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.participants}
                  required
                />
              </div>
              <div className="col-span-3 ">
                <SelectSearch
                  label="Department"
                  name="department"
                  setFormMultipleData={departmentList}
                  initialData={departments}
                  isDepartment={true}
                  error={errors?.department}
                  required
                />
              </div>

              <div className="col-span-6">
                <InputFull
                  label="All Participants"
                  name="participants_text"
                  placeholder={"e.g. Puneet Goyal, Sudharshan Iyer"}
                  value={preloadedData?.participants_text}
                  error={errors?.participants_text}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <ButtonAlternative
              style={`ml-2 ${isFetchingResponse ? "cursor-not-allowed" : ""}`}
              type={"submit"}
              disabled={isFetchingResponse}
              onClick={aternativeFunciton1}
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

export default AchivenmentsForm;
