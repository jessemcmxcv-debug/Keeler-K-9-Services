import type { Dog, Photo, SiteCopy, Snapshot } from "./types";

function photo(id: string, key: string, alt: string): Photo {
  const folder = key === "founder" ? "brand" : "dogs";
  return {
    id,
    alt,
    thumb: `/${folder}/${key}-640.webp`,
    full: `/${folder}/${key}-1280.webp`,
    thumbType: "image/webp",
    fullType: "image/webp",
    fallbackThumb: `/${folder}/${key}-640.jpg`,
    fallbackFull: `/${folder}/${key}-1280.jpg`,
  };
}

function dog(partial: Omit<Dog, "photos" | "coverId"> & { photos: Photo[]; coverId?: string }): Dog {
  return { ...partial, coverId: partial.coverId ?? partial.photos[0]?.id ?? "" };
}

export const defaultCopy: SiteCopy = {
  ownerName: "David Keeler",
  phoneDisplay: "(742) 688-6441",
  phoneTel: "+17426886441",
  email: "info@keelerk9services.ca",
  serviceArea: "North Mississauga / Brampton, Ontario",
  homepageHeadline: "No dogs left behind... even when life gets tough.",
  homepageLead:
    "Keeler K9 Services helps house and rehome dogs when their owners are incarcerated, in hospital, away, or otherwise unable to care for them.",
  feature1Title: "Emergency placement",
  feature1Text: "A safer place for a dog when an owner is suddenly unable to provide care.",
  feature2Title: "Temporary and longer care",
  feature2Text: "Short stays when a reunion is the plan, and rehoming when a dog needs a different future.",
  feature3Title: "Straight answers",
  feature3Text: "We tell you what we can do, what we can't, and what is happening with your dog.",
  aboutBody:
    "Keeler K9 Services was created to make sure no dog is left behind when life takes an unexpected turn. We provide safe, temporary housing and responsible rehoming for dogs whose owners are suddenly unable to care for them because of incarceration, hospitalization, or another emergency.\n\nThe aim is simple: protect the bond between people and their dogs when we can, and make sure every dog receives stability, proper care, and compassion. David Keeler serves North Mississauga and Brampton.",
  aboutCaption: "David Keeler and Red, one of his rescues.",
  mission:
    "At Keeler K9 Services, the mission is to help dogs whose people cannot be there. When an owner is incarcerated, hospitalized, away, or facing another emergency, we step in so the dog is not left without care.\n\nWe arrange temporary housing and, when a dog cannot go home, a responsible new placement. Every dog is different. Health, temperament, and what the dog needs next all matter.\n\nThis is hands-on help for dogs. It is not a paperwork service. If we can take a dog, we say so. If we cannot, we say that too.",
  whatHappensNext:
    "Call (742) 688-6441 if your dog needs help soon, and send this form so David has the details. He will contact you about your dog. Together you will talk through timing, health, and the safest next step. Sending the form does not guarantee a placement — it starts the conversation. If David cannot answer right away, leave a message and keep your phone nearby.",
  donationTitle: "Help us cover veterinary care",
  donationBody:
    "Your donation helps provide veterinary care and support for dogs being helped by Keeler K9 Services. Keeler K9 Services is not advertising charitable tax receipts.",
  donationUrl: "",
  footerLine: "Protecting dogs when life gets hard.",
  galleryIntro:
    "These are dogs who have been part of Keeler K9 Services. A dog who currently needs a home is marked Looking for placement. The others are part of our story — they are not all in care today.",
  packIntro: "Angel, Duke, and Emily — a family that became part of Keeler K9.",
  walkingIntro:
    "Keeler K9 Services also walks dogs in North Mississauga and Brampton. If you are working long hours or need an extra hand, ask about a walk for your dog. Placement help for dogs in crisis is still the heart of this work.",
  bannerEnabled: false,
  bannerText: "",
  showWalking: true,
  showSlider: true,
};

export function createSeed(): Snapshot {
  const angelPhotos = [
    photo("angel-cover", "angel-g8", "Angel, a white puppy with a pale chest, close up"),
    photo("angel-1", "angel-g1", "Angel as a puppy"),
    photo("angel-2", "angel-g2", "Angel outdoors"),
    photo("angel-3", "angel-g3", "Angel resting"),
    photo("angel-5", "angel-g5", "Angel with family"),
    photo("angel-6", "angel-g6", "Angel looking toward the camera"),
    photo("angel-7", "angel-g7", "Angel sitting"),
    photo("angel-p1", "angel-p1", "Angel, a small white puppy"),
    photo("angel-p2", "angel-p2", "Angel being held"),
    photo("angel-p3", "angel-p3", "Angel as a young puppy"),
  ];

  const dogs: Dog[] = [
    dog({
      id: "angel",
      name: "Angel",
      age: "",
      breed: "",
      sex: "Female",
      story:
        "Angel was born into Keeler K9 Services after her mom, Emily, and dad, Duke, were rescued — before anyone knew Emily was already pregnant. A couple of weeks later she had her litter. We named this puppy Angel because of the white, angel-wing shaped spot on her chest. At that moment, she was exactly the Angel we needed.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "",
      status: "archived",
      showInGallery: true,
      showInPack: true,
      packBlurb:
        "Born into Keeler K9, Angel carries the story of both her parents. Her name came from the white wing-shaped mark on her chest.",
      photos: angelPhotos,
      coverId: "angel-cover",
    }),
    dog({
      id: "snow",
      name: "Snow",
      age: "",
      breed: "",
      sex: "",
      story:
        "Snow was an amazing dog with a huge personality. She was diagnosed with cancer. The vet gave her a couple of weeks, but she kept going for months with non-traditional herbal support and RSO (Rick Simpson Oil). She loved playing in the snow, which is how she got her name.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "",
      status: "archived",
      showInGallery: true,
      showInPack: false,
      packBlurb: "",
      photos: [
        photo("snow-1", "snow-1", "Snow the dog"),
        photo("snow-2", "snow-2", "Snow outdoors in the snow"),
        photo("snow-3", "snow-3", "Snow with a winter background"),
      ],
    }),
    dog({
      id: "jaxson",
      name: "Jaxson",
      age: "Puppy",
      breed: "",
      sex: "",
      story: "Jaxson was a very well behaved puppy. He loved being around children and family, and he loved a cuddle.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "Good with children and family.",
      status: "archived",
      showInGallery: true,
      showInPack: false,
      packBlurb: "",
      photos: [
        photo("jax-3", "jax-3", "Jaxson the puppy"),
        photo("jax-1", "jax-1", "Jaxson sitting"),
        photo("jax-2", "jax-2", "Jaxson close up"),
        photo("jax-4", "jax-4", "Jaxson looking at the camera"),
      ],
      coverId: "jax-3",
    }),
    dog({
      id: "duke",
      name: "Duke",
      age: "",
      breed: "",
      sex: "Male",
      story:
        "Duke, Angel's dad, was a big cuddler. Don't let his size fool you — he behaved more like a lap dog.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "Gentle, despite his size.",
      status: "archived",
      showInGallery: true,
      showInPack: true,
      packBlurb: "Duke is Angel's father. Big, gentle, and loyal — more lap dog than his size suggests.",
      photos: [photo("duke-1", "duke-1", "Duke, a large dark dog")],
    }),
    dog({
      id: "emily",
      name: "Emily",
      age: "",
      breed: "",
      sex: "Female",
      story:
        "Emily, Angel's mom, was an amazing and stubborn dog. She bumped into everything when she walked around. Nothing in the house was safe.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "Stubborn, affectionate, and a little clumsy.",
      status: "archived",
      showInGallery: true,
      showInPack: true,
      packBlurb: "Emily is Angel's mother. Loving, stubborn, and full of character.",
      photos: [
        photo("emily-1", "emily-1", "Emily the dog"),
        photo("emily-2", "emily-2", "Emily close up"),
      ],
    }),
    dog({
      id: "kong",
      name: "King Kong",
      age: "",
      breed: "",
      sex: "Male",
      story:
        "Kong came to us at a time we needed him. He quickly bonded with Snow and with David's son. Kong was a very large dog, standing almost four feet on all fours, but his size was not a danger. King Kong would not harm anyone.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "Gentle giant. Bonded with Snow and with a child in the home.",
      status: "archived",
      showInGallery: true,
      showInPack: false,
      packBlurb: "",
      photos: [
        photo("kong-1", "kong-1", "King Kong, a very large dog"),
        photo("kong-2", "kong-2", "King Kong close up"),
      ],
    }),
    dog({
      id: "bella",
      name: "Bella",
      age: "",
      breed: "Black Lab",
      sex: "Female",
      story: "Bella was a black lab. She was loved by the people she met, and she always seemed to be smiling at you.",
      medical: "",
      diet: "",
      medications: "",
      behaviour: "Friendly with people.",
      status: "archived",
      showInGallery: true,
      showInPack: false,
      packBlurb: "",
      photos: [
        photo("bella-1", "bella-1", "Bella, a black lab"),
        photo("bella-2", "bella-2", "Bella looking at the camera"),
      ],
    }),
  ];

  return {
    copy: { ...defaultCopy },
    dogs,
    testimonials: [],
  };
}

export const founderPhoto = photo("founder", "founder", "David Keeler with his dog Red");
