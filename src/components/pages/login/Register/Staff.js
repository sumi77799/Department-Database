import InputFull from "@/components/Forms/InputFull";
import InputHalf from "@/components/Forms/InputHalf";
import Select from "@/components/Forms/Select";
import Spinner from "@/components/elements/Spinner";
import { FACULTY, STAFF, STUDENT } from "@/constants/roles";
import Link from "next/link";
import React from "react";

const StaffDetails = (props) => {
  return (
    <form
      className="space-y-4 md:space-y-6"
      ref={props.formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* staff_type	staff_code */}

      {/* Staff Type */}

      <Select
        name={"staff_type"}
        label={"Staff Type"}
        options={[
          { value: "Technical Staff", label: "Technical Staff" },
          { value: "Administrative Staff", label: "Administrative Staff" },
        ]}
        placeholder="Staff Type"
        required
      />

      {/* Staff Code */}
      <InputFull
        label="Username (Dept. Code_First Name_Last Name) "
        type="username"
        placeholder="(e.g. CSE_Puneet_Goyal)"
        name="username"
        id="username"
        required
      />
      {/* year */}
      <div className="flex items-center gap-2 ">
        <InputHalf
          label="Joining year"
          type="year"
          placeholder="Your joining year"
          name="year"
          id="year"
          pattern="[0-9]*"
          required
        />
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

export default StaffDetails;
