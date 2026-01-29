export interface Estate {
  id: number;
  address: string;
  idEstate: number;
  idRealEstate: number;
  title: string;
  photos: string[];
  description: string;
  price: number;
  size: number;
  nRooms: number;
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
