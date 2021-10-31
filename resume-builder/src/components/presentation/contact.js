import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fieldCd } from '../../constants/typeCodes';
import { useHistory } from "react-router-dom";
import ResumePreview from './resumePreview'
import { setContact, updateContact } from "../../redux/actions/contactAction";
import { connect } from "react-redux";

function Contact({ contact, setContact, updateContact, document }) {
    let history = useHistory();

    // default value will be null from redux store
    const [contactFormValues, setContactFormValues] = useState(contact);

    // we can visit only this page if there is the document id present
    useEffect(() => {
        if (document.id === null) {
            history.push('/getting-started')
        }
    }, [document, history])


    const onchange = (event) => {
        var key = event.target.name;
        var val = event.target.value;
        setContactFormValues({ ...contactFormValues, [key]: val })
    }

    const onSubmit = () => {
        if (contact !== null) {
            // we have come to this page earlier then update only
            updateContact(contactFormValues);
        } else {
            //first time visit to page
            setContact(contactFormValues);
        }
        history.push('/education');
    }

    const getFieldData = (key) => {
        if (contactFormValues && contactFormValues[key]) {
            return contactFormValues[key]
        }
        return "";
    }

    return (
        <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Personal Details</h2>
                    <div className="form-section">
                        <div className="input-group">
                            <label>First Name</label>
                            <div className="effect">
                                <input type="text"
                                    name={fieldCd.FirstName}
                                    value={getFieldData(fieldCd.FirstName)}
                                    onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Last Name</label>
                            <div className="effect"><input type="text" name={fieldCd.LastName} value={getFieldData(fieldCd.LastName)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group full"><label>Professional Summary</label>
                            <div className="effect"><input type="text" name={fieldCd.ProfSummary} value={getFieldData(fieldCd.ProfSummary)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Email</label>
                            <div className="effect"><input type="text" name={fieldCd.Email} value={getFieldData(fieldCd.Email)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Phone</label>
                            <div className="effect"><input type="text" name={fieldCd.Phone} value={getFieldData(fieldCd.Phone)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Profession</label>
                            <div className="effect"><input type="text" name={fieldCd.Profession} value={getFieldData(fieldCd.Profession)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Street</label>
                            <div className="effect"><input type="text" name={fieldCd.Street} value={getFieldData(fieldCd.Street)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>City</label>
                            <div className="effect"><input type="text" name={fieldCd.City} value={getFieldData(fieldCd.City)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>State</label>
                            <div className="effect"><input type="text" name={fieldCd.State} value={getFieldData(fieldCd.State)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Country</label>
                            <div className="effect"><input type="text" name={fieldCd.Country} value={getFieldData(fieldCd.Country)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Pin Code</label>
                            <div className="effect"><input type="text" name={fieldCd.ZipCode} value={getFieldData(fieldCd.ZipCode)} onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Next</button>
                            <NavLink to='/getting-started' className="center">Back</NavLink>
                        </div>
                    </div>
                </div>

                <div className="preview-card">
                    <ResumePreview
                        contactSection={contact}
                        skinCode={document?.skinCode}
                    />
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        contact: state.contact,
        document: state.document
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setContact: (contactFormValues) => dispatch(setContact(contactFormValues)),
        updateContact: (contactFormValues) => dispatch(updateContact(contactFormValues))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact)

