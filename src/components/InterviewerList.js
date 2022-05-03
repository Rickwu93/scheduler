import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 
//builds interviewer list items(name, image) and renders it below
export default function InterviewerList(props) {
  const {value, onChange} = props
 
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
}
//prop type restrictions to only accept certain types of data
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};