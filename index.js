const userName = document.getElementById("name");
const userDate = document.getElementById("date");
const userID = document.getElementById("userid");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

  submitBtn.addEventListener("click", () => {
    const val = capitalize(userName.value);
  
    //check if the text is empty or not
    if (val.trim() !== "" && userName.checkValidity()) {
      // console.log(val);
      generatePDF(val);
    } else {
      userName.reportValidity();
    }
  });

  submitBtn.addEventListener("click", () => {
    const val = capitalize(userDate.value);
  
    //check if the text is empty or not
    if (val.trim() !== "" && userDate.checkValidity()) {
      // console.log(val);
      generatePDF(val);
    } else {
      userDate.reportValidity();
    }
  });

  submitBtn.addEventListener("click", () => {
    const val = capitalize(userID.value);
  
    //check if the text is empty or not
    if (val.trim() !== "" && userID.checkValidity()) {
      // console.log(val);
      generatePDF(val);
    } else {
      userID.reportValidity();
    }
  });
  
    const generatePDF = async (name,date,userid) => {
      const existingPdfBytes = await fetch("./ecdl_cert.pdf").then((res) =>
        res.arrayBuffer()
      );
    

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draws the string name onto the certificate
  firstPage.drawText(name, {
    x: 480,
    y: 1180,
    size: 158,
    font: SanChezFont,
    color: rgb(0.0, 0.0, 0.0),
  });

  // Draws the string date onto the certificate
  // firstPage.drawText(date, {
  //   x: 180,
  //   y: 1180,
  //   size: 158,
  //   font: SanChezFont,
  //   color: rgb(0.0, 0.0, 0.0),
  // });
  
  // Draws the string userid onto the certificate
  // firstPage.drawText(userid, {
  //   x: 780,
  //   y: 1180,
  //   size: 158,
  //   font: SanChezFont,
  //   color: rgb(0.0, 0.0, 0.0),
  // });
  

// Save the PDFDocument and write it to a file
  const pdfBytes = await pdfDoc.save();

  // Done! 💥
  console.log("Done creating");


  var file = new File(
    [pdfBytes],
    "certification_of_completion_ecdl.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

