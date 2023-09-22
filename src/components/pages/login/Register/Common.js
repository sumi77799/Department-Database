import InputFull from "@/components/Forms/InputFull";
import InputHalf from "@/components/Forms/InputHalf";
import Select from "@/components/Forms/Select";
import Spinner from "@/components/elements/Spinner";
import { FACULTY, STAFF, STUDENT } from "@/constants/roles";
import Link from "next/link";
import React from "react";

const Common = (props) => {
  return (
    <form
      className="space-y-4 md:space-y-6"
      ref={props.formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* email */}
      <InputFull
        label="Email ID"
        type="email"
        placeholder="Your email (Institute email ID only)"
        name="email"
        id="email"
        required
      />
      {/* username */}
      {/* <InputFull
        label="Username"
        type="username"
        placeholder="Your username"
        name="username"
        id="username"
        required
      /> */}
      {/* 1st name */}
      <div className="flex flex-col gap-2 md:flex-row">
        <InputHalf
          label="First Name"
          type="firstname"
          placeholder="Your first name"
          name="first_name"
          id="firstname"
          required
        />
        {/* last name */}
        <InputHalf
          label="Last Name"
          type="lastname"
          placeholder="Your last name"
          name="last_name"
          id="lastname"
          required
        />
      </div>

      {/* Role */}
      <div className="flex items-center gap-2 ">
        <Select
          name={"role"}
          label={"Role"}
          options={[
            { value: STUDENT, label: "Student" },
            { value: FACULTY, label: "Faculty" },
            { value: STAFF, label: "Staff" },
          ]}
        />
        {/* Department */}
        <Select
          name={"department_code"}
          label={"Department"}
          options={[
            {
              value: "CSE",
              label: "Computer Science and Engineering",
            },
            {
              value: "EE",
              label: "Electrical Engineering",
            },
          ]}
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

export default Common;
