import Select from "@/components/Forms/Select";
import Spinner from "@/components/elements/Spinner";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import { UserInfoContext } from "@/context/UserInfo";
import Navbar from "@/layout/Navbar";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useReducer, useState } from "react";

// initial state
// { id: "issue_category", type: "text", label: "Issue Category", placeholder: "Enter the issue category", required: true },
// { id: "issue", type: "text", label: "Issue", placeholder: "Enter the issue", required: true },
// { id: "screenshot", type: "file", label: "Screenshot", accept: "image/*" }
const initialState = {
  issue_category: "",
  issue: "",
  screenshot: "",
  errors: {
    // This is where we will store our errors
    issue_category: "",
    issue: "",
    screenshot: "",
  },
  touched: {
    // This is where we will store if the field has been touched. If it has not been touched, we will not show an error message.
    issue_category: false,
    issue: false,
    screenshot: false,
  },
  submitting: false, // This is where we will store if the form is currently submitting.
  submitted: false, // This is where we will store if the form has been submitted.
  submitError: false, // This is where we will store if there was an error submitting the form.
};

// reduer for form
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.value,
        },
      };
    case "RESET_ERRORS":
      return {
        ...state,
        errors: {
          name: "",
          email: "",
          subject: "",
          description: "",
          url: "",
          screenshot: "",
        },
      };
    case "RESET_FORM":
      return {
        ...state,
        name: "",
        email: "",
        subject: "",
        description: "",
        url: "",
        screenshot: "",
        errors: {
          name: "",
          email: "",
          subject: "",
          description: "",
          url: "",
          screenshot: "",
        },
        touched: {
          name: false,
          email: false,
          subject: false,
          description: false,
          url: false,
        },
        submitting: false,
        submitted: false,
        submitError: false,
      };
    case "UPDATE_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.value,
        },
      };
    case "UPDATE_SUBMITTING":
      return {
        ...state,
        submitting: action.value,
      };
    case "UPDATE_SUBMITTED":
      return {
        ...state,
        submitted: action.value,
      };
    case "UPDATE_SUBMIT_ERROR":
      return {
        ...state,
        submitError: action.value,
      };
    default:
      return state;
  }
};

export default function ContactUs() {
  const { userToken } = useContext(UserInfoContext);

  const formFields = [
    {
      id: "issue_category",
      type: "text",
      label: "Issue Category",
      placeholder: "Enter the issue category",
      options: [
        { value: "Publications", label: "Publications" },
        { value: "Achievements", label: "Achievements" },
        { value: "Events", label: "Events" },
        { value: "Visits", label: "Visits" },
        { value: "Projects", label: "Projects" },
        { value: "StudentProjects", label: "Student Projects" },
        { value: "BogReports", label: "Bog Reports" },
        { value: "DinfoReports", label: "Dinfo Reports" },
        { value: "Other", label: "Other" },
      ],
      required: true,
    },
    {
      id: "issue",
      type: "text",
      label: "Issue",
      placeholder: "Enter the issue",
      required: true,
    },
    { id: "screenshot", type: "file", label: "Screenshot", accept: "image/*" },
  ];

  const [screenshot, setScreenshot] = useState(null);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = () => {
    console.log("validate", state);
    const errors = {};
    if (state.issue_category === "") {
      errors.issue_category = "Issue Category is required";
    }
    if (state.issue === "") {
      errors.issue = "Issue is required";
    }
    // if (state.screenshot === "") {
    //   errors.screenshot = "Screenshot is required";
    // }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    console.log("handleSubmit", state);
    if (Object.keys(errors).length > 0) {
      // so display the error message for each field
      for (const [key, value] of Object.entries(errors)) {
        dispatch({ type: "UPDATE_ERROR", field: key, value: value });
      }
    } else {
      dispatch({ type: "UPDATE_SUBMITTING", value: true });
      try {
        // convert to form data
        const formData = new FormData();
        formData.append("issue_category", state.issue_category);
        formData.append("issue", state.issue);
        if (screenshot) {
          formData.append("screenshot", screenshot);
        }
        console.log("formData", formData);

        const res = await fetch(`${DJANGO_BASE_URL}/query/`, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        });
        const json = await res.json();

        if (!res.ok) {
          dispatch({ type: "UPDATE_SUBMIT_ERROR", value: true });
          setTimeout(() => {
            dispatch({ type: "UPDATE_SUBMIT_ERROR", value: false });
          }, 5000);
          // reset the errors
          dispatch({ type: "RESET_ERRORS" });

          // so display the error message for each field
          for (const [key, value] of Object.entries(json)) {
            dispatch({ type: "UPDATE_ERROR", field: key, value: value[0] });
          }
        } else {
          dispatch({ type: "RESET_FORM" });
        }

        dispatch({ type: "UPDATE_SUBMITTED", value: true });
      } catch (e) {
        console.error(e);
        dispatch({ type: "UPDATE_SUBMIT_ERROR", value: true });

        setTimeout(() => {
          dispatch({ type: "UPDATE_SUBMIT_ERROR", value: false });
        }, 5000);
      } finally {
        dispatch({ type: "UPDATE_SUBMITTING", value: false });
      }
    }
  };

  const handleBlur = (e) => {
    dispatch({ type: "UPDATE_TOUCHED", field: e.target.id, value: true });
  };

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_VALUE",
      field: e.target.id,
      value: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);

    setScreenshot(e.target.files[0]);
    //   dispatch({
    //     type: "UPDATE_VALUE",
    //     field: e.target.id,
    //     value: "screenshot"
    //   });
  };

  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        {/*  link: https://forms.gle/ifgQ3T3YcH9jUdaT6 */}
        {/* show the above google form link also */}
        <p className="mb-6">
          <Link
            href="https://forms.gle/ifgQ3T3YcH9jUdaT6"
            target="_blank"
            className="text-blue-500"
          >
            Click here
          </Link>{" "}
          to fill the google form.
        </p>
        <p className="mb-6">
          Or fill the form below to contact us. We will get back to you as soon
          as possible.
        </p>

        <form
          className="w-full text-sm max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          {formFields.map((field) => (
            <div className="mb-4" key={field.id}>
              {field.id !== "issue_category" && (
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
              )}
              {/* if description then text area */}
              {field.id === "issue_category" && (
                <Select
                  id={field.id}
                  label={field.label}
                  options={field.options}
                  name={field.id}
                  error={state.errors[field.id]}
                  required={field.required}
                  value={state[field.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
              {field.id === "issue" && (
                <textarea
                  className="shadow appearance-none border focus:border-emerald-800 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={state[field.id]}
                />
              )}
              {field.id === "screenshot" && (
                <input
                  className="shadow appearance-none border focus:border-emerald-800 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  accept={field.accept}
                  onChange={
                    field.id === "screenshot" ? handleFileChange : handleChange
                  }
                  onBlur={handleBlur}
                  //value={state[field.id]}
                />
              )}
              {/* if error then show error */}
              {state.errors[field.id] && (
                <p className="text-red-500 text-xs italic">
                  {state.errors[field.id]}
                </p>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                state.submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {/* based on state.submitted show different text */}
              {state.submitted ? "Submitted" : "Submit"}
              {/* if submitting show spinner */}
              {state.submitting && <Spinner />}
              {/* if submit error show error */}
            </button>
            {state.submitError && (
              <p className="text-red-500 text-xs italic">
                Error submitting form
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

ContactUs.auth = true;
ContactUs.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>{page}</Navbar>
    </NavbarProvider>
  );
};
