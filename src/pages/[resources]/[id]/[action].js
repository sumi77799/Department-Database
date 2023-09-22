import PublicationForm from "@/components/Forms/Publication/PublicationForm";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import Navbar from "@/layout/Navbar";
import { postData } from "@/services/DataPost";
import {
  fetchAllAuthorData,
  fetchAllDepartmentData,
  getSpecificData,
} from "@/services/DataFetch";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { ToastContext } from "@/context/Toast/ToastContext";
import FormSkeleton from "@/skeletons/FormSkeleton";

import { decisionData } from "@/services/DataDecision";
import {
  AuthorDataContext,
  AuthorDataProvider,
} from "@/context/AuthorsData/AuthorDataContext";
import {
  DepartmentDataContext,
  DepartmentDataProvider,
} from "@/context/DepartmentData/DepartmentDataContext";
import { UserInfoContext } from "@/context/UserInfo";
import { getFormData } from "@/utils/dataConvert/DataConvert";
import EventsForm from "@/components/Forms/Events/EventsForm";
import VisitsForm from "@/components/Forms/Visits/VisitsForm";
import BatchForm from "@/components/Forms/Batch/BatchForm";
import { errorDecoder } from "@/utils/errorDecoder/errorDecoder";
import { FACULTY, STUDENT } from "@/constants/roles";
import { RESOURCESTYPES } from "@/config/userRoutes";
import DepartmentForm from "@/components/Forms/Department/DepartmentForm";
import { getSession } from "next-auth/react";
import ResearchLabsForm from "@/components/Forms/ReseachLabs/ResearchLabsForm";
import { formValidate } from "@/utils/validator/formValidate";
import AchivenmentsForm from "@/components/Forms/Achievenments/Achivements";
import ProjectForm from "@/components/Forms/Project/ProjectForm";

export default function ActionPage() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { resources, id, action, type } = router.query;
  const formRef = useRef("null");
  const { setAllDepartments } = useContext(DepartmentDataContext);
  const { setAllAuthors } = useContext(AuthorDataContext);
  const [formError, setFormError] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const userType = {
    publications: "Authors",
    events: "Organizers",
    achievements: "Participants",
    projects: "Members",
    visits: "User",
  };
  //fetch data into preloadedData using useEffect
  const [preloadedData, setPreloadedData] = useState({});
  const [authList, setAuthList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [fieldTagsList, setFieldTagsList] = useState([]);

  // const [AllDepartment, setAllDepartment] = useState([]);
  // const [AllAuthors, setAllAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getSpecificData(type, resources, id);
      console.log("result" + result);

      const filteredDataAuthors = await fetchAllAuthorData(resources);
      const allDepartmentData = await fetchAllDepartmentData();

      let authors = [];
      result.tableData[userType[resources]].forEach((author) => {
        authors.push(author.id);
      });
      let departments = [];
      result.tableData.Department.forEach((department) => {
        departments.push(department.id);
      });
      // change author list in preloadedData to author id list
      // result.tableData.authors = authors;
      setPreloadedData(result.tableData);
      setAuthList(authors);
      setDepartmentList(departments);
      setFieldTagsList(result.tableData.field_tags);
      setAllDepartments(allDepartmentData);
      setAllAuthors(filteredDataAuthors);
      console.log("authors------------------", authors);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Fetch data from the database according to the id

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   const formData = getFormData(formRef, resources, authList, departmentList);
  //   const { data, errors } = await decisionData(
  //     "draft",
  //     resources,
  //     id,
  //     formData
  //   );
  //   if (errors) {
  //     showToast({ type: "error", message: errors });
  //   } else {
  //     // router.push(`/${resources}`);
  //     console.log(data);
  //   }
  // };

  const handleFormSubmitDraft = async (e) => {
    e.preventDefault();

    console.log(e.target);
    const formData = getFormData(
      formRef,
      resources,
      authList,
      departmentList,
      fieldTagsList
    );
    let data, errors, result;
    if (type === "Active") {
      const userGroup = userInfo.groups[0];
      console.log("id in active draft is", id);
      result = await postData("draft", resources, formData, userGroup, id);
    } else if (type === "Draft") {
      result = await decisionData("draft", resources, id, formData);
    }
    data = result.data;
    errors = result.errors;
    const toastErrors = errorDecoder(errors);
    if (errors) {
      showToast({ type: "error", message: toastErrors });
      setFormError(errors);
    } else {
      showToast({ type: "success", message: "Draft saved successfully" });
      router.push({
        pathname: `/${resources}`,
        query: { tab: "Draft" },
      });
      console.log(data);
    }
  };

  if (loading) return <FormSkeleton />;
  return (
    <>
      <Head>
        <title>{`${action} ${resources}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* display the corresponding form */}
        {resources === "publications" && (
          <PublicationForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            authors={authList}
            departments={departmentList}
            fieldTags={fieldTagsList}
            fieldTagsList={setFieldTagsList}
            departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {resources === "events" && (
          <EventsForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            authors={authList}
            departments={departmentList}
            departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {resources === "visits" && (
          <VisitsForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            authors={authList}
            departments={departmentList}
            departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {resources === "batch" && (
          <BatchForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            // authList={setAuthList}
            // authors={authList}
            // departments={departmentList}
            // departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {resources === "department" && (
          <DepartmentForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            HOD={authList}
            // departments={departmentList}
            // departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}

        {resources === "research_labs" && (
          <ResearchLabsForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            Head={authList}
            // departments={departmentList}
            // departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {resources === "projects" && (
          <ProjectForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            authors={authList}
            departments={departmentList}
            departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}

        {resources === "achievements" && (
          <AchivenmentsForm
            preloadedData={preloadedData}
            // aternativeFunciton3={handleFormSubmit}
            aternativeFunciton2={handleFormSubmitDraft}
            authList={setAuthList}
            authors={authList}
            departments={departmentList}
            departmentList={setDepartmentList}
            formRef={formRef}
            errors={formError}
          />
        )}
        {/* TODO: Add projects and awards */}

        {/* {resources === "projects" && <div>Projects</div>}
        {resources === "awards" && <div>Awards</div>} */}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { resources } = params;

  // get the session and print
  const session = await getSession(context);
  const userGroup = session.user.user.groups[0];

  // if resource is not found in RESOURCESTYPES then redirect to 404 page
  if (!RESOURCESTYPES.includes(resources)) {
    return {
      notFound: true,
    };
  }

  // if user is not faculty or student then redirect to 404 page
  if (userGroup !== FACULTY && userGroup !== STUDENT) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resources: resources,
    },
  };
}

ActionPage.auth = {
  role: [FACULTY, STUDENT],
};
ActionPage.getLayout = function getLayout(page) {
  return (
    <AuthorDataProvider>
      <DepartmentDataProvider>
        <NavbarProvider>
          <Navbar>{page}</Navbar>
        </NavbarProvider>
      </DepartmentDataProvider>
    </AuthorDataProvider>
  );
};
