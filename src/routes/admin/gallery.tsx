import { createFileRoute } from "@tanstack/react-router";
import { useSiteStore } from "@/lib/site/store";
import type { DogStatus } from "@/lib/site/types";
import { STATUS_LABEL } from "@/lib/site/types";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const dogs = useSiteStore((s) => s.draft.dogs);
  const setDogs = useSiteStore((s) => s.setDogs);

  function move(index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= dogs.length) return;
    const copy = dogs.slice();
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    setDogs(copy);
  }

  return (
    <main className="admin-page">
      <h1>Gallery</h1>
      <p className="admin-lead">Use the arrows to change the order. Uncheck a dog to hide them from the gallery.</p>
      <ul className="dog-admin-list">
        {dogs.map((dog, index) => (
          <li key={dog.id}>
            <span>
              <strong>{dog.name}</strong>
              <br />
              <label className="check inline">
                <input
                  type="checkbox"
                  checked={dog.showInGallery}
                  onChange={(e) => setDogs(dogs.map((d) => (d.id === dog.id ? { ...d, showInGallery: e.target.checked } : d)))}
                />
                Show in gallery
              </label>
              <select
                value={dog.status}
                aria-label={`Status for ${dog.name}`}
                onChange={(e) =>
                  setDogs(dogs.map((d) => (d.id === dog.id ? { ...d, status: e.target.value as DogStatus } : d)))
                }
              >
                {(Object.keys(STATUS_LABEL) as DogStatus[]).map((key) => (
                  <option key={key} value={key}>
                    {STATUS_LABEL[key]}
                  </option>
                ))}
              </select>
            </span>
            <span className="arrow-pair">
              <button type="button" className="btn-ghost" aria-label={`Move ${dog.name} up`} onClick={() => move(index, -1)}>
                Up
              </button>
              <button type="button" className="btn-ghost" aria-label={`Move ${dog.name} down`} onClick={() => move(index, 1)}>
                Down
              </button>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
