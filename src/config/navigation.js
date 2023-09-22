// import { BiHomeAlt } from "react-icons/bi";
import { BiBarChartSquare, BiHomeAlt } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { FaClipboardList, FaPlane } from "react-icons/fa";
import {
  FaList,
  FaBook,
  FaProjectDiagram,
  FaTrophy,
  FaEnvelope,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

export const commonRoutes = [
  {
    name: "Home",
    href: "/",
    isCurrent: false,
    icon: BiHomeAlt,
  },
  // {
  //   name: "About Us",
  //   href: "/aboutUs",
  //   isCurrent: false,
  //   icon: FaList,
  // },
];

export const commonRoutesBelow = [
  {
    name: "Contact Us",
    href: "/contactUs",
    isCurrent: false,
    icon: FaEnvelope,
  },
];

const navigation = {
  Student: [
    // {
    //   name: "Dashboard",
    //   href: "/profile",
    //   isCurrent: true,
    //   icon: BiHomeAlt,
    // },
    // {
    //   name: "Requests",
    //   href: "/",
    //   isCurrent: false,
    //   icon: FaList,
    // },
    {
      name: "Publications",
      href: "/publications",
      isCurrent: false,
      icon: FaBook,
    },
    // {
    //   name: "Projects",
    //   href: "/projects",
    //   isCurrent: false,
    //   icon: FaProjectDiagram,
    // },
    {
      name: "Achievements",
      href: "/achievements",
      isCurrent: false,
      icon: FaTrophy,
    },
    {
      name: "Events",
      href: "/events",
      isCurrent: false,
      icon: BsFillCalendarEventFill,
    },
    {
      name: "Visits",
      href: "/visits",
      isCurrent: false,
      icon: FaPlane,
    },
  ],
  Faculty: [
    {
      name: "Publications",
      href: "/publications",
      isCurrent: false,
      icon: FaBook,
    },
    {
      name: "Projects",
      href: "/projects",
      isCurrent: false,
      icon: FaProjectDiagram,
    },
    {
      name: "Achievements",
      href: "/achievements",
      isCurrent: false,
      icon: FaTrophy,
    },
    {
      name: "Events",
      href: "/events",
      isCurrent: false,
      icon: BsFillCalendarEventFill,
    },
    {
      name: "Visits",
      href: "/visits",
      isCurrent: false,
      icon: FaPlane,
    },

    // {
    //   name: "Contact Us",
    //   href: "/contactUs",
    //   isCurrent: false,
    //   icon: FaEnvelope,
    // },
  ],
  Staff: [
    {
      name: "Publications",
      href: "/publications",
      isCurrent: false,
      icon: FaBook,
    },
    {
      name: "Projects",
      href: "/projects",
      isCurrent: false,
      icon: FaProjectDiagram,
    },
    {
      name: "Achievements",
      href: "/achievements",
      isCurrent: false,
      icon: FaTrophy,
    },
    {
      name: "Events",
      href: "/events",
      isCurrent: false,
      icon: BsFillCalendarEventFill,
    },
    {
      name: "Visits",
      href: "/visits",
      isCurrent: false,
      icon: FaPlane,
    },
    {
      name: "Batch",
      href: "/batch",
      isCurrent: false,
      icon: FaClipboardList,
    },
    {
      name: "Research Labs",
      href: "/research_labs",
      isCurrent: false,
      icon: FaClipboardList,
    },
    {
      name: "Department",
      href: "/department",
      isCurrent: false,
      icon: FaClipboardList,
    },
    {
      name: "Reports",
      href: "/reports",
      isCurrent: false,
      icon: BiBarChartSquare,
    },
    {
      name: "Users",
      href: "/users",
      isCurrent: false,
      icon: FiUsers,
    },
  ],
};

export default navigation;
