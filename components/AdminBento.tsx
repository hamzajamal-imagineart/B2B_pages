import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * The four admin panels, as a hairline attribute grid.
 *
 * Previously four photo-backed tiles, each carrying a built UI: a usage
 * dashboard, the team-folders panel, a member list, and the live collaboration
 * canvas. Those are parked, not lost — the components are in this file's git
 * history and every asset they used is still under public/media
 * (admin/tile-*.jpg, admin/asset-folders.jpg). Bringing one back is a revert
 * of the commit that introduced this file, not a rebuild.
 *
 * The grid is the same `.attr-grid` the suite section used before it became a
 * card rail: icon, title, body, hairline cells, no imagery. Four items over a
 * three-column grid would leave a row of one, so this section runs its own
 * two-across at desktop.
 */
type Panel = { title: string; body: string; icon: React.ReactNode };

const PANELS: Panel[] = [
  {
    title: "Complete Admin Control",
    body: "One dashboard for your entire organization. Manage roles, monitor usage, and govern access across every team without losing visibility.",
    icon: <IconDashboard />,
  },
  {
    title: "Efficient Asset Management",
    body: "Every generation organized, searchable, and on-brand. Find what you made, reuse what works, and never lose an asset again.",
    icon: <IconFolders />,
  },
  {
    title: "Unlimited Members, No Added Cost",
    body: "Bring your whole team. Seats don't cost extra, so creativity is never gated by your headcount or your budget.",
    icon: <IconPeople />,
  },
  {
    title: "Collaborate End to End",
    body: "Comments, approvals, and shared review built in, so feedback happens where the work lives, not scattered across emails and threads.",
    icon: <IconComment />,
  },
];

export function AdminBento({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="attr-grid admin-grid">
        {PANELS.map((p) => (
          <div key={p.title} className="attr-item">
            <span className="attr-icon">{p.icon}</span>
            <h3 className="attr-title">{p.title}</h3>
            <p className="attr-body">{p.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        /* Two across, not the grid's default three: four items over three
           columns leaves a final row holding one. */
        @media (min-width: 881px) {
          .admin-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .admin-grid .attr-body { max-width: 52ch; }
      `}</style>
    </div>
  );
}

/* ── icons: monochrome, single stroke weight, matching the suite's set ── */
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="3.5" width="7" height="4.5" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="11" width="7" height="9.5" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconFolders() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7.6A1.6 1.6 0 0 1 4.6 6h3.6l1.6 2h9.6A1.6 1.6 0 0 1 21 9.6v7.8A1.6 1.6 0 0 1 19.4 19H4.6A1.6 1.6 0 0 1 3 17.4V7.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 6V4.6A1.6 1.6 0 0 1 8.6 3h3l1.4 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19.5c0-2.9 2.5-4.8 5.5-4.8s5.5 1.9 5.5 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M17.6 19.5c0-2.3-.9-3.9-2.4-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.5 12.4c0 4-3.8 7.2-8.5 7.2a9.7 9.7 0 0 1-2.6-.35L4.5 21l1.1-3.4A6.9 6.9 0 0 1 3.5 12.4c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
