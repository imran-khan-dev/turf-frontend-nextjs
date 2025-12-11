type Props = {
  ownersCount: number;
  turfUsersCount: number;
  turfProfilesCount: number;
};

export default function StatsCards({
  ownersCount,
  turfUsersCount,
  turfProfilesCount,
}: Props) {
  const cards = [
    {
      label: "Total Turf Owners",
      value: ownersCount,
      gradient: "from-[#0C78E1] to-[#4FA3EB]",
    },
    {
      label: "Total Turf Users",
      value: turfUsersCount,
      gradient: "from-[#1E293B] to-[#334155]",
    },
    {
      label: "Total Turf Profiles",
      value: turfProfilesCount,
      gradient: "from-[#0C78E1] to-[#6EC1E4]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            rounded-2xl p-6 text-white shadow-lg
            bg-gradient-to-br ${card.gradient}
            transition-all duration-200 hover:scale-[1.02]
            border border-white/10
          `}
        >
          <p className="text-sm opacity-90">{card.label}</p>
          <h3 className="text-4xl font-semibold mt-1 tracking-tight">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
