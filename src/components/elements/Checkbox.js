const Checkbox = ({ onChange, isChecked }) => {
  return (
    <div className="flex items-center">
      <input
        checked={isChecked}
        name="checkbox-all-search"
        id="checkbox-all-search"
        onChange={onChange}
        type="checkbox"
        className="w-4 h-4 accent-primary-100  rounded-lg"
      />
      <label htmlFor="checkbox-all-search" className="sr-only">
        checkbox
      </label>
    </div>
  );
};

export default Checkbox;
