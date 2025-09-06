import { TasteProfile } from '../models/taste-profile';

export const MOCK_TASTE_PROFILE: TasteProfile = {
  mainCharacterstics: {
    umami: 4,
    creamy: 5,
    nutty: 3,
    grassy: 3,
    astringent: 1,
    floral: 2,
  },
  subCharacteristics: {
    umami: [
      { label: 'Seaweed', value: 4 },
      { label: 'Brothy', value: 3 },
      { label: 'Miso', value: 2 },
    ],
    creamy: [
      { label: 'Milky', value: 5 },
      { label: 'Buttery', value: 4 },
      { label: 'Custard', value: 3 },
      { label: 'Velvety', value: 4 },
    ],
    nutty: [
      { label: 'Cocoa', value: 3 },
      { label: 'Chestnut', value: 2 },
      { label: 'Hazelnut', value: 4 },
    ],
    grassy: [
      { label: 'Grass', value: 2 },
      { label: 'Spinach', value: 3 },
      { label: 'Edamame', value: 2 },
    ],
    astringent: [
      { label: 'Oceanic', value: 2 },
      { label: 'Woody', value: 3 },
      { label: 'Mineral', value: 1 },
    ],
    floral: [
      { label: 'White Chocolate', value: 4 },
      { label: 'Honey', value: 2 },
      { label: 'Floral', value: 3 },
    ],
  },
};
