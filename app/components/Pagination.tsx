import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  searchParams?: {
    life?: string;
    search?: string;
    size?: string;
  };
  totalPages: number;
};

export function Pagination({
  currentPage,
  searchParams,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      aria-label="Dog breed pagination"
      className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-[#f2c995] bg-white/75 p-4 shadow-[0_18px_50px_rgba(78,48,22,0.1)] sm:flex-row"
    >
      <PaginationLink
        disabled={currentPage === 1}
        href={buildPageHref(previousPage, searchParams)}
      >
        Previous
      </PaginationLink>

      <div className="flex flex-wrap justify-center gap-2">
        {pages.map((page) => {
          const isCurrent = page === currentPage;

          return (
            <Link
              aria-current={isCurrent ? "page" : undefined}
              className={`grid size-11 place-items-center rounded-full text-sm font-black transition ${
                isCurrent
                  ? "bg-[#2f6f55] text-white"
                  : "bg-[#fffaf1] text-[#72533c] hover:bg-[#f9df9d]"
              }`}
              href={buildPageHref(page, searchParams)}
              key={page}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <PaginationLink
        disabled={currentPage === totalPages}
        href={buildPageHref(nextPage, searchParams)}
      >
        Next
      </PaginationLink>
    </nav>
  );
}

function buildPageHref(
  page: number,
  searchParams: PaginationProps["searchParams"],
) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (searchParams?.search) {
    params.set("search", searchParams.search);
  }

  if (searchParams?.life) {
    params.set("life", searchParams.life);
  }

  if (searchParams?.size) {
    params.set("size", searchParams.size);
  }

  const queryString = params.toString();

  return queryString ? `/?${queryString}` : "/";
}

function PaginationLink({
  children,
  disabled,
  href,
}: {
  children: React.ReactNode;
  disabled: boolean;
  href: string;
}) {
  if (disabled) {
    return (
      <span className="min-w-28 rounded-full border border-[#ead2b2] px-5 py-3 text-center text-sm font-black text-[#c5a37e]">
        {children}
      </span>
    );
  }

  return (
    <Link
      className="min-w-28 rounded-full border border-[#2f6f55] px-5 py-3 text-center text-sm font-black text-[#2f6f55] transition hover:bg-[#2f6f55] hover:text-white"
      href={href}
    >
      {children}
    </Link>
  );
}
