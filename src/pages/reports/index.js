import NavTabs from "@/components/HeaderTabs/NavTabs";
import Modal from "@/components/Modal/Modal";
import { STAFF } from "@/constants/roles";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import TableProvider from "@/context/Table/TableContext";
import Navbar from "@/layout/Navbar";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReportHistory from "@/components/Timeline/ReportHistory";
import { useReportHistory } from "@/services/DataFetch";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import { RiAddLine } from "react-icons/ri";
import { ICON_STYLE } from "@/config/Icon/IconStyle";

export default function Index() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState("bog" || "dinfo");
  const [activeTab, setActiveTab] = useState("BOG Report");
  const [historyOfReports, setHistoryOfReports] = useState([]);
  const { data, isLoading, error } = useReportHistory(reportType);

  const handleBogReport = () => {
    setIsModalOpen(!isModalOpen);
    setReportType("bog");
  };

  const handleDinfoReport = () => {
    setIsModalOpen(!isModalOpen);
    setReportType("dinfo");
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const year = e.target.year.value;

    router.push({
      pathname: `/reports/${reportType}`,
      query: { startDate, endDate, year },
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setReportType(tab === "BOG Report" ? "bog" : "dinfo");
  };

  useEffect(() => {
    // alert("is loading: " + isLoading);
    if (data) {
      console.log("data: ", data);
      setHistoryOfReports(data);
    }
  }, [data, activeTab]);

  return (
    <>
      <Head>
        <title>Reports - Department Database</title>
        <meta name="description" content="Reports" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        {/* like to bog and dinfo report */}
        <div className="flex flex-col space-y-4">
          <Link href={"#"} className="flex flex-row-reverse">
            <ButtonPrimary
              style={"inline-flex gap-2 items-center"}
              onClick={
                reportType === "bog" ? handleBogReport : handleDinfoReport
              }
            >
              <RiAddLine style={ICON_STYLE} />
              Add New {reportType === "bog" ? "BOG" : "DINFO"} Report
            </ButtonPrimary>
          </Link>
          <NavTabs
            tabs={["BOG Report", "DINFO Report"]}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
          <div className="flex flex-col space-y-4 p-4">
            <ReportHistory data={historyOfReports.data} type={reportType} />
          </div>
          <Modal
            handleSubmit={(e) => {
              handleModalSubmit(e);
            }}
            isModalOpen={isModalOpen}
            title={`Add New ${reportType === "bog" ? "BOG" : "DINFO"} Report`}
            setIsModalOpen={setIsModalOpen}
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

Index.auth = {
  role: [STAFF],
};
Index.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>
        <TableProvider>{page}</TableProvider>
      </Navbar>
    </NavbarProvider>
  );
};
