import Link from "next/link";

import SingleInput from "@/components/common/input/SingleInput";
import OtpInput from "@/components/common/input/OtpInput";
import inputTypes from "@/constants/inputTypes";
import Spinner from "@/components/elements/Spinner";

export default function Home({
  Heading,
  SubHeading,
  ButtonText,
  ButtonAction,
  SecondButtonText,
  SecondButtonText2,
  SecondButtonLink,
  SecondButtonAction,
  inputRef,
  inputType,
  isLoader,
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>{Heading}</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{SubHeading}</p>
            </div>
          </div>

          <div>
            <form onSubmit={ButtonAction}>
              <div className="flex flex-col space-y-16">
                {/* Input fields */}
                {inputType === inputTypes.SINGLE_INPUT && (
                  <SingleInput inputRef={inputRef} />
                )}
                {inputType === inputTypes.OTP_INPUT && (
                  <OtpInput inputRef={inputRef} />
                )}

                {/* buttons */}
                <div className="flex flex-col space-y-5">
                  {/* primary button */}
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      {isLoader && <Spinner />}
                      {ButtonText}
                    </button>
                  </div>
                  {/* secondary button */}
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>{SecondButtonText}</p>
                    <Link
                      className="flex flex-row items-center text-blue-600"
                      href={SecondButtonLink}
                      onClick={SecondButtonAction}
                    >
                      {SecondButtonText2}
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
