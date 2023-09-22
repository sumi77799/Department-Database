// export default function Home ({inputRef, label, type, meta: { touched, error, warning }}) {
export default function Home({ inputRef, numberOfInputs }) {
  const _numberOfInputs = numberOfInputs ?? 6;
  const onChange = (e, index) => {
    if (e.target.value) {
      if (index < _numberOfInputs - 1) {
        inputRef.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };
  return (
    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xl">
      {/* repeat _numberOfInputs times */}
      {[...Array(_numberOfInputs)].map((e, i) => (
        <div className="w-16 h-16 " key={i}>
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            ref={(e) => (inputRef.current[i] = e)}
            maxLength="1"
            onChange={(e) => onChange(e, i)}
          />
        </div>
      ))}
    </div>
  );
}
