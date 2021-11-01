import React, { useState, useEffect, Fragment } from "react";
// import { Breadcrumb } from "matx";
import { Tabs, Tab, Card, TextField, InputLabel, Input, Button, Divider, FormControl, Select, MenuItem } from "@material-ui/core";
// import 'react-notifications/lib/notifications.css';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import { PDFDownloadLink, Document, Page, } from '@react-pdf/renderer';
import ShowCertificate from "./ShowCertificate";
import clsx from "clsx";
import { Autocomplete } from "@material-ui/lab";
import './Certificate.css'
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

const CertificateList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex1, setTabIndex1] = useState(0);
  const [url, setUrl] = useState('')
  const [issued, setIssued] = useState('')
  const [expired, setExpired] = useState('')
  const [id, setId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [pri, setPri] = useState("#2a5889")
  const [sec, setSec] = useState("#d98b5a")
  const [ter, setTer] = useState("#2a5889")
  const [title, setTitle] = useState('CERTIFICATE OF COMPLETION')
  const [aboveStudent, setAboveStudent] = useState('This is to certify that ')
  const [aboveCourse, setAboveCourse] = useState('Has completed all the requirements for ')
  const [showPage, setShowPage] = useState(true)

  const [center, setCenter] = useState('')
  const [left, setLeft] = useState('')
  const [full, setFull] = useState('')

  const [name, setName] = useState("");
  const certificateOptions = [
    {
      id: 1,
      label: 'center'
    },
    {
      id: 2,
      label: 'left'
    },
    {
      id: 3,
      label: 'full'
    }
  ]

  const handleCertifiacteOptions = (event, value) => {
    if (value !== null) {
      setName(value.label);
    }
  }
  useEffect(() => {
  }, []);

  const handleTabChange = async (e, value) => {
    setTabIndex(value);
  }
  const handleTabChange1 = async (e, value) => {
    setTabIndex1(value);
  }
  const showCenter = (e) => {
    setCenter(e.target.src);
    setLeft('');
    setFull('')
  }
  const showLeft = (e) => {
    setLeft(e.target.src);
    setCenter('')
    setFull('')
  }
  const showFull = (e) => {
    setFull(e.target.src)
    setLeft('');
    setCenter('')
  }
  // const MyDoc = () => (
  //   <Document>
  //     <Page size="A4" >
  //       <View>
  //         <Text>Section #1</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  function getRibbon() {
    if (localStorage.getItem('userLoginRole') === "5") {
      return (
        <div className="flex mmx-auto mb-4 elevation-z1 mt-5">
          <Button
            className={clsx({
              "border-radius-0 card flex-grow": true
            })}
            variant="outlined"
            color="primary"
            onClick={() => setShowPage(true)}
            style={{ fontSize: '16px', textDecoration: 'bold' }}
          >
            Edit
          </Button>
          <Button
            className={clsx({
              "border-radius-0 card flex-grow": true
            })}
            variant="outlined"
            color="primary"
            onClick={() => setShowPage(false)}
            style={{ fontSize: '16px', textDecoration: 'bold' }}
          >
            Pdf
          </Button>
        </div>
      )
    } else {
      return null;
    }
  }

  // const names = ['center', 'left', 'full']

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  const certificateRef = useRef()

  const downloadCertificate = () => {
    const certificateDownload = certificateRef.current
    html2canvas(certificateDownload)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 15, 40, 200, 140);
        // pdf.output('dataurlnewwindow');
        pdf.save("certificate.pdf");
      }).catch(function (error) {
        console.log(error)
      })
  }


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        {/*<Breadcrumb
          routeSegments={[
            { name: "Certificate" },
          ]}
        />*/}
        {getRibbon()}
      </div>
      <Button
        className={clsx({
          "border-radius-0 card flex-grow": true
        })}
        variant="outlined"
        color="primary"
        onClick={downloadCertificate}
        style={{ fontSize: '16px', textDecoration: 'bold' }}
      >
        download Pdf
      </Button>
      {
        showPage
          ?
          <React.Fragment>
            <Card className="bnew p-8">
              <div className="card-title capitalize mb-4"><strong>
                <h3 className='mb-3'>Edit Certificate</h3></strong>
                <Divider className="mb-8" />
                <br />
                <div>
                  <TextField
                    className="mr-4 mb-4"
                    style={{ width: '50%' }}
                    label="Certificate Name"
                    variant="outlined"
                    size="small"
                  >
                  </TextField>
                  <Button color="primary" className="mb-4" variant="contained"
                    style={{
                      height: '40px'
                    }}>
                    Save
                  </Button>
                </div>

                <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary">
                    Upload Logo
                  </Button>
                  <p className='ml-3'>Note: Upload your logo to replace EZ Colab logo</p>
                </div>
              </div>

              {
                /**
                 * 
                 <FormControl variant="outlined" style={{ width: '300px' }}>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  value={name}
                  onChange={handleName}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value='Choose Certificate Name'> Choose Certificate Name</MenuItem>
                  {names.map((name, idx) => (
                    <MenuItem value={name} key={idx}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                 */
              }

              <Autocomplete
                className="mb-4 mt-4 w-400"
                options={certificateOptions}
                getOptionLabel={option => option.label}
                onChange={handleCertifiacteOptions}
                value={certificateOptions.find(v => v.label === name) || {}}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Choose Certificate Style"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <Tabs
                className="mt-4 mb-6"
                value={tabIndex1}
                onChange={handleTabChange1}
                indicatorColor="secondary"
                textColor="#18243A"
              >
                {tabList1.map((item, ind) => (
                  <Tab
                    className="capitalize"
                    value={ind}
                    label={item}
                    key={ind}
                    style={{ fontSize: '16px', textDecoration: 'bold' }}
                  />
                ))}
              </Tabs>

              <div style={{ marginTop: '30px' }}>
                <h4 style={{ textAlign: 'center' }} >Certificate Preview</h4>
                <br />
                <div className='content'>
                  <div ref={certificateRef}>
                    {
                      (name === 'center' || name === 'left' || name === 'full')
                        ?
                        <ShowCertificate
                          srcCenter={center}
                          srcLeft={left}
                          srcFull={full}
                          issued={issued}
                          expired={expired}
                          id={id}
                          studentName={studentName}
                          courseName={courseName}
                          pri={pri}
                          sec={sec}
                          ter={ter}
                          title={title}
                          aboveCourse={aboveCourse}
                          aboveStudent={aboveStudent}
                        />
                        :
                        <ShowCertificate
                          srcCenter='/Assets/center-template-2.jpg'
                          issued={issued}
                          expired={expired}
                          id={id}
                          studentName={studentName}
                          courseName={courseName}
                          pri={pri}
                          sec={sec}
                          ter={ter}
                          title={title}
                          aboveCourse={aboveCourse}
                          aboveStudent={aboveStudent}
                        />
                    }

                    {/**
                      (name === 'center' && center === '' && name !== 'left' && name !== 'full')
                      &&
                      <ShowCertificate
                        srcCenter='/Assets/center-template-1.jpg'
                        issued={issued}
                        expired={expired}
                        id={id}
                        studentName={studentName}
                        courseName={courseName}
                        pri={pri}
                        sec={sec}
                        ter={ter}
                        title={title}
                        aboveCourse={aboveCourse}
                        aboveStudent={aboveStudent}
                      />
                    */ }

                    { /*
                      (name === 'left' && left === '' && name !== 'center' && name !== 'full')
                      &&
                      <ShowCertificate
                        srcLeft='/Assets/leftImg-template-2.jpg'
                        issued={issued}
                        expired={expired}
                        id={id}
                        studentName={studentName}
                        courseName={courseName}
                        pri={pri}
                        sec={sec}
                        ter={ter}
                        title={title}
                        aboveCourse={aboveCourse}
                        aboveStudent={aboveStudent}
                      />
                    */ }

                    {/*
                      (name === 'full' && full === '' && name !== 'center' && name !== 'left')
                      &&
                      <ShowCertificate
                        srcFull='/Assets/full-template-1.jpg'
                        issued={issued}
                        expired={expired}
                        id={id}
                        studentName={studentName}
                        courseName={courseName}
                        pri={pri}
                        sec={sec}
                        ter={ter}
                        title={title}
                        aboveCourse={aboveCourse}
                        aboveStudent={aboveStudent}
                      />
                    */ }

                    <br />
                    <br />
                  </div>
                  {
                    tabIndex1 === 0 && (
                      <React.Fragment>
                        {
                          name &&
                          <Fragment>
                            <h4>Choose Pre-Built Templates</h4>
                            <Divider className="mb-8" />
                          </Fragment>
                        }
                        <div className='thumbnails'
                        >
                          {
                            name === 'center' && (
                              <Fragment>
                                <img
                                  style={{ display: 'block' }}
                                  src="/Assets/center-template-1.jpg"
                                  onClick={(e) => showCenter(e)}
                                  width='250' alt=""
                                />
                                <img
                                  style={{ display: 'block' }}
                                  src="/Assets/center-template-2.jpg"
                                  onClick={(e) => showCenter(e)}
                                  width='250' alt=""
                                />
                                <img
                                  style={{ display: 'block' }}
                                  src="/Assets/center-template-3.jpg"
                                  onClick={(e) => showCenter(e)}
                                  width='250' alt=""
                                />

                              </Fragment>
                            )

                          }
                          {
                            name === 'full' &&
                            <Fragment>
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/full-template-1.jpg"
                                onClick={(e) => showFull(e)}
                                width='250' alt=""
                              />
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/full-template-2.jpg"
                                onClick={(e) => showFull(e)}
                                width='250' alt=""
                              />
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/full-template-3.jpg"
                                onClick={(e) => showFull(e)}
                                width='250' alt=""
                              />
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/full-template-4.jpg"
                                onClick={(e) => showFull(e)}
                                width='250' alt=""
                              />
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/full-template-5.jpg"
                                onClick={(e) => showFull(e)}
                                width='250' alt=""
                              />
                            </Fragment>
                          }

                          {
                            name === 'left' &&
                            <Fragment>
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/left-template-1.jpg"
                                onClick={(e) => showLeft(e)}
                                width='250' alt=""
                              />

                              <img
                                style={{ display: 'block' }}
                                src="/Assets/left-template-2.jpg"
                                onClick={(e) => showLeft(e)}
                                width='250' alt=""
                              />
                              <img
                                style={{ display: 'block' }}
                                src="/Assets/left-template-3.jpg"
                                onClick={(e) => showLeft(e)}
                                width='250' alt=""
                              />
                            </Fragment>
                          }

                        </div>
                        {
                          (name === 'center' || name === 'left' || name === 'full') &&
                          <div className="mt-4">
                            <Button
                              variant="contained"
                              color="primary">
                              Upload Custom Background Image
                            </Button>
                          </div>
                        }

                      </React.Fragment>
                    )
                  }
                  {
                    tabIndex1 === 1 && (
                      <React.Fragment>
                        {
                          name &&
                          <Fragment>
                            <h4>Customize Certificate Content</h4>
                            <Divider className="mb-8" />
                          </Fragment>
                        }

                        <div className='certificate__inputs'>
                          {
                            (name === 'center' || name === 'left' || name === 'full') &&
                            <Fragment>
                              <div>
                                <InputLabel
                                  htmlFor='Issue Date'
                                  style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>Issue Date
                                </InputLabel>

                                <TextField
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  variant="outlined"
                                  size="small"
                                  id="Issue Date"
                                  value={issued}
                                  onChange={(e) => setIssued(e.target.value)}
                                />
                              </div>

                              <div>
                                <InputLabel
                                  htmlFor='Expiry Date'
                                  style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Expiry Date (Optional)
                                </InputLabel>

                                <TextField
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  variant="outlined"
                                  size="small"
                                  id="Expiry Date"
                                  value={expired}
                                  onChange={(e) => setExpired(e.target.value)}
                                />
                              </div>

                              <div>
                                <InputLabel htmlFor='Certificate-Id'
                                  style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Certificate Id (Generated Automatically)
                                </InputLabel>

                                <TextField
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  id="Certificate-Id"
                                  variant="outlined"
                                  value={id}
                                  onChange={(e) => setId(e.target.value)} />
                              </div>

                              <div>
                                <InputLabel
                                  htmlFor='student-name'
                                  style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Student Name
                                </InputLabel>

                                <TextField
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  id="Certificate-Id"
                                  variant="outlined"
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)} />
                              </div>

                              <div>
                                <InputLabel
                                  htmlFor='course-name' style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Course Name
                                </InputLabel>

                                <TextField
                                  id="course-name"
                                  variant="outlined"
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  value={courseName}
                                  onChange={(e) => setCourseName(e.target.value)}
                                />
                              </div>

                              <div>
                                <InputLabel
                                  htmlFor='title' style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Title
                                </InputLabel>

                                <TextField
                                  id="title"
                                  variant="outlined"
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                              <div>
                                <InputLabel
                                  htmlFor='above student name' style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Text above student name
                                </InputLabel>

                                <TextField
                                  id='above student name'
                                  variant="outlined"
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  value={aboveStudent}
                                  onChange={(e) => setAboveStudent(e.target.value)}
                                />
                              </div>

                              <div>
                                <InputLabel
                                  htmlFor='above course name' style={{ marginLeft: '12px', fontSize: '16px', color: 'black' }}>
                                  Text above course name
                                </InputLabel>

                                <TextField
                                  id='above course name'
                                  variant="outlined"
                                  className="mr-4 mb-4"
                                  style={{ width: '50%' }}
                                  size="small"
                                  value={aboveCourse}
                                  onChange={(e) => setAboveCourse(e.target.value)}
                                />
                              </div>
                            </Fragment>
                          }
                        </div>
                      </React.Fragment>
                    )
                  }

                  {
                    tabIndex1 === 2 && (
                      <React.Fragment>
                        {
                          name &&
                          <Fragment>
                            <h4>Customize Certificate Design</h4>
                            <Divider className="mb-8" />
                          </Fragment>
                        }

                        {
                          (name === 'center' || name === 'left' || name === 'full') &&
                          <div className='certificate__colors'>
                            <div>
                              <InputLabel htmlFor='primary-color' style={{
                                fontSize: '16px', color: 'black'
                              }}>Primary Color:</InputLabel>
                              < Input id='primary-color' type="color" value={pri} onChange={(e) => setPri(e.target.value)} className='color__picker' />
                            </div>
                            <div>
                              <InputLabel htmlFor='secondary-color' style={{
                                fontSize: '16px', color: 'black'
                              }}>Secondary Color:</InputLabel>

                              <Input type="color" id='secondary-color' value={sec} onChange={(e) => setSec(e.target.value)} className='color__picker' />
                            </div>
                            <div>
                              <InputLabel htmlFor='tertiary-color' style={{
                                fontSize: '16px', color: 'black'
                              }}>Tertiary Color:</InputLabel>
                              <Input type="color" id='tertiary-color' value={ter} onChange={(e) => setTer(e.target.value)} className='color__picker' />
                            </div>
                          </div>
                        }

                      </React.Fragment>
                    )
                  }

                  {
                    (name === 'center' || name === 'left' || name === 'full') &&
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <Button
                        color="primary" className="mb-4" variant="contained"
                      >
                        Save Certificate
                      </Button>
                    </div>
                  }
                </div>
              </div>
            </Card>
          </React.Fragment>
          :
          <React.Fragment>
            {
              /**
               * 
                <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                          </PDFDownloadLink>
               */
            }

          </React.Fragment>
      }
      {/** <NotificationContainer />*/}
    </div>
  );
};

const tabList = ["Edit", "PDF"];
const tabList1 = ['Template', 'Content', 'Design'];

export default CertificateList;
