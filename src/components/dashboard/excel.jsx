import * as XLSX from "xlsx";

// Reusable function to export data to Excel
export const exportToExcel = (data, sheetName) => {
  const ws = XLSX.utils.json_to_sheet(data); // Convert JSON data to a worksheet
  const wb = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName); // Append sheet to the workbook

  // Trigger the download
  XLSX.writeFile(wb, `${sheetName}_data.xlsx`);
};
