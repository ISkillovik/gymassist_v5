import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LineChartJS from "./LineChartJS";
import ParamInput from "../ParamInput";

const Neck = ({ counter, data, newPaddedDate }) => {
  const updateHandleAdd = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.neck": [...data.userGym.neck, newPaddedDate, num],
    });
  };

  const inputDateValDoc = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      "userGym.lastData.neck": dateConverter(new Date()),
    });
  };

  const inputDateVal = data.userGym.lastData.neck;

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
        metrix={"cm"}
        updateHandleAdd={updateHandleAdd}
        inputDateValDoc={inputDateValDoc}
        futureORequal={futureORequal}
        title={"Neck"}
      />
      {data.userGym.neck.length ? (
        <LineChartJS data={data.userGym.neck} title={"Neck"} />
      ) : (
        <p>xuy</p>
      )}
    </div>
  );
};

export default Neck;
