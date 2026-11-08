import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { photoFromFile } from "@/lib/site/photos";
import { newId, useSiteStore } from "@/lib/site/store";
import type { Dog, DogStatus } from "@/lib/site/types";
import { STATUS_LABEL } from "@/lib/site/types";
import { coverOf } from "@/lib/site/useSite";
import { SmartImage } from "@/components/site/SmartImage";

export const Route = createFileRoute("/admin/dogs")({
  component: DogsPage,
});

const emptyDog = (): Dog => ({
  id: newId(),
  name: "",
  age: "",
  breed: "",
  sex: "",
  story: "",
  medical: "",
  diet: "",
  medications: "",
  behaviour: "",
  status: "looking",
  showInGallery: true,
  showInPack: false,
  packBlurb: "",
  photos: [],
  coverId: "",
});

function DogsPage() {
  const dogs = useSiteStore((s) => s.draft.dogs);
  const upsertDog = useSiteStore((s) => s.upsertDog);
  const removeDog = useSiteStore((s) => s.removeDog);
  const [editing, setEditing] = useState<Dog | null>(null);
  const [message, setMessage] = useState("");

  async function addPhotos(files: FileList | null) {
    if (!editing || !files?.length) return;
    setMessage("");
    try {
      const added = [];
      for (const file of Array.from(files).slice(0, 8)) {
        added.push(await photoFromFile(file, editing.name ? `${editing.name}` : "Dog photo"));
      }
      setEditing({
        ...editing,
        photos: [...editing.photos, ...added],
        coverId: editing.coverId || added[0]?.id || "",
      });
    } catch {
      setMessage("That photo could not be added. Try a smaller picture.");
    }
  }

  return (
    <main className="admin-page">
      <h1>Dogs</h1>
      <p className="admin-lead">Add a dog, then fill in the boxes in plain language. Save when you are done. The public website updates after you publish.</p>
      <button type="button" className="btn-primary big-add" onClick={() => setEditing(emptyDog())}>
        + Add a dog
      </button>
      <ul className="dog-admin-list">
        {dogs.map((dog) => {
          const cover = coverOf(dog);
          return (
            <li key={dog.id}>
              {cover ? <SmartImage photo={cover} alt="" className="mini-dog" /> : <span className="mini-dog empty-mini" />}
              <span>
                <strong>{dog.name || "Unnamed dog"}</strong>
                <br />
                {STATUS_LABEL[dog.status]}
              </span>
              <button type="button" className="btn-ghost" onClick={() => setEditing(JSON.parse(JSON.stringify(dog)) as Dog)}>
                Edit
              </button>
            </li>
          );
        })}
      </ul>

      {editing && (
        <form
          className="admin-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!editing.name.trim()) {
              setMessage("Please add the dog's name.");
              return;
            }
            upsertDog({ ...editing, name: editing.name.trim() });
            setEditing(null);
            setMessage("Saved in your edits. Preview, then publish when you are ready.");
          }}
        >
          <h2>{dogs.some((d) => d.id === editing.id) ? `Edit ${editing.name || "dog"}` : "New dog"}</h2>
          <label>
            Dog name
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required />
          </label>
          <label>
            Age
            <input value={editing.age} onChange={(e) => setEditing({ ...editing, age: e.target.value })} placeholder="Example: 3 years" />
          </label>
          <label>
            Breed or type
            <input value={editing.breed} onChange={(e) => setEditing({ ...editing, breed: e.target.value })} />
          </label>
          <label>
            Sex
            <select value={editing.sex} onChange={(e) => setEditing({ ...editing, sex: e.target.value })}>
              <option value="">Not set</option>
              <option>Female</option>
              <option>Male</option>
              <option>Unknown</option>
            </select>
          </label>
          <label>
            Short story
            <span className="field-help">This is what visitors read.</span>
            <textarea rows={5} value={editing.story} onChange={(e) => setEditing({ ...editing, story: e.target.value })} />
          </label>
          <label>
            Medical information
            <span className="field-help">Kept in owner tools. It is not shown on the public dog card.</span>
            <textarea rows={3} value={editing.medical} onChange={(e) => setEditing({ ...editing, medical: e.target.value })} />
          </label>
          <label>
            Special diet
            <textarea rows={2} value={editing.diet} onChange={(e) => setEditing({ ...editing, diet: e.target.value })} />
          </label>
          <label>
            Medications
            <textarea rows={2} value={editing.medications} onChange={(e) => setEditing({ ...editing, medications: e.target.value })} />
          </label>
          <label>
            Behaviour notes
            <textarea rows={3} value={editing.behaviour} onChange={(e) => setEditing({ ...editing, behaviour: e.target.value })} />
          </label>
          <label>
            Placement status
            <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as DogStatus })}>
              {(Object.keys(STATUS_LABEL) as DogStatus[]).map((key) => (
                <option key={key} value={key}>
                  {STATUS_LABEL[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={editing.showInGallery}
              onChange={(e) => setEditing({ ...editing, showInGallery: e.target.checked })}
            />
            Show this dog in the gallery
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={editing.showInPack}
              onChange={(e) => setEditing({ ...editing, showInPack: e.target.checked })}
            />
            Show this dog on The Pack page
          </label>
          {editing.showInPack && (
            <label>
              Pack page note
              <textarea rows={3} value={editing.packBlurb} onChange={(e) => setEditing({ ...editing, packBlurb: e.target.value })} />
            </label>
          )}
          <label>
            Add photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                void addPhotos(e.target.files);
                e.currentTarget.value = "";
              }}
            />
          </label>
          {editing.photos.length > 0 && (
            <ul className="photo-edit-list">
              {editing.photos.map((p) => (
                <li key={p.id}>
                  <SmartImage photo={p} alt="" />
                  <button type="button" className="btn-ghost" onClick={() => setEditing({ ...editing, coverId: p.id })}>
                    {editing.coverId === p.id ? "Cover photo" : "Use as cover"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        photos: editing.photos.filter((item) => item.id !== p.id),
                        coverId: editing.coverId === p.id ? editing.photos.find((item) => item.id !== p.id)?.id || "" : editing.coverId,
                      })
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {message && <p className="form-error">{message}</p>}
          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              Save dog
            </button>
            <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
            {dogs.some((d) => d.id === editing.id) && (
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  if (window.confirm(`Remove ${editing.name || "this dog"} from your edits?`)) {
                    removeDog(editing.id);
                    setEditing(null);
                  }
                }}
              >
                Remove dog
              </button>
            )}
          </div>
        </form>
      )}
      {!editing && message && <p role="status">{message}</p>}
    </main>
  );
}
