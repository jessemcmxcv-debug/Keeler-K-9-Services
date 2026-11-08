import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmartImage } from "@/components/site/SmartImage";
import { photoFromFile } from "@/lib/site/photos";
import { useSiteStore } from "@/lib/site/store";
import { coverOf } from "@/lib/site/useSite";

export const Route = createFileRoute("/admin/photos")({
  component: PhotosPage,
});

function PhotosPage() {
  const dogs = useSiteStore((s) => s.draft.dogs);
  const upsertDog = useSiteStore((s) => s.upsertDog);
  const [dogId, setDogId] = useState(dogs[0]?.id ?? "");
  const [note, setNote] = useState("");
  const dog = dogs.find((d) => d.id === dogId) ?? dogs[0];

  return (
    <main className="admin-page">
      <h1>Photos</h1>
      <p className="admin-lead">Pick a dog, then tap Add photos. You do not need to rename files.</p>
      {dogs.length === 0 ? (
        <p>Add a dog first.</p>
      ) : (
        <>
          <label>
            Which dog?
            <select value={dog?.id ?? ""} onChange={(e) => setDogId(e.target.value)}>
              {dogs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          {dog && (
            <>
              <label className="btn-primary file-btn">
                Add photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={async (e) => {
                    const files = e.target.files;
                    e.currentTarget.value = "";
                    if (!files?.length) return;
                    try {
                      const added = [];
                      for (const file of Array.from(files).slice(0, 8)) {
                        added.push(await photoFromFile(file, dog.name));
                      }
                      upsertDog({
                        ...dog,
                        photos: [...dog.photos, ...added],
                        coverId: dog.coverId || added[0]?.id || "",
                      });
                      setNote("Photos saved in your edits. Publish when you want them on the preview site.");
                    } catch {
                      setNote("A photo could not be added. Try a different one.");
                    }
                  }}
                />
              </label>
              <ul className="photo-edit-list">
                {dog.photos.map((p) => (
                  <li key={p.id}>
                    <SmartImage photo={p} alt={p.alt} />
                    <button type="button" className="btn-ghost" onClick={() => upsertDog({ ...dog, coverId: p.id })}>
                      {dog.coverId === p.id ? "Cover photo" : "Use as cover"}
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() =>
                        upsertDog({
                          ...dog,
                          photos: dog.photos.filter((item) => item.id !== p.id),
                          coverId: dog.coverId === p.id ? dog.photos.find((item) => item.id !== p.id)?.id || "" : dog.coverId,
                        })
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {dog.photos.length === 0 && <p>No photos yet.</p>}
              {coverOf(dog) ? null : null}
            </>
          )}
          {note && <p role="status">{note}</p>}
        </>
      )}
    </main>
  );
}
