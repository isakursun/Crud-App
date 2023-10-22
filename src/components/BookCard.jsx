import { useState } from "react";
import { DELETE_TYPE, EDIT_TYPE, READ_TYPE } from "./buttonTypes.js";
import CustomButton from "./CustomButton.jsx";

const BookCard = ({ bookInfo, deleteClick, readUpdateClick, handleEdit }) => {
  const [editMode, setEditMode] = useState(false);
  // console.log(bookInfo)
  return (
    <div className="d-flex justify-content-between align-items-center border p-3 shadow">
      {/* sol taraf */}
      <div>
        {/* düzenleme modundaysa ekrana input getiriyoruz değilse başlığı yazdırıyoruz. */}
        {editMode ? (
          <form
          className="d-flex gap-1"
            onSubmit={(e) => {
              e.preventDefault();
            //   diziyi güncelleme
            handleEdit(bookInfo,e.target[0].value);
            // düzenleme bölümünü kapat
            setEditMode(false)
            }}
          >
            <input className="form-control shadow" defaultValue={bookInfo.bookTitle} />
            <button className="btn btn-success">Kaydet</button>
          </form>
        ) : (
          <h5
            style={{
              textDecoration: bookInfo.isRead ? "line-through" : "none",
            }}
          >
            {bookInfo.bookTitle}
          </h5>
        )}

        <p>{bookInfo.date}</p>
      </div>
      {/* sağ taraf */}
      <div className="btn-group">
        <CustomButton title={"Sil"} type={DELETE_TYPE} onClick={deleteClick} />
        <CustomButton
          title={editMode ? "İptal et" : "Düzenle"}
          type={EDIT_TYPE}
          onClick={() => setEditMode(!editMode)}
        />
        <CustomButton
          title={bookInfo.isRead === false ? "Okunmadı" : "Okundu"}
          type={READ_TYPE}
          onClick={readUpdateClick}
        />
      </div>
    </div>
  );
};

export default BookCard;
