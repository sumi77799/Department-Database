import { UserInfoContext } from "@/context/UserInfo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PageLoader from "./PageLoader";

export default function Home({ redirectInfo, children }) {
  // TODO: redirectInfo : {redirect: "/", message: "You are not logged in",role: "admin",loadingSkeleton: true}
  const router = useRouter();
  const { data: session, status } = useSession();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { userToken, setUserToken } = useContext(UserInfoContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (
        redirectInfo?.role &&
        redirectInfo?.role.includes(session.user.user.groups[0]) === false
      ) {
        if (redirectInfo.redirect) {
          router.push(redirectInfo.redirect);
        } else {
          router.back();
        }
      }
      setUserInfo(session.user.user);
      setUserToken(session.user.access);
    }
    if (status === "loading") {
      setLoading(true);
      // set timeout to prevent loading skeleton from showing up
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectInfo, session, status]);

  if (status === "loading" || loading) {
    return <PageLoader />;
  }

  if (status === "unauthenticated") {
    // redirect to login page with callback url
    router.push({
      pathname: "/login/getOtp",
      query: { callbackUrl: router.asPath },
    });

    return (
      <div>
        <h1>You are not logged in</h1>
        <Link href={"/login/getOtp"}> Login </Link>
      </div>
    );
  }

  if (status === "authenticated") {
    return children;
  }

  // return null;
  return null;
}
