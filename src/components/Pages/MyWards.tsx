import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { db } from "../../firebase";
import useAuth from "../../hooks/use-auth";
import styles from "./MyWards.module.css";
import { useNavigate, NavLink, Link, Navigate } from "react-router-dom";
import WardCard from "../WardCard";

type UserInfo = {
  fullName: string;
  age: number;
  gender: string;
  bodyWeight: number;
  regData: string;
};

type BodyMeasurements = {
  chest: number[];
  armLeft: number[];
  armRight: number[];
  forearmLeft: number[];
  forearmRight: number[];
  quadLeft: number[];
  quadRight: number[];
  calfLeft: number[];
  calfRight: number[];
  bodyWeight: number[];
  neck: number[];
  waistline: number[];
};

type TrainingMeasurements = Omit<BodyMeasurements, "bodyWeight">;
type MedicalInfo = Record<string, any>;
type User = {
  info: UserInfo;
  userBody: BodyMeasurements;
  training: TrainingMeasurements;
  medicalInfo: MedicalInfo;
};

type Users = Record<string, User>;

const MyWards: React.FC = () => {
  const [data, setData] = useState<Users | null>(null);
  const counter = useAppSelector((state) => state.user.currentUser);
  console.log(data);
  const { isAuth } = useAuth();

  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const pMonth = month.toString().padStart(2, "0");
  const pDay = day.toString().padStart(2, "0");
  const newPaddedDate = `${pDay}/${pMonth}/${year}`;
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const openModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setName("");
    setAge("");
    setGender("");
    setWeight("");
    setPhoto(null);
  };

  const handleAddUser = async () => {
    await updateDoc(doc(db, "users", counter!.uid), {
      [`${name}${age}${weight}`]: user,
    });
    closeModal();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });

  const user = {
    info: {
      fullName: name,
      age: age,
      gender: gender,
      bodyWeight: weight,
      regData: newPaddedDate,
    },
    userBody: {
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
    },
    training: {
      chest: [],
      armLeft: [],
      armRight: [],
      forearmLeft: [],
      forearmRight: [],
      quadLeft: [],
      quadRight: [],
      calfLeft: [],
      calfRight: [],
      neck: [],
      waistline: [],
    },
    medicalInfo: {},
  };

  useEffect(() => {
    if (!counter?.uid) return;
    const unsubscribe = onSnapshot(doc(db, "users", counter.uid), (doc) => {
      setData(doc.data() as Users);
      console.log(doc.data(), "<<<<< esa");
    });
    return () => unsubscribe();
  }, [isAuth, counter]);
  console.log(data);
  const newWardAdd = async () => {
    await updateDoc(doc(db, "users", counter!.uid), {
      vladikCakoyan: user,
    });
  };

  return (
    <div>
      <div className={styles.usersField}>
        <div className={styles.card} onClick={openModal}>
          <div className={styles.plus}>+</div>

          {isModalOpen && (
            <div className={styles.modal} onClick={closeModal}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Add NOOB</h3>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <select
                  className={styles.input}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <input
                  type="file"
                  className={styles.input}
                  onChange={handlePhotoChange}
                />
                <div className={styles.buttonGroup}>
                  <button className={styles.cancelButton} onClick={closeModal}>
                    Отмена
                  </button>
                  <button className={styles.addButton} onClick={handleAddUser}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {data ? (
          Object.entries(data).map(([key, value]) => (
            <Link to={key} state={{ value }} key={key}>
              {" "}
              <div
                key={key}
                className={
                  value.info.gender === "Male"
                    ? styles.cardUserMale
                    : styles.cardUserFemale
                }
              >
                <p>{`${value.info.fullName} ${value.info.age}`}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.cardUserEmpty}>
            <p>No noobs, come and add one :D</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWards;
