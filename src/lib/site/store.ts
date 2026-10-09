import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSeed } from "./seed";
import type { Dog, Intake, IntakeStatus, SiteCopy, Snapshot, Testimonial } from "./types";

type State = {
  draft: Snapshot;
  published: Snapshot;
  intakes: Intake[];
  updateCopy: (partial: Partial<SiteCopy>) => void;
  setDogs: (dogs: Dog[]) => void;
  upsertDog: (dog: Dog) => void;
  removeDog: (id: string) => void;
  setTestimonials: (items: Testimonial[]) => void;
  publish: () => void;
  discardDraft: () => void;
  resetDraftToOriginal: () => void;
  addIntake: (item: Intake) => void;
  setIntakeStatus: (id: string, status: IntakeStatus) => void;
};

function cloneSnap(snap: Snapshot): Snapshot {
  return JSON.parse(JSON.stringify(snap)) as Snapshot;
}

export const useSiteStore = create<State>()(
  persist(
    (set) => ({
      draft: createSeed(),
      published: createSeed(),
      intakes: [],
      updateCopy: (partial) =>
        set((s) => ({ draft: { ...s.draft, copy: { ...s.draft.copy, ...partial } } })),
      setDogs: (dogs) => set((s) => ({ draft: { ...s.draft, dogs } })),
      upsertDog: (dog) =>
        set((s) => {
          const exists = s.draft.dogs.some((d) => d.id === dog.id);
          const dogs = exists ? s.draft.dogs.map((d) => (d.id === dog.id ? dog : d)) : [dog, ...s.draft.dogs];
          return { draft: { ...s.draft, dogs } };
        }),
      removeDog: (id) =>
        set((s) => ({ draft: { ...s.draft, dogs: s.draft.dogs.filter((d) => d.id !== id) } })),
      setTestimonials: (testimonials) => set((s) => ({ draft: { ...s.draft, testimonials } })),
      publish: () => set((s) => ({ published: cloneSnap(s.draft) })),
      discardDraft: () => set((s) => ({ draft: cloneSnap(s.published) })),
      resetDraftToOriginal: () => set(() => ({ draft: createSeed() })),
      addIntake: (item) => set((s) => ({ intakes: [item, ...s.intakes] })),
      setIntakeStatus: (id, status) =>
        set((s) => ({
          intakes: s.intakes.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
    }),
    {
      name: "kk9-preview-v1",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ draft: s.draft, published: s.published, intakes: s.intakes }),
    },
  ),
);

export function isDirty(): boolean {
  const { draft, published } = useSiteStore.getState();
  return JSON.stringify(draft) !== JSON.stringify(published);
}

export function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function telFromDisplay(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (!digits) return "";
  return `+${digits}`;
}
