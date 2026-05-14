type SearchFiltersProps = {
  life?: string;
  search?: string;
  size?: string;
};

export function SearchFilters({
  life = "",
  search = "",
  size = "",
}: SearchFiltersProps) {
  return (
    <section
      aria-label="Search and filters"
      className="rounded-[1.75rem] border border-[#f2c995] bg-white/75 p-4 shadow-[0_18px_50px_rgba(78,48,22,0.1)] backdrop-blur"
    >
      <form
        action="/"
        className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]"
        method="get"
      >
        <label className="group flex items-center gap-3 rounded-[1.25rem] border border-[#edd0aa] bg-[#fffaf1] px-4 py-3 transition focus-within:border-[#2f6f55]">
          <svg
            aria-hidden="true"
            className="size-5 shrink-0 text-[#2f6f55]"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m20 20-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.4"
            />
          </svg>
          <span className="sr-only">Search breed</span>
          <input
            defaultValue={search}
            className="w-full bg-transparent text-base font-semibold text-[#2d2018] outline-none placeholder:text-[#b28b68]"
            name="search"
            placeholder="Search by breed name or temperament"
            type="search"
          />
        </label>

        <label className="flex flex-col gap-2 rounded-[1.25rem] border border-[#edd0aa] bg-[#fffaf1] px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#b27b4f]">
            Life span
          </span>
          <select
            className="bg-transparent text-base font-bold text-[#2d2018] outline-none"
            defaultValue={life}
            name="life"
          >
            <option value="">All</option>
            <option value="10">Up to 10 years</option>
            <option value="13">10 to 13 years</option>
            <option value="14">More than 13 years</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 rounded-[1.25rem] border border-[#edd0aa] bg-[#fffaf1] px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#b27b4f]">
            Size
          </span>
          <select
            className="bg-transparent text-base font-bold text-[#2d2018] outline-none"
            defaultValue={size}
            name="size"
          >
            <option value="">All</option>
            <option value="10">Small</option>
            <option value="25">Medium</option>
            <option value="26">Large</option>
          </select>
        </label>

        <button
          className="rounded-[1.25rem] bg-[#2f6f55] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_35px_rgba(47,111,85,0.22)] transition hover:-translate-y-0.5 hover:bg-[#255a45]"
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
}
