
export default function ArtworkMeta({ artwork }) {
  const rows = [
    ["Artiste", artwork.artist],
    ["Année", artwork.date],
    ["Mouvement", artwork.movement],
    ["Technique", artwork.type],
    ["Couleur dominante", artwork.color],
    ["Lieu de conservation", artwork.location],
  ].filter(([, value]) => Boolean(value));

  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-3 gap-4 py-3">
          <dt className="cartel text-stone">{label}</dt>
          <dd className="col-span-2 text-sm text-ink-2">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
