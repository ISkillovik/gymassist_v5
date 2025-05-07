import { db } from "../../firebase";
import ChestG from "../visualize/ChestG";

import CalfLeft from "../visualize/CalfLeft";
import CalfRight from "../visualize/CalfRight";

import ForearmRight from "../visualize/ForearmRight";
import QuadLeft from "../visualize/QuadLeft";
import QuadRight from "../visualize/QuadRight";
import Waistline from "../visualize/Waistline";
import BodyWeight from "../visualize/BodyWeight";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import { useSelector } from "react-redux";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import styles from "../Styles/MyProgress.module.css";
import ManBody from "../ManBody";
import BodyInputVal from "../visualize/BodyInputVal";

const MyProgress = () => {
  const [bodyPartProg, showBodyPartProg] = useState(12);
  const [newBee, setNewBee] = useState(true);
  const { isAuth, email } = useAuth();
  const [data, setData] = useState({});
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const pMonth = month.toString().padStart(2, "0");
  const pDay = day.toString().padStart(2, "0");
  const newPaddedDate = `${pDay}/${pMonth}/${year}`;

  function testo(num) {
    switch (num) {
      case 0:
        return (
          <BodyWeight
            title={"Weight"}
            metrix={"kg"}
            bodyPart={"bodyWeight"}
            dataPart={data.userGym.bodyWeight}
            counter={counter}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 1:
        return (
          <BodyInputVal
            title={"Neck"}
            metrix={"cm"}
            bodyPart={"neck"}
            dataPart={data.userGym.neck}
            counter={counter}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 2:
        return (
          <BodyInputVal
            title={"Left arm"}
            metrix={"cm"}
            bodyPart={"armLeft"}
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 3:
        return (
          <BodyInputVal
            title={"Right arm"}
            metrix={"cm"}
            bodyPart={"armRight"}
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 4:
        return (
          <ChestG counter={counter} data={data} newPaddedDate={newPaddedDate} />
        );
        break;
      case 5:
        return (
          <BodyInputVal
            title={"Left forearm"}
            metrix={"cm"}
            bodyPart={"forearmLeft"}
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 6:
        return (
          <ForearmRight
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 7:
        return (
          <Waistline
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 8:
        return (
          <QuadLeft
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 9:
        return (
          <QuadRight
            bodyPart={"quadRight"}
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 10:
        return (
          <BodyInputVal
            title={"Left calf"}
            metrix={"cm"}
            bodyPart={"calfLeft"}
            dataPart={data.userGym.calfLeft}
            counter={counter}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 11:
        return (
          <CalfRight
            counter={counter}
            data={data}
            newPaddedDate={newPaddedDate}
          />
        );
        break;
      case 12:
        return (
          <div>
            xndrum enq @trel ayn mkan@, um chapser@ uzum eq fiqsel, hetaga
            zargacman@ hetevelu hamar
          </div>
        );
        break;
    }
  }

  const counter = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", counter.uid), (doc) => {
      setData(doc.data());
    });
  }, [isAuth]);

  const handleAdd = async (e) => {
    await setDoc(doc(db, "users", counter.uid), {
      userGym: {
        chest: [],
        armLeft: [],
        armRight: [],
        forearmLeft: [],
        forearmRight: [],
        quadLeft: [],
        quadRight: [],
        calfLeft: [],
        calfRight: [],
        bodyWeight: [],
        neck: [],
        waistline: [],
        lastData: [],
      },
    });
  };
  console.log(data);

  return (
    <div className={styles.progressMain}>
      <ManBody showBodyPartProg={showBodyPartProg} />
      {!data ? (
        <div className={styles.xuy}>
          <p>Take Body Measurements, to further evaluate your progress !!! </p>
          <button
            onClick={() => {
              handleAdd();
            }}
          >
            GET STARTED
          </button>
          <p>if you don't know how</p>
        </div>
      ) : (
        <div className={styles.chartWrapper}>
          {testo(bodyPartProg)}

          <button
            onClick={() => {
              setNewBee(!newBee);
              console.log(newBee);
            }}
          >
            tutor
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProgress;
