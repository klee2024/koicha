import { SubFlavorCharacteristic } from './sub-flavor-characteristics';

export interface TasteProfile {
  mainCharacterstics: Record<string, number>;
  subCharacteristics: Record<string, SubFlavorCharacteristic[]>;
}
