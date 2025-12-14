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
  parent: number;
}

export interface TasteProfile {
  id: number;
  user: number;
  details: TasteProfileDetail[] | undefined;
  flavor_values: TasteProfileFlavorCharacteristic[] | undefined;
}
export interface TasteProfileFlavorCharacteristic {
  id: number;
  characteristic: FlavorCharacteristic;
  value: number;
}
