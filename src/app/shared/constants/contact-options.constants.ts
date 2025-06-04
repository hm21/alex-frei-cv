import { ContactCard } from 'src/app/features/contact/types/contact-card.type';

export const CONTACT_EMAIL = 'alex.frei@hotmail.ch';

export const CONTACT_MESSAGES = {
  invalidEmail: $localize`Valid email address is required.`,
  requiredFields: $localize`<b>First Name</b>, <b>Last Name</b>, and <b>Message</b> as well as <b>E-Mail</b> are required.`,
  tooManyAttempts: $localize`Too many attempts to send the form. Try again later.`,
  submissionSuccess: $localize`The request has been successfully submitted.`,
  unknownError: $localize`Unknown error! Please try again.`,
  error400: $localize`Invalid data sent. Please fill out the form correctly and try again.`,
  error403: $localize`Forbidden request to the server.`,
  blacklist: $localize`Your IP address has been blacklisted because you have sent an unusually high number of requests to the server! If these requests were not made maliciously, please contact me via`,
};

export const CONTACT_OPTIONS: ReadonlyArray<ContactCard> = [
  {
    id: `whatsapp`,
    title: $localize`WhatsApp`,
    msg: `+41 79 950 52 76`,
    actionMsg: $localize`Open WhatsApp`,
    url: `https://wa.me/41799505276`,
  },
  {
    id: `phone`,
    title: $localize`Call`,
    msg: `+41 79 950 52 76`,
    actionMsg: $localize`Start call`,
    url: `tel:+41799505276`,
  },
  {
    id: `mail`,
    title: $localize`E-Mail`,
    msg: `alex.frei@hotmail.ch`,
    actionMsg: $localize`Send E-Mail`,
    url: `mailto:alex.frei@hotmail.ch`,
  },
];
