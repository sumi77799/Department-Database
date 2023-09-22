import capitalizeFirstLetter from "@/utils/common/capitalize";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const BreadcrumbItem = ({ children, active, ...props }) => {
  children = capitalizeFirstLetter(children);
  return (
    <li
      className={`inline-flex items-center ${
        active ? "font-medium text-grayShade-200" : "text-primary-200"
      }`}
    >
      <MdOutlineKeyboardArrowRight className="w-5 h-5 text-primary-200" />
      {active ? (
        <span>{children}</span>
      ) : (
        <>
          <Link
            href={props.href}
            className="inline-flex items-center text-sm font-medium text-primary-200 hover:text-primary-300 "
          >
            {children}
          </Link>
        </>
      )}
    </li>
  );
};

export default BreadcrumbItem;
