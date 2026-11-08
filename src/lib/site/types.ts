export type DogStatus = "looking" | "placed" | "unavailable" | "archived";

export type Photo = {
  id: string;
  alt: string;
  thumb: string;
  full: string;
  thumbType: "image/webp" | "image/jpeg";
  fullType: "image/webp" | "image/jpeg";
  fallbackThumb: string;
  fallbackFull: string;
};

export type Dog = {
  id: string;
  name: string;
  age: string;
  breed: string;
  sex: string;
  story: string;
  medical: string;
  diet: string;
  medications: string;
  behaviour: string;
  status: DogStatus;
  showInGallery: boolean;
  showInPack: boolean;
  packBlurb: string;
  photos: Photo[];
  coverId: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  visible: boolean;
};

export type IntakeStatus = "new" | "contacted" | "in_progress" | "placed" | "closed";

export type IntakeKind = "placement" | "walking";

export type IntakePhoto = { id: string; dataUrl: string };

export type Intake = {
  id: string;
  createdAt: string;
  kind: IntakeKind;
  status: IntakeStatus;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dogName: string;
  dogAge: string;
  breed: string;
  reason: string;
  urgency: string;
  medical: string;
  medications: string;
  diet: string;
  behaviour: string;
  notes: string;
  address: string;
  frequency: string;
  friendly: string;
  photos: IntakePhoto[];
};

export type SiteCopy = {
  ownerName: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  serviceArea: string;
  homepageHeadline: string;
  homepageLead: string;
  feature1Title: string;
  feature1Text: string;
  feature2Title: string;
  feature2Text: string;
  feature3Title: string;
  feature3Text: string;
  aboutBody: string;
  aboutCaption: string;
  mission: string;
  whatHappensNext: string;
  donationTitle: string;
  donationBody: string;
  donationUrl: string;
  footerLine: string;
  galleryIntro: string;
  packIntro: string;
  walkingIntro: string;
  bannerEnabled: boolean;
  bannerText: string;
  showWalking: boolean;
  showSlider: boolean;
};

export type Snapshot = {
  copy: SiteCopy;
  dogs: Dog[];
  testimonials: Testimonial[];
};

export const STATUS_LABEL: Record<DogStatus, string> = {
  looking: "Looking for placement",
  placed: "Successfully placed",
  unavailable: "Temporarily unavailable",
  archived: "Part of our story",
};

export const INTAKE_STATUS_LABEL: Record<IntakeStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  placed: "Placed",
  closed: "Closed",
};
