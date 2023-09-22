import { NOTIFICATION_URL, REFRESH_INTERVAL } from "@/config/Notification";
import allHeadersAndAttributes, {
  publicationsData,
} from "@/config/TableDataHeadersAndAttributes";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const publicationsDataHeader = publicationsData["headers"];

export const useAllData = (tab, recources, dateValue, dateFilterType) => {
  const type = tab === "Active" ? "" : tab.toLowerCase();
  const headers = allHeadersAndAttributes[recources]["headers"];
  const attributes = allHeadersAndAttributes[recources]["attributes"];
  // console.log("headers", headers);
  // console.log("attributes", attributes);
  let url = "/api/${recources}/${type}";
  switch (recources) {
    case "publications":
      url = `/api/${recources}/${type}?from_date_${dateFilterType}=${dateValue.startDate}&to_date_${dateFilterType}=${dateValue.endDate}`;
      break;
    default:
      url = `/api/${recources}/${type}?from_date=${dateValue.startDate}&to_date=${dateValue.endDate}`;
      break;
  }

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  // console.log("Data in fetch: ", data);
  // console.log("loadingin fetch: ", isLoading);

  return {
    tableAttribute: attributes,
    tableHeader: headers,
    tableData: data?.data,
    error,
    isLoading,
    mutate,
  };
};

export const useDepartmentReportData = (
  department,
  type,
  startDate,
  endDate
) => {
  const { data, error, isLoading } = useSWR(
    `/api/reports/${type}/${department}/${startDate}/${endDate}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useReportHistory = (type) => {
  const { data, error, isLoading } = useSWR(`/api/reports/${type}/`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const getSpecificData = async (type, recources, id) => {
  if (type == "Active") {
    type = "id";
  } else if (type == "Draft") {
    type = "draft";
  } else if (type == "Pending") {
    type = "pending";
  } else if (type == "Deleted") {
    type = "deleted";
  }

  const headers = allHeadersAndAttributes[recources]["headers"];
  const attributes = allHeadersAndAttributes[recources]["attributes"];
  const data = await fetch(`/api/${recources}/${type}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const rows = await data.json();
  return {
    tableAttribute: attributes,
    tableHeader: headers,
    tableData: rows.data,
  };
};

export const useNotification = () => {
  const { data, error, isLoading, mutate } = useSWR(NOTIFICATION_URL, fetcher, {
    refreshInterval: REFRESH_INTERVAL,
  });
  if (isLoading || !data) return { data: [], errors: [], mutate };
  if (error) return { data: [], errors: error, mutate };
  return { data: data.data, errors: data.errors, mutate };
};

export const fetchAllAuthorData = async (resources) => {
  const allAuthorsResult = await fetch("/api/users");
  const allAuthorsData = await allAuthorsResult.json();
  let filteredDataAuthors;
  if (resources == "department" || resources == "research_labs") {
    filteredDataAuthors = allAuthorsData.filter(
      (item) => item.groups[0] === "Faculty"
    );
  } else {
    filteredDataAuthors = allAuthorsData.filter(
      (item) => item.groups[0] === "Faculty" || item.groups[0] === "Student"
    );
  }
  console.log("All data for author: ", filteredDataAuthors);
  return filteredDataAuthors;
};

export const fetchAllDepartmentData = async () => {
  const allDepartmentResult = await fetch("/api/departmentList");
  const allDepartmentData = await allDepartmentResult.json();

  console.log("All data for department: ", allDepartmentData);

  return allDepartmentData;
};

export const fetchFileTemplate = async (resources) => {
  // const result = await fetch(`/api/${resources}/upload`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/create/upload/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.blob();
  // if (result.status === 200) {
  //   // return is a file
  //   return result.blob();
  // }
  // return await result.json();
};

export const fetchUserUploadTemplate = async (user) => {
  // const result = await fetch(`/api/${resources}/upload`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  user = user.toLowerCase();
  const result = await fetch(`/api/${user}/upload/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await result.blob();
  // if (result.status === 200) {
  //   // return is a file
  //   return result.blob();
  // }
  // return await result.json();
};
export const fetchReportHistory = async (type, id, userToken) => {
  const result = await fetch(`${DJANGO_BASE_URL}/reports/${type}/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    },
  });
  return result.blob();
};
