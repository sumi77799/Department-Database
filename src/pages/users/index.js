import FileUploadUsers from "@/components/FileUploadUsers/FileUploadUsers";
import Modal from "@/components/Modal/Modal";
import { STAFF } from "@/constants/roles";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import TableProvider from "@/context/Table/TableContext";
import Navbar from "@/layout/Navbar";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const typesOfUsers = ["Student", "Faculty", "Staff"];
const caveats = {
  Student: [
    "The file should be in .csv format",
    "The 'degree' field should be one of: 'ug', 'pg', 'phd'",
  ],
  Faculty: [
    "The file should be in .csv format",
    "The 'designation' field should be one of: 'Assistant Professor', 'Associate Professor', 'Professor'",
    "The 'is_doctorate' field should be one of: 'true', 'false'",
  ],
  Staff: [
    "The file should be in .csv format",
    "The 'staff_type' field should be one of: 'Technical Staff', 'Administrative Staff'",
  ],
};
export default function Index() {
  const router = useRouter();
  const [toggleStates, setToggleStates] = useState({
    Student: "hidden",
    Faculty: "hidden",
    Staff: "hidden",
  });

  const handleOnClickUser = (type) => {
    setToggleStates({
      ...toggleStates,
      [type]: toggleStates[type] === "hidden" ? "" : "hidden",
    });
  };

  return (
    <>
      <Head>
        <title>Users - Department Database</title>
        <meta name="description" content="Reports" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Index</h1>
        {/* like to bog and dinfo report */}
        <div className="flex flex-col space-y-4">
          {typesOfUsers.map((type) => (
            <div key={type}>
              <div
                onClick={() => {
                  handleOnClickUser(type);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                {type}
              </div>
              <FileUploadUsers
                heading={type + " Details Upload"}
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
                type={type}
                caveats={caveats[type]}
              />
            </div>
          ))}
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

Index.auth = true;
Index.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>
        <TableProvider>{page}</TableProvider>
      </Navbar>
    </NavbarProvider>
  );
};
