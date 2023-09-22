import InputFull from "@/components/Forms/InputFull";
import InputHalf from "@/components/Forms/InputHalf";
import Select from "@/components/Forms/Select";
import Spinner from "@/components/elements/Spinner";
import { FACULTY, STAFF, STUDENT } from "@/constants/roles";
import Link from "next/link";
import React, { useState } from "react";

const FacultyDetails = (props) => {
  const [isDoctrate, setIsDoctrate] = useState(false);
  const [phd_instuition, setPhdInstuition] = useState("");

  const handleIsDoctrateChange = (value) => {
    if (value === "TRUE") {
      setIsDoctrate(true);
    } else {
      setIsDoctrate(false);
    }
  };

  const handlePhdInstuitionChange = (e) => {
    setPhdInstuition(e.target.value);
  };

  return (
    <form
      className="space-y-2"
      ref={props.formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* designation	fac_id	is_doctrate	fields_of_interest	phd_instuition*/}
      {/* Designation */}
      <InputFull
        label="Username (Dept. Code_First Name_Last Name) "
        type="username"
        placeholder="(e.g. CSE_Puneet_Goyal)"
        name="username"
        id="username"
        required
      />

      <Select
        name={"designation"}
        label={"Designation"}
        options={[
          { value: "Assistant Professor", label: "Assistant Professor" },
          { value: "Associate Professor", label: "Associate Professor" },
          { value: "Professor", label: "Professor" },
        ]}
        placeholder="Designation"
        required
      />

      <div className="flex items-center gap-2 ">
        {/* year */}

        <InputHalf
          label="Joining year"
          type="year"
          placeholder="Your joining year"
          name="year"
          id="year"
          pattern="[0-9]*"
          required
        />

        {/* Is Doctorate */}

        <Select
          name={"is_doctrate"}
          label={"Is Doctorate"}
          options={[
            { value: "TRUE", label: "Yes" },
            { value: "FALSE", label: "No" },
          ]}
          placeholder="Is Doctorate"
          required
          handlePublicationStatusChange={handleIsDoctrateChange}
          value={isDoctrate ? "TRUE" : "FALSE"}
        />
      </div>

      {/* Fields of Interest */}
      <InputFull
        label="Fields of Interest"
        type="fields_of_interest"
        placeholder="Please enter comma separated values (e.g. Machine Learning, Deep Learning)"
        name="fields_of_interest"
        id="fields_of_interest"
        required
      />

      {/* PhD Institution */}
      <InputFull
        label="PhD Institution"
        type="phd_instuition"
        placeholder="Your phd_instuition"
        name="phd_instuition"
        id="phd_instuition"
        value={isDoctrate ? phd_instuition : "NA"}
        onChange={handlePhdInstuitionChange}
        disabled={!isDoctrate}
        style={isDoctrate ? "" : "cursor-not-allowed bg-gray-200 text-gray-500"}
        required={isDoctrate}
      />
      <button
        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
        onClick={props.ButtonAction}
      >
        {props.isLoader && <Spinner />}
        {props.ButtonText}
      </button>

      {/* secondary button */}
      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
        <p>{props.SecondButtonText}</p>
        <Link
          className="flex flex-row items-center text-blue-600"
          href={props.SecondButtonLink}
        >
          {props.SecondButtonText2}
        </Link>
      </div>
    </form>
  );
};

export default FacultyDetails;
