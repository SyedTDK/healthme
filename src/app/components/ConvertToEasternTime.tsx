//Date conversion component


const ConvertToEasternTime = ({ utcDateString }: { utcDateString: string }) => {
  // Function to convert UTC date string to Eastern Time
  const convertToEastern = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour12: true // false for 24-hour format, true for AM/PM format
    });
  };

  // Convert the incoming UTC date string to Eastern Time
  const easternTime = convertToEastern(utcDateString);

  return (
    <span>{easternTime}</span>
  );
};

export default ConvertToEasternTime;