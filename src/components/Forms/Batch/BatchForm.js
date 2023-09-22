import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import { useRouter } from "next/router";
import React from "react";
import InputHalf from "../InputHalf";
import Spinner from "@/components/elements/Spinner";
import SelectSearch from "../SelectSearch";

const BatchForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  errors,
  isFetchingResponse,
  departmentList,
  departments,
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
        action="#"
        method="POST"
        ref={formRef}
        onSubmit={(e) => aternativeFunciton2(e, formRef.current)}
      >
        <div className=" shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              {/* name of the batch */}
              <InputHalf
                label="Name"
                name="name"
                placeholder={"e.g. 2022AIM,PhD 2020"}
                value={preloadedData?.name}
                error={errors?.name}
                required
              />

              {/* year of the batch */}
              <InputHalf
                label="Year"
                name="year"
                placeholder={"e.g. 2022,2020"}
                type={"number"}
                value={preloadedData?.year}
                error={errors?.year}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3 my-auto">
              <SelectSearch
                label="Department"
                name="department"
                setFormMultipleData={departmentList}
                initialData={departments}
                isDepartment={true}
                error={errors?.department}
                required
                // AllData={allDepartments}
              />
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

export default BatchForm;
