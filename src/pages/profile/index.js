import Table from "@/components/Table/Table";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import TableProvider, { TableContext } from "@/context/Table/TableContext";
import Navbar from "@/layout/Navbar";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { getSession } from "next-auth/react";
import { DJANGO_BASE_URL } from "@/constants/endPoints";

export default function AllUsers({ data }) {
  const { dispatch } = useContext(TableContext);

  const props = {
    heading: `All Users`,
    isTopIcon: false,
    topIconLink: ``,
  };

  const handleOnClickRowUrl = (id) => {
    const username = data?.filter((user) => user.id === id)[0]?.username;
    return `/profile/${username}`;
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_DETAILS_SUCCESS",
      payload: {
        tableHeader: ["", "First Name", "Last Name", "Email", "Username"],
        tableData: data,
        tableAttribute: [
          "profile_image",
          "first_name",
          "last_name",
          "email",
          "username",
        ],
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title> All Users | IITRPR </title>
        <meta name="description" content="AllUsers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col w-full h-full">
        <div className="mb-3 px-2 font-medium text-primary-400 text-4xl">
          <div className="flex flex-row justify-between">
            <div>{props.heading}</div>
          </div>
        </div>
        <Table
          tableRowClickUrl={handleOnClickRowUrl}
          haveOptions={false}
          actions={false}
          haveSearch={true}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // get the session and print
  const session = await getSession(context);
  const userGroup = session.user.user.groups[0];
  const token = session.user.access;

  // if the user is not in the admin group, redirect to home page
  if (!userGroup) {
    return {
      notFound: true,
    };
  }

  const data = await fetch(`${DJANGO_BASE_URL}/user/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data.status, token, session, userGroup);
  if (data.status !== 200) {
    return {
      notFound: true,
    };
  }

  const users = await data.json();

  return {
    props: {
      data: users.map((user) => ({
        profile_image: user.profile_image,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        id: user.id,
      })),
    },
  };
}

AllUsers.auth = true;
AllUsers.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>
        <TableProvider>{page}</TableProvider>
      </Navbar>
    </NavbarProvider>
  );
};
