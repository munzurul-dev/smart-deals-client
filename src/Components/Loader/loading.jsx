
const Loading = ({ text = "Loading..." }) => {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
    >

      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600 border-r-fuchsia-500" />

        <div className="h-10 w-10 animate-pulse rounded-full bg-linear-to-br from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-300/50" />

        <div className="absolute -right-1 top-1 h-4 w-4 animate-bounce rounded-full border-2 border-white bg-fuchsia-500" />
      </div>


      <div className="text-center">
        <h2 className="text-lg font-bold tracking-wide text-slate-800">
          {text}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please wait a moment
        </p>
      </div>

   
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-purple-100">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-linear-to-r from-purple-600 to-fuchsia-500" />
      </div>
    </div>
  );
};

export default Loading;
