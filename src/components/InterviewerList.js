import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const {value, onChange} = props
  // console.log(props)
  // console.log(props.interviewers)
  const interviewers = props.interviewers.map(inter => {
    return (
      <InterviewerListItem
      key={inter.id}
      name={inter.name}
      avatar={inter.avatar}
      selected={inter.id === value}
      setInterviewer={() => onChange(inter.id)}
      />
    )
  })
  
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
};