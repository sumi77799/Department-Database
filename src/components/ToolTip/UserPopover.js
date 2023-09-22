import { DJANGO_BASE_URL } from "@/constants/endPoints";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useSpring, animated } from "react-spring";

const UserPopover = ({ key, user, children, toShow = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true && toShow);
  };

  const handleMouseLeave = () => {
    setIsOpen(false && toShow);
  };

  // Define the animated styles for the popover
  const popoverStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transform: isOpen ? "translate3d(0,20px,0)" : "translate3d(0,-20px,0)",
    config: { duration: 100 },
  });

  return (
    <div
      className="relative inline-block text-left"
      key={user.email}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <animated.div
        data-popover
        id="popover-user-profile"
        role="tooltip"
        style={popoverStyles}
        className={`absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600`}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/profile/${user.username}`} target="_blank">
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                src={user.profile_image ?? "/images.jpg"}
                alt="Jese Leos"
              />
            </Link>
            <div>
              <Link
                href={`/profile/${user.username}`}
                target="_blank"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Open profile
              </Link>
            </div>
          </div>
          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <Link
              href={`/profile/${user.username}`}
              target="_blank"
              className="hover:underline"
            >
              {user.first_name} {user.last_name}
            </Link>
          </p>
          <p className="mb-3 text-sm font-normal">
            <Link
              href={`/profile/${user.username}`}
              target="_blank"
              className="hover:underline"
            >
              @{user.username}
            </Link>
          </p>
          <p className="mb-4 text-sm">
            {user.first_name} {user.last_name} is a {user.user_type} at{" "}
            <Link
              href="https://www.iitrpr.ac.in/"
              target="_blank"
              className="hover:underline"
            >
              IIT Ropar
            </Link>
            .
          </p>
          <ul className="flex text-sm">
            {/* email */}
            <li className="mr-3">
              <Link
                href={`mailto:${user.email}`}
                className="flex items-center text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <HiOutlineMail className="w-5 h-5 mr-1" />
                {user.email}
              </Link>
            </li>
          </ul>
        </div>
        <div data-popper-arrow />
      </animated.div>
    </div>
  );
};

export default UserPopover;
