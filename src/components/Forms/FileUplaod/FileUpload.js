import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import path from "path";
import { fetchFileTemplate } from "@/services/DataFetch";
import { useRouter } from "next/router";
import { ToastContext } from "@/context/Toast/ToastContext";
import { postFileData } from "@/services/DataPost";
import { downloadBlob } from "@/utils/download/download";
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import { useSpring, animated, config } from "react-spring";

const FileUpload = ({ toggle, setToggle, handleSubmit }) => {
  const { showToast } = useContext(ToastContext);
  //create a ref
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [uploadErrors, setUploadErrors] = useState(null);
  const router = useRouter();
  const { resources } = router.query;

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener("change", (e) => {
        let filePath = e.target.value;
        console.log("fileData changing: ", e.target.files[0]);

        setFileName(path.basename(filePath.replace(/\\/g, "/")));
      });
    }
  }, [fileInputRef]);

  const displayErrors = () => {
    if (uploadErrors) {
      if (typeof uploadErrors === "string") {
        return (
          <div
            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <HiInformationCircle />
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Errors: {uploadErrors}</span>
              {/* <ul className="mt-1.5 ml-4 list-disc list-inside">
              {Object.values(uploadErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul> */}
            </div>
          </div>
        );
      }
      return (
        <div
          className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <HiInformationCircle />
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Errors:</span>
            <ul className="mt-1.5 ml-4 list-disc list-inside">
              {Object.keys(uploadErrors).map((key, index) => (
                <li key={index}>
                  Row {key}:
                  <ul className="ml-4 list-disc list-inside">
                    {Object.values(uploadErrors[key]).map(
                      (subError, subIndex) => (
                        <li key={subIndex}>
                          {Object.keys(subError).map((property) => (
                            <div key={property}>
                              <span className="font-medium">{property}:</span>
                              <ul className="ml-4 list-disc list-inside">
                                {subError[property].map(
                                  (member, memberIndex) => (
                                    <li key={memberIndex}>{member}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          ))}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return "";
  };
  const handleOnClickCancel = () => {
    //set toggle to hidden
    fileInputRef.current.value = null;
    setToggle("hidden");
  };
  const handleOnClickUpload = async () => {
    const { data, data_errors, errors } = await postFileData(
      resources,
      fileData
    );
    console.log(errors, data_errors, data);
    if (errors) {
      setUploadErrors(errors);
    } else if (data_errors) {
      setUploadErrors(data_errors);
    } else {
      showToast({ type: "success", message: "Data uploaded successfully" });
    }
  };

  // const handleOnClickGetTemplate = async () => {
  //   // result is a file blob
  //   const blob = await fetchFileTemplate(resources);
  //   // download the file
  //   //check if blob is json

  //   const url = window.URL.createObjectURL(new Blob([blob]));
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", `${resources}.xlsm`);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();

  //   // click the link to download the file

  //   // if(error){
  //   //   showToast({ type: "error", message: error });
  //   // }
  // };

  const handleOnClickGetTemplate = async () => {
    // const filename = "Date_template_publication.xlsm"; // set the filename
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const templateName = `${formattedDate}_template_${resources}.xlsm`;

    const blob = await fetchFileTemplate(resources);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", templateName); // set the filename attribute
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileInputClick = (event) => {
    event.target.value = null; // Clear the file input value
    setUploadErrors(null);
  };
  const handleFileChange = (e) => {
    console.log("fileData changing in handleFileChange: ", e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  const displayFileName = () => {
    if (fileName) {
      return "Chosen file: " + fileName;
    }
    return "";
  };

  const styleVisibility = useSpring({
    scale: toggle === "hidden" ? 0.5 : 1,
    opacity: toggle === "hidden" ? 0 : 1,
    transformOrigin: "top",
    config: config.stiff,
  });

  return (
    <>
      {console.log("Toggle value: ", toggle)}
      {/* <div id="defaultModal" tabIndex={-1}  className={` fixed z-50 ${toggle} left-96 w-96 object-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}> */}
      <animated.div
        style={styleVisibility}
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed z-50 ${toggle} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upload
            </h3>
            <button
              onClick={handleOnClickCancel}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <div className="flex items-center p-6 space-x-2  border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleOnClickGetTemplate}
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                <div className="flex justify-between">
                  <AiOutlineDownload /> Download Template
                </div>
              </button>
            </div>
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <HiInformationCircle />
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Ensure that these requirements are met:
                </span>
                <ul className="mt-1.5 ml-4 list-disc list-inside">
                  <li>
                    Enable Macros in Excel. Click{" "}
                    <Link
                      target="_blank"
                      href={
                        "https://support.microsoft.com/en-us/topic/a-potentially-dangerous-macro-has-been-blocked-0952faa0-37e7-4316-b61d-5b5ed6024216"
                      }
                      className="underline-dark-800"
                    >
                      here
                    </Link>{" "}
                    to learn how to enable macros for this file.
                  </li>
                  <li>
                    If not able to enable macros, then export it as .csv file
                    and manually add the entries. Click{" "}
                    <Link
                      target="_blank"
                      href={
                        "https://support.microsoft.com/en-us/office/save-a-workbook-to-text-format-txt-or-csv-3e9a9d6c-70da-4255-aa28-fcacf1f081e6"
                      }
                      className="underline-dark-800"
                    >
                      here
                    </Link>{" "}
                    to learn how to export current sheet as .csv file.{" "}
                  </li>
                  <li>
                    Upload only the .csv file containing entries. Click{" "}
                    <Link
                      target="_blank"
                      href={
                        "https://support.microsoft.com/en-us/office/save-a-workbook-to-text-format-txt-or-csv-3e9a9d6c-70da-4255-aa28-fcacf1f081e6"
                      }
                      className="underline-dark-800"
                    >
                      here
                    </Link>{" "}
                    to learn how to export current sheet as .csv file.
                  </li>
                </ul>
              </div>
            </div>

            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                <SlCloudUpload />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{displayFileName()}</span>
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">CSV </p>
              </div>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                onClick={handleFileInputClick}
                id="dropzone-file"
                type="file"
                className="hidden  "
              />
            </label>
            {displayErrors()}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleOnClickUpload}
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
              </button>
              <button
                onClick={handleOnClickCancel}
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* Modal footer */}
      </animated.div>
    </>
  );
};

export default FileUpload;
