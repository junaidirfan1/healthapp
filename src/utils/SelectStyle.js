const SelectStyle = {
  styles: {
    control: (base) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      padding: "0px",
      minHeight: "auto",
      backgroundColor: "transparent",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0px",
      transform: "scale(1.5)",
      marginTop: "-20px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      overflow: "hidden",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "var(--Lavender-Mist)"
        : isFocused
        ? "#f1f1f1"
        : "white",
      color: "var(--Jet-Black)",
      cursor: "pointer",
    }),
  },
};
export default SelectStyle