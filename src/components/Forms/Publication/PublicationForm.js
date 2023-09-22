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

const PublicationForm = ({
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
  fieldTags,
  fieldTagsList,
  // allAuthors,
  // allDepartments,
}) => {
  // console.log("ininin-------------", preloadedData);
  // console.log("ininin-------------", preloadedData?.authors);
  // console.log("ininin-------------", authors);
  const router = useRouter();
  const { resources, type } = router.query;
  const [publicationStatus, setpublicationStatus] = useState(
    preloadedData?.publication_status ?? ""
  );

  const handlePublicationStatusChange = (value) => {
    setpublicationStatus(value);
  };

  const options = [
    { value: "Journal", label: "Journal" },
    { value: "Conference", label: "Conference" },
    { value: "Book", label: "Book" },
    { value: "Book Chapter", label: "Book Chapter" },
    { value: "Patent", label: "Patent" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "Published", label: "Published" },
    { value: "Accepted", label: "Accepted" },
    { value: "Submitted", label: "Submitted" },
  ];

  const identifierOptions = [
    { value: "DOI", label: "DOI" },
    { value: "ISBN", label: "ISBN" },
    { value: "ISSN", label: "ISSN" },
    { value: "URL", label: "URL" },
  ];

  const fieldTagsData = [
    { id: "CS", name: "Computer Science" },
    { id: "AI", name: "Artificial Intelligence" },
    { id: "SE", name: "Software Engineering" },
    { id: "NET", name: "Networking" },
    { id: "EE", name: "Electrical Engineering" },
    { id: "ME", name: "Mechanical Engineering" },
    { id: "CE", name: "Civil Engineering" },
    { id: "CHE", name: "Chemical Engineering" },
    { id: "MATE", name: "Materials Engineering" },
    { id: "BME", name: "Biomedical Engineering" },
    { id: "AE", name: "Aerospace Engineering" },
    { id: "O", name: "Other" },
  ];

  return (
    <div className="mt-5 md:col-span-2 md:mt-0 w-2/3">
      <form
        // action="#"
        method="POST"
        ref={formRef}
        onSubmit={(e) => aternativeFunciton2(e, formRef.current)}
      >
        <div className="shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                {/* Title of the publication */}
                <InputFull
                  label="Title"
                  name="title"
                  placeholder={
                    "e.g. A Study on Effective Teaching Methods in College Academics"
                  }
                  value={preloadedData?.title}
                  error={errors?.title}
                  required
                />
              </div>

              {/* description of the publication */}
              <div className="col-span-6">
                <TextArea
                  label="Description"
                  name="description"
                  placeholder={"Description"}
                  value={preloadedData?.description}
                  error={errors?.description}
                />
              </div>

              {/* link to the publication */}
              <div className="col-span-6">
                <InputFull
                  label="Link"
                  name="link"
                  placeholder={"e.g. https://www.example.com"}
                  value={preloadedData?.link}
                  error={errors?.link}
                />
              </div>

              {/* Type of the publication */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label="Type"
                  options={options}
                  name={"publication_type"}
                  value={preloadedData?.publication_type}
                  error={errors?.publication_type}
                  required
                />
              </div>

              {/* Status of the publication */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label={"Status"}
                  options={statusOptions}
                  name={"publication_status"}
                  value={preloadedData?.publication_status}
                  handlePublicationStatusChange={handlePublicationStatusChange}
                  error={errors?.publication_status}
                  required
                />
              </div>

              {/* Identifier of the publication */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  label={"Identifier"}
                  options={identifierOptions}
                  name={"identifier_type"}
                  error={errors?.identifier_type}
                  value={preloadedData?.identifier_type}
                  required={publicationStatus === "Published" ? true : false}
                  disabled={publicationStatus === "Published" ? false : true}
                  style={
                    publicationStatus === "Published"
                      ? ""
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
                  }
                />
              </div>

              {/* Identifier value of the publication */}
              <InputHalf
                label="Identifier Value"
                name="identifier"
                caveat={
                  "If the identifier is not a URL, then only include the code"
                }
                placeholder={"e.g. 123456"}
                value={preloadedData?.identifier}
                error={errors?.identifier}
                required={publicationStatus === "Published" ? true : false}
                disabled={publicationStatus === "Published" ? false : true}
                style={
                  publicationStatus === "Published"
                    ? ""
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }
              />

              {/* Date of the publication */}
              <InputHalf
                label="Accepted Date"
                name="accepted_date"
                type={"date"}
                value={preloadedData?.accepted_date}
                error={errors?.accepted_date}
                disabled={publicationStatus === "Submitted" ? true : false}
                style={
                  publicationStatus !== "Submitted"
                    ? ""
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }
              />
              <InputHalf
                label="Published Date"
                name="published_date"
                type={"date"}
                value={preloadedData?.published_date}
                error={errors?.published_date}
                required={publicationStatus === "Published" ? true : false}
                disabled={publicationStatus === "Published" ? false : true}
                style={
                  publicationStatus === "Published"
                    ? ""
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }
              />
              {/* Department(s) of the publication */}
              <div className="col-span-6 sm:col-span-3 my-auto">
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

              {/* Authors of the publication */}
              <div className="col-span-6 sm:col-span-3 my-auto">
                <SelectSearch
                  label="Authors"
                  name="authors"
                  setFormMultipleData={authList}
                  initialData={authors}
                  error={errors?.authors}
                  required
                  // AllData={allAuthors}
                />
              </div>
              <div className="col-span-6 sm:col-span-6 my-auto">
                <SelectSearch
                  label="Tag(s)"
                  name="field_tags"
                  setFormMultipleData={fieldTagsList}
                  initialData={fieldTags}
                  isDepartment={true}
                  error={errors?.field_tags}
                  fieldTagsData={fieldTagsData}
                  // AllData={allDepartments}
                />
              </div>
              <div className="col-span-6">
                <InputFull
                  label="All Authors"
                  name="authors_text"
                  caveat={
                    "List the names in the same order as they appear in the publication and format must be in the first letter of the first name. last name "
                  }
                  placeholder={"e.g. P. Goyal, S. Iyer"}
                  value={preloadedData?.authors_text}
                  error={errors?.authors_text}
                  required
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
            {/* if error is string then show it */}
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

export default PublicationForm;
