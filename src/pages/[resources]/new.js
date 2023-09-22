import Head from "next/head";

import PublicationForm from "@/components/Forms/Publication/PublicationForm";
import { useRouter } from "next/router";
import Navbar from "@/layout/Navbar";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import { ToastContext } from "@/context/Toast/ToastContext";
import { useContext, useEffect, useRef, useState } from "react";
import { postData } from "@/services/DataPost";
import ProjectForm from "@/components/Forms/Project/ProjectForm";
import AchivenmentsForm from "@/components/Forms/Achievenments/Achivements";

import {
  DepartmentDataContext,
  DepartmentDataProvider,
} from "@/context/DepartmentData/DepartmentDataContext";
import {
  AuthorDataContext,
  AuthorDataProvider,
} from "@/context/AuthorsData/AuthorDataContext";
import {
  fetchAllAuthorData,
  fetchAllDepartmentData,
} from "@/services/DataFetch";

import { UserInfoContext } from "@/context/UserInfo";
import { getFormData } from "@/utils/dataConvert/DataConvert";
import FormSkeleton from "@/skeletons/FormSkeleton";
import EventsForm from "@/components/Forms/Events/EventsForm";
import VisitsForm from "@/components/Forms/Visits/VisitsForm";
import BatchForm from "@/components/Forms/Batch/BatchForm";
import { errorDecoder } from "@/utils/errorDecoder/errorDecoder";
import DepartmentForm from "@/components/Forms/Department/DepartmentForm";
import { FACULTY, STAFF, STUDENT } from "@/constants/roles";
import { RESOURCESTYPES, STAFF_CREATE_RESOURCES } from "@/config/userRoutes";
import { getSession } from "next-auth/react";
import ResearchLabsForm from "@/components/Forms/ReseachLabs/ResearchLabsForm";
import { formValidate } from "@/utils/validator/formValidate";
export default function Home() {
  const formRef = useRef("null");
  const router = useRouter();
  const { resources } = router.query;
  const { showToast } = useContext(ToastContext);
  const [authList, setAuthList] = useState([]);
  const [formError, setFormError] = useState(false);

  const [departmentList, setDepartmentList] = useState([]);
  const [fieldTagsList, setFieldTagsList] = useState([]);

  const { setAllDepartments } = useContext(DepartmentDataContext);
  const { setAllAuthors } = useContext(AuthorDataContext);
  const { userInfo } = useContext(UserInfoContext);
  // const userGroup = userInfo.groups[0];

  const [loading, setLoading] = useState(true);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [userGroup, setUserGroup] = useState("");

  useEffect(() => {
    if (userInfo && userInfo.first_name) {
      console.log("userInfo in new.js: ", userInfo);
      setUserGroup(userInfo.groups[0]);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // const {allDepartmentData ,filteredDataAuthors } = await ProData()
      const filteredDataAuthors = await fetchAllAuthorData(resources);
      const allDepartmentData = await fetchAllDepartmentData();
      // preloadedData = result.tableData;

      // change author list in preloadedData to author id list
      // result.tableData.authors = authors;
      console.log("Loading in new.js: " + loading);
      setAllDepartments(allDepartmentData);
      setAllAuthors(filteredDataAuthors);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const preCheckErrors = formValidate(
      formRef,
      authList,
      departmentList,
      resources
    );
    if (Object.keys(preCheckErrors).length !== 0) {
      setFormError(preCheckErrors);
      return;
    }

    setIsFetchingResponse(true);
    // console.log(e.target);
    // const formData = new FormData(e.target);
    // console.log(formData.get("title"));
    const formData = getFormData(
      formRef,
      resources,
      authList,
      departmentList,
      fieldTagsList
    );
    console.log(formData);
    const { data, errors } = await postData("", resources, formData, userGroup);
    const toastError = errorDecoder(errors);
    if (errors) {
      showToast({ type: "error", message: toastError });
      setFormError(errors);
    } else {
      let resourceName = resources.endsWith("s")
        ? resources.slice(0, -1).charAt(0).toUpperCase() + resources.slice(1)
        : resources;

      showToast({
        type: "success",
        message: `${resourceName} added successfully`,
      });
      router.push(`/${resources}`);
      console.log(data);
    }
    setIsFetchingResponse(false);
  };

  const handleFormSubmitDraft = async (e) => {
    e.preventDefault();
    setIsFetchingResponse(true);
    // console.log(e.target);
    const formData = getFormData(
      formRef,
      resources,
      authList,
      departmentList,
      fieldTagsList
    );

    console.log(formData);
    const { data, errors } = await postData("draft", resources, formData);
    const toastError = errorDecoder(errors);
    if (errors) {
      showToast({ type: "error", message: toastError });
      setFormError(errors);
    } else {
      showToast({ type: "success", message: `Draft added successfully` });

      router.push(`/${resources}/?tab=Draft`);
      console.log(data);
    }
    setIsFetchingResponse(false);
  };

  if (loading) return <FormSkeleton />;
  return (
    <>
      <Head>
        <title>{`${resources} - My Website`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* display the corresponding form */}
        {resources === "publications" && (
          <PublicationForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
            fieldTagsList={setFieldTagsList}
          />
        )}
        {/* TODO: Add projects and awards */}
        {resources === "projects" && (
          <ProjectForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
        {resources === "achievements" && (
          <AchivenmentsForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
        {resources === "events" && (
          <EventsForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
        {resources === "visits" && (
          <VisitsForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            // authList={setAuthList}
            departmentList={setDepartmentList}
            authList={setAuthList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
        {resources === "batch" && (
          <BatchForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
            departmentList={setDepartmentList}
            // authList={setAuthList}
            // departmentList={setDepartmentList}
          />
        )}
        {resources === "department" && (
          <DepartmentForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            // departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
        {resources === "research_labs" && (
          <ResearchLabsForm
            formRef={formRef}
            aternativeFunciton1={handleFormSubmitDraft}
            aternativeFunciton2={handleFormSubmit}
            authList={setAuthList}
            // departmentList={setDepartmentList}
            errors={formError}
            isFetchingResponse={isFetchingResponse}
          />
        )}
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

  if (userGroup === STAFF) {
    if (!STAFF_CREATE_RESOURCES.includes(resources)) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      resources: resources,
    },
  };
}

Home.auth = true;
Home.getLayout = function getLayout(page) {
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
