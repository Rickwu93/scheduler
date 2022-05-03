import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = 'SAVE';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
	//if props.interview has a value, pass useVisualMode the SHOW mode, else pass EMPTY
	//custom hook used to show <Appointment> components
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
	//calls the function to book on interview when user clicks save. Props pass to <Form> component
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVE);
		props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(() => transition(ERROR_SAVE, true));
	}
	//Passed as props to <Confirm> component and cancels the interview, returns visual of deleted interview
	function destroy() {
		transition(DELETE, true);

		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE, true));
	}
//visual mode component rendering
	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onCancel={back} onSave={save} />
			)}

			{mode === SAVE && <Status message={'Saving'} />}

			{mode === DELETE && <Status message={'Deleting'} />}

			{mode === CONFIRM && (
				<Confirm
					message="Are you sure you want to delete?"
					onConfirm={destroy}
					onCancel={back}
				/>
			)}

			{mode === EDIT && (
				<Form
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}

			{mode === ERROR_SAVE && (
				<Error message="There was an error saving." onClose={back} />
			)}

			{mode === ERROR_DELETE && (
				<Error message="There was an error deleting." onClose={back} />
			)}
		</article>
	);
}
