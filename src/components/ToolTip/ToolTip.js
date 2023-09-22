import { useState } from "react";
import definitionsForResources from "@/config/definitions";
const ToolTip = ({ text, children, resources, attribute }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const modifyText = (text, resources, attribute) => {
    //check if the filed is presend in the definitions for the resource, if yes then modify the text which is present as a key in the resource accordingly else return the text as it is
    if (
      definitionsForResources[resources] &&
      definitionsForResources[resources][attribute]
    ) {
      console.log("attribute", attribute, text);
      return definitionsForResources[resources][attribute][text];
    }
    return text;
  };

  // console.log("children in Tooltip:", children);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // style={{ position: 'relative' }}
    >
      {children}

      <div
        id="tooltip-animation"
        role="tooltip"
        className={`absolute z-50 ${
          showTooltip ? "visible opacity-100" : "invisible opacity-0"
        } px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-gray-200 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
      >
        {modifyText(text, resources, attribute)}
        <div className="tooltip-arrow" data-popper-arrow />
      </div>
    </div>
  );
};

export default ToolTip;

// import { useState } from 'react';

// const ToolTip = ({ text, children }) => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   const handleMouseEnter = () => {
//     setShowTooltip(true);
//   };

//   const handleMouseLeave = () => {
//     setShowTooltip(false);
//   };
//   console.log("children in Tooltip:",children)
//   return (
//     <div
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       // style={{ position: 'relative' }}
//     >
//       {children}
//       {showTooltip && (
//         // <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
//         <div id="tooltip-animation" role="tooltip" className={`absolute z-10 ${showTooltip ? 'visible opacity-100' : 'invisible opacity-0'} inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}>
//           {text}
//         <div className="tooltip-arrow" data-popper-arrow />
//       </div>

//       )}
//     </div>
//   );
// }

// export default ToolTip;
