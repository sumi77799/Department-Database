import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { getSession } from "next-auth/react";

import { FaUser } from "react-icons/fa";
import { DJANGO_BASE_URL, LOGIN } from "@/constants/endPoints";
import NavbarProvider from "@/context/Navbar/NavbarContext";
import Navbar from "@/layout/Navbar";
import Toggle from "@/components/elements/Toggle";
import { useContext, useState } from "react";
import { ToastContext } from "@/context/Toast/ToastContext";
import ButtonPrimary from "@/components/elements/Button/ButtonPrimary";
import Spinner from "@/components/elements/Spinner";
import Head from "next/head";

const ProfilePage = ({ user, showEditOptions }) => {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const handleEditOptionsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // get data from form using formData
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.hasOwnProperty("get_email_notification")) {
      formData.append("get_email_notification", "False");
      data["get_email_notification"] = "False";
    } else {
      formData.set("get_email_notification", "True");
      data["get_email_notification"] = "True";
    }
    if (!data.hasOwnProperty("get_email_broadcast_notification")) {
      formData.append("get_email_broadcast_notification", "False");
      data["get_email_broadcast_notification"] = "False";
    } else {
      formData.set("get_email_broadcast_notification", "True");
      data["get_email_broadcast_notification"] = "True";
    }

    console.log(data);
    console.log(formData);

    const res = await fetch(`/api/user/details/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // if success, show success message
    if (res.ok) {
      showToast({ type: "success", message: "User settings updated" });
    } else {
      showToast({ type: "error", message: "Something went wrong" });
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Profile | {user.name}</title>
        <meta name="description" content="Profile page" />
      </Head>

      <div className=" mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-56"
            style={{ backgroundImage: `url(${user.coverPhoto})` }}
          >
            <div className="flex justify-end p-4">
              <button className="p-2 rounded-full bg-white text-gray-800">
                <FaUser className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-center -mt-16">
              <Image
                src={user.profilePhoto}
                alt={user.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-white"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-3xl font-semibold">{user.name}</h3>
              <p className="mt-2 text-gray-600 text-lg">{user.role}</p>
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href={`mailto:${user.email}`}
                className="text-gray-600 hover:text-gray-900 mx-3"
              >
                <FaEnvelope className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-semibold">About Me</h4>
              <p className="mt-2 text-gray-600 text-lg">{user.about}</p>
            </div>
            {/* Toggle option for following two fields */}
            {/* get_email_broadcast_notification	true
get_email_notification	true */}

            {/* user togg;e */}
            {showEditOptions && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <form
                  className="space-y-4 flex flex-col place-items-center"
                  onSubmit={handleEditOptionsSubmit}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-semibold">User Settings</h4>
                      <p className="mt-2 text-gray-600 text-lg">
                        Change your user settings
                      </p>

                      <div className="mt-8">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-semibold">
                              Email Notifications
                            </h4>

                            {/* get_email_notification */}
                            <div className="flex items-center justify-between gap-28">
                              <p className="text-gray-600 text-lg">
                                Change your email notification settings
                              </p>
                              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <Toggle
                                  name="get_email_notification"
                                  checked={user.get_email_notification}
                                  // onChange={user.get_email_broadcast_notification}
                                />
                              </span>
                            </div>

                            {/* get_email_broadcast_notification */}
                            <div className="flex items-center justify-between gap-28">
                              <p className="text-gray-600 text-lg">
                                Change your email broadcast notification
                                settings
                              </p>
                              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <Toggle
                                  name="get_email_broadcast_notification"
                                  checked={
                                    user.get_email_broadcast_notification
                                  }
                                  // onChange={user.get_email_broadcast_notification}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <ButtonPrimary type="submit">
                      {loading && (
                        <>
                          <Spinner />
                          {"Saving..."}
                        </>
                      )}
                      {!loading && "Save"}
                    </ButtonPrimary>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { username } = params;
  const session = await getSession(context);

  const token = session.user.access;
  const loggedInUsername = session.user.user.username;
  const data = await fetch(`${DJANGO_BASE_URL}/user/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data.ok) {
    return {
      redirect: {
        destination: LOGIN,
        permanent: false,
      },
    };
  }
  const result = await data.json();

  // result contains all the users
  // we need to find the user with username
  const user = result.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  // if user not found
  if (!user) {
    return {
      notFound: true,
    };
  }
  // fetch department details
  const department = await fetch(
    `${DJANGO_BASE_URL}/department/${user.department}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const departmentResult = await department.json();
  user.department = departmentResult.data.name;

  user.name = user.first_name + " " + user.last_name;
  switch (user.user_type) {
    case "ug":
      user.role = "Undergraduate Student";
      break;
    case "pg":
      user.role = "Postgraduate Student";
      break;
    case "phd":
      user.role = "PhD Student";
      break;
    case "fc":
      user.role = "Faculty";
      break;
    case "st":
      user.role = "Staff";
      break;
    default:
      user.role = "Student";
  }
  user.coverPhoto = user.cover_image ?? "/Background.jpg";
  user.profilePhoto = user.profile_image ?? "/images.jpg";
  user.about = `My name is ${user.name} and my username is @${
    user.username
  }. I am a ${user.role} in the department of ${
    user.department
  } and I began my tenure here in ${
    user.year
  }. Please feel free to reach out to me at ${
    user.email
  } should you need to contact me. At present, I am ${
    user.is_current ? "an active" : "not an active"
  } member of the staff, and I ${
    user.doctorate_degree ? "hold" : "do not hold"
  } a doctorate degree.

  In addition, my user ID is ${
    user.id
  } and I am a part of the following groups: ${user.groups.join(
    ", "
  )}. If you require any further information, please do not hesitate to ask.`;

  // if user found
  return {
    props: { user, showEditOptions: loggedInUsername === username },
  };
}

ProfilePage.auth = true;
ProfilePage.getLayout = function getLayout(page) {
  return (
    <NavbarProvider>
      <Navbar>{page}</Navbar>
    </NavbarProvider>
  );
};
