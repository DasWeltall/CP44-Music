import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const createIcon = (path: JSX.Element | JSX.Element[], viewBox = '0 0 24 24') =>
  function Icon(props: IconProps) {
    return (
      <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
        {path}
      </svg>
    );
  };

export const PlayIcon = createIcon(<polygon points="9 5 19 12 9 19" fill="currentColor" stroke="none" />);
export const PauseIcon = createIcon(
  <g fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </g>
);
export const BackwardIcon = createIcon(
  <g fill="currentColor" stroke="none">
    <polygon points="11 12 19 6 19 18" />
    <polygon points="5 12 13 6 13 18" />
  </g>
);
export const ForwardIcon = createIcon(
  <g fill="currentColor" stroke="none">
    <polygon points="13 12 5 6 5 18" />
    <polygon points="19 12 11 6 11 18" />
  </g>
);
export const SpeakerWaveIcon = createIcon(
  <g stroke="currentColor" strokeWidth={1.5}>
    <path d="M4 9v6h3l4 3V6L7 9H4z" fill="currentColor" stroke="none" />
    <path d="M15 9a3 3 0 010 6" />
    <path d="M17.5 7a5 5 0 010 10" />
  </g>
);
export const ArrowPathIcon = createIcon(
  <>
    <path d="M4 12a8 8 0 018-8h2" />
    <path d="M14 4l2 2-2 2" />
    <path d="M20 12a8 8 0 01-8 8h-2" />
    <path d="M10 20l-2-2 2-2" />
  </>,
  '0 0 24 24'
);
export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2 2" />
  </>
);
export const HeartIcon = createIcon(
  <path d="M12 20s-6-3.3-8-7.5C2 8.9 4.4 6 7.4 6c1.9 0 3.6 1.2 4.6 3 1-1.8 2.7-3 4.6-3 3 0 5.4 2.9 3.4 6.5C18 16.7 12 20 12 20z" fill="currentColor" stroke="none" />
);
export const PlusCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </>
);
export const HomeIcon = createIcon(
  <>
    <path d="M4 11l8-7 8 7" />
    <path d="M5 10v10h14V10" />
  </>
);
export const MagnifyingGlassIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="M16 16l4 4" />
  </>
);
export const MusicalNoteIcon = createIcon(
  <>
    <path d="M9 19a2 2 0 102 1.73V6l8-2v9" />
    <circle cx="9" cy="19" r="2" fill="currentColor" stroke="none" />
    <circle cx="17" cy="15" r="2" fill="currentColor" stroke="none" />
  </>
);
export const QueueListIcon = createIcon(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h10" />
    <path d="M4 17h8" />
    <rect x="15" y="11" width="5" height="6" rx="1" />
  </>
);
export const CommandLineIcon = createIcon(
  <>
    <path d="M6 8l4 4-4 4" />
    <path d="M12 16h6" />
  </>
);
export const XMarkIcon = createIcon(
  <>
    <path d="M6 6l12 12" />
    <path d="M6 18L18 6" />
  </>
);
export const PlusIcon = createIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
);
export const FunnelIcon = createIcon(
  <>
    <path d="M5 6h14" />
    <path d="M8 12h8" />
    <path d="M10 18h4" />
  </>
);
export const AdjustmentsHorizontalIcon = createIcon(
  <>
    <path d="M4 9h16" />
    <circle cx="9" cy="9" r="2" fill="currentColor" stroke="none" />
    <path d="M4 15h16" />
    <circle cx="15" cy="15" r="2" fill="currentColor" stroke="none" />
  </>
);
export const PencilIcon = createIcon(
  <>
    <path d="M4 20l4-1 9-9-3-3-9 9-1 4z" />
    <path d="M14 5l3 3" />
  </>
);
export const TrashIcon = createIcon(
  <>
    <path d="M5 7h14" />
    <path d="M9 7V5h6v2" />
    <path d="M7 7l1 12h8l1-12" />
  </>
);
