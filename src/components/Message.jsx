import { auth } from "../firebase/config";

auth;
const Message = ({ data }) => {
  console.log(data);
  //oturumu açık olan kullanıcının id si mesajı atan kullanıcının is sine eşitse
  //sadece mesaj içeriğini bas

  if (auth.currentUser?.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }
  // eşit değilse  kullanıcı bilgisi+ mesaj içeriini bas
  return (
    <div className="msg-other">
      <div className="user-info">
        <img src={data.author.photo} alt="" />
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
