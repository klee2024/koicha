import { SubFlavorCharacteristic } from './sub-flavor-characteristics';

export interface TasteProfile {
  mainCharacterstics: Record<string, number> | undefined;
  subCharacteristics: Record<string, SubFlavorCharacteristic[]> | undefined;
}
