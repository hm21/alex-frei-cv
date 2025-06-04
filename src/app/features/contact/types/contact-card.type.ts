import { ContactCardId } from './contact-card-id.type';

export type ContactCard = {
  id: ContactCardId;
  title: string;
  msg: string;
  actionMsg: string;
  url: string;
};
