const NavTabs = ({ activeTab, handleTabChange, tabs }) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li key={tab}>
            <a
              className={`inline-block p-4 ${
                activeTab === tab
                  ? "border-b-2 border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 cursor-default"
                  : "text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </a>
          </li>
        ))}
        {/* <li>
          <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
            Disabled
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default NavTabs;
