import { useState } from 'react';

export default function useVisualMode(initial) {
	const [history, setHistory] = useState([initial]);

	function transition(mode, replace = false) {
		// const newHistory = [...history];
		//if transition (THIRD, true) is true: Transition to THIRD by REPLACING SECOND
		//if true, set history to reflect that we are replacing the current mode

		//if replace is false we want to set the history to the prev page and show the page as it is before(mode)
		if (!replace) {
			setHistory(prev => {
				return [...prev, mode];
			});
		}
			setHistory(prev => {
			return [...prev.slice(0, -1), mode];
		});
	}

	//should not allow user to go back to initial mode if length of history is greater than 1
	//going back won't change the mode view
	//In error mode, when closing error message it should transition back to Form view instead of show
	const back = () => {
		if (history.length > 1) {
			setHistory(prev => {
				return [...prev.slice(0, -1)];
			});
		}
	};

	//mode is always last item of the history array
	return { mode: history[history.length - 1], transition, back };
}
