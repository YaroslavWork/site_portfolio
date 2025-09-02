import React from 'react'
import styles from './JobsContainer.module.css'
import BorderContainer from '../BorderContainer/BorderContainer'
import Job from '../Job/Job';


const renderYears = (minYear, maxYear, yearInPx) => {
    const yearElements = [];
    for (let year = maxYear; year >= minYear; year--) {
        yearElements.push(
            <div key={year} className={styles.yearBlock} style={{paddingBottom: `${yearInPx-30}px`}}>
                <p className={styles.yearCount}>{year}</p>
                <div className={styles.circle}></div>
            </div>
        );
    }
    return yearElements;
}


const renderJobs = (jobs, maxYear, yearInPx) => {
    const jobElements = [];
    jobs.map((job, index) => {
        const endYear = new Date(maxYear, 0, 1);
        const endDate = job.end_date === "Present" ? new Date() : new Date(job.end_date);

        const differenceInDays = (endYear.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24);
        const spaceInPx = differenceInDays / 365 * yearInPx;

        jobElements.push(
            <div key={index} className={styles.jobBlock} style={{ top: `${spaceInPx}px` }}>
                <Job
                    key={index}
                    title={job.title}
                    from={job.start_date}
                    to={job.end_date}
                    company={job.company}
                    place={job.place}
                    description={job.skills}
                />
            </div>  
        )
    })
    return jobElements;
}


const renderNowLine = (maxYear, nowText, yearInPx) => {
    const endYear = new Date(maxYear, 0, 1);
    const now = new Date();

    const differenceInDays = (endYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    let spaceInPx = differenceInDays / 365 * yearInPx + 15;

    if (now.getMonth() >= 6) {
        return (
            <div className={styles.nowBlock} style={{top: `${spaceInPx}px`}}>
                <div className={styles.nowLine}></div>
                <p className={styles.nowText}>{nowText}</p>
            </div>
        )
    } else {
        spaceInPx -= 20; // Minus .nowText height content
        return (
            <div className={styles.nowBlock} style={{top: `${spaceInPx}px`}}>
                <p className={styles.nowText}>{nowText}</p>
                <div className={styles.nowLine}></div>
            </div>
        )
    }
}


export default function JobsContainer({ title, noWorkDescription, nowText, ContactButton, jobs, yearInPx=200 }) {
  if (jobs.length === 0) {
    return (
        <BorderContainer>
            <div className={styles.topContainer}>
                <h1 className={styles.jobTitle}>{title}</h1>
                <p className={styles.noWork}>{noWorkDescription}</p>
                {ContactButton}
            </div>
        </BorderContainer>
    )
  }

  const now = new Date();
  const maxYear = now.getFullYear()+1;
  let minYear = now.getFullYear()

  jobs.map(job => {
    const jobStartDateYear = new Date(job.start_date);
    if (jobStartDateYear.getFullYear() < minYear) {
        minYear = jobStartDateYear.getFullYear();
    }
  })

  return (
    <BorderContainer>
        <div className={styles.topContainer}>
            <h1 className={styles.jobTitle}>{title}</h1>
        </div>
        <div className={styles.contentContainer}>
            {renderNowLine(maxYear, nowText, yearInPx)}
            <div className={styles.yearsCounter}>
                {renderYears(minYear, maxYear, yearInPx)}
                <div className={styles.yearTimeline} style={{height: `calc(100% - ${yearInPx}px)`}}></div>
            </div>
            <div className={styles.workBlocks}>
                {renderJobs(jobs, maxYear, yearInPx)}
            </div>
        </div>
    </BorderContainer>
  )
}