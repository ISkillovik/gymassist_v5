import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LineChartJS from "./LineChartJS";
import ParamInput from "../ParamInput";

const QuadLeft = ({ counter, data, newPaddedDate }) => {
  const updateHandleAdd = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.quadLeft": [...data.userGym.quadLeft, newPaddedDate, num],
    });
  };

  const inputDateValDoc = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.lastData.quadLeft": dateConverter(new Date()),
    });
  };

  const inputDateVal = data.userGym.lastData.quadLeft;

  const futureORequal = () => {
    if (inputDateVal != null && inputDateVal !== "") {
      let dateArr = inputDateVal.split("-");
      let inputDate = new Date(
        '"' + dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2] + '"'
      ).setHours(0, 0, 0, 0);

      let toDay = new Date().setHours(0, 0, 0, 0);

      return inputDate <= toDay;
    }
  };

  const dateConverter = (dateIn) => {
    dateIn.setHours(12);
    let dateIn10days = new Date(dateIn.setDate(dateIn.getDate() + 1));

    let strIn10Days =
      dateIn10days.getFullYear() +
      "-" +
      ("0" + (dateIn10days.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateIn10days.getDate()).slice(-2);

    return strIn10Days;
  };

  return (
    <div>
      <ParamInput
        inputDateVal={inputDateVal}
        inputDateValDoc={inputDateValDoc}
        futureORequal={futureORequal}
        metrix={"cm"}
        updateHandleAdd={updateHandleAdd}
        title={"Left quad"}
      />
      {data.userGym.quadLeft.length ? (
        <LineChartJS data={data.userGym.quadLeft} title={"Left quad"} />
      ) : (
        <p>xuy</p>
      )}
    </div>
  );
};

export default QuadLeft;
