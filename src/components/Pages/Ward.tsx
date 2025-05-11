import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Ward.module.css";
import imgMal from "../../icons/userMa.png";
import imgFem from "../../icons/userFe.png";

type Props = {};

const Ward: React.FC = (value: Props) => {
  const location = useLocation();
  const user = location.state?.value;
  console.log(user);
  return (
    <div>
      <div className={styles.wardCard}>
        <img
          src={user.info.gender === "Male" ? imgMal : imgFem}
          style={{ width: "200px", height: "200px", margin: "20px" }}
          alt=""
        />
        <p>Name {user.info.fullName}</p>
        <p>Age {user.info.age}</p>
        <p>Gender {user.info.gender}</p>
        <p>Weight {user.info.bodyWeight}</p>
        <p>Registration {user.info.regData}</p>
      </div>
    </div>
  );
};

export default Ward;
