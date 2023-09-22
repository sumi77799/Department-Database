const definitionsForResources = {
  projects: {
    object_type: {
      DR: "Draft",
      P: "Pending",
      A: "Active",
      R: "Rejected",
    },
    status: {
      ON: "ONGOING",
      CO: "COMPLETED",
      CA: "CANCELLED",
    },
  },
  publications: {
    object_type: {
      DR: "Draft",
      P: "Pending",
      A: "Active",
      R: "Rejected",
    },
    publication_type: {
      J: "Journal",
      C: "Conference",
      B: "Book",
      BC: "Book Chapter",
      P: "Patent",
      O: "Other",
    },
    publication_status: {
      P: "Published",
      S: "Submitted",
      A: "Accepted",
      R: "Rejected",
      O: "Other",
    },
    identifier_type: {
      DOI: "DOI",
      ISBN: "ISBN",
      ISSN: "ISSN",
      CORPUS_ID: "CORPUS_ID",
      O: "Other",
    },
    // field_tags:{
    //   CS: "Computer Science",
    //   AI: "Artificial Intelligence",
    //   SE: "Software Engineering",
    //   NET: "Networking",
    //   EE: "Electrical Engineering",
    //   ME: "Mechanical Engineering",
    //   CE: "Civil Engineering",
    //   CHE: "Chemical Engineering",
    //   MATE: "Materials Engineering",
    //   BME: "Biomedical Engineering",
    //   AE: "Aerospace Engineering",
    //   O: "Other",
    // },
  },
  achievements: {
    object_type: {
      DR: "Draft",
      P: "Pending",
      A: "Active",
      R: "Rejected",
    },
    type: {
      HC: "Hackthon",
      CP: "Competition",
      IN: "Internship",
      O: "Other",
    },
  },
  events: {
    object_type: {
      DR: "Draft",
      P: "Pending",
      A: "Active",
      R: "Rejected",
    },
    type: {
      WS: "Workshop",
      CF: "Conference",
      SM: "Seminar",
      IL: "Invited Lectures",
      O: "Other",
    },
  },
  visits: {
    type: {
      LC: "Lecture",
      CF: "Conference",
      SM: "Seminar",
      O: "Other",
    },
  },
  batch: {},
  department: {},
  research_labs: {},
};

export default definitionsForResources;
