import { useState, useEffect } from 'react';
import axios from 'axios';

//keeper of all our functions, //state
export default function useApplicationData() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});
	//state updates the day
	const setDay = day => setState({ ...state, day });
	//api server data we bring in
	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers'),
		]).then(all => {
			setState(prev => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		})
	}, []);
  //to update the spots remaining counter when a slot is added/deleted
  const updateSpots = (state, appointments) => {
    let spots = 0;

    const weekday = state.days.find(weekday =>
      weekday.name === state.day);

    weekday.appointments.forEach(id => {
      const appointment = appointments[id];
      if (!appointment.interview)
        spots++
    })

    const day = { ...weekday, spots };
    const days = state.days.map(weekday =>
      weekday.name === state.day ? day : weekday)
    return days;
  } 
    
	//books interview to update database and the state counter
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

    
		// setState(state => ({ ...state, appointments})); //only updating our state locally
		return axios
			.put(`api/appointments/${id}`, { interview })
			.then(response => {
        const days = updateSpots(state, appointments)
        setState(state => ({ ...state, days, appointments }))});
	}

	//similar to bookInterview, cancels interview and updates the database and state counter
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};


		return axios
			.delete(`api/appointments/${id}`)
			.then(response => {
        const days = updateSpots(state, appointments)
        setState(state => ({ ...state, days, appointments }))});
	}
	//functions used in application.js we can import out
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
