import React, { useState } from "react";
import styles from "./MedicalInfo.module.css";
import { data, useLocation } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {};

const MedicalInfo: React.FC = (props: Props) => {
  const location = useLocation();
  const user = location.state?.value;
  const [medicalText, setMedicalText] = useState("");

  console.log({
    ...user.medicalInfo,
    [`${new Date()}`]: medicalText,
  });

  console.log(
    `${user.info.fullName}${user.info.age}${user.info.bodyWeight}.medicalInfo`
  );

  const handleAddMedInfo = async () => {
    await updateDoc(doc(db, "users", location.state.counter!.uid), {
      [`${user.info.fullName}${user.info.age}${user.info.bodyWeight}.medicalInfo`]:
        { ...user.medicalInfo, [`${new Date()}`]: medicalText },
    });
    setMedicalText("");
  };

  return (
    <div className={styles.medicalMain}>
      <div className={styles.commentForm}>
        <div className={styles.formContainer}>
          <div className={styles.textAreaContainer}>
            <textarea
              value={medicalText}
              onChange={(e) => setMedicalText(e.target.value)}
              id="comment"
              rows={4}
              className={styles.textArea}
              placeholder="Write a comment..."
              required
            >
              {medicalText}
            </textarea>
            <button
              className={styles.postButton}
              onClick={() => {
                handleAddMedInfo();
              }}
            >
              Post comment
            </button>
          </div>

          <div className={styles.actionsContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;
