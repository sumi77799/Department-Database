import Head from "next/head";
import { useContext, useRef, useState } from "react";

import LoginForm from "@/components/pages/login/Loginform";

import { OTP_INPUT } from "@/constants/inputTypes";
import {
  NEXT_EMAIL,
  NEXT_OTP,
  REGISTER,
  RESEND_OTP,
} from "@/constants/endPoints";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { ToastContext } from "@/context/Toast/ToastContext";

export default function Home() {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  // input ref is a array of refs for each input otp
  const inputRef = useRef([]);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otp = inputRef.current.map((ref) => ref.value).join("");
    // console.log(otp);

    const email = router.query.email;
    // console.log(email);

    signIn("otpcustom", {
      email: email,
      password: otp,
      callbackUrl: "/publications",
    });

    // showToast({ message: "OTP verified successfully", type: "success" });
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = router.query.email;
    // email should be valid using regex

    if (email.match(/\S+@iitrpr\.ac\.in$/) === null) {
      showToast({ type: "error", message: "Email is not from iitrpr domain" });
      setLoading(false);
      return;
    }

    const res = await fetch(NEXT_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (res.status !== 200) {
      showToast({ type: "error", message: data.error });
      // redirect to login page
      router.push({
        pathname: REGISTER,
      });
    } else {
      showToast({ type: "success", message: data.message });
    }
    setLoading(false);
  };

  const props = {
    Heading: "Verify OTP",
    SubHeading: "We have sent you an OTP on your email",
    ButtonText: loading ? "Verifying..." : "Verify OTP",
    SecondButtonText: "Didn't get OTP?",
    SecondButtonText2: "Resend OTP",
    SecondButtonLink: RESEND_OTP,

    isLoader: loading,
    inputRef: inputRef,
    inputType: OTP_INPUT,
    ButtonAction: onSubmit,
    SecondButtonAction: resendOtp,
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LoginForm {...props} />
    </>
  );
}

export async function getServerSideProps(context) {
  // get the session and print
  const session = await getSession(context);

  // if session is not null then redirect to home page
  // if (session?.user?.user) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      session,
    },
  };
}
