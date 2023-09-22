import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Department Database</title>
        <meta name="description" content="Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <div className="text-center">
          <p className="text-2xl mb-4">
            The page you are looking for does not exist.
          </p>
          <Link href="/" className="text-red-500 hover:text-red-700">
            Go back to home
          </Link>
        </div>
      </div>
    </>
  );
}
