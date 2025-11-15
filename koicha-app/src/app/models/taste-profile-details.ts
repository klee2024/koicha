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

export interface TasteProfileDetails {
  tasteProfileDetails: TasteProfileDetail[];
}
