import { createFileRoute } from "@tanstack/react-router";
import { useSiteStore } from "@/lib/site/store";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const copy = useSiteStore((s) => s.draft.copy);
  const update = useSiteStore((s) => s.updateCopy);
  return (
    <main className="admin-page">
      <h1>Messages</h1>
      <p className="admin-lead">Change the words people read. You are not editing code. Publish when you want the preview to use them.</p>
      <label>
        Homepage message
        <span className="field-help">The main line under the name.</span>
        <textarea rows={3} value={copy.homepageHeadline} onChange={(e) => update({ homepageHeadline: e.target.value })} />
      </label>
      <label>
        Homepage explanation
        <span className="field-help">A short description of what Keeler K9 does.</span>
        <textarea rows={4} value={copy.homepageLead} onChange={(e) => update({ homepageLead: e.target.value })} />
      </label>
      <label>
        Service box 1 title
        <input value={copy.feature1Title} onChange={(e) => update({ feature1Title: e.target.value })} />
      </label>
      <label>
        Service box 1 text
        <textarea rows={3} value={copy.feature1Text} onChange={(e) => update({ feature1Text: e.target.value })} />
      </label>
      <label>
        Service box 2 title
        <input value={copy.feature2Title} onChange={(e) => update({ feature2Title: e.target.value })} />
      </label>
      <label>
        Service box 2 text
        <textarea rows={3} value={copy.feature2Text} onChange={(e) => update({ feature2Text: e.target.value })} />
      </label>
      <label>
        Service box 3 title
        <input value={copy.feature3Title} onChange={(e) => update({ feature3Title: e.target.value })} />
      </label>
      <label>
        Service box 3 text
        <textarea rows={3} value={copy.feature3Text} onChange={(e) => update({ feature3Text: e.target.value })} />
      </label>
      <label>
        About us
        <span className="field-help">Leave a blank line between paragraphs.</span>
        <textarea rows={8} value={copy.aboutBody} onChange={(e) => update({ aboutBody: e.target.value })} />
      </label>
      <label>
        Photo caption under David and Red
        <input value={copy.aboutCaption} onChange={(e) => update({ aboutCaption: e.target.value })} />
      </label>
      <label>
        Our mission
        <span className="field-help">Leave a blank line between paragraphs.</span>
        <textarea rows={8} value={copy.mission} onChange={(e) => update({ mission: e.target.value })} />
      </label>
      <label>
        What happens next
        <span className="field-help">Shown beside the help form.</span>
        <textarea rows={5} value={copy.whatHappensNext} onChange={(e) => update({ whatHappensNext: e.target.value })} />
      </label>
      <label>
        Gallery introduction
        <textarea rows={4} value={copy.galleryIntro} onChange={(e) => update({ galleryIntro: e.target.value })} />
      </label>
      <label>
        The Pack introduction
        <textarea rows={3} value={copy.packIntro} onChange={(e) => update({ packIntro: e.target.value })} />
      </label>
      <label>
        Dog walking introduction
        <textarea rows={4} value={copy.walkingIntro} onChange={(e) => update({ walkingIntro: e.target.value })} />
      </label>
      <label>
        Footer line
        <input value={copy.footerLine} onChange={(e) => update({ footerLine: e.target.value })} />
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={copy.bannerEnabled}
          onChange={(e) => update({ bannerEnabled: e.target.checked })}
        />
        Show an extra announcement under the menu
      </label>
      {copy.bannerEnabled && (
        <label>
          Announcement
          <textarea rows={3} value={copy.bannerText} onChange={(e) => update({ bannerText: e.target.value })} />
        </label>
      )}
    </main>
  );
}
