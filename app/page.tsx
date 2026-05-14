import { DogList } from "@/app/components/DogList";
import { PageHeader } from "@/app/components/PageHeader";
import { Pagination } from "@/app/components/Pagination";
import { SearchFilters } from "@/app/components/SearchFilters";
import { getDogs } from "@/app/data/dogBreeds";
import type { DogBreed } from "@/app/types/dog";
import { connection } from "next/server";

const MAX_RECORDS_PER_PAGE = 25;
const RECORDS_PER_PAGE = 25;

type HomeProps = {
  searchParams: Promise<{
    life?: string | string[];
    page?: string | string[];
    search?: string | string[];
    size?: string | string[];
  }>;
};

function getParamValue(param?: string | string[]) {
  return Array.isArray(param) ? param[0] : param;
}

function getCurrentPage(pageParam?: string | string[]) {
  const pageValue = getParamValue(pageParam);
  const pageNumber = Number(pageValue);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return 1;
  }

  return pageNumber;
}

export default async function Home({ searchParams }: HomeProps) {
  await connection();
  const params = await searchParams;
  const search = getParamValue(params.search) ?? "";
  const life = getParamValue(params.life) ?? "";
  const size = getParamValue(params.size) ?? "";
  const dogBreeds: DogBreed[] = await getDogs(search, life, size);
  const pageSize = Math.min(RECORDS_PER_PAGE, MAX_RECORDS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(dogBreeds.length / pageSize));
  const currentPage = Math.min(getCurrentPage(params.page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDogs = dogBreeds.slice(startIndex, startIndex + pageSize);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fff6e8] text-[#2d2018]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(239,115,73,0.22),_transparent_32%),radial-gradient(circle_at_85%_12%,_rgba(77,122,97,0.22),_transparent_30%),linear-gradient(135deg,_#fff6e8_0%,_#f7dfbd_100%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:py-14">
        <PageHeader />

        <SearchFilters life={life} search={search} size={size} />

        <DogList dogs={paginatedDogs} />

        <Pagination
          currentPage={currentPage}
          searchParams={{ life, search, size }}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
