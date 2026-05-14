import { DogCard } from "@/app/components/DogCard";
import type { DogBreed } from "@/app/types/dog";

type DogListProps = {
  dogs: DogBreed[];
};

export function DogList({ dogs }: DogListProps) {
  return (
    <section
      aria-label="Dog breed list"
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {dogs.map((dog) => (
        <DogCard dog={dog} key={dog.id} />
      ))}
    </section>
  );
}
