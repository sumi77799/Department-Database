import ButtonAlternative from "@/components/elements/Button/ButtonAlternative";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import NavTabs from "@/components/HeaderTabs/NavTabs";
import { ICON_STYLE } from "@/config/Icon/IconStyle";
import { UserInfoContext } from "@/context/UserInfo";
import capitalizeFirstLetter from "@/utils/common/capitalize";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";

import FileUpload from "@/components/Forms/FileUplaod/FileUpload";
import userTabs from "../config/userRoutes";
import { STAFF } from "@/constants/roles";
import { STAFF_BUTTON_ACCESS } from "@/config/TableLayout/ButtonAccess";

export default function TableLayout({ children }) {
  const { userInfo } = useContext(UserInfoContext);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");
  const [tabs, setTabs] = useState([]);

  const resources = router.query.resources ?? "publications";
  const [toggle, setToggle] = useState("hidden");
  const IconStyle = {
    ...ICON_STYLE,
  };

  const [haveButton, setHaveButton] = useState(false);
  const [haveUploadButton, setHaveUploadButton] = useState(false);

  const props = {
    heading: capitalizeFirstLetter(resources),
    isTopIcon: haveButton,
    topIconLink: `/${resources}/new`,
  };
  const handleOnClickUpload = () => {
    //if hidden then show and vice versa
    toggle === "hidden" ? setToggle("") : setToggle("hidden");
    console.log("Toggle: ", toggle);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // change router params using next router shallow routing
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    // set active
    const tab = router.query.tab ?? "Active";
    setActiveTab(tab);

    if (!router.query.tab) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, tab },
        },
        undefined,
        { shallow: true }
      );
    }
    if (userInfo.first_name) {
      const userRole = userInfo.groups[0];
      if (userRole !== STAFF) {
        setHaveUploadButton(true);
        setHaveButton(true);
      } else {
        setHaveUploadButton(false);
        if (STAFF_BUTTON_ACCESS.includes(resources)) {
          setHaveButton(true);
        } else {
          setHaveButton(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  useEffect(() => {
    if (userInfo.first_name) {
      const userRole = userInfo.groups[0];
      setTabs(userTabs[userRole]);
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen py-2 px-1">
        <div className="mt-4 w-11/12">
          <div className="mb-3 font-medium text-primary-400 text-4xl">
            <div className="flex flex-row justify-between">
              <div>{props.heading}</div>
              <div>
                {props.isTopIcon && (
                  <div className="flex flex-row gap-2">
                    {haveUploadButton && (
                      <Link href="#">
                        <ButtonAlternative
                          onClick={handleOnClickUpload}
                          style={"inline-flex gap-2 items-center"}
                        >
                          <SlCloudUpload style={IconStyle} />
                          Upload
                        </ButtonAlternative>
                      </Link>
                    )}

                    <Link href={props.topIconLink}>
                      <ButtonPrimary style={"inline-flex gap-2 items-center"}>
                        <RiAddLine style={IconStyle} />
                        Add
                      </ButtonPrimary>
                    </Link>
                    <FileUpload toggle={toggle} setToggle={setToggle} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <NavTabs
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            tabs={tabs}
          />
          {children}
        </div>
        {/* <FillForm displayItems={displayitems} /> */}
      </div>
    </>
  );
}
