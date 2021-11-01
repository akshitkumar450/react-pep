import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import ResumePreview from './resumePreview'
import { skinCodes, fieldCd } from './../../constants/typeCodes';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setEducation, updateEducation } from "../../redux/actions/educationAction";
import { useEffect } from "react";

function Education({ education, setEducation, updateEducation, contact, document }) {
  let history = useHistory();

  // default value will be null from redux store
  const [educationFormValues, setEducationFormValues] = useState(education);

  useEffect(() => {
    if (document.id === null) {
      history.push('/getting-started')
    }
  }, [document, history])

  const onchange = (event) => {
    var key = event.target.name;
    var val = event.target.value;
    setEducationFormValues({ ...educationFormValues, [key]: val })
  }
  const getFieldData = (key) => {
    if (educationFormValues && educationFormValues[key]) {
      return educationFormValues[key]
    }
    return "";
  }
  const onSubmit = async (e) => {
    if (education !== null) {
      updateEducation(educationFormValues);
    } else {
      setEducation(educationFormValues);
    }
    history.push('/finalize')
  }


  return (
    <div className="container med education" >
      <div className="section funnel-section">
        <div className="form-card">
          <h2 className="form-heading center">Educational Section</h2>
          <div className="form-section">
            <div className="input-group"><label>College Name</label>
              <div className="effect"><input type="text" name={fieldCd.SchoolName}
                onChange={onchange} value={getFieldData(fieldCd.SchoolName)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group"><label>Degree</label>
              <div className="effect"><input type="text" name={fieldCd.Degree}
                onChange={onchange} value={getFieldData(fieldCd.Degree)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group"><label>CGPA</label>
              <div className="effect"><input type="text" name={fieldCd.GraduationCGPA}
                onChange={onchange} value={getFieldData(fieldCd.GraduationCGPA)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group"><label>City/State</label>
              <div className="effect"><input type="text" name={fieldCd.City}
                onChange={onchange} value={getFieldData(fieldCd.City)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group"><label>Graduation Month</label>
              <div className="effect"><input type="text" name={fieldCd.GraduationDate}
                onChange={onchange} value={getFieldData(fieldCd.GraduationDate)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="input-group"><label>Graduation Year</label>
              <div className="effect"><input type="text" name={fieldCd.GraduationYear}
                onChange={onchange} value={getFieldData(fieldCd.GraduationYear)} /><span></span>
              </div>
              <div className="error"></div>
            </div>

            <div className="form-buttons">
              <button className="btn hvr-float-shadow" type='button' onClick={onSubmit}>Next</button>
              <NavLink to='/contact' className="center">Back</NavLink>
            </div>
          </div>
        </div>
        <div className="preview-card">
          <ResumePreview
            contactSection={contact}
            educationSection={educationFormValues}
            skinCode={document?.skinCode}
          />
        </div>
      </div>
    </div >
  );
}


const mapStateToProps = (state) => {
  return {
    education: state.education,
    document: state.document,
    contact: state.contact
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEducation: (educationFormValues) => dispatch(setEducation(educationFormValues)),
    updateEducation: (educationFormValues) => dispatch(updateEducation(educationFormValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Education)

