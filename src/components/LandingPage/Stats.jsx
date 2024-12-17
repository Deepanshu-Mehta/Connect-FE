
const stats = [
  { number: "1M+", label: "Developer Matches" },
  { number: "50K+", label: "Active Projects" },
  { number: "100+", label: "Countries" },
  { number: "4.9/5", label: "User Rating" }
];

export default function Stats() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-violet-500 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-pink-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}