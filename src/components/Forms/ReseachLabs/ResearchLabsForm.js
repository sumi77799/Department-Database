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

const ResearchLabsForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  authList,
  authors,
  // departmentList,
  // departments,
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
  const options = [
    { value: "UG Lab", label: "UG Lab" },
    { value: "PG Lab", label: "PG Lab" },
    { value: "Research Lab", label: "Research Lab" },
  ];

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
                {/* name of the lab */}
                <InputFull
                  label="Name"
                  name="name"
                  placeholder={"e.g. Security"}
                  value={preloadedData?.name}
                  error={errors?.name}
                  required
                />
              </div>

              {/* code of the lab */}
              <InputHalf
                label="Code"
                name="code"
                caveat={
                  "Research Laboratory Code up to five alpha numeric characters"
                }
                placeholder={"e.g. 123"}
                value={preloadedData?.code}
                error={errors?.code}
                required
              />

              {/* Type of the lab */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label="Type"
                  options={options}
                  name={"lab_type"}
                  value={preloadedData?.lab_type}
                  error={errors?.lab_type}
                  required
                />
              </div>

              {/* description of the labs */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* link to the website */}
              <div className="col-span-6">
                <InputFull
                  label="Website"
                  name="website"
                  placeholder={"e.g. https://www.example.com"}
                  value={preloadedData?.website}
                  error={errors?.website}
                />
              </div>

              {/* address of the lab */}
              <div className="col-span-6">
                <TextArea
                  label="Address"
                  name="address"
                  placeholder={"e.g. IIT Ropar Computer Science Lab, Room 200"}
                  value={preloadedData?.address}
                  error={errors?.address}
                />
              </div>

              {/* head of the lab */}
              <div className="col-span-6 ">
                <SelectSearch
                  label="Head Of Lab"
                  name="Head"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.Head}
                  required
                />
              </div>

              {/* equipments of the labs */}
              <div className="col-span-6">
                <TextArea
                  label="Equipments"
                  name="equipments"
                  placeholder={"e.g. Digital Oscilloscope, Logic Analyzer"}
                  value={preloadedData?.equipments}
                  error={errors?.equipments}
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

export default ResearchLabsForm;
