// export default function Home ({inputRef, label, type, meta: { touched, error, warning }}) {
export default function Home({ inputRef }) {
  return (
    <div className="flex flex-col space-y-5">
      {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>{label}</p>
            </div> */}
      <div className="w-auto h-16">
        <input
          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
          type="text"
          ref={inputRef}
        />
      </div>
      {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                {<span>DSFG</span>}
            </div> */}
    </div>
  );
}
