import Image from "next/image";
import Link from "next/link";
// import icons from react-icons
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { signOut } from "next-auth/react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import Dropdown from "@/components/Dropdown/Dropdown";
import Notification from "@/components/Dropdown/Notification";
import { NavbarContext } from "@/context/Navbar/NavbarContext";
import { useContext } from "react";
import capitalizeFirstLetter, {
  convertToTitleCase,
} from "@/utils/common/capitalize";
import { UserInfoContext } from "@/context/UserInfo";
import navigation, {
  commonRoutes,
  commonRoutesBelow,
} from "@/config/navigation";
import { useNotification } from "@/services/DataFetch";
import { fetchAllDepartmentData } from "@/services/DataFetch";
import CreateNotification from "@/components/Modal/CreateNotification";
import { ToastContext } from "@/context/Toast/ToastContext";
import { DJANGO_BASE_URL } from "@/constants/endPoints";

export default function Navbar({ children }) {
  const { state, dispatch } = useContext(NavbarContext);
  const navItems = state;
  // console.log("navItems", navItems);
  const { userInfo } = useContext(UserInfoContext);
  const [userDepartment, setUserDepartment] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("/profile.png");
  const { showToast } = useContext(ToastContext);

  const router = useRouter();
  // get path
  const { resources, id, action } = router.query;
  const isResourcesActive = resources && !id && !action;
  const isIdActive = resources && id && !action;
  const isActionActive = resources && id && action;

  const [isOpened, setIsOpened] = useState(true);
  const [isOpenedNotification, setIsOpenedNotification] = useState(true);
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Test User",
    email: "test@iitrpr.ac.in",
  });

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    // sending
    showToast({ type: "info", message: "Sending Notifications" });
    // api/notifications/broadcast : post request

    // get data from form
    const formData = new FormData(e.target);
    const group = formData.get("group");
    // create a new object
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/notifications/broadcast", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showToast({
        type: "success",
        message: `Notification sent to all ${group}`,
      });
    } else {
      const { error } = await response.json();
      showToast({ type: "error", message: error });
    }
  };
  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const toggleNotification = () => {
    setIsOpenedNotification(!isOpenedNotification);
  };

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  const topNavItems = [
    {
      name: "Profile",
      href: "/",
      onClickFunction: () => {
        router.push("/");
        toggleSidebar();
      },
    },
    {
      name: "All Users",
      href: "/",
      onClickFunction: () => {
        router.push("/profile");
        toggleSidebar();
      },
    },
    {
      name: "Settings",
      href: "/",
      // onClickFunction: toggleSidebar,
      onClickFunction: () => {
        router.push("/");
        toggleSidebar();
      },
    },
    {
      name: "Logout",
      href: "/",
      onClickFunction: handleLogout,
    },
  ];

  const handleClick = (e, name) => {
    e.preventDefault();
    dispatch({ type: "SET_CURRENT_BY_NAME", payload: { name } });
  };

  useEffect(() => {
    if (userInfo && userInfo.first_name) {
      setUser({
        name: userInfo.first_name,
        email: userInfo.email,
      });
      // set navigation state getting from config/navbar.js based on user role
      const userRole = userInfo.groups[0];
      const navigationItems = [
        ...commonRoutes,
        ...navigation[userRole],
        ...commonRoutesBelow,
      ];

      dispatch({ type: "SET_NAVBAR", payload: navigationItems });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (resources) {
      dispatch({
        type: "SET_CURRENT_BY_NAME",
        payload: { name: convertToTitleCase(resources) },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources, userInfo]);
  // useeffect for isOpened
  const { data, errors } = useNotification();
  useEffect(() => {
    const fetchDetails = async () => {
      setNumberOfNotifications(
        data["user_notifications"] ? data["user_notifications"].length : 0
      );
    };
    fetchDetails();
  }, [isOpened, data]);

  // set navbar active based on path
  useEffect(() => {
    if (router.isReady && !resources) {
      const path = router.pathname;
      const pathArray = path.split("/");
      const pathName = pathArray[1];
      if (pathName) {
        if (pathName === "profile") {
          dispatch({
            type: "SET_CURRENT_BY_NAME",
            payload: { name: "Home" },
          });
        } else {
          dispatch({
            type: "SET_CURRENT_BY_NAME",
            payload: { name: convertToTitleCase(pathName) },
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.department) {
      const fetchDetails = async () => {
        const departmentData = await fetchAllDepartmentData();
        const department = departmentData.find(
          (department) => department.id === userInfo.department
        );
        setUserDepartment(department.code);
        if (userInfo.profile_image) {
          setUserProfileImage(`${DJANGO_BASE_URL}${userInfo.profile_image}`);
        }
      };
      fetchDetails();
    }
  }, [userInfo]);

  return (
    <div>
      <CreateNotification
        title={"Send Notification"}
        handleSubmit={handleCreateNotification}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <nav className="fixed top-0 z-10 pl-64 w-full bg-background-900 border-b border-background-100 shadow-sm">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* breadcrumb */}
              {/* TODO: default link to dashboard to be added */}
              <Breadcrumb href="#">
                {resources && (
                  <BreadcrumbItem
                    href={`/${resources}`}
                    active={isResourcesActive}
                  >
                    {resources}
                  </BreadcrumbItem>
                )}
                {id && (
                  <BreadcrumbItem
                    href={`/${resources}/${id}`}
                    active={isIdActive}
                  >
                    {id}
                  </BreadcrumbItem>
                )}
                {action && (
                  <BreadcrumbItem
                    href={`/${resources}/${id}/${action}`}
                    active={isActionActive}
                  >
                    {action}
                  </BreadcrumbItem>
                )}
              </Breadcrumb>

              {/* breadcrumb ends */}
            </div>
            {/* Top Navigation */}
            <div className="flex items-center">
              {/* notification */}
              <div className="flex items-center ml-3 transition duration-500 ease-in-out transform ">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-md focus:ring-4 focus:ring-background-800 items-center justify-center text-primary-400 hover:text-primary-300 focus:outline-none focus:ring-offset-2 focus:ring-offset-background-900"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-notification"
                    onClick={toggleNotification}
                  >
                    <span className="sr-only">Open notification menu</span>
                    <div className="relative">
                      <IoIosNotificationsOutline className="w-6 h-6" />
                      {numberOfNotifications > 0 && (
                        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                          {numberOfNotifications > 100
                            ? "99+"
                            : numberOfNotifications}
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                <Notification
                  isOpened={isOpenedNotification}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
              {/* display user name */}
              <div className="flex items-center ml-3 transition duration-500 ease-in-out transform ">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-primary-400">
                    {user.name}
                  </div>
                </div>
              </div>
              {/* display user photo and dropdown */}
              <div className="flex items-center ml-3 transition duration-500 ease-in-out transform ">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-background-100 rounded-md focus:ring-4 focus:ring-background-800 items-center justify-center text-primary-400 hover:text-primary-300 focus:outline-none focus:ring-offset-2 focus:ring-offset-background-900"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={toggleSidebar}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 h-8 rounded-md"
                      src={userProfileImage}
                      alt="user photo"
                      width={32}
                      height={32}
                    />
                    {/* DOWN ARROW */}
                    <AiFillCaretDown className="w-5 h-5 ml-2" />
                  </button>
                </div>

                {/* Dropdown */}
                <Dropdown
                  topNavItems={topNavItems}
                  user={user}
                  isOpened={isOpened}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* top nav ends */}
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="rounded-md mx-2 my-2 bg-background-100 fixed top-0 left-0 z-10 w-64 h-screen  transition-transform -translate-x-full border-r border-background-100 sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="flex flex-col pt-4 font-bold">
          <div className="text-primary-200 text-center text-3xl flex items-center justify-center ">
            Department Database
          </div>
        </div>
        {/* Display userDepartment */}
        <div className="flex flex-col pt-4 font-bold">
          <div className="text-primary-200 text-center text-3xl flex items-center justify-center ">
            {userDepartment && userDepartment}
          </div>
        </div>

        <div className="flex pt-1 h-full px-6 pb-32 overflow-y-auto items-center ">
          <ul className="space-y-2 text-grayShade-200">
            {/* code */}
            {navItems.map((item) => (
              <li
                key={item.name}
                className={
                  item.isCurrent ? "bg-background-900 rounded-lg shadow" : ""
                }
                onClick={(e) => handleClick(e, item.name)}
              >
                <Link
                  href={item.href}
                  className={`transition duration-500 ease-out flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-background-800 hover:text-primary-200  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition duration-75   dark:group-hover:text-white ${
                      item.isCurrent ? "text-primary-300" : ""
                    }`}
                  />
                  <span
                    className={`ml-2 font-semibold ${
                      item.isCurrent ? "text-primary-400" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}

            {/* <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 "
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75   dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">{children}</div>
      </div>
    </div>
  );
}
