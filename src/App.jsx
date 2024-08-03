import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPages from "./pages/ChatPages";

const App = () => {
  //kullanıcının seçtiği sayfa
  const [room, setRoom] = useState();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  //yetkiis yoksa giriş sayfası
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  //yetkisi varsa sohbet sayfası
  return (
    <div className="container">
      {!room ? (
        // oda seçilmediyse  > oda seçme sayfasına yönlendiriliyor
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      ) : (
        // oda seçildiyse chat sayfasına
        <ChatPages room={room} setRomm={setRoom} />
      )}
    </div>
  );
};

export default App;
