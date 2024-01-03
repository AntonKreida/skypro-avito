export const TableItemSkeleton = () => (
  <div className="flex flex-col gap-5 items-center justify-center col-span-1">
    <div className="w-full h-[270px] relative animate-pulse">
      <div className="w-full h-full absolute left-0 top-0 bg-slate-300 rounded" />
    </div>
    <div className="flex flex-col gap-2 w-full">
      <div className="animate-pulse w-44 bg-gray-300 h-6 rounded-md" />
      <div className="animate-pulse w-32 bg-gray-300 h-6 rounded-md" />
    </div>
  </div>
);
