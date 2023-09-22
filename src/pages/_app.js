import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ProtectedRoutes from "@/components/pages/ProtectedRoutes";
import ToastProvider from "@/context/Toast/ToastContext";
import Toast from "@/components/Toast/Toast";
import UserInfoProvider from "@/context/UserInfo";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <UserInfoProvider>
          <ToastProvider>
            <Toast />
            {Component.auth ? (
              <ProtectedRoutes redirectInfo={Component.auth}>
                {getLayout(<Component {...pageProps} />)}
              </ProtectedRoutes>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </ToastProvider>
        </UserInfoProvider>
      </SessionProvider>
    </main>
  );
}
