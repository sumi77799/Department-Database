import InputFull from "@/components/Forms/InputFull";
import InputHalf from "@/components/Forms/InputHalf";
import Select from "@/components/Forms/Select";
import Spinner from "@/components/elements/Spinner";
import { FACULTY, STAFF, STUDENT } from "@/constants/roles";
import Link from "next/link";
import React, { useState } from "react";

const StudentDetails = (props) => {
  const [entryNo, setEntryNo] = useState("");

  const handleEntryNoChange = (e) => {
    setEntryNo(e.target.value);
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      ref={props.formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Entry number */}
      <InputFull
        label="Entry number"
        type="entry"
        placeholder="Your entry number"
        name="entry_no"
        id="entry"
        pattern="[0-9]*"
        required
        onChange={handleEntryNoChange}
        value={entryNo}
      />

      <InputFull
        label="Username"
        type="username"
        placeholder="Your username"
        name="username"
        id="username"
        value={entryNo}
        style={"cursor-not-allowed bg-gray-100 text-gray-500"}
        disabled
      />

      {/* email */}
      <InputFull
        label="Faculty advisor's email"
        type="email"
        placeholder="Email"
        name="faculty_advisor_email"
        id="email"
        required
      />
      {/* degree */}
      <div className="flex items-center gap-2 ">
        <Select
          name={"degree"}
          label={"Degree"}
          options={[
            { value: "ug", label: "UG" },
            { value: "pg", label: "PG" },
            { value: "phd", label: "PhD" },
          ]}
          placeholder="Degree"
          required
        />
        {/* branch */}
      </div>

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

export default StudentDetails;
