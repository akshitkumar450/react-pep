import React from 'react';
import { skinCodes } from '../../constants/typeCodes';
// import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setDocument, updateDocument } from '../../redux/actions/documentActions';
import { connect } from 'react-redux';

function GettingStarted({ document, setDocument, updateDocument }) {
    let history = useHistory();

    const onChange = (skinCode) => {
        if (document.id !== null) {
            //means we have come to this page earlier also 
            //then we will update the skin code
            updateDocument(skinCode);
        } else {
            // we have not come to this page
            // so set the document 
            setDocument(skinCode);
        }
        history.push('/contact');
    }

    return (
        <div className="container med gettingStarted">
            <div className="section">
                <h1 className=" center">
                    Select a resume template to get started</h1>
                <p className=" center">
                    You’ll be able to edit and change this template later!
                </p>
                <div className="styleTemplate ">
                    {
                        skinCodes.map((skinCode, index) => {
                            return (
                                <div key={index} className="template-card rounded-border">
                                    <i className={(skinCode === 'demo-value' ? 'selected fa fa-check' : 'hide')}></i>
                                    <img
                                        className=''
                                        src={'/images/' + skinCode + '.svg'}
                                        alt=''
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onChange(skinCode)}
                                        className='btn-select-theme'>
                                        USE TEMPLATE
                                    </button>
                                </div>);

                        })
                    }
                </div>

            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        document: state.document
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDocument: (skinCode) => dispatch(setDocument(skinCode)),
        updateDocument: (skinCode) => dispatch(updateDocument(skinCode))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted)

