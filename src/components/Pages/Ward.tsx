import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Ward.module.css";
import imgMal from "../../icons/userMa.png";
import imgFem from "../../icons/userFe.png";

import EditUser from "../EditUser";
import MedicalInfo from "../MedicalInfo";
import Training from "../Training";
import WardCard from "../WardCard";

type Props = {};

const Ward: React.FC = (value: Props) => {
  const [userContainVal, SetuserContainVal] = useState(1);
  const location = useLocation();
  const user = location.state?.value;
  console.log(user);
  const userContain = [<EditUser />, <MedicalInfo />, <Training />];

  return (
    <div className={styles.wardMain}>
      <div className={styles.wardCard}>
        <WardCard />
        <img
          src={user.info.gender === "Male" ? imgMal : imgFem}
          style={{ width: "200px", height: "200px", margin: "20px" }}
          alt=""
        />

        <p>
          {user.info.fullName} | {user.info.age} years old <br />{" "}
          {user.info.gender} | Weight {user.info.bodyWeight} KG <br />{" "}
          Registration {user.info.regData}
        </p>

        <div className={styles.wardButtonsContainer}>
          <button
            className={styles.wardButtons}
            onClick={() => {
              SetuserContainVal(1);
            }}
          >
            Medical info
          </button>
          <button
            className={styles.wardButtons}
            onClick={() => {
              SetuserContainVal(2);
            }}
          >
            Training stats
          </button>
        </div>
        <button
          className={styles.wardButtonsEdit}
          onClick={() => {
            SetuserContainVal(0);
          }}
        >
          Edit User
        </button>
      </div>
      <div>{userContain[userContainVal]}</div>
    </div>
  );
};

export default Ward;
