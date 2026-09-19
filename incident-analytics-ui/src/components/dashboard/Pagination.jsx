const Pagination = ({
  page,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalElements);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i += 1) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(0);

    if (page > 3) {
      pages.push("left-ellipsis");
    }

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages - 2, page + 1);

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(i);
    }

    if (page < totalPages - 4) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages - 1);

    return pages;
  };

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">{start}</span>
        {" – "}
        <span className="font-medium text-slate-700">{end}</span>
        {" of "}
        <span className="font-medium text-slate-700">{totalElements}</span>
        {" incidents"}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {getPages().map((item, index) => {
          if (typeof item === "string") {
            return (
              <span
                key={`${item}-${index}`}
                className="px-2 text-sm text-slate-400"
              >
                ...
              </span>
            );
          }

          const active = item === page;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item + 1}
            </button>
          );
        })}

        <button
          type="button"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;