import styled from "styled-components";
import InlineInput from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSettings";
import { ChangeEvent } from "react";

const SettingsContainer = styled.div`
  max-width: 85%;
  margin: 5rem auto;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 2rem auto;
    padding: 1rem;
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-brand-900);
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SettingLabel = styled.label`
  font-size: 1.6rem;
  color: var(--color-green-600);
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const SettingInput = styled(InlineInput)`
  flex: 1.5;
  background-color: var(--color-grey-0);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function SettingsPage() {
  const {
    settings: {
      minParticipantsToStart,
      insurancePrice,
      maxParticipantsInTour,
      minTourDuration,
      maxTourDuration,
      difficultyLevels,
      minTourPrice,
    } = {},
    isGettingSettings,
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isGettingSettings) return <Spinner />;

  function handleUpdate(e: ChangeEvent<HTMLInputElement>) {
    const { value, id, defaultValue } = e.target;
    let newValue: string | string[] = value;
    if (!value || !id || defaultValue === value) return;
    if (value.includes(","))
      newValue = value.split(",").map((item) => item.trim());
    if (typeof newValue === "string") {
      updateSetting({ [id]: newValue });
      e.target.defaultValue = newValue;
    }
  }

  return (
    <SettingsContainer>
      <SettingsSection>
        <SectionTitle>Обновить настройки</SectionTitle>
        <SettingRow>
          <SettingLabel htmlFor="minParticipantsToStart">
            Минимальное количество участников для старта
          </SettingLabel>
          <SettingInput
            id="minParticipantsToStart"
            type="number"
            defaultValue={minParticipantsToStart}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="maxParticipantsInTour">
            Максимальное количество участников в туре
          </SettingLabel>
          <SettingInput
            id="maxParticipantsInTour"
            type="number"
            defaultValue={maxParticipantsInTour}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="insurancePrice">
            Стоимость страховки
          </SettingLabel>
          <SettingInput
            id="insurancePrice"
            type="number"
            defaultValue={insurancePrice}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="minTourDuration">
            Минимальная продолжительность тура (часы)
          </SettingLabel>
          <SettingInput
            id="minTourDuration"
            type="number"
            defaultValue={minTourDuration}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="difficultyLevels">
            Уровни сложности
          </SettingLabel>
          <SettingInput
            id="difficultyLevels"
            type="text"
            defaultValue={difficultyLevels.join(", ")}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="maxTourDuration">
            Максимальная продолжительность тура (часы)
          </SettingLabel>
          <SettingInput
            id="maxTourDuration"
            type="number"
            defaultValue={maxTourDuration}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel htmlFor="minTourPrice">
            Минимальная цена тура
          </SettingLabel>
          <SettingInput
            id="minTourPrice"
            type="number"
            defaultValue={minTourPrice}
            onBlur={(e) => handleUpdate(e)}
            disabled={isUpdating}
          />
        </SettingRow>
      </SettingsSection>
    </SettingsContainer>
  );
}

export default SettingsPage;
