import type { DogBreed } from "@/app/types/dog";
import Link from "next/link";

type DogCardProps = {
  dog: DogBreed;
};

export function DogCard({ dog }: DogCardProps) {
  return (
    <Link
      aria-label={`View details for ${dog.name}`}
      className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-[#f3d0a4] bg-[#fffaf1] p-6 shadow-[0_18px_45px_rgba(79,49,21,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(79,49,21,0.14)] focus:outline-none focus:ring-4 focus:ring-[#f9df9d]"
      href={`/dogs/${dog.id}`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-[#f9df9d]" />
      <div className="absolute -bottom-10 -right-10 size-28 rounded-full border-[18px] border-[#e8f1dc]" />

      <div className="relative flex h-full flex-col gap-7">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-[#2f6f55] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
            Breed
          </span>
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-2xl bg-[#ef7349] font-serif text-3xl font-black text-white shadow-[0_12px_30px_rgba(239,115,73,0.32)] transition duration-300 group-hover:rotate-6"
          >
            {dog.name.charAt(0)}
          </span>
        </div>

        <h2 className="font-serif text-4xl font-black leading-none tracking-[-0.05em] text-[#2d2018]">
          {dog.name}
        </h2>

        <div className="mt-auto border-t border-dashed border-[#e4bd8c] pt-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b27b4f]">
            Average life span
          </p>
          <p className="mt-2 text-xl font-black text-[#2f6f55]">
            {dog.life_span}
          </p>
        </div>
      </div>
    </Link>
  );
}
