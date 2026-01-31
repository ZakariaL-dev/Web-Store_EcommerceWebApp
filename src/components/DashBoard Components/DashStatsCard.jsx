const DashStatsCard = ({detail}) => {
  return (
    <div className="flex items-center gap-5 p-4 rounded-md w-64 shadow-lg ">
      <detail.icon
        size={40}
        className="bg-gray-500 p-2 rounded-md text-slate-100"
      />
      <div>
        <h1>{detail.title}</h1>
        <h2 className="text-xl font-bold">{detail.value}</h2>
        <p className="text-emerald-700">{detail.stats}</p>
      </div>
    </div>
  );
};

export default DashStatsCard;
