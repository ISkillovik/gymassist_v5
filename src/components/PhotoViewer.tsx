import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  photoId: string;
  imageUrl: string;
};

export default function PhotoViewer({ photoId, imageUrl }: Props) {
  const [views, setViews] = useState<number>(0);
  const [like, setLike] = useState<number>(0);

  useEffect(() => {
    const registerView = async () => {
      function safeIdFromUrl(url: string): string {
        return btoa(url).replace(/\//g, "_").replace(/\+/g, "-");
      }
      // stanum enq fingerprint
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      console.log(fp, result, visitorId);

      const photoRef = doc(db, "photoViews", safeIdFromUrl(imageUrl));
      const userRef = doc(collection(photoRef, "users"), visitorId);

      const userSnap = await getDoc(userRef);

      const now = Date.now();
      const TTL = 12 * 60 * 60 * 4000; // 2 oric

      // ete chi nae 2 or , taza dituma avelacnum
      if (!userSnap.exists() || now - userSnap.data().lastView > TTL) {
        const photoSnap = await getDoc(photoRef);
        if (photoSnap.exists()) {
          await updateDoc(photoRef, { count: increment(1) });
        } else {
          await setDoc(photoRef, { count: 1 });
        }

        // baza
        await setDoc(userRef, { lastView: now });
      }

      // get shochik
      const updated = await getDoc(photoRef);
      setViews(updated.exists() ? updated.data().count : 0);
    };

    registerView();
  }, [photoId]);

  return (
    <div>
      <img src={imageUrl} alt="photo" style={{ maxWidth: "100%" }} />
      <p>👁️ Просмотров: {views}</p>
      <p>👁️ LIKE: {like}</p>
      <button>Like</button>
    </div>
  );
}
