import Switch from "@mui/material/Switch";
import { FiPlus } from "react-icons/fi";
interface SearchBarProps {
  filterByFavorites: boolean;
  onChange: () => void;
  textToSearch: string;
  onChangeText: (value: string) => void;
}
const SearchBar = ({
  filterByFavorites,
  onChange,
  textToSearch,
  onChangeText,
}: SearchBarProps) => {
  return (
    <div className="searchBar">
      <input
        placeholder="Search by name"
        value={textToSearch}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div className="onlyFavorites favoritesS">
        <Switch checked={filterByFavorites} onChange={onChange} />
        <p>Only Favorites</p>
      </div>
      <button className="addButton">
        <FiPlus size={18} color="000000" />
      </button>
    </div>
  );
};

export default SearchBar;
