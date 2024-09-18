export type {
  TableOfContentsGroup,
  TableOfContentsItem,
  TableOfContentsNode,
  TableOfContentsNodeGroup,
} from './components/Docs/types';
export { TableOfContentsExternalLink } from './components/Docs/types';
export { isHttpOperation, isHttpService, isHttpWebhookOperation } from './utils/guards';
export { getDefaultDescription } from './utils/securitySchemes';

// export {
//   slugify,
//   TableOfContentsGroup,
//   TableOfContentsItem,
//   TableOfContentsNode,
//   TableOfContentsNodeGroup,
// } from '@stoplight/elements-core';
