import { useState } from 'react';

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	function transition(mode, replace = false) {
		const newHistory = [...history];
		//if transition (THIRD, true) is true: Transition to THIRD by REPLACING SECOND
		//if true, set history to reflect that we are replacing the current mode

		if (replace) {
			newHistory.pop();
		}

		setMode(mode);
		newHistory.push(mode);
		setHistory(newHistory);
	}

	//should not allow user to go back to initial mode if length of history is greater than 1
	//going back won't change the mode view
	const back = () => {
		setHistory(history => {
			const newHistory =
				history.length > 1 ? [...history].slice(0, -1) : [...history];
			setMode(newHistory[newHistory.length - 1]);
			return newHistory;
		});
	};
  //functions used in appointment/index.js
	return { mode, transition, back };
}
