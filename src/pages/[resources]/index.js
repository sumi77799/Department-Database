import Head from "next/head";
import { useEffect, useState } from "react";
import { TableContext } from "@/context/Table/TableContext";
import { useRouter } from "next/router";

import { useContext } from "react";
// layout for page
import TableLayout from "@/layout/TablesLayout";
import Table from "@/components/Table/Table";
import TableProvider from "@/context/Table/TableContext";
import { useAllData } from "@/services/DataFetch";
// icons
import { FiCheck, FiEdit, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import Navbar from "@/layout/Navbar";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import { ToastContext } from "@/context/Toast/ToastContext";
import { deleteData } from "@/services/DataDelete";
import { decisionData } from "@/services/DataDecision";
// Error Message
import { RESOURCESTYPES } from "@/config/userRoutes";
import { UserInfoContext } from "@/context/UserInfo";

export default function Resources() {
  const router = useRouter();
  const { resources, tab, type } = router.query;
  const { dispatch } = useContext(TableContext);
  const { showToast } = useContext(ToastContext);
  const { userInfo } = useContext(UserInfoContext);

  const [dateValue, setDateValue] = useState({
    // startDate in DD-MM-YYYY format of current day.
    endDate: new Date().toLocaleDateString("en-CA"),
    // endDate in DD-MM-YYYY format of same day 1 year back
    startDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    ).toLocaleDateString("en-CA"),
  });
  const [dateFilterType, setDateFilterType] = useState("published");

  const handleDateChange = (newDate) => {
    if (newDate.startDate && newDate.endDate) {
      setDateValue(newDate);
    }
  };

  const handleFilterChange = (newFilter) => {
    switch (newFilter) {
      case "published_date":
        setDateFilterType("published");
        break;
      case "accepted_date":
        setDateFilterType("accepted");
        break;
      default:
        setDateFilterType("published");
        break;
    }
  };

  // click on table row
  const handleOnClickRowUrl = (id) => {
    return `/${resources}/${id}?type=${tab}`;
  };

  const handleOnClickEdit = (id) => {
    router.push({
      pathname: `/${resources}/${id}/edit`,
      query: { type: tab },
    });
  };

  const handleOnClickDelete = async (id) => {
    // show alert
    // if yes then delete
    // else do nothing

    // showToast({ message: "Are you sure you want to delete?", type: "error" });

    console.log(id);
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      const { data, errors } = await deleteData(id, resources, tab);
      if (errors) {
        showToast({ type: "error", message: errors });
      } else {
        showToast({ type: "success", message: "Deleted Successfully" });
        mutate();

        // router.push(`/${resources}`);
        console.log(data);
      }
    } else {
      // do nothing
      console.log("do nothing");
    }
  };

  const handleOnClickApprove = async (id) => {
    console.log(id);
    // show toast about sending request
    showToast({ type: "info", message: "Sending Request" });
    const { data, errors } = await decisionData("approve", resources, id);
    if (errors) {
      showToast({ type: "error", message: errors });
    } else {
      // router.push(`/${resources}`);
      showToast({ type: "success", message: "Approved" });
      mutate();

      console.log(data);
    }
  };

  const handleOnClickReject = async (id) => {
    console.log(id);
    showToast({ type: "info", message: "Sending Request" });
    const { data, errors } = await decisionData("reject", resources, id);
    if (errors) {
      showToast({ type: "error", message: errors });
    } else {
      // router.push(`/${resources}`);
      showToast({ type: "success", message: "Rejected" });
      mutate();
      console.log(data);
    }
  };

  const handleOnClickPublish = async (id) => {
    console.log(id);
    showToast({ type: "info", message: "Sending Request" });
    const { data, errors } = await decisionData("submit", resources, id);
    if (errors) {
      showToast({ type: "error", message: errors });
    } else {
      showToast({ type: "success", message: "Submit Successfully" });
      mutate();
      // router.push(`/${resources}`);
      console.log(data);
    }
  };

  // ? not sure if this is needed
  const handleOnClickUnpublish = (id) => {
    console.log(id);
  };

  const handleOnClickRestore = async (id) => {
    console.log(id);
    showToast({ type: "info", message: "Trying to restore" });
    const { data, errors } = await decisionData("restore", resources, id);
    if (errors) {
      showToast({ type: "error", message: errors });
    } else {
      showToast({ type: "success", message: "Restored Successfully" });
      mutate();

      // router.push(`/${resources}`);
      console.log(data);
    }
  };
  const allActiveActions = {
    Faculty: [
      {
        name: "Edit",
        icon: FiEdit,
        onClick: handleOnClickEdit,
      },
      {
        name: "Delete",
        icon: FiTrash2,
        onClick: handleOnClickDelete,
      },
    ],
    Staff: [],
    Student: [
      {
        name: "Edit",
        icon: FiEdit,
        onClick: handleOnClickEdit,
      },
      {
        name: "Delete",
        icon: FiTrash2,
        onClick: handleOnClickDelete,
      },
    ],
  };
  const allPendingActions = {
    Faculty: [
      {
        name: "Approve",
        icon: FiCheck,
        onClick: handleOnClickApprove,
      },
      {
        name: "Reject",
        icon: FiX,
        onClick: handleOnClickReject,
      },
    ],
    Staff: [],
    Student: [],
  };
  const allDeletedActions = {
    Faculty: [
      {
        name: "Restore",
        icon: FiRotateCcw,
        onClick: handleOnClickRestore,
      },
    ],
    Staff: [],
    Student: [
      {
        name: "Restore",
        icon: FiRotateCcw,
        onClick: handleOnClickRestore,
      },
    ],
  };
  const allDraftActions = {
    Faculty: [
      {
        name: "Edit",
        icon: FiEdit,
        onClick: handleOnClickEdit,
      },
      {
        name: "Delete",
        icon: FiTrash2,
        onClick: handleOnClickDelete,
      },
      {
        name: "Publish",
        icon: FiCheck,
        onClick: handleOnClickPublish,
      },
    ],
    Staff: [],
    Student: [
      {
        name: "Edit",
        icon: FiEdit,
        onClick: handleOnClickEdit,
      },
      {
        name: "Delete",
        icon: FiTrash2,
        onClick: handleOnClickDelete,
      },
      {
        name: "Publish",
        icon: FiCheck,
        onClick: handleOnClickPublish,
      },
    ],
  };

  useEffect(() => {
    if (userInfo.first_name) {
      //set each action based on group
      switch (tab) {
        case "Active":
          setCurrentActions(allActiveActions[userInfo.groups[0]]);
          break;
        case "Pending":
          setCurrentActions(allPendingActions[userInfo.groups[0]]);
          break;
        case "Draft":
          setCurrentActions(allDraftActions[userInfo.groups[0]]);
          break;
        case "Deleted":
          setCurrentActions(allDeletedActions[userInfo.groups[0]]);
          break;
        default:
          setCurrentActions(allActiveActions[userInfo.groups[0]]);
          break;
      }
    }
  }, [userInfo, tab, resources]);

  const [currentActions, setCurrentActions] = useState(
    allActiveActions["Faculty"]
  );
  const { tableAttribute, tableHeader, tableData, isLoading, error, mutate } =
    useAllData(tab ?? "Active", resources, dateValue, dateFilterType);
  // console.log("tableAttribute", tableAttribute);
  // console.log("tableHeader", tableHeader);
  // console.log("tableData", tableData);
  // console.log("isLoading", isLoading);
  // console.log("error", error);
  useEffect(() => {
    if (!isLoading) {
      dispatch({
        type: "FETCH_DETAILS_SUCCESS",
        payload: {
          tableHeader: tableHeader,
          tableData: tableData,
          tableAttribute: tableAttribute,
        },
      });
    } else if (error) {
      dispatch({
        type: "FETCH_DETAILS_ERROR",
        payload: {
          error: error,
        },
      });
    } else {
      dispatch({
        type: "FETCH_DETAILS_LOADING",
        payload: {
          loading: isLoading,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  // mutate data on data change
  useEffect(() => {
    if (router.isReady) {
      console.log("dateValue", dateValue);
      mutate();
    }
  }, [router.isReady, mutate, dateValue]);

  // console.log("Fetched Details", state);

  // if resource is not found in RESOURCESTYPES then redirect to 404 page
  // alert("resources" + resources);
  if (!RESOURCESTYPES.includes(resources) && router.isReady) {
    // alert("not found");
    router.replace("/404");

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-2xl">Resource not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${resources} - My Website`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center  min-h-screen py-2">
        <Table
          haveOptions={true}
          actions={currentActions}
          tableRowClickUrl={handleOnClickRowUrl}
          haveSearch={true}
          haveCheckbox={false}
          dateValue={dateValue}
          handleDateChange={handleDateChange}
          handleFilterChange={handleFilterChange}
          dateFilterType={dateFilterType}
          haveShowSelect={false}
          haveFilterDate={tab === "Active" || tab === undefined ? true : false}
        />
      </div>
    </>
  );
}

// getServersideProps
export async function getServerSideProps(context) {
  const { params } = context;
  const { resources } = params;

  // if resource is not found in RESOURCESTYPES then redirect to 404 page
  if (!RESOURCESTYPES.includes(resources)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resources: resources,
    },
  };
}

Resources.auth = true;
Resources.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>
        <TableProvider>
          <TableLayout>{page}</TableLayout>
        </TableProvider>
      </Navbar>
    </NavbarProvider>
  );
};
