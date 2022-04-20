import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  function formatSpot () {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`
    }
  }

  let dayClass = classNames("day-list__item", 
  {"day-list__item--selected": props.selected, 
  "day-list__item--full": props.spots === 0})

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpot()}</h3>
    </li>
  );
}
