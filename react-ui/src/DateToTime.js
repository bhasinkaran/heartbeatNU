const DatetoTime = (input) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let temp;
        let date = new Date(input);
        temp = (months[(date).getMonth()]) + " " + (date).getDate().toString()+" ";
        let HH, MM, AP;
        if (date.getHours() >= 12) {
          HH = ((date).getHours().toString() - 12)
          AP = "PM";
        }
        else {
          HH = ((date).getHours().toString())
          AP = "AM";
        }
        if (date.getMinutes() < 10) {
          MM = + "0" + date.getMinutes().toString();
        } else {
          MM = date.getMinutes().toString();
        }
        temp = temp + HH + ":" + MM + AP;
        return temp;
      }
export default DatetoTime;