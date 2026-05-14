export function PageHeader() {
  return (
    <header className="grid gap-8 rounded-[2rem] border border-[#f2c995] bg-white/70 p-6 shadow-[0_30px_80px_rgba(78,48,22,0.14)] backdrop-blur md:p-10">
      <div className="flex flex-col gap-5">
        <span className="w-fit rounded-full bg-[#2f6f55] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[#fff8eb]">
          Best Friend
        </span>
        <div className="space-y-4">
          <h1 className="font-serif text-5xl font-black leading-[0.96] tracking-[-0.06em] text-[#2d2018] sm:text-7xl">
            A warm guide to dog breeds
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#72533c]">
            Browse a simple list with each breed name and average life span.
          </p>
        </div>
      </div>
    </header>
  );
}
