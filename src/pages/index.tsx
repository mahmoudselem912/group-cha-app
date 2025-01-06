import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebaseConfig";
import PhoneAuth from "../components/PhoneAuth";
import Chat from "../components/Chat";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  return user ? <Chat /> : <PhoneAuth />;
};

export default Home;
