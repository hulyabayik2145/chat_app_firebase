import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPages = ({ room, setRoom }) => {
  // mesaj gönderme fonksiyonu

  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    // kolleksiyonun referansını alma
    const messagesCol = collection(db, "messages");
    // koleksiyona yeni döküman ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    // console.log(e.target[0].value);

    // formu sıfırla
    e.target.reset();
  };
  // console.log(auth);
  // mevcut odadan gönderilen mesejları anlık olarak alır
  useEffect(() => {
    //kolleksiyon refereansını al
    const messagesCol = collection(db, "messages");

    //sorgu ayarlarını oluştur
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //mesajlar kolleksiyonundaki verileri al
    //anlık olarak bir koleksiyondaki dğişiklikleri izler
    //koleksiyon her değiştiğinde verdiğimiz fonksiyon ile
    // kolleksiyondaki bütün dökümanlara erişiriz

    onSnapshot(q, (snapshot) => {
      //verilerin geçici olarak tutlacağı dizi oluştur
      const tempMsg = [];
      //dökümanlarda dön verilere eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      // console.log(tempMsg);
      //mesajları state e aktar
      setMessages(tempMsg);
    });
  }, []);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="mesajınızı yazınız" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPages;
