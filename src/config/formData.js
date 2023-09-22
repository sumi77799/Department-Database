const formDataList = {
  publications: [
    "title",
    "description",
    "link",
    "publication_type",
    "publication_status",
    "identifier_type",
    "identifier",
    "published_date",
    "authors",
    "department",
    "authors_text",
    "accepted_date",
  ],
  projects: [
    "title",
    "description",
    "link",
    "start_date",
    "end_date",
    "status",
    "code",
    "investors",
    "amount_invested",
    "members",
    "department",
  ],
  achievements: [
    "title",
    "description",
    "type",
    "date",
    "participants",
    // "department",
  ],
  events: [
    "title",
    "description",
    "link",
    "type",
    "date",
    "department",
    "organizers",
    "speakers",
    "number_of_participants",
  ],
  batch: ["name", "year"],
  visits: [
    "title",
    "description",
    "link",
    "type",
    "venue",
    "from_date",
    "to_date",
  ],
  research_labs: [
    "name",
    "code",
    "lab_type",
    "description",
    "website",
    "address",
    "Head",
    "equipments",
  ],
  department: ["name", "code", "description", "Hod"],
};

export default formDataList;
