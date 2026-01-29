export interface PoiProperties {
  name: string;
  categories: string[];
}

export interface Poi {
  type: "Feature";
  properties: PoiProperties;
}
