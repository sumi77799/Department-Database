import Link from "next/link";
import { HiHome } from "react-icons/hi";

const Breadcrumb = ({ children, ...props }) => {
  return (
    <div className="px-4">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href={props.href}
            className="inline-flex items-center text-sm font-medium text-primary-200 hover:text-primary-300 "
          >
            <HiHome className="w-5 h-5 mr-1" />
            Home
          </Link>
        </li>

        {/* Children are the BreadcrumbItems */}
        {children}
      </ol>
    </div>
  );
};

export default Breadcrumb;
