import { useState, useEffect } from 'react';
import axios from 'axios';
const { getAppointmentsForDay } = require('helpers/selectors');

export default function useApplicationData() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = day => setState({ ...state, day });

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
		});
	}, []);
  //to update the spots remaining counter
  const remainingSpotsCounter = (state, appointments) => {
    
    const initialState = {...state, appointments}
    const numOfAppointments = getAppointmentsForDay(initialState, state.day)

    let spotsRemaining = 0;
    for (const numOfAppointment of numOfAppointments) {
      if (!numOfAppointment.interview) {
        spotsRemaining ++;
      }
    }
    for (const day of initialState.days) {
      if (day.name === state.day) {
        day['spots'] = spotsRemaining
      }
    }
  };
    


	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

    remainingSpotsCounter(state, appointments);
		// setState(state => ({ ...state, appointments})); //only updating our state locally
		return axios
			.put(`api/appointments/${id}`, { interview })
			.then(response => setState(state => ({ ...state, appointments })));
	}

	//similar to bookInterview
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

    remainingSpotsCounter(state, appointments);

		return axios
			.delete(`api/appointments/${id}`)
			.then(response => setState(state => ({ ...state, appointments })));
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}
