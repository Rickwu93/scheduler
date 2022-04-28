export function getAppointmentsForDay(state, day) {
 
  const dayObject = state.days.find(element => element.name === day);

  if (!dayObject) {
    return [];
  }

  const appointmentId = dayObject.appointments;
  const output = [];

  for (const id in state.appointments) {
    if (appointmentId.includes(Number(id))) {
      output.push(state.appointments[id]);
    }
  }
return output;
};

export function getInterviewersForDay(state, day) {
 
  const dayObject = state.days.find(element => element.name === day);

  if (!dayObject) {
    return [];
  }

  const interviewerId = dayObject.interviewers;
  
  const stateInterviewers = interviewerId.map((id) => {
    return state.interviewers[id]
  })
return stateInterviewers
};

//returns interview object for each specific time slot
export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewer = state.interviewers[interview.interviewer];

  const outputObj = {
    student: interview.student,
    interviewer
  }
  return outputObj;
};