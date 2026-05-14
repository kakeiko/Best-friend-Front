import type { DogBreed } from "@/app/types/dog";
import Fuse from "fuse.js";
import { unstable_cache } from "next/cache";

const DOGS_REVALIDATE_SECONDS = 3600;

type ApiMetric = {
  imperial?: string;
  metric?: string;
};

type ApiDogBreed = Omit<DogBreed,"group" | "height" | "temperament" | "weight"> & {
  breed_group?: string;
  group?: string;
  height: ApiMetric | string;
  temperament?: string[] | string;
  weight: ApiMetric | string;
};

function normalizeMetric(value: string): string {
  if (!value) return "Not informed";

  if (value.includes("Male:")) {
    const malePart = value.split(";")[0];

    return malePart.replace("Male:", "").trim();
  }

  return value.trim();
}

function getMetricValue(value: ApiMetric | string): string {
  if (typeof value === "string") {
    return normalizeMetric(value);
  }

  return normalizeMetric(value.metric ?? value.imperial ?? "");
}

function normalizeTemperament(value?: string[] | string): string[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function fetchDogBreedsFromApi(): Promise<ApiDogBreed[]> {
  const baseApiLink = process.env.API_LINK_INFO;
  const apiKey = process.env.API_KEY;

  if (!baseApiLink) {
    throw new Error("API_LINK_INFO was not defined");
  }

  if (!apiKey) {
    throw new Error("DOG_API_KEY was not defined");
  }

  const response = await fetch(baseApiLink, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    next: {
      revalidate: DOGS_REVALIDATE_SECONDS,
      tags: ["dogs"],
    },
  });

  console.log(response.ok)

  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }

  return response.json();
}

function normalizeDogBreeds(dogs: ApiDogBreed[]): DogBreed[] {
  return dogs.map((dog) => ({
    ...dog,
    description: dog.description || "No description available yet.",
    group: dog.group || dog.breed_group || "Not informed",
    life_span:
      dog.life_span && dog.life_span.trim() !== ""
        ? dog.life_span
        : "Not informed",
    origin: dog.origin || "Not informed",
    temperament: normalizeTemperament(dog.temperament),
    weight: getMetricValue(dog.weight),
    height: getMetricValue(dog.height),
  }));
}

export const getAllDogs = unstable_cache(
  async () => normalizeDogBreeds(await fetchDogBreedsFromApi()),
  ["dog-breeds"],
  {
    revalidate: DOGS_REVALIDATE_SECONDS,
    tags: ["dogs"],
  },
);

export async function getDogs(
  search?: string,
  life?: string,
  size?: string,
): Promise<DogBreed[]> {
  let normalizedDogs = await getAllDogs();

  if (search?.trim()) {
    const fuse = new Fuse(normalizedDogs, {
      ignoreLocation: true,
      includeScore: true,
      keys: [
        { name: "name", weight: 0.7 },
        { name: "temperament", weight: 0.3 },
      ],
      threshold: 0.35,
    });

    normalizedDogs = fuse.search(search.trim()).map((result) => result.item);
  }

  if (life) {
    normalizedDogs = normalizedDogs.filter((dog) => {
    const numbers = dog.life_span.match(/\d+/g);

    if (!numbers) return false;

    const maxLife = Math.max(...numbers.map(Number));

    if (life === '10') {
      return maxLife <= 10;
    }

    if (life === '13') {
      return maxLife > 10 && maxLife <= 13;
    }

    if (life === '14') {
      return maxLife >= 14;
    }

    return true;
  });
  }

  if (size) {
    normalizedDogs = normalizedDogs.filter((dog) => {
    const numbers = dog.weight.match(/\d+/g);

    if (!numbers) return false;

    const maxWeight = Math.max(...numbers.map(Number));

    if (size === '10') {
      return maxWeight <= 10;
    }

    if (size === '25') {
      return maxWeight > 10 && maxWeight <= 25;
    }

    if (size === '26') {
      return maxWeight >= 26;
    }

    return true;
  });
  }

  return normalizedDogs;
}

export async function getDogById(id: string): Promise<DogBreed | undefined> {
  const dogs = await getDogs();

  return dogs.find((dog) => String(dog.id) === id);
}
