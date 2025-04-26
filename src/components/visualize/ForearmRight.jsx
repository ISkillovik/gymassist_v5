import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LineChartJS from "./LineChartJS";
import ParamInput from "../ParamInput";

const ForearmRight = ({ counter, data, newPaddedDate }) => {
  const updateHandleAdd = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.forearmRight": [
        ...data.userGym.forearmRight,
        newPaddedDate,
        num,
      ],
    });
  };

  const inputDateValDoc = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.lastData.forearmRight": dateConverter(new Date()),
    });
  };

  const inputDateVal = data.userGym.lastData.forearmRight;

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
    let dateIn10days = new Date(dateIn.setDate(dateIn.getDate() + 14));

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
        title={"Right forearm"}
      />
      {data.userGym.forearmRight.length ? (
        <LineChartJS data={data.userGym.forearmRight} title={"Right forearm"} />
      ) : (
        <p>xuy</p>
      )}
    </div>
  );
};

export default ForearmRight;
