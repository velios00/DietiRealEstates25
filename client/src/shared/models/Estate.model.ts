import { Poi } from "./Poi.model";

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
    address?: string;
    city: string;
    street?: string;
    lat?: string;
    lon?: string;
    pois?: Poi[];
  };
  creationDate: string;
  idAgent?: number;
  idManager?: number;
  idAgency?: number;
}
