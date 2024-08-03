const RoomPage = ({ setRoom, setIsAuth }) => {
  //form gonderilince tetiklenecek fonk
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value;

    //kullanıcının seçtiği odayı state ye aktar
    setRoom(room.toLowerCase());
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz</p>
      <input type="text" placeholder="ör:hafta içi" required />
      <button type="submit">Odaya Gir</button>
      <button
        onClick={() => {
          //yetki state ini false a çekerek oda lognine yönlendir.
          setIsAuth(false);
          //localdeki kaydı kaldır
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
