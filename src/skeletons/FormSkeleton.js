const FormSkeleton = () => {
  const labelSkeleton = (
    <div className="wave-wrapper h-2.5 bg-gray-300 rounded-full w-24 mb-2.5" />
  );
  const inputSkeleton = (
    <div className="wave-wrapper rounded-full bg-gray-200 h-4 "></div>
  );
  const formSkeleton = (span) => {
    return (
      <div className={`col-span-6 sm:col-span-${span}`}>
        {labelSkeleton}
        {inputSkeleton}
      </div>
    );
  };

  //   submit button
  const submitButton = (
    <button className="bg-gray-300 text-gray-300 font-semibold py-2 px-4 rounded h-10 w-24 wave-wrapper"></button>
  );

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="mt-5 md:col-span-2 md:mt-0 w-2/3">
        <div>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6 ">
                {formSkeleton(6)}
                {formSkeleton(6)}
                {formSkeleton(3)}
                {formSkeleton(3)}
                {formSkeleton(3)}
                {formSkeleton(3)}
                {formSkeleton(2)}
                {formSkeleton(4)}
                {formSkeleton(2)}
                {formSkeleton(3)}
                {formSkeleton(3)}
              </div>
              {/* submit button */}
              <div className="flex mt-5 items-center justify-end gap-2">
                {submitButton} {submitButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;

// const FormSkeleton = () => {
//     const labelSkeleton = (
//       <div className="h-3 bg-gray-400 rounded-md mb-2" />
//     );
//     const inputSkeleton = <div className="rounded-md bg-gray-400 h-4"></div>;
//     const formSkeleton = (label, span) => {
//       return (
//         <div className={`col-span-${span}`}>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             {label}
//           </label>
//           {inputSkeleton}
//         </div>
//       );
//     };

//     return (
//       <div className="mt-5 md:col-span-2 md:mt-0 w-2/3">
//         <div className="overflow-hidden shadow sm:rounded-md bg-white">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="grid grid-cols-2 gap-6">
//               {formSkeleton("Title", 2)}
//               {formSkeleton("Description", 2)}
//               {formSkeleton("Type", 1)}
//               {formSkeleton("Status", 1)}
//               {formSkeleton("Identifier Type", 1)}
//               {formSkeleton("Identifier", 1)}
//               {formSkeleton("Date", 1)}
//               {formSkeleton("Authors", 1)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default FormSkeleton;
