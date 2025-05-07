import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LineChartJS from "./LineChartJS";
import { RiTodoFill } from "react-icons/ri";
import styles from "../Styles/MyProgress.module.css";
import { useState } from "react";
import Swal from "sweetalert2";

const BodyInputVal = ({
  counter,
  dataPart,
  newPaddedDate,
  bodyPart,
  metrix,
  title,
}) => {
  const [text, setText] = useState("");
  const somText = `userGym.${bodyPart}`;
  const updateHandleAdd = async (num) => {
    await updateDoc(doc(db, "users", counter.uid), {
      [somText]: [...dataPart, newPaddedDate, num],
    });
  };

  const inputDateVal = dataPart[dataPart.length - 2];

  function isMoreThan10Days(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const diffInMs = currentDate - inputDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays >= 10;
  }

  const numContoller = (e) => {
    if (e.target.value === "09") {
      setText(0);
    } else if (e.target.value === "08") {
      setText(0);
    } else if (e.target.value === "07") {
      setText(0);
    } else if (e.target.value === "06") {
      setText(0);
    } else if (e.target.value === "05") {
      setText(0);
    } else if (e.target.value === "04") {
      setText(0);
    } else if (e.target.value === "03") {
      setText(0);
    } else if (e.target.value === "02") {
      setText(0);
    } else if (e.target.value === "01") {
      setText(0);
    } else if (e.target.value === "00") {
      setText(0);
    } else if (e.target.value === "--") {
      setText(300);
    } else if (e.target.value > 300) {
      setText(300);
    } else if (e.target.value >= 0) {
      setText(e.target.value);
    }
  };

  const hndikClick2 = () => {
    Swal.fire({
      title: `${text} cm. Are you sure?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "rgb(3, 197, 197)",
      cancelButtonColor: "rgb(141, 141, 141)",
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        text ? updateHandleAdd(Number(text)) : alert("err");
        setText("");
        Swal.fire({
          title: "Saved!",
          text: "Your mesurment has been saved.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className={styles.inputBox}>
        <div className={styles.todoIconTextWD}>{title}</div>
        <div className={styles.ploblemSide}>
          <RiTodoFill className={styles.todoIcon} />
          <input
            placeholder={metrix}
            className={styles.input}
            value={text}
            onChange={(e) => {
              numContoller(e, setText);
            }}
          />
        </div>

        <button
          disabled={!isMoreThan10Days(inputDateVal)}
          className={styles.inputBoxButton}
          onClick={hndikClick2}
        >
          Save
        </button>
      </div>
      {dataPart.length ? (
        <LineChartJS data={dataPart} title={title} />
      ) : (
        <p>xuy</p>
      )}
    </div>
  );
};

export default BodyInputVal;
