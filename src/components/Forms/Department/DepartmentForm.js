import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import { useRouter } from "next/router";
import React from "react";
import InputFull from "../InputFull";
// import InputHalf from "../InputHalf";
// import Select from "../Select";
import SelectSearch from "../SelectSearch";
import TextArea from "../TextArea";
import Spinner from "@/components/elements/Spinner";

const DepartmentForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  authList,
  HOD,
  //   departmentList,
  //   departments,
  errors,
  isFetchingResponse,
  // allAuthors,
  // allDepartments,
}) => {
  // console.log("ininin-------------", preloadedData);
  // console.log("ininin-------------", preloadedData?.authors);
  // console.log("ininin-------------", authors);
  const router = useRouter();
  const { resources, type } = router.query;

  return (
    <div className="mt-5 md:col-span-2 md:mt-0 w-2/3">
      <form
        // action="#"
        method="POST"
        ref={formRef}
        onSubmit={(e) => aternativeFunciton2(e, formRef.current)}
      >
        <div className=" shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                {/* name of the department */}
                <div className="col-span-6">
                  {/* Title of the publication */}
                  <InputFull
                    label="Name"
                    name="name"
                    placeholder={"e.g. Computer Science Engineering"}
                    value={preloadedData?.name}
                    error={errors?.name}
                    required
                  />
                </div>

                {/* <div className="col-span-6 sm:col-span-3 my-auto">
                <SelectSearch
                  label="Name"
                  name="department"
                  setFormMultipleData={departmentList}
                  initialData={departments}
                  isDepartment={true}
                  error={errors?.department}
                  required
                  // AllData={allDepartments}
                />
              </div> */}

                {/* code of the department */}
                <InputFull
                  label="Code"
                  name="code"
                  caveat={
                    "Unique code for the department up to five alpha numeric characters"
                  }
                  placeholder={"e.g. CSE, EE"}
                  value={preloadedData?.code}
                  error={errors?.code}
                  required
                />
              </div>

              {/* description of the department */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              <div className="col-span-6 ">
                <SelectSearch
                  label="Head of Department"
                  name="Hod"
                  setFormMultipleData={authList}
                  initialData={preloadedData?.Hod}
                  error={errors?.Hod}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <ButtonAlternative
              style={`ml-2 ${isFetchingResponse ? "cursor-not-allowed" : ""}`}
              // onClick={
              //   !preloadedData ? aternativeFunciton1 : () => router.back()
              // }
              onClick={() => router.back()}
              disabled={isFetchingResponse}
            >
              {!isFetchingResponse && (preloadedData ? "Cancel" : "Cancel")}
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

export default DepartmentForm;
