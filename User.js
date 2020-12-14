// Stwórz klasę dla struktury danych związanych z użytkowniem

const errorHandler = (errormsg) => {
    throw new Error(errormsg);
};

const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}/;
    const [input] =
        password.match(passwordRegex) ||
        errorHandler("Invalid or missing password");
    return input;
};

const isGenderValid = (datearg) => {
    const genders = ["male", "female"];
    for (const gender of genders) {
        if (is.equal(gender, datearg)) return gender;
    }
};

const isDateValid = (date, format) => {
    const formattedDate = moment(date).format(format);
    if (formattedDate === "Invalid date")
        errorHandler("Invalid or missing date");
    return formattedDate;
};

const isEmailValid = (email) =>
    is.email(email) ? email : errorHandler("Invalid or missing email");

class User {
    constructor(
        name,
        surname,
        dateofbirth,
        password,
        gender,
        email,
        accessLevel = "user"
    ) {
        is.not.empty(name)
            ? (this.name = name)
            : errorHandler("Name is required");
        is.not.empty(surname)
            ? (this.surname = surname)
            : errorHandler("Surname is required");
        this.dateofbirth = isDateValid(dateofbirth, "MM/DD/YYYY");
        this.password = isPasswordValid(password);
        this.gender =
            isGenderValid(gender) || errorHandler("Invalid or missing gender");
        this.email = isEmailValid(email);
        this.accessLevel = accessLevel;
    }
    set newPassword(newPassword) {
        if (isPasswordValid(newPassword)) this.password = newPassword;
    }
}

const Janusz = new User(
    "Janusz",
    "Kowalski",
    "1990-10-20",
    "Qwerty1@",
    "male",
    "janusz@example.com",
    "user"
);

// Klasa przyjmować w konstruktorze:
// Imię, Nazwisko, datę urodzenia, hasło,
// płeć, adres email, poziom dostepu = "user"

// Klasa ma umożliwiać zmianę adresu email

// Dodatkowo User ma mieć walidacje wykonaną za pomocą is.js oraz datę obsługiwaną przez bibliotekę moment.js
// jeśli któraś z walidacji się nie powiedzie instancja ma nie być tworzona, tylko ma zwracać error z odpowiednimi komunikatami o niepowiedzionej walidacji

// Podczas walidacji upewnij się, że:
// - email jest poprawnym emailem
// - hasło ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
// - płeć musi być ze zbioru [male, female]
// - data (nieważne jaka wejdzie) do konstruktora musi wejść w formacie MM/DD/YYYY
// - imię i nazwisko musi być niepuste

// Stwórz klasę dla struktury danych związanych z administratorem
// Klasa ma dziedziczyć po klasie User wszystkie informacje i metody
class Administrator extends User {
    accessLevel = "admin";

    constructor(name, surname, dateofbirth, password, gender, email) {
        super(name, surname, dateofbirth, password, gender, email);
    }

    changeSelectedUserAccessLevel(user, newAccessLevel) {
        user.accessLevel !== "admin"
            ? (user.accessLevel = newAccessLevel)
            : errorHandler("Cannot change access level of admin user");
    }
    changeSelectedUserPassword(user, newPassword) {
        user.accessLevel !== "admin"
            ? (user.newPassword = newPassword)
            : errorHandler("Cannot change password of admin user");
    }
}

const Admin = new Administrator(
    "Maria",
    "Doe",
    "1995-05-12",
    "ywryYTUy^&823",
    "female",
    "mariadoe@example.com"
);

// Klasa ma mieć poziom dostępu = "admin"
// Klasa ma umożliwiać:
// - zmianę poziomu dostępu dla innego Usera
// - zmianę hasła dla innego Usera
