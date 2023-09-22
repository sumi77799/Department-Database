import { BiHomeAlt } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import {
  FaList,
  FaBook,
  FaProjectDiagram,
  FaTrophy,
  FaEnvelope,
} from "react-icons/fa";

const initialState = [
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
  // {
  //   name: "Contact Us",
  //   href: "/contactUs",
  //   isCurrent: false,
  //   icon: FaEnvelope,
  // },
];

const NavbarReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAVBAR":
      return action.payload;

    case "SET_CURRENT":
      return state.map((item) => {
        if (item.href === action.payload.href) {
          return {
            ...item,
            isCurrent: true,
          };
        } else {
          return {
            ...item,
            isCurrent: false,
          };
        }
      });

    case "SET_CURRENT_BY_NAME":
      return state.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            isCurrent: true,
          };
        } else {
          return {
            ...item,
            isCurrent: false,
          };
        }
      });

    default:
      throw new Error("Unexpected action type in NavbarReducer.js");
  }
};

export default NavbarReducer;
export { initialState };
