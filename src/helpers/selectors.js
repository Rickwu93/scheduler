export function getAppointmentsForDay(state, day) {
 
  const dayArray = state.days.find(element => element.name === day);

  if (!dayArray) {
    return [];
  }

  const appointmentObject = dayArray.appointments;
  const output = [];

  for (const id in state.appointments) {
    if (appointmentObject.includes(Number(id))) {
      output.push(state.appointments[id])
    }
  }
return output;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewer = state.interviewers[interview.interviewer];

  const outputObj = {
    student: interview.student,
    interviewer
  }
  return outputObj;
}