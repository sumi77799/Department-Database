import UserPopover from "@/components/ToolTip/UserPopover";
import Tag from "@/components/elements/Button/Tag";
import allHeadersAndAttributes from "@/config/TableDataHeadersAndAttributes";
import definitionsForResources from "@/config/definitions";
import { RESOURCESTYPES } from "@/config/userRoutes";
import { DJANGO_BASE_URL, LOGIN } from "@/constants/endPoints";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import Navbar from "@/layout/Navbar";
import { getSpecificData } from "@/services/DataFetch";
import splitIfUnderscore from "@/utils/common/split";
import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ResourceId({ data, title, description, resources }) {
  const rejectList = ["id", "draft_id", "is_deleted"];
  const acceptListForObjects = [
    "Authors",
    "Members",
    "Organizers",
    "Participants",
    "User",
  ];
  if (!data) {
    return <div>Loading...</div>;
  }
  const Tags =
    data.tableData.tags &&
    data.tableData.tags.split(",").map((tag, index) => {
      return <Tag text={tag} key={tag} />;
    });

  return (
    <>
      <Head>
        <title>
          {title} | {resources}
        </title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-visible ml-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {" "}
            {title}{" "}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500"> {description}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {/* Map through the tableData object and display the key and value */}
            {Object.keys(data.tableData).map((key, index) => {
              // tag
              if (key === "tags") {
                return (
                  <div
                    key={key}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {splitIfUnderscore(key)}{" "}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {Tags}
                    </dd>
                  </div>
                );
              } else if (key === "field_tags") {
                return (
                  <div
                    key={key}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {splitIfUnderscore(key)}{" "}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.tableData[key].map((tag, index) => {
                        return <Tag text={tag} key={index} />;
                      })}
                    </dd>
                  </div>
                );
              } else if (
                !rejectList.includes(key) &&
                typeof data.tableData[key] !== "object"
              ) {
                return (
                  <div
                    key={key}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {splitIfUnderscore(key)}{" "}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {key !== "link" && (data.tableData[key] ?? "N/A")}
                      {key === "link" && (
                        <Link
                          href={data.tableData[key] ?? "#"}
                          passHref
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {data.tableData[key]}
                        </Link>
                      )}
                      {data.tableData[key] === "" && "N/A"}
                    </dd>
                  </div>
                );
              } else if (key === "Department") {
                return data.tableData[key].map((department) => {
                  return (
                    <div
                      key={department.id}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                    >
                      <dt className="text-sm font-medium text-gray-500">
                        Department
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {department.name}
                      </dd>
                    </div>
                  );
                });
              } else if (
                // typeof data.tableData[key] === "object" &&
                // !rejectList.includes(key)
                acceptListForObjects.includes(key)
              ) {
                return (
                  <div
                    key={key}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    {/* show them as tags */}
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.tableData[key].map((author) => {
                        return (
                          <>
                            <UserPopover
                              key={author.id}
                              user={author}
                              id={author.id}
                            >
                              <Tag
                                id={author.id}
                                key={author.id}
                                text={
                                  author.first_name + " " + author.last_name
                                }
                              />
                            </UserPopover>
                          </>
                        );
                      })}
                    </dd>
                  </div>
                );
              }
            })}

            {/* Add a button to edit the resource */}
            {/* Created and updated at */}

            {/* Atachments */}
            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                  // icon for pdf
                    <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
          </dl>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { resources, id, type } = query;
  // session
  const session = await getSession(context);
  const token = session?.user?.access;

  if (!token) {
    return {
      redirect: {
        destination: LOGIN,
        permanent: false,
      },
    };
  }

  // if resource is not found in RESOURCESTYPES then redirect to 404 page
  if (!RESOURCESTYPES.includes(resources)) {
    return {
      notFound: true,
    };
  }

  // fetch the data from the api
  const definitions = definitionsForResources[resources];
  const headers = allHeadersAndAttributes[resources]["headers"];
  const attributes = allHeadersAndAttributes[resources]["attributes"];

  let url = `${DJANGO_BASE_URL}/${resources}/${id}/`;

  switch (type) {
    case "Active":
      url = `${DJANGO_BASE_URL}/${resources}/${id}`;
      break;
    case "Draft":
      url = `${DJANGO_BASE_URL}/${resources}/draft/${id}`;
      break;
    case "Pending":
      url = `${DJANGO_BASE_URL}/${resources}/approve/${id}`;
      break;
    case "Deleted":
      url = `${DJANGO_BASE_URL}/${resources}/restore/${id}`;
      break;
    default:
      url = `${DJANGO_BASE_URL}/${resources}/${id}`;
  }

  const result = await fetch(`${url}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let { data, errors } = await result.json();
  if (data && definitions) {
    data = modifyWithdefinitions(data, definitions);
  }

  if (errors) {
    return {
      notFound: true,
    };
  }

  const rows = {
    tableAttribute: attributes,
    tableHeader: headers,
    tableData: data,
  };

  const title = splitIfUnderscore(rows.tableData.title ?? rows.tableData.name);
  const description = `Details about the ${resources}`;

  return {
    props: { data: rows, title, description, resources },
  };
}

ResourceId.auth = true;
ResourceId.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>{page}</Navbar>
    </NavbarProvider>
  );
};
