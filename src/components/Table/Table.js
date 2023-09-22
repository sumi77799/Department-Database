import Search from "./Search";
import { useTransition, animated } from "react-spring";

// icons
import Checkbox from "../elements/Checkbox";
import { TableContext } from "@/context/Table/TableContext";
import { useContext, useEffect, useState } from "react";
import splitIfUnderscore from "@/utils/common/split";
import TableSkeleton from "@/skeletons/TableSkeleton";
import SearchSkeleton from "@/skeletons/SearchSkeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import {
  SEARCH_FIELDS,
  SEARCH_MATCHING_THRESHOLD,
} from "@/config/searchHeader";
import { ICON_STYLE } from "@/config/Icon/IconStyle";
import { TITLE_TRIM_LENGTH } from "@/config/Table/Table";
import ToolTip from "../ToolTip/ToolTip";
import Image from "next/image";
import Tag from "../elements/Button/Tag";
import Select from "../Forms/Select";
import Datepicker from "react-tailwindcss-datepicker";

const Table = ({
  haveOptions,
  actions,
  tableRowClickUrl,
  haveSearch,
  haveCheckbox,
  onCheckboxChange,
  dateValue,
  handleDateChange,
  handleFilterChange,
  dateFilterType,
  haveShowSelect,
  haveFilterDate,
}) => {
  const { state } = useContext(TableContext);
  const router = useRouter();
  const { resources } = router.query;
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableAttributes, setTableAttributes] = useState([]);
  const [tableContents, setTableContents] = useState([]);

  const getNameForField = (attribute, content, isTooltip) => {
    if (
      attribute === "title" ||
      attribute === "name" ||
      attribute === "created_by"
    ) {
      if (isTooltip) {
        return content[attribute];
      }
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Image
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
              src={"/profile.png"}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline active:text-blue-800 ">
              {content[attribute] &&
              content[attribute].length > TITLE_TRIM_LENGTH
                ? content[attribute].substring(0, TITLE_TRIM_LENGTH) + "..."
                : content[attribute]}
            </div>
            <div className="text-sm text-gray-500">
              {content["created_by"] ?? "NA"}
            </div>
          </div>
        </div>
      );
    } else if (attribute === "field_tags" || attribute === "tags") {
      if (attribute === "tags") {
        const Tags = content[attribute].split(",").map((tag, index) => {
          return <Tag text={tag} key={tag} />;
        });
        return Tags;
      }
      return (
        // <div className="flex">
        <>
          {content[attribute] && content[attribute].length > 0
            ? content[attribute].map((tag) => <Tag key={tag} text={tag} />)
            : "NA"}
          {/* </div> */}
        </>
      );
    } else if (attribute === "profile_image") {
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Image
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
              src={content[attribute] ?? "/profile.png"}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline active:text-blue-800 ">
              {content["username"] ?? "NA"}
            </div>
            <div className="text-sm text-gray-500">
              {content["email"] ?? "NA"}
            </div>
          </div>
        </div>
      );
    }
    return content[attribute] ?? "NA";
  };
  const displayOptions = (haveOptions, content) => {
    if (haveOptions) {
      return (
        <td className="flex flex-row gap-1 px-4">
          {actions &&
            actions.map((action) => (
              <button
                key={action.name}
                // TODO: to send id to the action
                onClick={() => action.onClick(content["id"])}
                type="button"
                id="updateProductButton"
                data-drawer-target="drawer-update-product-default"
                data-drawer-show="drawer-update-product-default"
                aria-controls="drawer-update-product-default"
                data-drawer-placement="right"
                className=" inline-flex gap-2 items-center px-3  py-2 my-2 text-sm font-medium text-center text-primary-400 rounded-lg focus:ring-4  "
              >
                <action.icon style={IconStyle} />
              </button>
            ))}
        </td>
      );
    }
    return "";
  };
  // console.log("TableComponent1 ", tableHeaders, tableContents, haveOptions,state);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setTableContents(state.tableData);
    } else {
      const options = {
        keys: SEARCH_FIELDS[resources ?? "users"],
        threshold: SEARCH_MATCHING_THRESHOLD, // Set the search threshold to a lower value for more results
      };
      const fuse = new Fuse(state.tableData, options);
      const result = fuse.search(searchTerm);
      setTableContents(result.map((item) => item.item));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, state.tableData, state.tableHeaders, state.tableAttribute]);

  useEffect(() => {
    setTableHeaders(state.tableHeader);
    setTableContents(state.tableData);
    setTableAttributes(state.tableAttribute);
  }, [state.tableHeader, state.tableData, state.tableAttribute]);

  const IconStyle = {
    ...ICON_STYLE,
  };

  const transitions = useTransition(tableContents, {
    key: (item) => item.id,
    trail: 50,
    from: { opacity: 0, y: -40 },
    enter: { opacity: 1, y: 0 },
    // tr
  });

  if (state.loading) {
    return (
      <div className="py-4 w-full overflow-x-auto sm:rounded-lg">
        <div className="mb-4">
          <SearchSkeleton />
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }
  // console.log(
  //   "TableComponent ",
  //   tableHeaders,
  //   tableContents,
  //   haveOptions,
  //   state
  // );
  return (
    // * overflow-hidden
    <div className="px-4 py-4 relative overflow-visible sm:rounded-lg">
      {haveSearch && (
        <div className="flex items-center justify-between pb-4 gap-4">
          <div className="flex items-center justify-between">
            {/* <Select /> */}
            <Search searchTerm={searchTerm} handleChange={handleChange} />
          </div>
          {/* Date filter using inputfull and inputhalf */}
          <div
            className={`flex items-center gap-4 ${
              haveFilterDate ? "block" : "hidden"
            }`}
          >
            <div
              className={`border border-gray-300 rounded-md shadow-sm ${
                haveShowSelect ? "w-2/3" : "w-full"
              }`}
            >
              <Datepicker
                value={dateValue}
                onChange={handleDateChange}
                showShortcuts={true}
                primaryColor="#0e1f40"
                placeholder="Select a date"
                separator="to"
                popoverDirection="down"
                displayFormat="DD/MM/YYYY"
              />
            </div>

            {haveShowSelect && (
              <div className={`w-1/3 ${haveShowSelect ? "block" : "hidden"}`}>
                <Select
                  label="Filter by" // published date or accepted date
                  options={[
                    { value: "published_date", label: "Published date" },
                    { value: "accepted_date", label: "Accepted date" },
                  ]}
                  name="filter"
                  value={
                    dateFilterType === "published"
                      ? "published_date"
                      : "accepted_date"
                  }
                  handlePublicationStatusChange={handleFilterChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* * overflow-hidden */}
      <table className="w-full overflow-hidden rounded-lg   text-sm text-left text-gray-500 dark:text-gray-400">
        {/* table header */}
        <thead className=" text-xs text-gray-700 uppercase bg-primary-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* checkbox */}
            {haveCheckbox && (
              <th scope="col" className="p-4">
                <Checkbox
                  onChange={() => onCheckboxChange("all")}
                  isChecked={state.selectAll}
                />
              </th>
            )}
            {/* checkbox end */}
            {tableHeaders.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {splitIfUnderscore(header)}
              </th>
            ))}
            {haveOptions && (
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            )}
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {/* {tableContents.map((content) => ( */}
          {transitions((style, content) => (
            // console.log("content", content),
            <animated.tr
              key={content.id}
              style={style}
              className="bg-white border-b hover:bg-background-100 dark:hover:bg-gray-600 "
            >
              {/* checkbox */}
              {haveCheckbox && (
                <td className="w-4 p-4">
                  <Checkbox
                    onChange={() => onCheckboxChange(content["id"])}
                    isChecked={state.selectedRows.includes(content["id"])}
                  />
                </td>
              )}
              {/* checkbox end */}
              {tableAttributes.map((attribute, index) =>
                attribute !== tableAttributes[0] ? (
                  <td key={index} className="px-3 py-4">
                    <ToolTip
                      text={getNameForField(attribute, content, true)}
                      resources={resources}
                      attribute={attribute}
                    >
                      {getNameForField(attribute, content)}
                    </ToolTip>
                  </td>
                ) : (
                  // display with link
                  <td
                    key={index}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-normal cursor-pointer hover:text-primary-400  active:text-primary-300 "
                  >
                    <ToolTip
                      text={getNameForField(attribute, content, true)}
                      resources={resources}
                      attribute={attribute}
                    >
                      <Link
                        href={tableRowClickUrl(content["id"])}
                        className="text-primary-400 active:text-primary-300 "
                        passHref
                        data-tooltip-target
                      >
                        {getNameForField(attribute, content)}
                      </Link>
                    </ToolTip>
                  </td>
                )
              )}

              {/* edit and delete buttons */}
              {displayOptions(haveOptions, content)}
            </animated.tr>
          ))}
          {/* // )
          // )} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
