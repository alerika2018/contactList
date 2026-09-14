import type { Contact } from "./Types";
import Switch from "@mui/material/Switch";
import "./style.css";
import { FiTrash2 } from "react-icons/fi";

interface ContactCardProps {
  person: Contact;
  onChange: (person: Contact) => void;
  onClickDelete: (person: Contact) => void;
}
const ContactCard = ({ person, onChange, onClickDelete }: ContactCardProps) => {
  return (
    <div className="contactCard">
      <div className="contact">
        <div className="initials">
          <p>{person.initials}</p>
        </div>
        <div className="contactData">
          <p className="name">{person.name}</p>
          <p className="email">{person.email}</p>
        </div>
      </div>
      <div>
        <Switch checked={person.isFavorite} onChange={() => onChange(person)} />
        <button className="deleteButton" onClick={() => onClickDelete(person)}>
          <FiTrash2
            size={18}
            color="#dc3545"
            style={{ transition: "color 0.2s" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
