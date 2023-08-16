import React, { useState } from 'react'

function FileComponent({ accept, id, fileHandleFnc,text }) {
  const [fileSelected, setFileSelected] = useState("");
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };
  return (
    <>
      <label className="custom-input" htmlFor={id}>
        {fileSelected
          ? `The File ${fileSelected} is Selected`
          : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default FileComponent