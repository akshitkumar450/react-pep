import React, { useRef } from "react";
import ResumePreview from './resumePreview'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { connect } from "react-redux";
import { db } from "../../firebase";

function Finalize({ education, contact, document, auth }) {
  // console.log(education, contact, document);
  const saveToDatabase = async () => {
    let user = await db
      .collection('users')
      .doc(auth.user.uid)
      .get()
    let userData = user.data()
    // console.log(userData);
    let obj;
    if (userData.resumeId) {
      obj = {
        ...user.resumeId,
        [document.id]: {
          education: education,
          contact: contact,
          document: document
        }
      }
    } else {
      obj = {
        [document.id]: {
          education: education,
          contact: contact,
          document: document
        }
      }
    }
    db.collection('users').doc(auth.user.uid).update({
      resumeId: obj
    })

  }
  const resumeRef = useRef()

  const downloadResume = () => {

    const resumeDownload = resumeRef.current
    html2canvas(resumeDownload)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save("resume.pdf");
      }).catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div className="container full finalize-page" >
      <div className="funnel-section ">
        <div className="finalize-preview-card " ref={resumeRef} >
          <ResumePreview
            contactSection={contact}
            educationSection={education}
            skinCode={document?.skinCode}
          />
        </div>
        <div className="finalize-settings center">
          <div className=" download-resume resume-options">
            <p className="no-margin"  >
              Download Resume As PdF
            </p>
            <a style={{ cursor: 'pointer' }} onClick={downloadResume}>download Resume</a>
          </div>
          <div className=" download-resume resume-options">
            <p className="no-margin"  >
              Save to Database
            </p>
            <a style={{ cursor: 'pointer' }} onClick={saveToDatabase}  >Save to Database</a>
          </div>
        </div>
      </div>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    education: state.education,
    document: state.document,
    contact: state.contact,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Finalize)
