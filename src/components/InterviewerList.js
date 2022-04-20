import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(inter => {
    return (
      <InterviewerListItem
      key={inter.id}
      name={inter.name}
      avatar={inter.avatar}
      id={inter.id}
      selected={props.interviewer === inter.id}
      setInterviewer={props.setInterviewer}
      />
    )
  })
  
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
};