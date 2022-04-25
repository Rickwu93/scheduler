import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE"

export default function Appointment(props) {
 //if props.interview has a value, pass useVisualMode the SHOW mode, else pass EMPTY 
 
 const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }
  

  return (
    <article className="appointment">
    <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
  {mode === CREATE && (
    <Form 
    interviewers={props.interviewers} 
    onCancel={back}
    onSave={save}
    />
  )}

  {mode === SAVE && (
    <Status
      message={"Saving"}
    />
  )}
   </article>
  )
};