export function ProfileStatCard({ name, value }: { name: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 space-y-2 flex flex-col justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-400">{name}</div>
      <div className="text-2xl font-bold text-right">{value}</div>
    </div>
  );
}
