import React, { useState, useEffect } from "react";
import styles from "./MedicalInfo.module.css";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UsersData, User } from "../models";
import useAuth from "../hooks/use-auth";
import { useAppSelector } from "../hooks/redux-hooks";

const MedicalInfo: React.FC = () => {
  const [data, setData] = useState<UsersData | null>(null);

  const counter = useAppSelector((state) => state.user.currentUser);
  const { isAuth } = useAuth();
  const location = useLocation();
  const user = location.state?.value;
  const [medicalText, setMedicalText] = useState("");
  const userName = location.state?.key;

  useEffect(() => {
    if (!counter?.uid) return;
    const unsubscribe = onSnapshot(doc(db, "users", counter.uid), (doc) => {
      setData(doc.data() as UsersData);
      console.log(doc.data(), "<<<<< esa");
    });
    return () => unsubscribe();
  }, [isAuth, counter]);

  if (data) {
    console.log(data[userName].medicalInfo);
  } else {
    console.error("Data is null");
  }

  const handleAddMedInfo = async () => {
    await updateDoc(doc(db, "users", location.state.counter.uid), {
      [`${user.info.fullName}${user.info.age}${user.info.bodyWeight}.medicalInfo`]:
        { ...user.medicalInfo, [`${new Date()}`]: medicalText },
    });
    setMedicalText("");
  };

  return (
    <div className={styles.medicalMain}>
      <div className={styles.medicalComents}>
        {data ? (
          Object.entries(data[userName].medicalInfo).map(([key, value]) => (
            <div className={styles.medInfoTextContain} key={key}>
              <p className={styles.medInfoTextData}>{key}</p>
              <br />
              <p className={styles.medInfoText}>{value}</p>
            </div>
          ))
        ) : (
          <div className={styles.cardUserEmpty}>
            <p>No noobs, come and add one :D</p>
          </div>
        )}
      </div>
      <div className={styles.medicalComentsTextArea}>
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
    </div>
  );
};

export default MedicalInfo;
