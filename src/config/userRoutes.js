const userTabs = {
  Staff: ["Active"],
  Faculty: ["Active", "Pending", "Draft", "Deleted"],
  // Faculty: ["Active", "Pending", "Draft"],

  Student: ["Active", "Pending", "Draft"],
};

export const RESOURCESTYPES = [
  "publications",
  "projects",
  "achievements",
  "events",
  "visits",
  "batch",
  "department",
  "research_labs",
];

export const STAFF_CREATE_RESOURCES = [
  "visits",
  "batch",
  "department",
  "research_labs",
];

export default userTabs;
