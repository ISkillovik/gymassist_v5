import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { db } from "../../firebase";
import useAuth from "../../hooks/use-auth";
import styles from "./MyWards.module.css";
import { Link } from "react-router-dom";
import { UsersData } from "../../models";

const MyWards: React.FC = () => {
  const [data, setData] = useState<UsersData | null>(null);
  const counter = useAppSelector((state) => state.user.currentUser);
  const { isAuth } = useAuth();
  //

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
  const userName = `${name}${age}${weight}`;

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
    if (name && age && weight && gender) {
      await updateDoc(doc(db, "users", counter!.uid), {
        [userName]: user,
      });
      closeModal();
    } else {
      console.log("err");
    }
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
      setData(doc.data() as UsersData);
      console.log(doc.data(), "<<<<< esa");
    });
    return () => unsubscribe();
  }, [isAuth, counter]);
  console.log(data);

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
                <h6>Add NOOB</h6>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.length <= 11) setName(e.target.value);
                  }}
                />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Age"
                  value={age}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) setAge(e.target.value);
                  }}
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
                  onChange={(e) => {
                    if (e.target.value.length <= 3) setWeight(e.target.value);
                  }}
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
            <Link
              className={styles.cardUserInfoNameLink}
              to={key}
              state={{ value, counter, key }}
              key={key}
            >
              {""}
              <div
                key={key}
                className={
                  value.info.gender === "Male"
                    ? styles.cardUserMale
                    : styles.cardUserFemale
                }
              >
                <div className={styles.cardUserInfoName}>
                  <p
                    className={styles.cardUserInfoNameText}
                  >{`${value.info.fullName} ${value.info.age}`}</p>
                </div>
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
