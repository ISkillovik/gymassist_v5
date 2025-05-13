import React, { useState } from "react";
import styles from "./WardCard.module.css";

const WardCard: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
    >
      <div className={styles.imageContainer}>
        {hovered && (
          <label className={styles.overlay}>
            Change Image
            <input type="file" className={styles.fileInput} accept="image/*" />
          </label>
        )}
      </div>
      <h3 className={styles.userName}>{}</h3>
    </div>
  );
};

export default WardCard;
