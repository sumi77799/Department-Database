import Link from "next/link";
import React, { useContext } from "react";
import ButtonPrimary from "../elements/Button/ButtonPrimary";
import { fetchReportHistory } from "@/services/DataFetch";
import { UserInfoContext } from "@/context/UserInfo";

const ReportHistory = ({ data, type }) => {
  // sort using created_at field
  const { userToken } = useContext(UserInfoContext);

  if (data) {
    data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }
  const handleDownload = async (e, name, id) => {
    const blob = await fetchReportHistory(type, id, userToken);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    const templateName = name + ".docx";
    link.setAttribute("download", templateName); // set the filename attribute
    document.body.appendChild(link);
    link.click();
    link.remove();
    e.preventDefault();
    console.log("id: ", id);
  };
  return (
    <>
      {data &&
        data.map((item, index) => (
          <ol
            key={item.id}
            className="relative border-l border-gray-200 dark:border-gray-700"
          >
            <li className="flex mb-10 ml-6 place-content-between">
              <span>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 text-blue-800 dark:text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.name + " " + item.year}{" "}
                  {index === 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                      Latest
                    </span>
                  )}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Released on {new Date(item.created_at).toLocaleDateString()}{" "}
                  at {new Date(item.created_at).toLocaleTimeString()}
                </time>
                {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce &amp; Marketing pages.</p> */}
              </span>
              <ButtonPrimary
                onClick={(e) => handleDownload(e, item.name, item.id)}
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                Download Report
              </ButtonPrimary>
            </li>
          </ol>
        ))}
    </>
  );
};

export default ReportHistory;
