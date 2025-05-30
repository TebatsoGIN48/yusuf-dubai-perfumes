import { perfumes, type Perfume, type InsertPerfume } from "@shared/schema";

export interface IStorage {
  getPerfume(id: number): Promise<Perfume | undefined>;
  getAllPerfumes(): Promise<Perfume[]>;
  getPerfumesByFilter(filter: string): Promise<Perfume[]>;
  createPerfume(perfume: InsertPerfume): Promise<Perfume>;
  sortPerfumes(perfumes: Perfume[], sortBy: string): Perfume[];
}

export class MemStorage implements IStorage {
  private perfumes: Map<number, Perfume>;
  private currentId: number;

  constructor() {
    this.perfumes = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    const initialPerfumes: Omit<Perfume, 'id'>[] = [
      {
        name: "OUD ROYAL GOLD",
        category: "PREMIUM OUD COLLECTION",
        price: "840.00",
        originalPrice: "1099.00",
        rating: "5.0",
        imageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "bestsellers",
        description: "Experience the luxury of authentic Dubai fragrances with this exclusive OUD collection."
      },
      {
        name: "DUBAI NIGHTS INTENSE",
        category: "SIGNATURE COLLECTION",
        price: "675.00",
        originalPrice: "899.00",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "new",
        description: "A captivating blend that embodies the mystique of Dubai nights."
      },
      {
        name: "ARABIAN MUSK",
        category: "CLASSIC COLLECTION",
        price: "520.00",
        originalPrice: "749.00",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "deals",
        description: "Traditional Arabian musk with modern sophistication."
      },
      {
        name: "SAFFRON LUXURY",
        category: "PREMIUM COLLECTION",
        price: "890.00",
        originalPrice: "1199.00",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "bestsellers",
        description: "Luxurious saffron blend that defines opulence."
      },
      {
        name: "ROSE & AMBER",
        category: "FLORAL COLLECTION",
        price: "445.00",
        originalPrice: "599.00",
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "new",
        description: "Elegant fusion of rose and amber notes."
      },
      {
        name: "BLACK OUD INTENSE",
        category: "INTENSE COLLECTION",
        price: "750.00",
        originalPrice: "999.00",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "bestsellers",
        description: "Intense black oud for the discerning connoisseur."
      },
      {
        name: "DESERT BREEZE",
        category: "FRESH COLLECTION",
        price: "385.00",
        originalPrice: "549.00",
        rating: "4.5",
        imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "deals",
        description: "Fresh and invigorating like a desert breeze."
      },
      {
        name: "PLATINUM ELITE",
        category: "LUXURY COLLECTION",
        price: "920.00",
        originalPrice: "1249.00",
        rating: "5.0",
        imageUrl: "https://images.unsplash.com/photo-1549558549-415fe4c37b60?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        filter: "new",
        description: "The pinnacle of luxury perfumery."
      }
    ];

    initialPerfumes.forEach(perfume => {
      const id = this.currentId++;
      this.perfumes.set(id, { ...perfume, id });
    });
  }

  async getPerfume(id: number): Promise<Perfume | undefined> {
    return this.perfumes.get(id);
  }

  async getAllPerfumes(): Promise<Perfume[]> {
    return Array.from(this.perfumes.values());
  }

  async getPerfumesByFilter(filter: string): Promise<Perfume[]> {
    if (filter === 'all') {
      return this.getAllPerfumes();
    }
    return Array.from(this.perfumes.values()).filter(
      perfume => perfume.filter === filter
    );
  }

  async createPerfume(insertPerfume: InsertPerfume): Promise<Perfume> {
    const id = this.currentId++;
    const perfume: Perfume = { ...insertPerfume, id };
    this.perfumes.set(id, perfume);
    return perfume;
  }

  sortPerfumes(perfumes: Perfume[], sortBy: string): Perfume[] {
    const sorted = [...perfumes];
    switch (sortBy) {
      case 'lowToHigh':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'highToLow':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'rating':
        return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      default:
        return sorted;
    }
  }
}

export const storage = new MemStorage();
