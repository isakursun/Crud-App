import React, { useState } from "react";
import BookCard from "./components/BookCard.jsx";
import { ADD_TYPE } from "./components/buttonTypes.js";
import CustomButton from "./components/CustomButton.jsx";
import {toast} from "react-toastify"


const App = () => {
  // input içerisindeki veriyi tutacak state
  const [bookName, setBookName] = useState("");
  //   tüm kitapların tutulduğu dizi
  const [bookList, setBookList] = useState([]);

  // kitap ekleme işlemi
  const addBook = (e) => {
    e.preventDefault();
    // kitap bilgilerini tutan obje
    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //   spread operator ile kitapları diziye ekleme
    setBookList([...bookList, newBook]);

    // ekle butonuna bastıktan sonra input temizleme
    setBookName("");

    toast.success("Kitaplığa eklendi")
  };

  //   silme işlemi fonksiyonu
  const handleDelete = (deleteId) => {
    const filteredList = bookList.filter((book) => book.id !== deleteId);
    setBookList(filteredList);

    toast.error("Kitaplıktan kaldırıldı.")
  };

//   okundu okunmadı butonunun işlevini sağlayan fonksiyon
  const handleReadChange=(book)=>{
    // okundu bilgisini degiştirme
    const updateBook={...book,isRead:!book.isRead}

    // dizideki degişmemiş eski elemanı tespit etme
    const cloneBookList=[...bookList]

    const bookIndex=cloneBookList.findIndex((item)=>item.id===book.id)

    cloneBookList.splice(bookIndex,1,updateBook)

    setBookList(cloneBookList)
  }

//   kitabı düzenleme fonksiyonu
const handleEdit = (book, newTitle) => {
    // kitabın isim değerini güncelleme
    const updated = {...book, bookTitle: newTitle};
    // diziyi tekrardan güncelleme
    const newList = bookList.map((book) => book.id !== updated.id ? book : updated);
    // state i güncelleme
    setBookList(newList);

    toast.info("Kitap bilgisi güncellendi.")
}

  return (
    <div>
      <header className="bg-dark text-light py-2 text-center fs-5">
        Kitap Kurdu
      </header>

      <div className="container border pb-5">
        {/* Kitap ekleme formu */}
        <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Kitap adı giriniz."
            className="form-control shadow"
          />
          <CustomButton type={ADD_TYPE} title={'ekle'}/>
        </form>
        {/* kitpa ekleme formu */}

        {/* kitapları sıralayan yapı */}
        <div className="d-flex flex-column gap-4 mt-3">
          {bookList.length === 0 ? (
            <p>Henüz herhangi bir kitap eklenmedi.</p>
          ) : (
            bookList.map((book) => {
              return <BookCard readUpdateClick={()=>handleReadChange(book)} deleteClick={() => handleDelete(book.id)} handleEdit={handleEdit} bookInfo={book} />;
            })
          )}
        </div>
        {/* kitapları sıralayan yapı */}
      </div>
    </div>
  );
};
export default App;
