export const WORKFLOW_AGENT_HEADER_SCENE_SIZE = {
  width: 1900,
  height: 360,
} as const;

export const WORKFLOW_AGENT_HEADER_STAGE_MAX_WIDTH = 1920;

export const WORKFLOW_AGENT_HEADER_MOBILE_SCENE_SIZE = {
  width: 730,
  height: 320,
} as const;

export const WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL =
  '/media/hero-backdrop';

export interface WorkflowAgentHeaderPromptNode {
  text: string;
  className: string;
}

export const WORKFLOW_AGENT_HEADER_PROMPT_NODES: WorkflowAgentHeaderPromptNode[] =
  [
    {
      text: 'A bold graphic design poster or book cover with the large sans-serif text FELTON OUTLINES stacked at the top. Below the text is an abstract architectural photograph featuring sharp geometric angles, concrete',
      className:
        'left-[225.3671875px] top-[80.228515625px] h-[80px] w-[171.1392364501953px]',
    },
    {
      text: 'A vibrant, high-fashion editorial portrait of a model with short, wet-look hair, wearing these distinctive gold-framed, amber-lensed aviator sunglasses.',
      className: 'left-[957px] top-[21px] h-[80px] w-[171.1392364501953px]',
    },
    {
      text: 'A vibrant, high-fashion editorial portrait of a model with short, wet-look hair, wearing these distinctive gold-framed, amber-lensed aviator sunglasses.',
      className:
        'left-[1299px] top-[209.8681640625px] h-[80px] w-[171.1392364501953px]',
    },
  ];

export const WORKFLOW_AGENT_HEADER_MOBILE_PROMPT_NODES: WorkflowAgentHeaderPromptNode[] =
  [
    {
      text: 'A vibrant, high-fashion editorial portrait of a model with short, wet-look hair, wearing these distinctive gold-framed, amber-lensed aviator sunglasses.',
      className:
        'left-[19.42194366455078px] top-[19.421964645385742px] h-[73.98844146728516px] w-[158.27906799316406px]',
    },
    {
      text: 'A vibrant, high-fashion editorial portrait of a model with short, wet-look hair, wearing these distinctive gold-framed, amber-lensed aviator sunglasses.',
      className:
        'left-[335.7225341796875px] top-[221.8433837890625px] h-[73.98844146728516px] w-[158.27906799316406px]',
    },
  ];

export interface WorkflowAgentHeaderImageNode {
  imageSrc: string;
  mediaType?: 'image' | 'video';
  objectFit?: 'contain' | 'cover';
  objectPositionClassName?: string;
  posterSrc?: string;
  alt: string;
  label?: string;
  className: string;
}

export const WORKFLOW_AGENT_HEADER_IMAGE_NODES: WorkflowAgentHeaderImageNode[] =
  [
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/3.webp`,
      objectPositionClassName: 'object-top',
      alt: 'TERRA outdoor furniture poster',
      className:
        'left-[520px] top-[85.9013671875px] h-[140px] w-[131.34629821777344px] rounded-[14.054px] border-[0.365px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/4.webp`,
      alt: 'Outdoor furniture source photo',
      className:
        'left-[231px] top-[230px] h-[148px] w-[126px] rounded-[14.328px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/1.webp`,
      alt: 'Portrait reference selfie',
      className:
        'left-[1010.533203125px] top-[142.4111328125px] h-[120px] w-[128px] rounded-[8.533px] border-[0.356px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/2.webp`,
      alt: 'Storyboard grid of soccer fan scenes',
      className:
        'left-[1289px] top-[62px] h-[120px] w-[178px] rounded-[6.834px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/video.mp4`,
      mediaType: 'video',
      posterSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/poster.webp`,
      alt: 'Generated fan video preview',
      className:
        'left-[1572.673828125px] top-[119.8681640625px] h-[120px] w-[178px] rounded-[6.834px] border-[0.285px]',
    },
  ];

export const WORKFLOW_AGENT_HEADER_MOBILE_IMAGE_NODES: WorkflowAgentHeaderImageNode[] =
  [
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/1.webp`,
      alt: 'Portrait reference selfie',
      className:
        'left-[68.93319781532045px] top-[131.71013832092285px] h-[110.98265838623047px] w-[118.38150024414062px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/2.webp`,
      alt: 'Storyboard grid of soccer fan scenes',
      className:
        'left-[335.7225341796875px] top-[85.1535415649414px] h-[110.98265838623047px] w-[94.8093032836914px]',
    },
    {
      imageSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/video.mp4`,
      mediaType: 'video',
      posterSrc: `${WORKFLOW_AGENT_HEADER_ASSETS_BASE_URL}/poster.webp`,
      alt: 'Generated fan video preview',
      className:
        'left-[603.6289672851562px] top-[110.86073303222656px] h-[110.98265838623047px] w-[94.8093032836914px]',
    },
  ];

export interface WorkflowAgentHeaderConnector {
  d: string;
  color: string;
}

export const WORKFLOW_AGENT_HEADER_CONNECTORS: WorkflowAgentHeaderConnector[] =
  [
    {
      d: 'M 404 97 C 435 95, 465 110, 512 116',
      color: '#2EA7FF',
    },
    {
      d: 'M 363 255 C 400 236, 412 177, 512 132',
      color: '#F5B640',
    },
    {
      d: 'M 1136 42 C 1186 46, 1230 70, 1282 85',
      color: '#2EA7FF',
    },
    {
      d: 'M 1148 163 C 1187 161, 1230 97, 1282 96',
      color: '#F5B640',
    },
    {
      d: 'M 1478 84 C 1512 86, 1530 148, 1564 157',
      color: '#F5B640',
    },
    {
      d: 'M 1478 230 C 1520 205, 1523 163, 1564 144',
      color: '#2EA7FF',
    },
  ];

export const WORKFLOW_AGENT_HEADER_MOBILE_CONNECTORS: WorkflowAgentHeaderConnector[] =
  [
    {
      d: 'M 185 39 C 228 43, 268 91, 330 107',
      color: '#2EA7FF',
    },
    {
      d: 'M 195 151 C 238 149, 277 119, 330 121',
      color: '#F5B640',
    },
    {
      d: 'M 437 109 C 490 112, 533 140, 596 140',
      color: '#F5B640',
    },
    {
      d: 'M 502 241 C 545 219, 542 150, 596 134',
      color: '#2EA7FF',
    },
  ];

export interface WorkflowAgentHeaderHandle {
  className: string;
  color: string;
}

export const WORKFLOW_AGENT_HEADER_HANDLES: WorkflowAgentHeaderHandle[] = [
  { className: 'left-[404px] top-[97px]', color: '#2EA7FF' },
  { className: 'left-[512px] top-[116px]', color: '#2EA7FF' },
  { className: 'left-[363px] top-[255px]', color: '#F5B640' },
  { className: 'left-[512px] top-[132px]', color: '#F5B640' },
  { className: 'left-[1136px] top-[42px]', color: '#2EA7FF' },
  { className: 'left-[1282px] top-[85px]', color: '#2EA7FF' },
  { className: 'left-[1148px] top-[163px]', color: '#F5B640' },
  { className: 'left-[1282px] top-[96px]', color: '#F5B640' },
  { className: 'left-[1478px] top-[84px]', color: '#F5B640' },
  { className: 'left-[1564px] top-[157px]', color: '#F5B640' },
  { className: 'left-[1478px] top-[230px]', color: '#2EA7FF' },
  { className: 'left-[1564px] top-[144px]', color: '#2EA7FF' },
];

export const WORKFLOW_AGENT_HEADER_MOBILE_HANDLES: WorkflowAgentHeaderHandle[] =
  [
    { className: 'left-[185px] top-[39px]', color: '#2EA7FF' },
    { className: 'left-[330px] top-[107px]', color: '#2EA7FF' },
    { className: 'left-[195px] top-[151px]', color: '#F5B640' },
    { className: 'left-[330px] top-[121px]', color: '#F5B640' },
    { className: 'left-[437px] top-[109px]', color: '#F5B640' },
    { className: 'left-[596px] top-[140px]', color: '#F5B640' },
    { className: 'left-[502px] top-[241px]', color: '#2EA7FF' },
    { className: 'left-[596px] top-[134px]', color: '#2EA7FF' },
  ];

export interface WorkflowAgentHeaderCursor {
  label: string;
  color: string;
  className: string;
}

export const WORKFLOW_AGENT_HEADER_CURSORS: WorkflowAgentHeaderCursor[] = [
  {
    label: 'Emma',
    color: '#FDC468',
    className: 'left-[472px] top-[245px]',
  },
  { label: 'Amelia', color: '#F26B69', className: 'left-[778px] top-[117px]' },
];

export const WORKFLOW_AGENT_HEADER_MOBILE_CURSORS: WorkflowAgentHeaderCursor[] =
  [
    {
      label: 'Emma',
      color: '#FDC468',
      className: 'left-[233.721923828125px] top-[186.2997283935547px]',
    },
  ];

export const WORKFLOW_AGENT_HEADER_COMMENT = {
  text: 'Loved this iteration',
  className: 'left-[717.75px] top-[81px] h-[36px] w-[178px]',
  textClassName: 'left-[5.3017578125px] top-[3px] h-[24px] w-[163px]',
} as const;

export interface WorkflowAgentHeaderCommentControl {
  className: string;
}

export const WORKFLOW_AGENT_HEADER_COMMENT_CONTROLS: WorkflowAgentHeaderCommentControl[] =
  [
    { className: 'left-[-1.5px] top-[-2.25px] size-[4.5px] rounded-[1px]' },
    { className: 'left-[170.75px] top-[-2.25px] size-[4.5px] rounded-[1px]' },
    { className: 'left-[170.75px] top-[27.75px] size-[4.5px] rounded-[1px]' },
    { className: 'left-[-1.5px] top-[27px] size-[4.5px] rounded-[1px]' },
    { className: 'left-[-1.5px] top-[9.75px] h-[10.5px] w-[3px] rounded-full' },
    {
      className: 'left-[171.5px] top-[9.75px] h-[10.5px] w-[3px] rounded-full',
    },
  ];
