import Select from "react-select";
import styled from "styled-components";

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptionImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

const OptionLabel = styled.span`
  font-size: 1.6rem;
  color: var(--color-grey-900);
  background-color: var(--color-grey-50);
`;

const CustomOption = ({
  label,
  imageUrl,
}: {
  label: string;
  imageUrl: string;
}) => (
  <OptionContainer>
    <OptionImage src={imageUrl} alt={label} />
    <OptionLabel>{label}</OptionLabel>
  </OptionContainer>
);

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    padding: "0.8rem 1rem",
    border: state.isFocused
      ? "1px solid var(--color-brand-500)"
      : "1px solid var(--color-grey-300)",
    borderRadius: "var(--border-radius-sm)",
    fontSize: "1.8rem",
    color: "var(--color-grey-900)",
    backgroundColor: "var(--color-grey-0)",
    cursor: "pointer",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(0, 128, 128, 0.2)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    "&:hover": {
      borderColor: state.isFocused
        ? "var(--color-brand-500)"
        : "var(--color-grey-400)",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-brand-900)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: state.isFocused
      ? "var(--color-brand-100)"
      : "var(--color-grey-50)",
    color: state.isFocused ? "var(--color-brand-700)" : "var(--color-grey-900)",
    transition: "background-color 0.2s, color 0.2s",
  }),
};

const NoOptionsMessage = styled.div`
  padding: 10px;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  text-align: center;
`;

export default function InstructorSelect({
  value,
  onChange,
  data,
  defaultValue = "",
}: {
  value: string | number;
  onChange: (value: string) => void;
  data: { id: string; name: string; profileImage: string }[];
  defaultValue?: { value: string; label: string; imageUrl: string } | "";
}) {
  const options = data.map((instructor) => ({
    value: instructor.id,
    label: instructor.name,
    imageUrl: instructor.profileImage,
  }));

  const isDefaultValueValid =
    defaultValue && typeof defaultValue === "object" && "value" in defaultValue;

  return (
    <Select
      value={
        options.find((option) => option.value === value) ||
        (isDefaultValueValid ? defaultValue : null)
      }
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      options={
        options.length === 0
          ? []
          : isDefaultValueValid &&
            !options.some((option) => option.value === defaultValue.value)
          ? [...options, defaultValue]
          : options
      }
      formatOptionLabel={CustomOption}
      placeholder="Выбирайте..."
      menuPortalTarget={document.body}
      menuPosition="fixed"
      isSearchable={false}
      styles={{
        ...customStyles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      noOptionsMessage={() => (
        <NoOptionsMessage>
          Выберите даты, чтобы увидеть доступных инструкторов.
        </NoOptionsMessage>
      )}
    />
  );
}
