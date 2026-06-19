import { getImageUrl } from "../../lib/formatters";

export default function CastCard({ person }) {
  return (
    <div className="flex-shrink-0 w-28 text-center group">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
        <img
          src={getImageUrl(person.profile_path, "w185")}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-sm font-medium text-white line-clamp-1">{person.name}</p>
      {person.character && (
        <p className="text-xs text-gray-500 line-clamp-1">{person.character}</p>
      )}
      {person.job && (
        <p className="text-xs text-gray-500 line-clamp-1">{person.job}</p>
      )}
    </div>
  );
}
