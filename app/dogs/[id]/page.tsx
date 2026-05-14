import { getDogById } from "@/app/data/dogBreeds";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

type DogDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DogDetailsPage({ params }: DogDetailsPageProps) {
  await connection();

  const { id } = await params;
  const dog = await getDogById(id);

  if (!dog) {
    notFound();
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fff6e8] text-[#2d2018]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(239,115,73,0.22),_transparent_32%),radial-gradient(circle_at_85%_12%,_rgba(77,122,97,0.22),_transparent_30%),linear-gradient(135deg,_#fff6e8_0%,_#f7dfbd_100%)]" />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8 lg:py-14">
        <Link
          className="w-fit rounded-full border border-[#2f6f55] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#2f6f55] transition hover:bg-[#2f6f55] hover:text-white"
          href="/"
        >
          Back to breeds
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-[#f2c995] bg-white/75 shadow-[0_30px_80px_rgba(78,48,22,0.14)] backdrop-blur">
          <header className="relative overflow-hidden bg-[#fffaf1] p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[5rem] bg-[#f9df9d]" />
            <div className="absolute -bottom-16 -right-12 size-44 rounded-full border-[28px] border-[#e8f1dc]" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="space-y-5">
                <span className="w-fit rounded-full bg-[#2f6f55] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[#fff8eb]">
                  Breed details
                </span>
                <h1 className="font-serif text-6xl font-black leading-[0.9] tracking-[-0.06em] text-[#2d2018] sm:text-8xl py-4">
                  {dog.name}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#72533c]">
                  {dog.description}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="grid size-24 shrink-0 place-items-center rounded-[2rem] bg-[#ef7349] font-serif text-6xl font-black text-white shadow-[0_18px_45px_rgba(239,115,73,0.32)]"
              >
                {dog.name.charAt(0)}
              </span>
            </div>
          </header>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            <DetailStat label="Life span" value={dog.life_span} />
            <DetailStat label="Weight" value={`${dog.weight} kg`} />
            <DetailStat label="Height" value={`${dog.height} cm`} />
            <DetailStat label="Group" value={dog.group} />
          </div>

          <div className="grid gap-6 border-t border-[#f2d4ad] p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
            <section className="rounded-[1.5rem] bg-[#fffaf1] p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#b27b4f]">
                Origin
              </h2>
              <p className="mt-3 text-2xl font-black text-[#2d2018]">
                {dog.origin}
              </p>
            </section>

            <section className="rounded-[1.5rem] bg-[#fffaf1] p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#b27b4f]">
                Temperament
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {dog.temperament.length > 0 ? (
                  dog.temperament.map((item) => (
                    <span
                      className="rounded-full bg-[#e8f1dc] px-3 py-1 text-sm font-semibold text-[#315c45]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-base font-semibold text-[#72533c]">
                    Not informed
                  </span>
                )}
              </div>
            </section>

            {dog.bred_for ? (
              <section className="rounded-[1.5rem] bg-[#fffaf1] p-6 lg:col-span-2">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#b27b4f]">
                  Bred for
                </h2>
                <p className="mt-3 text-lg font-semibold leading-8 text-[#72533c]">
                  {dog.bred_for}
                </p>
              </section>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#fffaf1] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b27b4f]">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-[#2f6f55]">{value}</p>
    </div>
  );
}
