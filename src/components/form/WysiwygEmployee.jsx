import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const WysiwygEmployee = ({ placeholder }) => {
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );
  return (
    <div className="p-3 bg-gray-200">
      <h4 className="text-lg font-bold text-blue-900">Employee Privacy Policy and Terms& Conditions </h4>
      <div className="p-5 border bg-white border-gray-300 rounded-lg mt-2">
        <h6 className="my-2 font-semibold text-blue-700 ">Update Privacy Policy</h6>
        <p className="my-2 font-semibold text-gray-400">Privacy</p>
        <div >
          <JoditEditor
            ref={editor}
            value={privacy}
            config={config}
            tabIndex={5}
            onBlur={(newContent) => setPrivacy(newContent)}
            onChange={(newContent) => setPrivacy(newContent)}
          />
        </div>
      </div>
      <div className="p-5 border bg-white border-gray-300 rounded-lg mt-2">
        <h6 className="my-2 font-semibold text-blue-700 ">Update Terms & Conditions </h6>
        <p className="my-2 font-semibold text-gray-400">Terms & Conditions</p>
        <div >
          <JoditEditor
            ref={editor}
            value={terms}
            config={config}
            tabIndex={5}
            onBlur={(newContent) => setTerms(newContent)}
            onChange={(newContent) => setTerms(newContent)}
          />
        </div>
      </div>
      <button className="bg-green-700 text-white px-2 py-1 rounded-lg mt-3">Update</button>
    </div>
  );
};




export default WysiwygEmployee