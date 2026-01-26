export interface Estate {
  address: string;
  idEstate: number;
  title: string;
  photos: string[];
  description: string;
  price: number;
  size: number;
  nRooms: number;
  nBeds: number;
  nBathrooms: number;
  energyClass?: string;
  floor?: number;
  type: string;
  place: {
    city: string;
    street?: string;
    lat?: string;
    lon?: string;
    pois?: string[];
  };
  creationDate: string;
}
