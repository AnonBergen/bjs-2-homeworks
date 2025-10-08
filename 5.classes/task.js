// Сначала объявляем все классы печатных изданий
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// Затем объявляем класс Library
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find(book => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(book => book.name === bookName);
    if (bookIndex !== -1) {
      return this.books.splice(bookIndex, 1)[0];
    }
    return null;
  }
}

// Тестовый сценарий
console.log("=== ТЕСТОВЫЙ СЦЕНАРИЙ ===");

// 1. Создаем библиотеку
const library = new Library("Центральная городская библиотека");

// 2. Добавляем в библиотеку несколько печатных изданий разных типов
library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log("Книги в библиотеке после добавления:");
library.books.forEach(book => {
  console.log("- " + book.name + " (" + book.type + ")");
});

// 3. Находим книгу, изданную в 1919 году, или создаём её при необходимости
let foundBook = library.findBookBy("releaseDate", 1919);
console.log("\nПоиск книги 1919 года:", foundBook);

if (!foundBook) {
  console.log("Книга 1919 года не найдена, создаём новую...");
  const newBook = new NovelBook("Эрих Мария Ремарк", "На Западном фронте без перемен", 1919, 295);
  library.addBook(newBook);
  console.log("Добавлена книга:", newBook.name);
}

// 4. Выдаем любую книгу
console.log("\nВыдача книги 'Машина времени'...");
const issuedBook = library.giveBookByName("Машина времени");
console.log("Выдана книга:", issuedBook ? issuedBook.name : "не найдена");
console.log("Количество книг в библиотеке после выдачи:", library.books.length);

// 5. Повреждаем выданную книгу
if (issuedBook) {
  console.log("\nПовреждаем выданную книгу...");
  console.log("Состояние до повреждения:", issuedBook.state);
  issuedBook.state = 20;
  console.log("Состояние после повреждения:", issuedBook.state);
}

// 6. Восстанавливаем выданную книгу
if (issuedBook) {
  console.log("\nВосстанавливаем книгу...");
  issuedBook.fix();
  console.log("Состояние после восстановления:", issuedBook.state);
}