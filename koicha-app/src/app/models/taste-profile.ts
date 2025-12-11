export interface TasteProfileArchetype {
  id: number;
  slug: string;
  name: string;
}

export interface TasteProfileDetail {
  id: number;
  archetype: TasteProfileArchetype;
  archetype_match: number;
  detail_description: string;
}

export interface FlavorCharacteristic {
  id: number;
  slug: string;
  name: string;
  hierarchy: string;
}

export interface TasteProfile {
  id: number;
  user: number;
  details: TasteProfileDetail[] | undefined;
  flavor_characteristic_values: TasteProfileFlavorCharacteristic[] | undefined;
}
export interface TasteProfileFlavorCharacteristic {
  id: number;
  taste_profile: TasteProfile;
  flavor_characteristic: FlavorCharacteristic;
  value: number;
}
