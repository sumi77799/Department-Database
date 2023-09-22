const publicationsData = {
  headers: [
    "title",
    "type",
    "status",
    "Authors",
    "published_date",
    "tags",
    "Users",
  ],
  attributes: [
    "title",
    "publication_type",
    "publication_status",
    "users",
    "published_date",
    "field_tags",
    "tags",
  ],
};

const projectsData = {
  headers: [
    "title",
    "start_date",
    "end_date",
    "Members",
    "investors",
    "amount_invested",
    "status",
  ],
  attributes: [
    "title",
    "start_date",
    "end_date",
    "users",
    "investors",
    "amount_invested",
    "status",
  ],
};

const achievementsData = {
  headers: ["title", "type", "date", "Participants", "Created By"],
  attributes: ["title", "type", "date", "users", "created_by"],
};

const eventsData = {
  headers: ["title", "type", "date", "speakers"],
  attributes: ["title", "type", "date", "speakers"],
};

const visitsData = {
  headers: ["title", "type", "User", "from-date", "to-date", "venue"],
  attributes: ["title", "type", "users", "from_date", "to_date", "venue"],
};

const batchData = {
  headers: ["name", "year"],
  attributes: ["name", "year"],
};

const departmentData = {
  headers: ["name", "HOD"],
  attributes: ["name", "HOD"],
};

const researchLabsData = {
  headers: ["name", "Type"],
  attributes: ["name", "lab_type"],
};

const allHeadersAndAttributes = {
  publications: publicationsData,
  projects: projectsData,
  achievements: achievementsData,
  events: eventsData,
  visits: visitsData,
  batch: batchData,
  department: departmentData,
  research_labs: researchLabsData,
};

export default allHeadersAndAttributes;
export { publicationsData };
