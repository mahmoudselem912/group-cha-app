import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../utils/firebaseConfig";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { uid, phoneNumber } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      phoneNumber,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.phoneNumber}</strong>: {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
