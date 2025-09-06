import { TasteProfile } from '../models/taste-profile';

export const MOCK_TASTE_PROFILE: TasteProfile = {
  mainCharacterstics: {
    umami: 80,
    floral: 30,
    astringent: 20,
    grassy: 30,
    nutty: 65,
    creamy: 55,
  },
  subCharacteristics: {
    umami: [
      { label: 'Seaweed', value: 80 },
      { label: 'Brothy', value: 60 },
      { label: 'Miso', value: 40 },
    ],
    floral: [
      { label: 'White Chocolate', value: 80 },
      { label: 'Honey', value: 40 },
      { label: 'Floral', value: 60 },
    ],
    astringent: [
      { label: 'Oceanic', value: 40 },
      { label: 'Woody', value: 60 },
      { label: 'Mineral', value: 20 },
    ],
    grassy: [
      { label: 'Grass', value: 40 },
      { label: 'Spinach', value: 60 },
      { label: 'Edamame', value: 40 },
    ],

    nutty: [
      { label: 'Cocoa', value: 60 },
      { label: 'Chestnut', value: 40 },
      { label: 'Hazelnut', value: 80 },
    ],
    creamy: [
      { label: 'Milky', value: 20 },
      { label: 'Buttery', value: 80 },
      { label: 'Custard', value: 20 },
      { label: 'Velvety', value: 60 },
    ],
  },
};
