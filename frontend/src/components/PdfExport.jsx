import jsPDF from "jspdf";

export default function PdfExport({

review

}) {

  const generatePDF = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(
      18
    );

    doc.text(

      "CodeRefine Report",

      20,

      20

    );

    doc.setFontSize(
      14
    );

    doc.text(

      "Summary:",

      20,

      40

    );

    doc.text(

      review.summary,

      20,

      50

    );

    doc.text(

      "Optimized Code:",

      20,

      80

    );

    doc.text(

      review.optimized_code,

      20,

      90

    );

    doc.save(

      "CodeRefine_Report.pdf"

    );

  };

  return (

    <button

      className="
      bg-purple-600
      hover:bg-purple-700
      px-4
      py-2
      rounded-lg
      "

      onClick={
        generatePDF
      }

    >

      Export PDF

    </button>

  );

}