import { SubFlavorCharacteristic } from './sub-flavor-characteristics';
import { TasteProfileDetails } from './taste-profile-details';

export interface TasteProfile {
  id: string;
  mainCharacterstics: Record<string, number> | undefined;
  subCharacteristics: Record<string, SubFlavorCharacteristic[]> | undefined;
  tasteProfileDetails: TasteProfileDetails;
}
