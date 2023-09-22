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

const EventsForm = ({
  preloadedData,
  aternativeFunciton1,
  aternativeFunciton2,
  formRef,
  authList,
  authors,
  departmentList,
  departments,
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
    { value: "Seminar", label: "Seminar" },
    { value: "Invited Lectures", label: "Invited Lectures" },
    { value: "Workshop", label: "Workshop" },
    { value: "Conference", label: "Conference" },
    { value: "Other", label: "Other" },
  ];

  // const statusOptions = [
  //   { value: "Draft", label: "Draft" },
  //   { value: "Pending", label: "Pending" },
  //   { value: "Active", label: "Active" },
  //   { value: "Rejected", label: "Rejected" },
  // ];

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
                {/* Title of the Events */}
                <InputFull
                  label="Title"
                  name="title"
                  placeholder={"e.g. A beautiful landscape photo"}
                  value={preloadedData?.title}
                  error={errors?.title}
                  required
                />
              </div>

              {/* description of the Events */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* link to the event */}
              <div className="col-span-6">
                <InputFull
                  label="Link"
                  name="link"
                  placeholder={"e.g. https://www.example.com"}
                  value={preloadedData?.link}
                  error={errors?.link}
                />
              </div>

              {/* Type of the events */}
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

              {/* Date of the events */}
              <InputHalf
                label="Date"
                name="date"
                type={"date"}
                value={preloadedData?.date}
                error={errors?.date}
                required
              />

              {/* Department(s) of the events */}

              <div className="col-span-6 ">
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

              {/* Organizers of the events */}
              <div className="col-span-6">
                <SelectSearch
                  label="Organizers"
                  name="organizers"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.organizers}
                  // required
                  // AllData={allAuthors}
                />
              </div>

              {/* speakers of the visits */}
              <div className="col-span-6">
                <InputFull
                  label="Speakers"
                  name="speakers"
                  placeholder={"e.g. Dr. Puneet Goyal , Dr. Sudarshan Iyengar"}
                  value={preloadedData?.speakers}
                  error={errors?.speakers}
                  required={true}
                />
              </div>

              {/* number of participants of the visits */}

              <div className="col-span-6">
                <InputFull
                  label="Number Of Participants"
                  name="number_of_participants"
                  placeholder={"e.g. 5"}
                  value={preloadedData?.number_of_participants}
                  error={errors?.number_of_participants}
                  required
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <ButtonAlternative
              style={`ml-2 ${isFetchingResponse ? "cursor-not-allowed" : ""}`}
              disabled={isFetchingResponse}
              onClick={
                !preloadedData ? aternativeFunciton1 : () => router.back()
              }
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
              style={`ml-2 ${isFetchingResponse ? "cursor-not-allowed" : ""}`}
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

export default EventsForm;
