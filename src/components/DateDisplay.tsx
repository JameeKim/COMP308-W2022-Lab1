interface DateDisplayProps {
  date: Date;
}

const DateDisplay = ({ date }: DateDisplayProps): JSX.Element => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const endString = diff > 0 ? "later" : "ago";
  const absDiffSec = Math.abs(diff) / 1000;

  let display = "";
  let displayNum = absDiffSec;

  if (displayNum < 120) {
    display = displayNum < 2 ? "sec" : "secs";
  } else {
    displayNum /= 60;
  }

  if (!display && displayNum < 100) {
    display = "mins";
  } else if (!display) {
    displayNum /= 60;
  }

  if (!display && displayNum < 24) {
    display = displayNum < 2 ? "hr" : "hrs";
  } else if (!display) {
    displayNum /= 24;
    display = "days";
  }

  return <>{Math.floor(displayNum)} {display} {endString}</>;
};

export default DateDisplay;
