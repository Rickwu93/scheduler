import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {
  
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //updates the state with the new day. creates new object with all of the existing key states
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setDays = days => setState({ ...state, days });

  useEffect(() => {
    Promise.all([
    axios.get("/api/days"),
    axios.get("api/appointments"),
    axios.get("api/interviewers")
  ]).then(all => {
      console.log(all, 'all')
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
}, []);

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  }

  const appointments = {
    ...state.appointments,
    [id]: appointment
  }
// setState(state => ({ ...state, appointments})); //only updating our state locally
// console.log(interview, "interviewww")
return axios.put(`api/appointments/${id}`, {interview})
  .then(response => setState(state => ({ ...state, appointments })));
}

const dailyAppointments = getAppointmentsForDay(state, state.day);
// console.log(dailyAppointments, 'bbbb')
const schedule = dailyAppointments.map((appointment) => {

  const interviewers = getInterviewersForDay(state, state.day);
  const interview = getInterview(state, appointment.interview);

  // console.log(appointment, 'hello')
  // console.log(interviewers, 'interviewers')
  // console.log(interview, 'interview')

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {schedule}
      </section>
    </main>
  );
}
