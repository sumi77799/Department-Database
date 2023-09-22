import Table from "@/components/Table/Table";
import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import Steps from "@/components/Steps/Steps";
import { ICON_STYLE } from "@/config/Icon/IconStyle";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import TableProvider, { TableContext } from "@/context/Table/TableContext";
import Navbar from "@/layout/Navbar";
import { useDepartmentReportData } from "@/services/DataFetch";
import { handleReportPost } from "@/services/DataPost";
import splitIfUnderscore from "@/utils/common/split";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiFileBlank } from "react-icons/bi";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { getSession } from "next-auth/react";
import { STAFF } from "@/constants/roles";

export default function Reports() {
  const router = useRouter();
  const { type, startDate, endDate, year } = router.query;
  const { state, dispatch } = useContext(TableContext);
  const { data, isLoading, error } = useDepartmentReportData(
    1,
    type,
    startDate,
    endDate
  );
  const [steps, setSteps] = useState();
  // for each step, store wehther it is completed or not
  const [completed, setCompleted] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  // make a state which stores selected rows for each ste
  const [reportData, setReportData] = useState({
    // faculty_achievements: [],
    // student_achievements: [],
    // events: [],
    // faculty_visits: [],
    // student_visits: [],
    // publications: [],
    // projects: [],
    // batches: [],
  });
  const [isGenerateReportDisabled, setIsGenerateReportDisabled] =
    useState(true);
  const props = {
    heading: `Generate ${splitIfUnderscore(type)} Report`,
    isTopIcon: true,
    topIconLink: ``,
  };

  const handleOnClickRowUrl = (id) => {
    return `#`;
  };

  const handleOnChangeCheckbox = (id) => {
    if (id === "all") {
      dispatch({
        type: "SELECT_ALL_ROWS",
        payload: {
          selectAll: !state.selectAll,
        },
      });
    } else {
      dispatch({
        type: "TOGGLE_CHECKBOX",
        payload: {
          id: id,
        },
      });
    }
  };

  // const handleOnClickGenerateReport = async (e) => {
  //   e.preventDefault();
  //   // TOOD: send the reportData to the backend
  //   console.log("reportData: ", reportData);
  //   let finalReportData = reportData;
  //   // finalReportData["department"] = userInfo.department;
  //   // convert yaer to int
  //   finalReportData["year"] = parseInt(year);
  //   let blob = await handleReportPost(type, finalReportData);
  //   console.log("Receieved blob: ", blob);
  //   const url = window.URL.createObjectURL(new Blob([blob]));
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", `${type}_report.docx`);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  const handleOnClickGenerateReport = async (e) => {
    e.preventDefault();
    // TOOD: send the reportData to the backend
    console.log("reportData: ", reportData);
    let finalReportData = reportData;
    // finalReportData["department"] = userInfo.department;
    // convert yaer to int
    finalReportData["year"] = parseInt(year);
    // const department = userInfo.department;
    // const date = new Date().toISOString().slice(0, 10);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const startDateFormatted = new Date(startDate)
      .toLocaleDateString("en-GB", options)
      .split("/")
      .join("-");
    const endDateFormatted = new Date(endDate)
      .toLocaleDateString("en-GB", options)
      .split("/")
      .join("-");
    const fileName = `${formattedDate}_department_${type}_${startDateFormatted}_${endDateFormatted}.docx`;
    let blob = await handleReportPost(type, finalReportData);
    console.log("Receieved blob: ", blob);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleOnClickNextStep = () => {
    // find the index of next step which is not completed excluding the current step
    const nextStep = steps.findIndex(
      (step, index) => !completed[step] && index !== activeStep
    );

    // call handleOnClickStep with the next step
    handleOnClickStep(nextStep);
  };
  const handleOnClickStep = (step) => {
    // set disabled to false if all steps are completed
    if (completed && Object.values(completed).every((step) => step === true)) {
      setIsGenerateReportDisabled(false);
    } else {
      setIsGenerateReportDisabled(true);
    }
    // set the completed state
    setCompleted({
      ...completed,
      [steps[activeStep]]: true,
    });

    // store the selected rows in the reportData state
    setReportData({
      ...reportData,
      [steps[activeStep]]: state.selectedRows,
    });

    if (step === -1) {
      return;
    }
    setActiveStep(step);
  };

  useEffect(() => {
    if (!isLoading) {
      // set steps to the key of the first object in the array
      // select the rows for the next step as stored in the reportData state

      // if all the rows are selected, select all checkbox should be checked
      if (steps) {
        dispatch({
          type: "SELECT_ALL_ROWS",
          payload: {
            selectAll: false,
          },
        });
        // map the selected rows for the next step
        reportData[steps[activeStep]].map((id) => {
          dispatch({
            type: "SET_ROW_TRUE",
            payload: {
              id: id,
            },
          });
        });
        if (
          reportData[steps[activeStep]].length ===
          data.data[steps[activeStep]].length
        ) {
          dispatch({
            type: "SET_SELECT_ALL_TRUE",
          });
        }
      }
      console.log("data", data.data);
      console.log("data", data);
      setSteps(Object.keys(data.headings));
      // set the completed state
      if (!completed) {
        setCompleted(
          Object.keys(data.headings).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {})
        );
        setReportData(
          Object.keys(data.headings).reduce((acc, key) => {
            acc[key] = [];
            return acc;
          }, {})
        );
      }
      // console.log("Object.keys(data.data)", Object.keys(data.data));

      // set table data based on active step : data.attributes[activeStepValue] and data.data[activeStepValue]
      // console.log(
      //   "data.attributes[Object.keys(data.data)[activeStep]]",
      //   data.attributes[Object.keys(data.data)[activeStep]]
      // );
      dispatch({
        type: "FETCH_DETAILS_SUCCESS",
        payload: {
          tableHeader: data?.headings[Object.keys(data?.data)[activeStep]],
          tableData: data?.data[Object.keys(data?.data)[activeStep]],
          tableAttribute: data?.attributes[Object.keys(data?.data)[activeStep]],
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
  }, [data, activeStep]);

  return (
    <>
      <Head>
        <title>Reports - Department Database</title>
        <meta name="description" content="Reports" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="grid grid-cols-5 gap-4 min-h-screen py-2">
        <div className="col-span-4">
          <div className="mb-3 px-2 font-medium text-primary-400 text-4xl">
            <div className="flex flex-row justify-between">
              <div>{props.heading}</div>
              <div>
                {props.isTopIcon && (
                  <div className="flex flex-row gap-2">
                    <Link href={props.topIconLink}>
                      <ButtonPrimary
                        style={
                          "inline-flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        }
                        disabled={isGenerateReportDisabled}
                        onClick={handleOnClickGenerateReport}
                      >
                        <BiFileBlank style={ICON_STYLE} />
                        Generate Report
                      </ButtonPrimary>
                    </Link>
                    <ButtonAlternative
                      onClick={handleOnClickNextStep}
                      style={"inline-flex gap-2 items-center"}
                    >
                      {/* if all steps are completed, then the show done icon */}
                      {isGenerateReportDisabled ? (
                        <>
                          Save & Next
                          <FiChevronRight style={ICON_STYLE} />
                        </>
                      ) : (
                        <>
                          Save
                          <FiCheck style={ICON_STYLE} />
                        </>
                      )}
                    </ButtonAlternative>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Table
            tableRowClickUrl={handleOnClickRowUrl}
            haveOptions={false}
            actions={false}
            haveSearch={false}
            haveCheckbox={true}
            onCheckboxChange={handleOnChangeCheckbox}
          />
        </div>
        <div className="col-start-5 col-span-1">
          <Steps
            handleStepClick={handleOnClickStep}
            activeStep={activeStep}
            steps={
              steps &&
              steps.map((key, index) => ({
                // title: `Step ${index + 1}`,
                title: splitIfUnderscore(key),
                description: key,
                status:
                  // BASED ON COMPLETED STATE
                  completed[key]
                    ? "done"
                    : activeStep === index
                    ? "current"
                    : "todo",
              }))
            }
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // get the session and print
  const session = await getSession(context);
  const userGroup = session.user.user.groups[0];

  // if the user is not in the admin group, redirect to home page
  if (userGroup !== STAFF) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // return the report data
  return {
    props: {
      heading: "Reports",
    },
  };
}

Reports.auth = true;
Reports.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>
        <TableProvider>{page}</TableProvider>
      </Navbar>
    </NavbarProvider>
  );
};
