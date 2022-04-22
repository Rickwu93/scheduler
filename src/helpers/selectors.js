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