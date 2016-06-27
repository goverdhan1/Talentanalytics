using Newtonsoft.Json.Linq;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.IO;
using System.Web.Mvc;
using TalentAnalyticsSite.Helpers;
using WebSupergoo.ABCpdf9;


namespace Deloitte.TOD.TalentAnalyticsSite.Controllers
{
    public class ExportController : Controller
    {
        //
        // GET: /Export/
        [ValidateInput(false)]
        [System.Web.Mvc.HttpPost]
        public string Excel(string excelData, string filename, string fileExtension)
        {
            string fileNameWithExtn = string.Format("{0}.{1}", filename.Replace(' ', '_'), fileExtension);

            if (fileExtension.ToLower() == "csv")
            {
                Response.Clear();
                Response.ContentType = "text/csv";
                Response.AddHeader("Content-Disposition", "attachment;filename=" + fileNameWithExtn);
                Response.Write(excelData);
                Response.Flush();
                Response.End();

            }
            else if (fileExtension.ToLower() == "xlsx")
            {
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", fileNameWithExtn));
                InitializeWorkbook();
                GenerateData(excelData);
                xssfworkbook.Write(Response.OutputStream);
                Response.Flush();
                Response.End();            
            }
            return string.Empty;
        }

        private XSSFWorkbook xssfworkbook;

        private MemoryStream WriteToStream()
        {
            //Write the stream data of workbook to the root directory
            MemoryStream file = new MemoryStream();
            xssfworkbook.Write(file);
            return file;
        }

        private void GenerateData(string html)
        {
            #region Excel Style sheet

            IFont font1 = xssfworkbook.CreateFont();           
            font1.FontHeightInPoints = 20;
            ICellStyle style1 = xssfworkbook.CreateCellStyle();
            style1.SetFont(font1);

            IFont font2 = xssfworkbook.CreateFont();          
            font2.IsBold = true;

            ICellStyle style2 = xssfworkbook.CreateCellStyle();
            style2.SetFont(font2);

            #endregion

            int newRow = 0;

            // Creating new Sheet
            ISheet sheet1 = xssfworkbook.CreateSheet("Employee Quickview");

            try
            {
                // Parsing request object
                JObject obj = JObject.Parse(html);

                // Merge columns for Employee name
                sheet1.AddMergedRegion(new CellRangeAddress(newRow, 0, 0, 3));

                IRow row = sheet1.CreateRow(newRow);
                ICell cell = row.CreateCell(0);

                if (obj["employeeName"] != null)
                {
                    cell.SetCellValue(obj["employeeName"].ToString());
                    cell.CellStyle = style1;
                }                   

                newRow = newRow + 2;

                row = sheet1.CreateRow(newRow);


                #region Bind header information

                if (obj["showHeaderInfo"] != null && (Boolean)obj["showHeaderInfo"] == true)
                {

                    cell = row.CreateCell(0);
                    cell.SetCellValue("Personnel Sub Area Desc");
                    cell.CellStyle = style2;

                    cell = row.CreateCell(1);
                    cell.SetCellValue("Employee Job Level");
                    cell.CellStyle = style2;

                    cell = row.CreateCell(2);
                    cell.SetCellValue("Desk Phone");
                    cell.CellStyle = style2;

                    newRow++;
                    row = sheet1.CreateRow(newRow);

                    cell = row.CreateCell(0);
                    if (obj["location"] != null)
                        cell.SetCellValue(obj["location"].ToString());

                    cell = row.CreateCell(1);
                    if (obj["jobLevel"] != null)
                        cell.SetCellValue(obj["jobLevel"].ToString());

                    cell = row.CreateCell(2);
                    if (obj["desphone"] != null)
                        cell.SetCellValue(obj["desphone"].ToString());
                }

                #endregion

                newRow = newRow + 2;

                foreach (JObject section in obj["sections"])
                {
                    int newHdCol = 0;

                    row = sheet1.CreateRow(newRow);

                    cell = row.CreateCell(0);

                    if (section["title"] != null)
                    {
                        cell.SetCellValue(section["title"].ToString());
                        cell.CellStyle = style1;
                    }

                    newRow++; newRow++;

                    row = sheet1.CreateRow(newRow);

                    #region Bind table header

                    foreach (JObject header in section["header"])
                    {
                        if (section["title"] != null)
                        {
                            if (section["title"].ToString() != "BASIC INFO DETAIL")
                            {
                                cell = row.CreateCell(newHdCol);

                                if (header["FIELD_LABEL"] != null)
                                {
                                    cell.SetCellValue(header["FIELD_LABEL"].ToString());
                                    cell.CellStyle = style2;
                                }
                                newHdCol++;
                            }
                        }
                    }

                    #endregion

                    newRow++;

                    #region Bind data

                    foreach (JObject data in section["data"])
                    {
                        row = sheet1.CreateRow(newRow);

                        int newColData = 0;
                        int dataIndex = 0;

                        foreach (JObject header in section["header"])
                        {
                            if (section["title"].ToString() != "BASIC INFO DETAIL")
                            {
                                if (header["FIELD_NAME"] != null && data[header["FIELD_NAME"].ToString()] != null)
                                    row.CreateCell(newColData).SetCellValue(data[header["FIELD_NAME"].ToString()].ToString());

                                newColData++;
                            }
                            else
                            {
                                // Condition is used to display Basic info detail in two columns
                                if (dataIndex == 0 || dataIndex % 2 == 0)
                                {
                                    newColData = 0;

                                    if (dataIndex != 0)
                                        row = sheet1.CreateRow(newRow);

                                    newRow++;
                                } dataIndex++;

                                cell = row.CreateCell(newColData);

                                if (header["FIELD_LABEL"] != null)
                                    cell.SetCellValue(header["FIELD_LABEL"].ToString());

                                cell.CellStyle = style2;
                                newColData++;

                                if (header["FIELD_NAME"] != null && data[header["FIELD_NAME"].ToString()] != null)
                                    row.CreateCell(newColData).SetCellValue(data[header["FIELD_NAME"].ToString()].ToString());

                                newColData++;
                            }
                        }
                        newRow++;
                    }

                    #endregion

                    newRow++; newRow++;
                }

                // Set auto width for excel column
                for (int i = 0; i <= 20; i++)
                {
                    sheet1.AutoSizeColumn(i);
                    GC.Collect(); 
                }
            }
            catch
            {}            
        }

        private void InitializeWorkbook()
        {
            xssfworkbook = new XSSFWorkbook();
        }

        [ValidateInput(false)]
        [System.Web.Mvc.HttpPost]
        public void PDF(string exportUrl, string exportPDFFilename)
        {
            // Setting ABCPDF licence Key
            XSettings.InstallLicense("X/VKS0cNn5FhpydaGfTQKt+0efQWCtVwkfTQwuG 8WBxlkQ7GfiWiNq1RDWxxjAcIC9Es/zpbpChwyqo oSbJ1y1Q6Z2OeAHI9tGZLYdf9U03h1h3G5o9adrP FLGKub2slRr1yVsBU/kd9BSd6rC+GOFZYcDuMT2S k6utSxlw+S/nX2rs+t3TY9HHWordA5Fx0aBVA2Gx RzniOBxJiOrRZtWJjqlWFHMw+Rd3DGx/lcPvMJ0E xksGLRUdVmBKcFbyKoOlU50Q=");
            
            Doc doc = new Doc();

            // Engine to load HTML
            doc.HtmlOptions.Engine = EngineType.MSHtml;
            doc.HtmlOptions.UseScript = true;

            // Render after 3 seconds
            doc.HtmlOptions.OnLoadScript = "(function(){ window.ABCpdf_go = false; setTimeout(function(){ window.ABCpdf_go = true; }, 5000); })();";
            //doc.AddImageUrl("http://localhost:35150/html2pdf.html");
            //doc.AddImageUrl("http://localhost:35150/health.html");
            //doc.AddImageUrl(exportUrl);
            doc.AddImageUrl("http://www.google.com/");

            doc.Save(Server.MapPath("../") + "/PDF/html2pdf.pdf");

            Response.Clear();
            Response.ContentType = "application/pdf";
            Response.AppendHeader("Content-Disposition", "attachment; filename=" + exportPDFFilename);
            Response.TransmitFile(Server.MapPath("../") + "/PDF/html2pdf.pdf");
            Response.End();           
        }
    }
}