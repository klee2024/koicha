export interface SubFlavorCharacteristic {
  label: string;
  value: number;
}

export interface TasteProfileArchetype {
  id: string;
  archetypeName: string;
}

export interface TasteProfileDetail {
  id: string;
  archetype: TasteProfileArchetype;
  archetypeMatch: number;
  detailDescription: string;
}

export interface TasteProfile {
  id: string;
  userId: string;
  mainCharacterstics: Record<string, number> | undefined;
  subCharacteristics: Record<string, SubFlavorCharacteristic[]> | undefined;
  tasteProfileDetails: TasteProfileDetail[];
}
