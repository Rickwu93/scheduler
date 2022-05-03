import React from 'react';
import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';
//functions to import in from useApplicationData from our custom hook
export default function Application() {
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();
//gets the appointment for the day
	const dailyAppointments = getAppointmentsForDay(state, state.day);
//mapping through the array in the <Appointment> component to return the appointment slot for the interview
	const schedule = dailyAppointments.map(appointment => {
		const interviewers = getInterviewersForDay(state, state.day);
		const interview = getInterview(state, appointment.interview);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
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
					<DayList days={state.days} value={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{schedule}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
