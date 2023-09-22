import { useNotification } from "@/services/DataFetch";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import Link from "next/link";
import {
  NOTIFICATION_DROPDOWN_ITEM_IMAGE_CLASS,
  NOTIFICATION_DROPDOWN_ITEM_IMAGE_HEIGHT,
  NOTIFICATION_DROPDOWN_ITEM_IMAGE_WIDTH,
  NOTIFICATION_DROPDOWN_TITLE,
  NUMBER_OF_NOTIFICATIONS_TO_SHOW,
  NOTIFICATION_DROPDOWN_INTERVAL,
  NOTIFICATION_DROPDOWN_BROADCAST,
} from "@/config/Notification";
import { RiAddLine } from "react-icons/ri";
import { ICON_STYLE } from "@/config/Icon/IconStyle";
import { UserInfoContext } from "@/context/UserInfo";
import { STAFF } from "@/constants/roles";
import CreateNotification from "../Modal/CreateNotification";
import { FaTimes } from "react-icons/fa";
import ButtonPrimary from "../elements/Button/ButtonPrimary";
import { useTransition, animated } from "react-spring";

function PostItem({ post }) {
  const [timeAgo, setTimeAgo] = useState("Recently");
  useEffect(() => {
    const interval = setInterval(() => {
      const parsedDate = parseISO(post.created_at);
      const elapsed = formatDistanceToNow(parsedDate, { addSuffix: true });
      setTimeAgo(elapsed);
    }, NOTIFICATION_DROPDOWN_INTERVAL);
    return () => clearInterval(interval);
  }, [post.created_at]);
  return <div>{timeAgo}</div>;
}

const Notification = ({ isOpened, isModalOpen, setIsModalOpen }) => {
  const imageSrc = "/profile.png";
  const [notifications, setNotifications] = useState([]);
  const { userInfo } = useContext(UserInfoContext);
  const [timeAgo, setTimeAgo] = useState("none");
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [notificationType, setNotificationType] =
    useState("user_notifications");

  const { data, errors, mutate } = useNotification();
  useEffect(() => {
    const fetchDetails = async () => {
      // reverse the array to show the latest notification first
      if (data["user_notifications"]) {
        if (notificationType === "user_notifications") {
          const userNotifications = data["user_notifications"];
          // sort the notifications based on the created_at field
          userNotifications.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setNotifications(userNotifications ?? []);
        } else {
          const broadcastNotifications = data["broadcast_notifications"];
          // sort the notifications based on the created_at field
          broadcastNotifications.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          broadcastNotifications.reverse();
          setNotifications(broadcastNotifications ?? []);
        }
      }
    };
    fetchDetails();
  }, [data]);

  const handleNotificationType = (type) => {
    setNotificationType(type);
    if (type === "user_notifications") {
      setNotifications(data["user_notifications"] ?? []);
    } else {
      setNotifications(data["broadcast_notifications"] ?? []);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/notifications/id/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate();
    }
  };

  // refresh the notification when the dropdown is opened
  useEffect(() => {
    if (isOpened) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  useEffect(() => {
    if (userInfo && userInfo.first_name) {
      const userRole = userInfo.groups[0];
      if (userRole === STAFF) {
        setShowCreateButton(true);
      }
    }
  }, [userInfo]);

  const transitions = useTransition(notifications, {
    keys: (item) => item.id,
    trail: 10 / notifications.length,
    from: { opacity: 0, y: 200 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20, height: 0 },
  });

  return (
    <>
      <div>
        {/* Dropdown menu */}
        <div
          id="dropdownNotification"
          className={`${
            !isOpened ? "absolute" : "hidden"
          } absolute top-10 right-10 w-96  max-w-sm bg-background-100 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700`}
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => handleNotificationType("user_notifications")}
              className={`block px-4 py-2 font-medium text-center  rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700 cursor-pointer ${
                notificationType === "user_notifications"
                  ? "bg-primary-200 text-white dark:bg-gray-700 hover:text-black"
                  : "text-gray-700"
              }`}
            >
              {NOTIFICATION_DROPDOWN_TITLE}
            </button>
            <button
              onClick={() => handleNotificationType("broadcast_notifications")}
              className={`block px-4 py-2 font-medium text-center  rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700 cursor-pointer ${
                notificationType === "broadcast_notifications"
                  ? "bg-primary-200 text-white dark:bg-gray-700 hover:text-black"
                  : "text-gray-700"
              }`}
            >
              {NOTIFICATION_DROPDOWN_BROADCAST}
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {transitions((style, notification) => (
              <animated.div
                key={notification.id}
                style={style}
                className="flex px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {/* {notifications.map((notification) => (
              <Link
                key={notification.id}
                href="#"
                className="flex px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700"
              > */}
                <div className="flex-shrink-0">
                  <Image
                    className={NOTIFICATION_DROPDOWN_ITEM_IMAGE_CLASS}
                    width={NOTIFICATION_DROPDOWN_ITEM_IMAGE_WIDTH}
                    height={NOTIFICATION_DROPDOWN_ITEM_IMAGE_HEIGHT}
                    src={imageSrc}
                    alt="Jese image"
                  />
                  <div className="relative flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                    <svg
                      className="w-3 h-3 text-white"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                </div>

                <div key={notification.id} className="w-full pl-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    {notification.notification}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    <PostItem key={notification.id} post={notification} />
                  </div>
                </div>
                <span
                  className={`${
                    notificationType !== "user_notifications"
                      ? "hidden"
                      : "block"
                  }`}
                  onClick={() => handleDelete(notification.id)}
                >
                  <FaTimes className="text-gray-600 ml-4 hover:text-gray-800 dark:hover:text-gray-300 hover:scale-125 transform transition-all duration-300 cursor-pointer" />
                </span>
              </animated.div>
            ))}
          </div>
          {/* <!-- View all button --> */}
          {showCreateButton && (
            <button
              href="#"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className=" flex items-center justify-center w-full py-2 text-sm font-medium text-center active:bg-gray-300 dark:active:bg-gray-700text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              <div className="inline-flex items-center ">
                <RiAddLine style={ICON_STYLE} />
                Create Broadcast Notification
              </div>
            </button>
          )}
          {/* <!-- Create notification button --> */}
        </div>
      </div>
    </>
  );
};

export default Notification;
