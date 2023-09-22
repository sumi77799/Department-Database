import React, { useEffect, useContext } from "react";
import Dropdown from "./DropDown";
import InputFull from "./InputFull";
import { useState } from "react";
import Filter from "../elements/Button/Filter";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import {
  AuthorDataContext,
  AuthorDataProvider,
} from "@/context/AuthorsData/AuthorDataContext";
import {
  DepartmentDataContext,
  DepartmentDataProvider,
} from "@/context/DepartmentData/DepartmentDataContext";
import UserPopover from "../ToolTip/UserPopover";

const SelectSearch = ({
  label,
  name,
  type,
  placeholder,
  setFormMultipleData,
  initialData,
  isDepartment,
  error,
  required,
  fieldTagsData,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleOnClick = (currentItem) => {
    // const currentItem = currentItemData.first_name;
    // const currentItemID = currentItemData.id;
    // console.log("item", currentItem);
    setSearchInput(isDepartment ? currentItem.name : currentItem.first_name);

    selectedItems.push(currentItem);
    // console.log("selectedItems--------------------------------", selectedItems);
    // console.log(
    //   "selectedItems--------------------------------",
    //   selectedItems.map((item) => item["id"])
    // );
    setFormMultipleData(selectedItems.map((item) => item.id));
    // console.log("selectedItems", selectedItems);

    // remove item from searchItems
    const newItems = searchItems.filter((item) => {
      return item.id !== currentItem.id;
    });
    // console.log("newItems", newItems);
    // console.log("oldItems", searchItems);
    // searchItems = newItems;
    setSearchItems(newItems);

    setIsOpen(false);

    // // console.log("searchInput", searchInput);
  };
  const { allAuthors } = useContext(AuthorDataContext);
  let { allDepartments } = useContext(DepartmentDataContext);
  if (fieldTagsData) {
    allDepartments = fieldTagsData;
  }
  const allData = isDepartment ? allDepartments : allAuthors;
  useEffect(() => {
    const fetchSearchItems = async () => {
      setSearchItems(allData);
      setInitialSearchItems(allData);
      // console.log("inintaadafad---------------");
      if (initialData) {
        // setFormMultipleData(initialData);
        // set selectedItems corresponding to initialData
        const newSelectedItems = allData.filter((item) =>
          initialData.includes(item.id)
        );
        // remove from searchItem if it is in selectedItems
        const newSearchItems = allData.filter(
          (item) => !initialData.includes(item.id)
        );
        setSearchItems(newSearchItems);
        console.log("newSelectedItems---------------", newSelectedItems);
        setSelectedItems(newSelectedItems);
      }
    };
    fetchSearchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, allData]);
  // useEffect(() => {
  //   console.log("selectedItems", selectedItems);
  // }, [initialData]);

  const [initialSearchItems, setInitialSearchItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchItems, setSearchItems] = useState(initialSearchItems);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
    setIsOpen(true);
    if (searchValue === "") {
      setSearchItems(initialSearchItems);
      return;
    }
    const newItems = searchItems.filter((item) => {
      return isDepartment
        ? item.name.toLowerCase().includes(searchValue.toLowerCase())
        : item.first_name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSearchItems(newItems);
  };

  return (
    <>
      <div className="col-span-6">
        <InputFull
          label={label}
          name={name}
          value={searchInput}
          placeholder={placeholder}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          required={required}
          // onBlur={() => setIsOpen(false)}
        />
        {selectedItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedItems.map((item) => (
              <UserPopover key={item.id} user={item} toShow={!isDepartment}>
                <Filter
                  key={item.id}
                  name={isDepartment ? item.name : item.first_name}
                  text={isDepartment ? item.name : item.first_name}
                  onClick={() => {
                    // remove from selectedItems
                    const newSelectedItems = selectedItems.filter(
                      (selectedItem) => selectedItem.id !== item.id
                    );
                    setSelectedItems(newSelectedItems);
                    setFormMultipleData(
                      newSelectedItems.map((item) => item.id)
                    );
                    // add to searchItems
                    const newSearchItems = searchItems;
                    newSearchItems.push(item);
                    setSearchItems(newSearchItems);
                  }}
                />
              </UserPopover>
            ))}
          </div>
        )}

        <Dropdown
          isOpened={isOpen}
          searchItems={searchItems}
          onClick={handleOnClick}
          isDepartment={isDepartment}
        />
      </div>
      <p
        className={`text-xs text-red-600 dark:text-red-500 ${
          error ? "" : "invisible"
        }`}
      >
        <span className="font-medium ">Oops!</span> {error}
      </p>
    </>
  );
};

export default SelectSearch;

SelectSearch.getLayout = function getLayout(page) {
  return (
    <AuthorDataProvider>
      <DepartmentDataProvider>{page}</DepartmentDataProvider>
    </AuthorDataProvider>
  );
};
