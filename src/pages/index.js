import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { LOGIN } from "@/constants/endPoints";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/publications");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>Home Page</div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    // redirect to profile page
    const { user } = session;
    const username = user.user.username;
    return {
      redirect: {
        destination: `/profile/${username}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

// * sample make it protected route
// Home.auth = {
//     protected: true,
//     role: "admin",
//     redirect: true,
//     url: LOGIN,
//     message: "You are not logged in",
//     loadingSkeleton: true
// }
