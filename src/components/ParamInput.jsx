import { RiTodoFill } from "react-icons/ri";
import styles from "./Styles/MyProgress.module.css";
import { useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Swal from "sweetalert2";

const ParamInput = ({
  metrix,
  updateHandleAdd,
  title,
  inputDateValDoc,
  futureORequal,
  inputDateVal,
}) => {
  const [text, setText] = useState("");
  const [actionHide, setactionHide] = useState(false);

  const dialogRef = useRef(null);

  function toggleDialog() {
    if (dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  const submit2 = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.testttttt}>
            <p>Are you sure?</p>

            <button className={styles.inputBoxButton} onClick={onClose}>
              no
            </button>
            <button
              className={styles.inputBoxButton}
              onClick={() => {
                this.handleClickDelete();
                onClose();
              }}
            >
              Yes
            </button>
          </div>
        );
      },
    });
  };

  const numContoller = (e, setFunc) => {
    if (e.target.value === "09") {
      setFunc(0);
    } else if (e.target.value === "08") {
      setFunc(0);
    } else if (e.target.value === "07") {
      setFunc(0);
    } else if (e.target.value === "06") {
      setFunc(0);
    } else if (e.target.value === "05") {
      setFunc(0);
    } else if (e.target.value === "04") {
      setFunc(0);
    } else if (e.target.value === "03") {
      setFunc(0);
    } else if (e.target.value === "02") {
      setFunc(0);
    } else if (e.target.value === "01") {
      setFunc(0);
    } else if (e.target.value === "00") {
      setFunc(0);
    } else if (e.target.value === "--") {
      setFunc(300);
    } else if (e.target.value > 300) {
      setFunc(300);
    } else if (e.target.value >= 0) {
      setFunc(e.target.value);
    }
  };

  const hndikClick2 = () => {
    Swal.fire({
      title: `${text} cm. Are you sure?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "rgb(78, 97, 97)",
      cancelButtonColor: "#rgb(78, 97, 97)",
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        text ? updateHandleAdd(Number(text)) : alert("err");
        inputDateValDoc();
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
      {/* <button className={styles.inputBoxButton} onClick={toggleDialog}>
        ssad
      </button> */}

      <button
        disabled={inputDateVal && !futureORequal(inputDateVal)}
        className={styles.inputBoxButton}
        onClick={hndikClick2}
      >
        Save
      </button>
    </div>
  );
};

export default ParamInput;
