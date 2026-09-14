import { useCallback, useMemo, useState } from "react";
import "./style.css";
import type { Contact } from "./Types";
import ContactCard from "./ContactCard";
import SearchBar from "./SearchBar";

const initContacts: Contact[] = [
  {
    name: "Maya Rodriguez",
    email: "maya@email.com",
    isFavorite: false,
    initials: "MR",
  },
  {
    name: "Jorge Lopez",
    email: "jorge@gmail.com",
    isFavorite: false,
    initials: "JL",
  },
  {
    name: "Anna Castillo",
    email: "ana@gmail.com",
    isFavorite: false,
    initials: "AC",
  },
  {
    name: "Jorge Leon",
    email: "jorgeL@gmail.com",
    isFavorite: false,
    initials: "JL",
  },
];

function App() {
  const [contacts, setContacts] = useState<Contact[]>(initContacts);
  const [filterByFavorites, setFilterByFavorites] = useState(false);
  const [textToSearch, setTextToSearch] = useState("");

  const handleOnChangeFavorite = useCallback(
    (contact: Contact) => {
      const contactIndex = contacts.findIndex((p) => p.email === contact.email);
      const contactToChange = contacts[contactIndex];
      setContacts((prev) => [
        ...prev.slice(0, contactIndex),
        {
          ...contactToChange,
          isFavorite: !contactToChange.isFavorite,
        },
        ...prev.slice(contactIndex + 1),
      ]);
    },
    [contacts],
  );

  const handleFilterBy = useCallback(() => {
    setFilterByFavorites((prev) => !prev);
  }, []);

  const handleOnDelete = useCallback(
    (contact: Contact) => {
      const newContactList = contacts.filter((x) => x.email != contact.email);
      setContacts(newContactList);
    },
    [contacts],
  );

  const handleSearchByText = useCallback((value: string) => {
    setTextToSearch(value);
  }, []);

  const contactsToDisplay = useMemo(() => {
    const newContactList = contacts.filter((contact) => {
      const matchesText = contact.name
        .toLowerCase()
        .includes(textToSearch.toLowerCase());
      const matchesFavorite = filterByFavorites ? contact.isFavorite : true;
      return matchesText && matchesFavorite;
    });
    return newContactList;
  }, [contacts, filterByFavorites, textToSearch]);

  const contactCount = contactsToDisplay.length;
  const favouritesCount = contactsToDisplay.filter(
    (x) => x.isFavorite === true,
  ).length;
  return (
    <>
      <h1>Contact List</h1>
      <SearchBar
        filterByFavorites={filterByFavorites}
        onChange={handleFilterBy}
        textToSearch={textToSearch}
        onChangeText={handleSearchByText}
      />
      <div className="counter">
        <div>
          <p>{contactCount} Contactos</p>
        </div>
        <div>
          <p>{favouritesCount} Favoritos</p>
        </div>
      </div>

      <div className="contactContainer">
        {contactsToDisplay.map((contact, index) => {
          return (
            <ContactCard
              key={index}
              person={contact}
              onChange={handleOnChangeFavorite}
              onClickDelete={handleOnDelete}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
