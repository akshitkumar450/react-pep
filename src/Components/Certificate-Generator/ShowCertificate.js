import React from 'react'

function ShowCertificate({ srcCenter, srcLeft, srcFull, issued, expired, id, studentName, courseName, pri, sec, ter, title, aboveStudent, aboveCourse }) {
    // console.log('left', srcLeft);
    // console.log('center', srcCenter);
    // console.log('full', srcFull);
    return (
        <>
            {
                srcCenter && (
                    <div className='certificate__container'>
                        <div className='certificate__img'>
                            <img
                                src={srcCenter ? srcCenter : '/assets/images/certificates/center-template-2.jpg'} alt="certificate-background"
                            />
                        </div>

                        <div className='certificate__info--center'>
                            <div className='certificate__headers--center'>
                                <h3>{title}</h3>
                                <div style={{ margin: '50px 0' }}>
                                    <h5>{aboveStudent}</h5>
                                    <h2
                                        style={{
                                            color: pri ? pri : 'black'
                                        }}>
                                        {studentName ? studentName : '{student name}'}
                                    </h2>
                                </div>

                                <div >
                                    <h5>{aboveCourse}</h5>
                                    <h2
                                        style={{
                                            color: sec ? sec : 'black'
                                        }}>
                                        {courseName ? courseName : '{course name}'}
                                    </h2>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src='/assets/images/logos/EZ-logo.png' alt='logo' className='logo--center' />
                            </div>
                            <div className='certificate__fields--center'
                                style={{
                                    color: ter ? ter : 'black'
                                }}>
                                <p>Issued Date :{issued ? issued : '{Issued Date}'}</p>
                                <p>Expired Date:{expired ? expired : '{Expired Date}'}</p>
                                <p>Certificate Id:{id ? id : '{Certificate Id}'}</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                srcLeft &&
                <div className='certificate__container'>
                    <div className='certificate__img'>
                        <img
                            src={srcLeft ? srcLeft : '/assets/images/certificates/center-template-2.jpg'} alt="certificate-background"
                        />
                    </div>

                    <div className='certificate__info--left'>
                        <div className='certificate__headers--left'>
                            <h3>{title}</h3>
                            <div style={{ margin: '50px 0' }}>
                                <h5>{aboveStudent}</h5>
                                <h2
                                    style={{
                                        color: pri ? pri : 'black'
                                    }}>
                                    {studentName ? studentName : '{student name}'}
                                </h2>
                            </div>

                            <div >
                                <h5>{aboveCourse}</h5>
                                <h2
                                    style={{
                                        color: sec ? sec : 'black'
                                    }}>
                                    {courseName ? courseName : '{course name}'}
                                </h2>
                            </div>
                        </div>

                        <div>
                            <img src='/assets/images/logos/EZ-logo.png' alt='logo' className='logo--left' />
                        </div>
                        <div className='certificate__fields--left'
                            style={{
                                color: ter ? ter : 'black'
                            }}>
                            <p>Issued Date :{issued ? issued : '{Issued Date}'}</p>
                            <p>Expired Date:{expired ? expired : '{Expired Date}'}</p>
                            <p>Certificate Id:{id ? id : '{Certificate Id}'}</p>
                        </div>
                    </div>
                </div>
            }

            {
                srcFull &&
                <div className='certificate__container'>
                    <div className='certificate__img'>
                        <img
                            src={srcFull ? srcFull : '/assets/images/certificates/center-template-2.jpg'} alt="certificate-background"
                        />
                    </div>

                    <div className='certificate__info--full'>
                        <div className='certificate__headers--full'>
                            <h3>{title}</h3>
                            <div style={{ margin: '50px 0' }}>
                                <h5>{aboveStudent}</h5>
                                <h2
                                    style={{
                                        color: pri ? pri : 'black'
                                    }}>
                                    {studentName ? studentName : '{student name}'}
                                </h2>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                            <div>
                                <h5>{aboveCourse}</h5>
                                <h2
                                    style={{
                                        color: sec ? sec : 'black'
                                    }}>
                                    {courseName ? courseName : '{course name}'}
                                </h2>
                            </div>
                            <div>
                                <img src='/assets/images/logos/EZ-logo.png' alt='logo' className='logo--full' />
                            </div>
                        </div>
                    </div>
                    <div className='certificate__fields--full'
                        style={{
                            color: ter ? ter : 'black'
                        }}>
                        <p>Issued Date :{issued ? issued : '{Issued Date}'}</p>
                        <p>Expired Date:{expired ? expired : '{Expired Date}'}</p>
                        <p>Certificate Id:{id ? id : '{Certificate Id}'}</p>
                    </div>
                </div>
            }

        </>
    )

}

export default ShowCertificate
