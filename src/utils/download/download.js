const downloadBlobExcel = (blob, resources) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${resources}.xlsm`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const downloadBlobDocx = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export { downloadBlobExcel, downloadBlobDocx };
