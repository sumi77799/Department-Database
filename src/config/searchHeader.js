const publicationsData = [
  "title",
  // "description",
  "publication_type",
  "publication_status",
  "identifier_type",
  "identifier",
  "Authors",
  "published_date",
  "users",
  "field_tags",
  "tags",

  // "object_type",
];
const projectsData = [
  "title",
  // "description",
  "start_date",
  "end_date",
  "users",
  "investors",
  "amount_invested",
  // "object_type",
  "status",
];

const achievementsData = [
  "title",
  // "description",
  "type",
  "date",
  "users",
  // "object_type",
];

const eventsData = [
  "title",
  // "description",
  "type",
  "date",
  "Organizers",
  "speakers",
  // "object_type",
];
const visitsData = [
  "title",
  // "description",
  "type",
  "users",
  "from-date",
  "to-date",
  "venue",
  // "object_type",
];

const batchData = ["name", "year"];
const departmentData = ["name", "HOD"];
const researchLabsData = ["name", "lab_type"];

const SEARCH_FIELDS = {
  publications: publicationsData,
  projects: projectsData,
  achievements: achievementsData,
  events: eventsData,
  visits: visitsData,
  batch: batchData,
  department: departmentData,
  research_labs: researchLabsData,
  users: ["username", "first_name", "last_name", "email"],
};

const SEARCH_MATCHING_THRESHOLD = 0.3;

export { SEARCH_FIELDS, SEARCH_MATCHING_THRESHOLD };
