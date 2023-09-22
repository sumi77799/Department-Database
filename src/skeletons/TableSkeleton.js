const TableSkeleton = () => {
  const NUM_OF_ROWS = 5;
  const NUM_OF_COLUMNS = 5;

  return (
    <table className="animate-pulse w-full overflow-hidden rounded-lg   text-sm text-left text-gray-500 dark:text-gray-400">
      {/* table header */}
      <thead className=" text-xs text-gray-700 uppercase bg-primary-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {/* skeleton 5 times using map */}
          {[...Array(NUM_OF_COLUMNS)].map((_, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            </th>
          ))}
          {/* sr only for screen readers */}
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      {/* table body */}
      <tbody>
        {/* 5 rows */}
        {[...Array(NUM_OF_ROWS)].map((_, index) => (
          <tr
            key={index}
            className="bg-white border-b hover:bg-background-100 dark:hover:bg-gray-600"
          >
            {/* skeleton 5 times using map */}
            {[...Array(NUM_OF_COLUMNS)].map((_, index) => (
              <td key={index} className="w-4 p-4">
                <div className="wave-wrapper h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              </td>
            ))}
            <td className="w-4 p-4">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
