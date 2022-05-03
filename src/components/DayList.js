import React from 'react';
import DayListItem from './DayListItem';
//sets the day list items and to show what objects are being passed down as props
export default function DayList(props) {
	const { days, value, setDay } = props;
	const dayList = days.map(day => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === value}
				setDay={setDay}
			/>
		);
	});

	return <ul>{dayList}</ul>;
}
