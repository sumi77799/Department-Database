import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import path from "path";
import {
  fetchFileTemplate,
  fetchUserUploadTemplate,
} from "@/services/DataFetch";
import { useRouter } from "next/router";
import { ToastContext } from "@/context/Toast/ToastContext";
import { postFileData } from "@/services/DataPost";
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";

const FileUploadUsers = ({
  heading,
  toggleStates,
  setToggleStates,
  type,
  caveats,
}) => {
  const { showToast } = useContext(ToastContext);
  //create a ref
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [uploadErrors, setUploadErrors] = useState();
  const router = useRouter();
  const { resources } = router.query;

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener("change", (e) => {
        let filePath = e.target.value;
        console.log(
          "Changing from",
          fileName,
          "to",
          event.target.files[0].name
        );
        console.log("fileData: ", e.target.files[0]);
        setFileName(path.basename(filePath.replace(/\\/g, "/")));
      });
    }
  }, [fileInputRef]);
  const handleOnClickCancel = () => {
    //set toggle to hidden
    fileInputRef.current.value = null;
    setToggleStates({
      ...toggleStates,
      [type]: toggleStates[type] === "hidden" ? "" : "hidden",
    });
  };
  const handleOnClickUpload = async () => {
    console.log("fileData: ", fileData);
    const { data, errors } = await postFileData(type.toLowerCase(), fileData);
    if (errors) {
      setUploadErrors(errors);
    } else {
      showToast({ type: "success", message: "Upload successful" });
    }
  };

  const handleOnClickGetTemplate = async () => {
    // result is a file blob
    const blob = await fetchUserUploadTemplate(type);
    // download the file
    //check if blob is json

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${type}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // click the link to download the file

    // if(error){
    //   showToast({ type: "error", message: error });
    // }
  };

  const handleFileChange = (event) => {
    console.log("Changing to", event.target.files[0]);
    setFileData(event.target.files[0]);
  };
  const handleFileInputClick = (event) => {
    event.target.value = null; // Clear the file input value
    setUploadErrors(null);
  };
  const displayFileName = () => {
    if (fileName) {
      return "Chosen file: " + fileName;
    }
    return "";
  };
  const displayCaveats = () => {
    if (caveats) {
      return (
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
              {caveats.map((caveat, index) => (
                <li key={index}>{caveat}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return "";
  };

  const displayErrors = () => {
    if (uploadErrors) {
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
              {Object.keys(uploadErrors).map((error, index) => (
                <li key={index}>
                  Row {error}: {uploadErrors[error]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return "";
  };
  return (
    <>
      {/* {console.log("Toggle value: ", toggle)} */}
      {/* <div id="defaultModal" tabIndex={-1}  className={` fixed z-50 ${toggle} left-96 w-96 object-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}> */}
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class={`fixed z-50 ${toggleStates[type]} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {heading}
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
            {displayCaveats()}

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
      </div>
    </>
  );
};

export default FileUploadUsers;
