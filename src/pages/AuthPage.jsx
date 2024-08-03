import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  //giriş butonuna tıklanırsa
  const handleClick = () => {
    signInWithPopup(auth, provider)
      //başarıyla giriş yapıldığında çalışır
      .then((data) => {
        console.log(data.user);

        //kullanıcının y etkisini true ye çek
        setIsAuth(true);

        //sayfa yenilendiğinde bağlantının kaybolmaması içinbilgileri local de tut(refleshToken ı saklanyacağız)

        localStorage.setItem("token", data.user.refreshToken);
      });
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" alt="" />
          <span>Google İle Gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
