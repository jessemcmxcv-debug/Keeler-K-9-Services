// Content for The Proposal page, transcribed from Dave's Sanctuary print
// copy (updated November 11, 2026). Wording is the document's own; only
// print artefacts (page numbers, running heads) are dropped.

export type ProposalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "lead"; title: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string };

export interface ProposalSection {
  id: string;
  title: string;
  sub?: string;
  blocks: ProposalBlock[];
}

export const PROPOSAL_INTRO = {
  eyebrow: "Keeler K9 Services · Northern Ontario · Concept Master Plan",
  standfirst:
    "A self-supporting, self-sustaining dog sanctuary on 200 acres — kennels and care buildings, aquaculture starting with warm-water tilapia and a floatplane-capable cold-water trout lake to follow, fowl, greenhouses and farmland, all powered and watered on site with green energy. Designed from the start to be permanent.",
  quote: "This will be Legacy.",
  quoteBy: "Dave Keeler, founder",
  imageCaption:
    "Concept illustration of the 200-acre layout — forest at the edges, water through the middle, and the working core on the cleared, higher ground. Not a survey and not to scale.",
  glance: [
    "200 acres in the full plan",
    "8 planned zones, each with a job",
    "6+ businesses on one property, supporting each other",
    "100% of power and water planned to be supplied on site",
    "Property held under the Keeler Family Foundation (KFF)",
  ],
  statusNote:
    "Print copy — updated November 11, 2026. This is the full Sanctuary page, printed on paper so it can be read, marked up, and worked through one step at a time. All sizes, acreages, and building lists are the proposed design — targets to be confirmed by a survey, soil and water testing, and township zoning once a specific parcel is chosen. No site has been purchased yet, and no budget, dog capacity, or staffing number has been set. This update adds two answers researched since the first printing: the floatplane lake does not need Transport Canada registration (see Aquaculture), and the Ontario law position for the pet cemetery and crematorium (see Farewell).",
};

export const PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    id: "site-plan",
    title: "Site Plan",
    sub: "Eight zones, 200 acres, every acre with a job",
    blocks: [
      {
        type: "p",
        text: "Busy work near the road, dogs in the quiet middle, water protected, and most of the land left as forest — the buffer that makes it feel like a sanctuary.",
      },
      {
        type: "lead",
        title: "Forest, Buffer & Wildlife — 72 acres",
        text: "Left as forest on purpose — windbreak, shade, privacy, quiet, trails, managed firewood with replanting, wildlife habitat.",
      },
      {
        type: "lead",
        title: "Play, Training & Trails — 35 acres",
        text: "Fenced play fields rotated in blocks, a training field, forest trails for quiet walks including reactive dogs, and a creek-fed dog swimming area separate from the trout lake.",
      },
      {
        type: "lead",
        title: "Greenhouses & Agriculture — 30 acres",
        text: "Two to three four-season greenhouses plus head house, market gardens, dog-safe vegetable beds, hay meadow, orchard and berries. The heated tilapia tanks sit with the greenhouses.",
      },
      {
        type: "lead",
        title: "Kennels & Dog Care — 22 acres",
        text: "Kennel Barns A, B and C, Puppy & Nursery Building, Senior & Special-Needs Lodge, Vet & Care Clinic, and the separate Intake & Quarantine Building.",
      },
      {
        type: "lead",
        title: "Trout Lake & Aquaculture — 15 acres as drawn",
        text: "Tilapia first in heated indoor tanks. The cold-water trout lake later — long and lake-sized for a pontoon floatplane, with landing lane, side-cove dock, and clear approaches. Size re-checked at survey.",
      },
      {
        type: "lead",
        title: "Fowl & Pasture — 12 acres",
        text: "Laying hens in mobile coops, ducks on their own small pond away from the fish water, geese as guardians and alarm. All runs fenced and covered against predators.",
      },
      {
        type: "lead",
        title: "Welcome & Admin Core — 8 acres",
        text: "Welcome & Adoption Centre, Admin & Foundation Office, Staff & Volunteer Centre, parking, and farm store — on the highest, driest ground by the entrance.",
      },
      {
        type: "lead",
        title: "Energy & Water Hub — 6 acres",
        text: "Ground and rooftop solar, battery storage and generator in the Energy Barn, drilled well, rainwater cisterns, swales, and the workshop base.",
      },
      {
        type: "note",
        text: "Acreage caution on the lake: the 15 acres above is the allocation as drawn for the aquaculture zone, shoreline and works included. A floatplane-capable lake is much bigger than a small trout pond — its open water may need most or all of that zone. Whether it fits, or the boundaries are re-drawn (still totalling 200 acres), is a Phase 0 survey decision.",
      },
      {
        type: "note",
        text: "Site rule — full resource rights: the property must have surface, mineral, and tree rights together, so no one else can claim an easement, mining, or lumbering right on it. Of the three reference parcels, only File 149SP has all three.",
      },
    ],
  },
  {
    id: "vision",
    title: "Vision",
    blocks: [
      {
        type: "lead",
        title: "Built once, built properly, built to last",
        text: "Most rescues rent, borrow, or make do. The Sanctuary is the opposite idea: one piece of land, held for the long term, where the dogs, the farm, and the buildings all pay each other's way — so the care never depends on a single fundraiser, a single lease, or a single person's good month.",
      },
      {
        type: "lead",
        title: "Dogs first, always",
        text: "Every design choice is tested against one question: is this better for the dogs? Quiet kennels, real outdoor space, clean water, warm floors in winter, shade in summer, and people on site day and night.",
      },
      {
        type: "lead",
        title: "Nothing wasted",
        text: "Fish water feeds plants. Manure becomes compost. Compost grows food. Food feeds people and dogs. Rain off the barn roofs becomes irrigation. The farm is the sanctuary's supply system, not a hobby beside it.",
      },
      {
        type: "lead",
        title: "Power and water on site",
        text: "Solar, storage, wells, pond, and rainwater are planned as core infrastructure — sized for the clinic fridge, the water pumps, and kennel heat first, because those are life-critical loads.",
      },
      {
        type: "lead",
        title: "A legacy, not a lease",
        text: "The property is to be held under the Keeler Family Foundation (see Foundation), with the land's purpose — sanctuary and farm — protected for the long term, and a care plan that continues even when one person can't be there.",
      },
    ],
  },
  {
    id: "the-land",
    title: "The Land",
    sub: "Northern Ontario bush, scaled up to 200 acres",
    blocks: [
      {
        type: "p",
        text: "The terrain in this plan follows the three Ontario parcels Dave has already been reviewing for Keeler K9 Services — mixed bush, clearings, rock, and low wet ground, the same kind of land The Sanctuary would be built on, at 200-acre scale.",
      },
      { type: "lead", title: "File 321JP — 80 acres", text: "LaVallee Township · PCL 18490 · $40,000 CAD" },
      { type: "lead", title: "File 140SP — 45.5 acres", text: "Hearst Township, Larder Lake · $30,000 CAD" },
      { type: "lead", title: "File 149SP — 40 acres", text: "Tovell Township · PCL 18819 · $30,000 CAD" },
      { type: "h", text: "What that terrain gives us" },
      {
        type: "p",
        text: "Higher, drier clearings for the admin core, kennels, and barns — good drainage, winter sun, room to expand.",
      },
      {
        type: "p",
        text: "Low ground and a creek line for the cold-water trout lake — a long stretch of deep water that stays cold, laid out along the low ground so a floatplane can land and take off along its length, with a buffer between water and buildings. Warm-water tilapia don't go in that lake: they start indoors, in heated tanks near the greenhouses.",
      },
      {
        type: "p",
        text: "Mixed forest as windbreak, shade, walking trails, and a permanent buffer that keeps the sanctuary quiet and private.",
      },
      { type: "p", text: "Open meadow for play fields, hay, pasture rotation, and the solar field." },
      { type: "h", text: "What that terrain demands" },
      {
        type: "lead",
        title: "Real winters",
        text: "Heated water lines, insulated kennels, snow-load roofs, and a ploughed all-weather road are in the plan from day one — not add-ons.",
      },
      {
        type: "lead",
        title: "Two different fish, two different waters",
        text: "Trout and salmon need cold, clean, oxygenated water — the lake is stocked with trout only after a full season of temperature and oxygen testing confirms it stays cold enough, and salmon are a later option only, not an early stocking. Tilapia are the opposite: a warm-water fish, and the starter crop — raised indoors where the water can be kept warm, so production doesn't have to wait on the lake.",
      },
      {
        type: "lead",
        title: "A floatplane lake is not a pond",
        text: "Landing and taking off on floats takes a far longer, larger stretch of clear water than a fishing pond, plus clear approaches at both ends. That size, and the acres it takes, is a real trade-off against forest, fields, and shade — flagged in the Aquaculture section, and settled at survey in Phase 0, not assumed here.",
      },
      {
        type: "lead",
        title: "Wildlife-proofing",
        text: "Perimeter fencing, secure feed storage, and protected fowl runs — bears, coyotes, and raccoons are neighbours here.",
      },
      {
        type: "lead",
        title: "Setbacks respected",
        text: "Kennels, septic, and manure storage sited away from wells, the pond, and property lines.",
      },
    ],
  },
  {
    id: "buildings",
    title: "Buildings",
    sub: "Multiple buildings, one working core",
    blocks: [
      {
        type: "p",
        text: "Instead of one big barn, the plan uses several smaller, purpose-built buildings clustered around a central yard — easier to heat, easier to clean, safer if one building ever has to close for repairs, and kinder for dogs that need quiet.",
      },
      {
        type: "lead",
        title: "Welcome & Adoption Centre",
        text: "First building at the road. Visitor parking, meet-and-greet rooms and yards, adoption paperwork, and the farm store counter.",
      },
      {
        type: "lead",
        title: "Main Admin & Foundation Office",
        text: "Records, bookkeeping, feed and medicine inventory, meeting room, and secure document storage for the Keeler Family Foundation.",
      },
      {
        type: "lead",
        title: "Staff & Volunteer Centre",
        text: "Training room, lockers, laundry, break space, and an on-call rest room — so training standards stay the same no matter who is on shift.",
      },
      {
        type: "lead",
        title: "Vet & Care Clinic",
        text: "Exam and treatment rooms, recovery kennels, isolation ward with its own entrance, medicine fridge on the critical-power circuit, and a bathing / grooming area.",
      },
      {
        type: "lead",
        title: "Intake & Quarantine Building",
        text: "Kept apart from the main kennels. Every new arrival starts here — health check, vaccinations, decompression — before joining the sanctuary population.",
      },
      {
        type: "lead",
        title: "Caretaker Residences",
        text: "Housing on site for caretakers, so dogs are never left alone overnight and someone is always minutes away in a storm, a power cut, or an emergency.",
      },
      {
        type: "lead",
        title: "Bunkhouses",
        text: "Shared bunkhouse housing for staff, volunteers, and seasonal farm help, controlled by the Keeler Family Foundation (KFF) — KFF sets who stays, the house rules, and the rent, and keeps the buildings maintained. See KFF Duties.",
      },
      {
        type: "lead",
        title: "Kennel Barns A, B & C",
        text: "The main sanctuary housing, built in stages. Indoor sleeping dens with heated floors, opening to covered outdoor runs, opening again to fenced play yards.",
      },
      {
        type: "lead",
        title: "Puppy & Nursery Building",
        text: "Whelping rooms, a warm nursery, and a socialisation yard — the home base for litters raised the Keeler way, from birth through early neurological stimulation to eight weeks.",
      },
      {
        type: "lead",
        title: "Senior & Special-Needs Lodge",
        text: "Quieter, smaller, and warmer. Non-slip floors, ramps instead of steps, and yards right outside the door for old dogs and dogs recovering or living with long-term needs.",
      },
      {
        type: "lead",
        title: "Feed & Food Prep Building",
        text: "Bulk feed storage (wildlife-proof), food prep for kennels and kitchen, freezers for fish and farm produce, and the laundry for kennel bedding.",
      },
      {
        type: "lead",
        title: "Greenhouse Complex",
        text: "Two to three four-season greenhouses plus a head house for seed starting, potting, and packing — linked to the fish systems' nutrient water: the indoor tilapia tanks first, the trout lake later (see Aquaculture). The tank area sits with the greenhouses so heat and nutrient water are shared.",
      },
      {
        type: "lead",
        title: "Maintenance, Equipment & Energy Barn",
        text: "Tractor and tools, workshop, battery and inverter room, generator housing, root cellar, and winter storage — the building that keeps all the others running.",
      },
      {
        type: "lead",
        title: "Crematorium & Pet Cemetery",
        text: "The newest unit in the plan: a small, quiet crematorium building with a farewell room for families, set beside a pet cemetery in a sheltered corner at the forest edge — so a dog's whole life, including its end, is cared for on the same land. Dave's leaning is that the Keeler Family Foundation (KFF) runs it — or another company under his control — see Farewell below.",
      },
    ],
  },
  {
    id: "farewell",
    title: "Farewell Care",
    sub: "A crematorium and cemetery, so no dog ever has to leave",
    blocks: [
      {
        type: "p",
        text: "A sanctuary that takes dogs for life has to plan for the end of life too. This unit adds a crematorium building and a pet cemetery to the plan, in a quiet corner at the forest edge — close enough to reach easily in any weather, far enough from the kennels that the living dogs are never disturbed by it.",
      },
      { type: "h", text: "The crematorium building" },
      {
        type: "list",
        items: [
          "A farewell room — a calm, private room where families and caretakers can sit with a dog at the end, and say goodbye properly, unhurried",
          "The cremation unit itself, in its own fire-separated service room, with fuel and equipment kept apart from the family areas",
          "Preparation and respectful cold storage, so every dog is handled with the same care after death as in life",
          "Ashes preparation and return — ashes returned to families in an urn, scattered in the memorial ground, or buried in the cemetery, as each family chooses",
          "Records kept with the Admin Office — every cremation and burial logged, so no dog is ever lost track of, even at the end",
        ],
      },
      { type: "h", text: "The pet cemetery" },
      {
        type: "list",
        items: [
          "Marked burial plots in a sheltered, landscaped corner at the forest edge, laid out in rows with room to grow over the years",
          "Headstones and markers for each dog — sanctuary dogs, and plots offered to families whose dogs were part of Keeler K9's life",
          "Memorial trees and quiet paths through the grounds, planted and kept as part of the forest edge, not a bare field",
          "Kept to sanctuary standard — mown, fenced, and maintained in every season, with winter access kept open in the snow-clearing order",
          "Sited with the same setbacks as everything else on the property — well away from the well, the lake, and the kennel yards; exact siting and acreage settled at the Phase 0 survey, drawn from the forest-edge ground without changing the 200-acre total",
        ],
      },
      { type: "h", text: "Who runs this unit — KFF, Dave thinks, is best" },
      {
        type: "p",
        text: "Dave's thinking: the Keeler Family Foundation (KFF) is best for this unit — or, failing that, another company under his control. Either way, farewell care stays inside his control; it is not handed to an outside operator.",
      },
      {
        type: "lead",
        title: "Preferred — run by the Keeler Family Foundation (KFF)",
        text: "The Foundation operates the unit directly, as part of its mission: farewell care treated as a sanctuary service first, with any fees going back into the property like the rent it already collects.",
      },
      {
        type: "lead",
        title: "Alternative — another company under Dave's control",
        text: "If the unit does stand as its own business on the site, it is one Dave controls — keeping its own books and paying rent to KFF for its ground, building, and shared infrastructure, like every other business on the property.",
      },
      {
        type: "note",
        text: "What Ontario law says, in brief (researched November 2026 — not legal advice): there is no single Ontario pet-cemetery act. The Funeral, Burial and Cremation Services Act, 2002 and the Bereavement Authority of Ontario cover human remains, not pets. A pet cemetery turns on township zoning and bylaws, with setbacks from wells and water; burying a pet on your own land is generally permitted, subject to those bylaws. The crematorium is the regulated part: it needs an Environmental Compliance Approval (air and noise) under the Environmental Protection Act before it operates. Who runs the unit does not change those approvals, but it settles who holds them — so the final pick, and the township check, stay as Phase 0 work.",
      },
    ],
  },
  {
    id: "the-dogs",
    title: "The Dogs",
    sub: "How the kennels are designed",
    blocks: [
      { type: "h", text: "Inside / outside, by choice" },
      {
        type: "p",
        text: "Each dog gets an indoor den and a covered outdoor run, with a door the dog can use through the day. Groups are matched by size, age, and temperament, with solo housing always available for dogs that need it.",
      },
      {
        type: "list",
        items: [
          "Heated floors in sleeping areas, zoned so seniors get more warmth",
          "Drainage and wash-down floors in every kennel building",
          "Sound-dampening between barns — barking in one does not set off all three",
          "Double-gated entries on every yard, no exceptions",
        ],
      },
      { type: "h", text: "Room to actually live" },
      {
        type: "p",
        text: "Kennel life is only part of the day. The 35 acres of play, training, and trails are the other part.",
      },
      {
        type: "list",
        items: [
          "Large fenced play fields, rotated so grass recovers and parasites don't build up",
          "A dedicated training field for Keeler K9 work — recall, socialisation, and adoption assessments",
          "Forest walking trails inside the buffer, so even reactive dogs get a real walk without meeting the public",
          "A fenced swimming / splash area fed from the creek — separate from the trout lake, which stays fish-only, and well away from the floatplane landing lane",
        ],
      },
      { type: "h", text: "The standard the buildings have to meet" },
      {
        type: "p",
        text: "Warm in January. Cool and shaded in July. Clean water that never freezes or runs dry. A vet room on site, not a drive away. Space to run, and a quiet place to hide. If a building can't do those things in a northern Ontario winter, it doesn't get built — that is the design rule for every structure in this plan.",
      },
    ],
  },
  {
    id: "businesses",
    title: "One Property, Many Businesses",
    sub: "How the businesses fit together — and carry each other",
    blocks: [
      {
        type: "p",
        text: "The Sanctuary is not one business hoping donations cover it. It is a multitude of small businesses on one property, each one either earning money, cutting a cost, or feeding another part of the operation. That web is what “self-supporting” actually means here.",
      },
      {
        type: "lead",
        title: "Sanctuary & Rescue",
        text: "Keeler K9 Services — sanctuary housing, surrender & temporary safe care, adoptions, and puppy raising. This is the purpose everything else exists to fund and feed.",
      },
      {
        type: "lead",
        title: "Boarding, Training & Walking",
        text: "Paid boarding, daycare, training, and dog walking (Keeler K9's existing work, weekdays 9am–9pm, weekends by request) bring steady earned income onto the same land, with the same staff and buildings.",
      },
      {
        type: "lead",
        title: "Tilapia First, Floatplane Trout Lake Later",
        text: "Starter crop: tilapia — a warm-water fish raised in heated indoor / greenhouse recirculating tanks, for the kitchen and the farm store, on a faster learning and production cycle. The cold-water trout lake follows once its water is proven cold enough — designed lake-sized, with a long clear stretch so a pontoon floatplane can land, take off, and beach at its dock. Salmon, which also need cold water, are a later option only. Fish waste-water becomes fertiliser for the greenhouses instead of a disposal problem.",
      },
      {
        type: "lead",
        title: "Chickens, Ducks & Geese",
        text: "Eggs for the kitchen and farm store, birds working the gardens and pasture, manure for compost, and geese as a loud, honest alarm system for the yards.",
      },
      {
        type: "lead",
        title: "Greenhouses & Fields",
        text: "Vegetables, herbs, and hay — food for people on site, dog-safe vegetables for food prep, and produce to sell through the farm store, nearly year-round from the greenhouses.",
      },
      {
        type: "lead",
        title: "Green Energy & Water",
        text: "Not a shopfront, but the business underneath all the others: solar, storage, wells, and rainwater cut the power and water bills of every building above, every month, for decades.",
      },
      { type: "h", text: "The loop that ties them together" },
      { type: "p", text: "Follow one circle and you have the whole business model:" },
      {
        type: "lead",
        title: "Sun, rain & spring water arrive free",
        text: "Solar panels, roof rainwater, the well, and the creek supply power and water to every business on site.",
      },
      {
        type: "lead",
        title: "Water feeds fish, fish feed plants",
        text: "Heated tanks grow tilapia first; the cold lake grows trout later. Nutrient-rich fish water is drawn to the greenhouses, where plants clean it as they grow.",
      },
      {
        type: "lead",
        title: "Plants & birds feed the place",
        text: "Greenhouse and garden produce, eggs, and fish — tilapia first, trout once the lake is stocked — feed the caretakers and go into dog food prep — and the surplus sells in the farm store.",
      },
      {
        type: "lead",
        title: "Waste becomes next season",
        text: "Kennel, fowl, and kitchen waste is hot-composted with bedding and garden waste, then returned to the fields and greenhouse beds.",
      },
      {
        type: "lead",
        title: "Paid dog work funds the rescue work",
        text: "Boarding, training, walking, and adoptions bring in cash that the farm side can't — paying for vet care, medicine, and building upkeep.",
      },
      {
        type: "lead",
        title: "Lower bills keep it permanent",
        text: "Because power, water, and much of the food are produced on site, the monthly cost of caring for each dog stays low enough to sustain for the long term — the legacy test.",
      },
      { type: "h", text: "Money in" },
      {
        type: "list",
        items: [
          "Boarding, daycare, training & dog walking fees",
          "Adoption fees and puppy placements",
          "Farm store: eggs, produce, fish (tilapia first, trout from the lake later), preserves",
          "Donations and grants — to the Foundation, for the sanctuary specifically",
        ],
      },
      { type: "h", text: "Costs pushed down by design" },
      {
        type: "list",
        items: [
          "Electricity & water — produced on site",
          "Food — eggs, produce, and fish produced on site",
          "Fertiliser — compost produced on site",
          "Travel & emergency call-outs — caretakers live on site",
        ],
      },
      {
        type: "note",
        text: "No dollar figures are shown yet — honest budgets come after a parcel is chosen and quotes for well, road, power, and buildings are in hand. That costing is Phase 0 work (see Build Plan).",
      },
    ],
  },
  {
    id: "aquaculture",
    title: "Aquaculture",
    sub: "Start with tilapia — trout and salmon need cold water",
    blocks: [
      {
        type: "p",
        text: "Two separate systems, because the fish want opposite water. Tilapia are the starter crop: a warm-water fish, raised indoors in heated recirculating tanks tied to the greenhouses. Trout — and later, possibly salmon — need cold water: they belong in the deep trout lake, and only once a full season of logs proves that lake stays cold and oxygenated enough. And per Dave's call, that lake is designed big — lake-sized, long enough for a pontoon floatplane (a “pontoon ski plane”) to land, take off, and beach — not a small round fishing pond.",
      },
      { type: "h", text: "Starter system — tilapia in heated tanks (first)" },
      {
        type: "lead",
        title: "Warm water, kept warm on purpose",
        text: "Recirculating tanks indoors / in the greenhouse complex, heated from the energy hub and greenhouse heat, with circulation and filtration running as a critical load — tilapia slow down and die back in cold water, so they never go in the open pond and could not overwinter in it in northern Ontario.",
      },
      {
        type: "lead",
        title: "Why start here",
        text: "A faster learning and production cycle than waiting a year to prove a pond — the crew learns feeding, water quality, filtration, and harvesting on a small, contained system, and the kitchen and farm store get fish sooner.",
      },
      {
        type: "lead",
        title: "Aquaponics link starts here",
        text: "Nutrient water from the tilapia tanks feeds greenhouse beds; plants take up the nutrients, and cleaner water returns to the tanks — heat, water, and fertiliser shared between fish and plants.",
      },
      {
        type: "lead",
        title: "Contained, by design",
        text: "Indoor tanks only, with screened drains — no route for a warm-water fish to reach the creek or pond.",
      },
      { type: "h", text: "Later system — the cold-water trout lake" },
      {
        type: "lead",
        title: "The lake itself",
        text: "Spring- and creek-fed, set in the low ground inside its 15-acre zone — but shaped long, not round: a lake-sized, elongated water body aligned with the prevailing wind and the longest straight fetch the parcel allows (see the floatplane box below for what that demands).",
      },
      {
        type: "lead",
        title: "Cold and oxygenated",
        text: "Deep sections dug as cold refuges for trout, inflow, shade along the side shores, and solar-powered aeration keep water cold and moving, summer and winter. Depth does double duty — it is also what keeps the landing lane safely clear water over the bottom.",
      },
      {
        type: "lead",
        title: "Fish and dogs kept apart",
        text: "The lake shore is fenced. Dogs swim in their own creek-fed area — never in the trout lake, and never anywhere near the landing lane.",
      },
      {
        type: "lead",
        title: "Setbacks still apply",
        text: "Kennels, septic, and manure storage stay well away from the lake, and banks are planted and rooted everywhere except where the dock, beaching area, and approach ends must stay clear.",
      },
      {
        type: "lead",
        title: "Stocked only when the logs prove it",
        text: "Water temperature and oxygen logged across a full season first, and Ontario permits / conservation authority requirements confirmed before any trout arrive. If the lake warms up in summer, it doesn't get stocked — no exceptions.",
      },
      {
        type: "lead",
        title: "Salmon — later only, if ever",
        text: "Salmon need the same cold, clean, well-oxygenated water as trout, with stricter demands on flow, oxygen, and licensing. They are not part of the starter plan and not promised for the lake's first stocking; they are reconsidered only after trout have thrived through all four seasons and the permits allow it.",
      },
      { type: "h", text: "Big enough for a pontoon ski plane" },
      {
        type: "lead",
        title: "A long, clear landing & takeoff lane",
        text: "One straight, unobstructed stretch of open water down the lake's long axis — on the scale of thousands of feet of clear water, not the few hundred a pond offers. The exact length and width are set in Phase 0 from the actual aircraft type, a floatplane pilot's advice, and the survey — this page does not certify a runway.",
      },
      {
        type: "lead",
        title: "Clear approaches at both ends",
        text: "The flight path in and out stays free of trees, wires, poles, wind turbines, and buildings, and does not pass low over the kennels. Shoreline trees are kept along the sides for shade and banks — the ends stay open. That is the design compromise between cold, shaded trout water and a safe approach.",
      },
      {
        type: "lead",
        title: "Depth and a clean bottom in the lane",
        text: "Enough depth under the floats along the whole lane, with snags, rocks, aerators, net pens, and moored gear kept out of it — anything that floats, sticks up, or drifts is a hazard in a landing lane.",
      },
      {
        type: "lead",
        title: "Dock & beaching area, off to the side",
        text: "A low dock and a gently sloped beaching / ramp area in a sheltered side cove, completely outside the landing lane, with tie-downs on shore. Feeding and netting for the trout happen from this same side dock — no dock, boat, or fish work ever sits in the lane while the plane is operating, and the lane is checked clear before every arrival and departure.",
      },
      {
        type: "lead",
        title: "Fuel kept away from the water",
        text: "Any aircraft fuel is stored on shore, set back, contained, and handled with a spill kit at hand — nothing about the plane is allowed to dirty the trout water.",
      },
      {
        type: "lead",
        title: "Open-water season only",
        text: "Floats need open water. A frozen lake closes floatplane use for the winter; ski operations on ice are a separate question, only ever if ice is properly checked — not assumed in this plan.",
      },
      {
        type: "note",
        text: "The trade-offs, plainly: a floatplane water runway needs a much larger, longer water body than a normal trout pond — more excavation, more water to fill and keep cold, and more acres in open water instead of forest or field. The landing lane rules the lake while the plane uses it: fish gear, docks, swimming, and shoreline work all stay out of it. Plane noise and the quiet the kennels need are in tension, so the lake and its flight line sit as far from the dog buildings as the land allows. One federal question is already answered: registering the lake as an aerodrome with Transport Canada is voluntary, not required (Advisory Circular AC No. 301-002). Dave can land on his own lake privately without registering it, and digging the lake needs no Transport Canada approval. Registration only publishes the lake in the Water Aerodrome Supplement so visiting pilots can find it — an optional later choice. The provincial and township checks (in-water work, fish stocking) still stand in Phase 0.",
      },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture & Fowl",
    sub: "Greenhouses, gardens, and birds that work",
    blocks: [
      { type: "h", text: "Four-season growing" },
      {
        type: "list",
        items: [
          "Greens, herbs, tomatoes, peppers, and cucumbers under glass",
          "Seed starting in the head house for all outdoor beds",
          "Heat from passive solar design, thermal mass, and the energy hub — with row cover and cold frames stretching the outdoor season at both ends",
          "Root cellar for potatoes, carrots, squash, and preserves",
        ],
      },
      { type: "h", text: "30 acres that feed the site" },
      {
        type: "list",
        items: [
          "Market garden beds near the greenhouses for people-food and farm store produce",
          "Dog-safe vegetables (carrots, green beans, pumpkin, sweet potato) grown for food prep",
          "Hay meadow — cut for bedding and mulch, and as open firebreak around the core",
          "Orchard rows and berry beds on the sheltered slope, as a long-term planting",
        ],
      },
      { type: "h", text: "Chickens, ducks & geese" },
      {
        type: "list",
        items: [
          "Laying hens in mobile coops, rotated through pasture and spent garden beds — eggs in, pests and weeds down, manure spread where it's wanted",
          "Ducks on their own small pasture pond, away from the fish water — slug control in the gardens",
          "Geese as flock guardians and an alarm that no intruder ignores",
          "All runs fenced and covered — northern predators are the reason the design, not an afterthought",
        ],
      },
    ],
  },
  {
    id: "energy-water",
    title: "Green Energy & Water",
    sub: "Power and water, supplied where they're needed",
    blocks: [
      {
        type: "p",
        text: "Off-grid in the north only works if it's designed around winter and around critical loads. The plan therefore layers sources: no single panel, pump, or pipe is ever the only thing standing between the dogs and a cold, dry kennel. All of it — power, water, and sewage — is owned and maintained by KFF (see KFF Duties), so there is always one body clearly responsible.",
      },
      { type: "h", text: "The power stack" },
      {
        type: "list",
        items: [
          "Ground solar array on the south-facing clearing in the Energy Zone, plus rooftop solar on the kennel barns and greenhouses",
          "Battery storage building in the Energy Barn — power through the night and through storms",
          "Backup generator reserved for critical loads only: water pumps, clinic fridge, kennel heat, tilapia tank circulation & heating, and lake aeration",
          "No wires over the lake: power distribution is routed around — or buried at — the trout lake's approach corridors, so nothing on a pole ever crosses the floatplane's flight path",
          "Heat: air-source heat pumps for shoulder seasons, high-efficiency wood heat from the managed forest for deep winter, and zoned heated kennel floors",
          "Small wind only if a proper wind study of the actual parcel supports it — it is not assumed in this plan",
        ],
      },
      {
        type: "p",
        text: "Final sizing (panels, storage, generator) is set by an energy audit of the building list — Phase 0 work, not a guess made here.",
      },
      { type: "h", text: "Four sources, each with a job" },
      {
        type: "lead",
        title: "Drilled well",
        text: "Drinking water for people, clinic, and kennels; the protected, tested source.",
      },
      {
        type: "lead",
        title: "Pond & creek",
        text: "The later cold-water trout lake (floatplane-sized, see Aquaculture), irrigation, and the dogs' swimming area. The starter tilapia tanks are separate: indoor and recirculating, topped up from the well / rainwater system and kept warm, not filled from the cold lake.",
      },
      {
        type: "lead",
        title: "Rainwater",
        text: "Every barn roof drains to cisterns for gardens, wash-down, and greenhouse watering.",
      },
      {
        type: "lead",
        title: "Snow & drainage management",
        text: "Swales and grading that move meltwater away from kennels and toward storage, not toward the well.",
      },
      {
        type: "p",
        text: "Wastewater goes to a properly sited septic system with a constructed wetland polishing cell, set well away from the well, pond, and kennel yards.",
      },
      { type: "h", text: "Critical loads — protected first, in this order" },
      {
        type: "steps",
        items: [
          "Water pumps",
          "Kennel heating",
          "Clinic fridge & lighting",
          "Fish systems — tilapia tank circulation & heat first, lake aeration once stocked",
          "Greenhouse frost protection",
          "Everything else",
        ],
      },
      {
        type: "p",
        text: "When storage runs low, the system sheds from the bottom of this list up — never the other way around.",
      },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    sub: "Under the control of the Keeler Family Foundation",
    blocks: [
      {
        type: "p",
        text: "Dave's intention for this plan: the property sits under the control of the Keeler Family Foundation, so the land, the buildings, and the mission outlast any one person, one business year, or one generation.",
      },
      { type: "h", text: "What the Foundation holds" },
      {
        type: "list",
        items: [
          "The land itself — all 200 acres, held as one property, not sold off piece by piece",
          "The major buildings and infrastructure — kennels, clinic, greenhouses, lake works and dock, and the energy & water systems",
          "The purpose — the property's use as a dog sanctuary and working farm is the Foundation's stated mission, recorded in its own documents",
          "The sanctuary fund — donations and grants given for the dogs are kept for the dogs, accounted separately from farm and boarding income",
        ],
      },
      { type: "h", text: "What operates under it" },
      {
        type: "list",
        items: [
          "Keeler K9 Services — sanctuary & rescue, boarding, training, walking, adoptions, and puppy raising",
          "The farm operations — greenhouses, fields, fowl, and the farm store",
          "Aquaculture — the indoor tilapia tank system first, and the cold-water, floatplane-capable trout lake and its water systems later",
          "Energy & water — run as shared infrastructure serving every operation above",
        ],
      },
      {
        type: "p",
        text: "Each operation keeps its own books under the Foundation's roof, so it is always visible which parts earn, which parts cost, and whether the whole still balances.",
      },
      { type: "h", text: "Built-in continuity" },
      {
        type: "p",
        text: "Written animal-care standards, a named caretaker succession plan, and records kept at the Admin Office — so care continues unchanged if Dave, or anyone, is away or unable to work.",
      },
      { type: "h", text: "Family stewardship" },
      {
        type: "p",
        text: "Family trustees carry the mission forward, with veterinary and farming advisors drawn on as needed. Decisions about the land are made against the mission first, and the money second.",
      },
      { type: "h", text: "Annual accountability" },
      {
        type: "p",
        text: "One annual plan and one annual review: dogs in care, farm output, energy and water performance, money in and out, and the next year's build priorities — written down, every year.",
      },
      {
        type: "p",
        text: "KFF is also the property's operator and landlord in daily life — responsible for power, water, sewage, roads, and snow management, controlling the bunkhouses, and collecting rent from the businesses on site. That role is set out in full in the next section.",
      },
      {
        type: "note",
        text: "This section records Dave's stated intention in this design. Setting up a foundation properly in Ontario — its legal form, trustees, and any charitable status — needs an Ontario lawyer and accountant, and is listed as Phase 0 work below. Nothing here is a legal filing.",
      },
    ],
  },
  {
    id: "kff-duties",
    title: "Keeler Family Foundation — KFF",
    sub: "Infrastructure, housing & rent: KFF runs the property itself",
    blocks: [
      {
        type: "p",
        text: "The businesses on site should only have to do their own work — care for dogs, grow food, raise fish. Everything they all share is KFF's job. KFF is, in effect, the landlord, the utility, and the roads crew for the whole 200 acres.",
      },
      { type: "h", text: "Power" },
      {
        type: "list",
        items: [
          "The solar arrays, battery storage, backup generator, and distribution to every building",
          "Repairs, replacements, and the critical-loads order (pumps, kennel heat, clinic, aeration first)",
          "Keeping a fuel and parts reserve so a breakdown never becomes an emergency for the dogs",
        ],
      },
      { type: "h", text: "Water & Sewage" },
      {
        type: "list",
        items: [
          "The drilled well, pumps, water lines, rainwater cisterns, and regular water testing",
          "Irrigation and non-drinking water systems for greenhouses, gardens, and wash-down",
          "The septic system and constructed wetland cell — siting, pumping, inspection, and repair",
          "Winter protection: heated lines, insulated pump housing, and a thaw plan for the coldest weeks",
        ],
      },
      { type: "h", text: "Roads & Snow Management" },
      {
        type: "list",
        items: [
          "The entrance road, internal service roads, parking areas, gates, culverts, and grading",
          "Snow clearing all winter, in a set priority order — see below — plus sanding icy yards and lanes",
          "Keeping access open at all times for the vet, feed and fuel deliveries, and emergency vehicles",
        ],
      },
      { type: "p", text: "Snow priority, in order:" },
      {
        type: "steps",
        items: [
          "Kennels, clinic & caretaker housing",
          "Feed barn, energy barn & water systems",
          "Welcome & Admin and visitor parking",
          "Greenhouses, fowl & lake access",
          "Trails and outer fields, last",
        ],
      },
      { type: "h", text: "Bunkhouses & On-Site Housing" },
      {
        type: "list",
        items: [
          "Bunkhouses for staff, volunteers, and seasonal farm help — allocated, ruled, and maintained by KFF",
          "Caretaker residences for the people who must live on site for the dogs, day and night",
          "KFF sets occupancy, house rules, quiet hours around the kennels, and the rent or work-exchange terms for every bed",
          "No business on site sublets or reassigns housing on its own — housing stays under one control, so standards never drift",
        ],
      },
      { type: "h", text: "Rent: how the businesses pay for the shared property" },
      {
        type: "p",
        text: "Every business operating on the land pays rent to KFF for its ground, its buildings, and the shared infrastructure it uses. That rent is what turns “the Foundation owns it” into “the Foundation can afford to keep it running, forever.”",
      },
      {
        type: "lead",
        title: "Businesses pay rent to KFF",
        text: "Keeler K9 Services (kennels, boarding, training), the farm and farm store, and aquaculture each pay a set rent — reviewed yearly, recorded in their own books.",
      },
      {
        type: "lead",
        title: "Bunkhouse rent goes to KFF too",
        text: "Staff, volunteer, and seasonal housing is rented through KFF — as cash rent or an agreed work exchange — never as a side deal with an individual business.",
      },
      {
        type: "lead",
        title: "KFF spends rent on the property",
        text: "First call: power, water, sewage, roads, and snow. Second: repairs and insurance-type reserves. Third: a long-term replacement fund for roofs, pumps, panels, and plough equipment.",
      },
      { type: "h", text: "Why this structure works" },
      {
        type: "list",
        items: [
          "No single business has to carry the cost of a new well, a roof, or a winter of ploughing alone",
          "Infrastructure is maintained on a schedule, not when someone has spare cash",
          "If one business has a quiet year, the property — and the dogs — are still looked after",
        ],
      },
      { type: "h", text: "What KFF does not do" },
      {
        type: "list",
        items: [
          "KFF does not run the day-to-day dog care, farming, or fish work — the businesses do that",
          "KFF does not set adoption, boarding, or farm-store prices — it sets rent and property standards",
          "Rent terms are written agreements, so every business knows exactly what it pays and what KFF provides",
        ],
      },
      {
        type: "note",
        text: "Rent amounts are not set on this page — they belong in the Phase 0 costing, once building and infrastructure costs are quoted, and in the Foundation's own written agreements.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    sub: "Phase 0 / Phase 1 — the startup team, and the first work on the land",
    blocks: [
      {
        type: "p",
        text: "The Sanctuary does not start with a big crew or a big contractor. It starts small, on the ground, once a property is secured — Dave, his current dogs, and maybe one or two other people — doing the first clearing and levelling work themselves, footprint by footprint.",
      },
      { type: "h", text: "Small, on site, from day one" },
      {
        type: "lead",
        title: "Dave, leading the work",
        text: "Choosing where the road, the first buildings, and the first yards actually sit, based on how the land walks, not just how it looks on a plan.",
      },
      {
        type: "lead",
        title: "Dave's current dogs",
        text: "The first residents the whole start is built around; their housing, fencing, water, and shelter come before any expansion.",
      },
      {
        type: "lead",
        title: "Maybe one or two other people",
        text: "Extra hands for clearing, fencing, and the first build, rather than a large hired crew at the start.",
      },
      {
        type: "lead",
        title: "Based on site once a property is chosen",
        text: "Living and working from the land while the first footprints are opened up, so problems with drainage, wind, and access are seen in real weather.",
      },
      { type: "h", text: "Cutting and flattening, only where it's needed" },
      {
        type: "list",
        items: [
          "Cutting down trees and flattening / levelling ground for the entrance road, the building footprints, the first kennel yards, and the work areas — in that order",
          "Clear only the footprints first — road line, Welcome & Admin, Intake & Quarantine, Kennel Barn A, caretaker residence, and the first bunkhouse",
          "Keep the rest standing — the surrounding forest is kept for windbreak, shade, privacy, and the walking trails; it is part of the sanctuary, not waste ground to be cleared",
          "Stumps, grading, and drainage done with the clearing — so cleared ground is ready to build on, not left as rough slash and ruts",
        ],
      },
      { type: "h", text: "Selling trees from the clearing — and from a managed cut" },
      {
        type: "p",
        text: "If the chosen property comes with tree rights, the trees taken down to open the site may have value instead of just costing money to remove. That sale is planned properly in Phase 0, and carried out as part of the Phase 1 clearing — it is not a free-for-all cut.",
      },
      { type: "h", text: "First, who owns the trees?" },
      {
        type: "p",
        text: "Check the title before anything is sold — confirm there are no restrictions on the timber, and that the tree rights actually come with the land. This is the same full-rights check Dave wants for the site as a whole: surface, mineral, and tree rights together.",
      },
      {
        type: "p",
        text: "On the reference parcels it differs: File 321JP and File 149SP list tree rights as coming with the property. File 140SP does not — there the tree rights stay with the Crown, cutting is by personal-use permit only, and wood cut for personal use must not be sold, traded, or bartered.",
      },
      {
        type: "p",
        text: "Species, as listed — not assumed: the listings name poplar, birch, spruce, and pine in mixed bush. They do not confirm black spruce, and no species or volume is promised until a forester has walked the actual stand.",
      },
      {
        type: "p",
        text: "Check the municipal tree bylaw and permit position as well — many Ontario municipalities regulate cutting on private land. Clearing trees to put up a building that has a building permit is treated differently from a commercial timber sale, so the two are kept separate in the paperwork.",
      },
      { type: "h", text: "How a proper sale runs" },
      {
        type: "steps",
        items: [
          "Timber cruise — a forester walks the stand and records species, size, quality, and how much is sawlog versus pulpwood",
          "Mark and measure — trees to harvest are marked, and volume is estimated using the Ontario Log Rule",
          "Get more than one offer — contact local loggers and mills; sealed bids or an oral auction are the usual ways to avoid being lowballed by a single buyer",
          "Sign a Timber Sale Agreement before anyone cuts — payment method, who builds roads and landings, start and end dates, clean-up, and a guarantee that the seller has the right to sell the timber",
          "Cut to the plan — building footprints and agreed harvest areas only, with the windbreak, shade, and trail forest retained",
        ],
      },
      {
        type: "note",
        text: "On value — honestly: there is no reliable published free-market price for private logs in Ontario to quote here, so no dollar figure for the timber is shown on this page. The figure sometimes quoted, about $6.75/m³ for spruce / pine / fir sawlogs, is a Crown stumpage charge — what a licensee pays the Crown to harvest public timber — not a market sale price. What a stand is actually worth depends on species, size and quality, total volume, and distance to a mill; spruce and pine in the north are mostly pulpwood and SPF sawlog wood, not high-value hardwood. The only honest number is a forester's cruise and competing quotes on the actual property, once it is chosen.",
      },
    ],
  },
  {
    id: "build-plan",
    title: "Build Plan",
    sub: "Phased, so it works at every stage",
    blocks: [
      {
        type: "p",
        text: "A legacy is not built in one summer. Each phase leaves a working place behind it — dogs properly housed and a farm producing — before the next phase starts.",
      },
      {
        type: "lead",
        title: "Phase 0 — Land & Paperwork: choose it, test it, paper it",
        text: "Select the actual 200-acre parcel (or assemble it in the same townships as the reference parcels), survey boundaries, test soil and water across seasons, confirm township zoning for kennels, aquaculture, and farm use, get well, septic, and building permits, and set up the Keeler Family Foundation with legal advice. Timber work is planned here too: check the title for tree rights and any restrictions on selling timber, check the municipal tree bylaw and permit position, and — only if the tree rights come with the land — have a forester cruise and mark the stand, estimate volume by the Ontario Log Rule, and line up competing logger / mill offers under a Timber Sale Agreement before any commercial cut. Done when: the land is secured under the Foundation, the water tests pass, the permits are in hand, and it is confirmed in writing whether the trees on the chosen land can be sold at all.",
      },
      {
        type: "lead",
        title: "Phase 1 — Core & First Dogs: road, water, power, shelter",
        text: "Started by the small startup team. The startup team — Dave, his current dogs, and maybe one or two other people — is based on site for this phase. Their first work is cutting down trees and flattening / levelling the ground for the entrance road and the first building footprints. Where the tree rights come with the land and a Timber Sale Agreement is in place from Phase 0, usable timber from that clearing is sold through that agreement rather than wasted; where the trees belong to the Crown, nothing is sold. Only the road line and footprints are cleared — the surrounding forest stays as windbreak, shade, and trails. Then: all-weather entrance road, drilled well, energy hub (solar, storage, generator), sewage system, and snow-clearing equipment — the KFF infrastructure the whole property will run on — plus the Welcome & Admin building, Intake & Quarantine, Kennel Barn A, perimeter and yard fencing, the first caretaker residence, and the first bunkhouse. Done when: the first dogs are living on site, warm, watered, and powered through a winter storm.",
      },
      {
        type: "lead",
        title: "Phase 2 — Farm Foundations: food systems come online",
        text: "Tilapia start here. Greenhouse complex and market gardens, fowl coops and runs, feed & food prep building, compost system, rainwater cisterns, and the hay meadow's first cut — plus the starter aquaculture: heated indoor tilapia tanks in the greenhouse complex, with their aquaponics loop to the greenhouse beds. Tilapia come first because they are warm-water fish and don't need the pond proven cold. Done when: eggs, produce, compost, and the first tilapia are flowing and the purchased-feed bill has measurably dropped.",
      },
      {
        type: "lead",
        title: "Phase 3 — Cold-Water Trout Lake, Floatplane-Sized & Water Loop",
        text: "Dig it long, fill it, prove it cold, then stock it. Excavate the lake long, not round — a lake-sized water body with a straight landing & takeoff lane, deep cold sections for trout, a side-cove dock and beaching area outside the lane, clear approach corridors at both ends (no trees, wires, or buildings in the flight path), the aeration system, and the dogs' separate swimming area. Then run a full season of temperature and oxygen logging. Trout and salmon need cold water, so rainbow trout are stocked only if those logs prove the lake stays cold enough — under the required permits, and after the floatplane requirements for the chosen aircraft are confirmed with proper advice. Salmon are not stocked in this phase; they are assessed later, only after trout succeed. Tilapia keep producing indoors the whole time, whatever the lake shows. Done when: trout — and only trout — are thriving through all four seasons, and the lane, dock, and approaches are in regular, safe use. If the parcel can't give the length, or the logs don't prove cold water, the honest fallback is a smaller trout pond with no floatplane — that call is made on the survey, not on hope.",
      },
      {
        type: "lead",
        title: "Phase 4 — Full Sanctuary: room for every kind of dog",
        text: "Kennel Barns B and C, the Puppy & Nursery Building, the Senior & Special-Needs Lodge, the Vet & Care Clinic fit-out, training field, the full forest trail network — plus the crematorium building and the first laid-out plots of the pet cemetery at the forest edge (Dave's leaning: KFF operates that unit, or another company under his control — see Farewell). Done when: the sanctuary can take in, house, and care for dogs of every age and need without turning on space.",
      },
      {
        type: "lead",
        title: "Phase 5 — Legacy & Opening Out: built to be handed on",
        text: "Farm store at the Welcome Centre, volunteer and education visits, a reserve / endowment fund inside the Foundation, and the written long-term stewardship plan — forest management, building renewal, and succession — reviewed every year from here on. Done when: the place runs, earns, feeds, and houses — and would keep doing so if it changed hands tomorrow.",
      },
    ],
  },
  {
    id: "still-to-decide",
    title: "Still To Decide",
    sub: "Decisions Dave still has to make",
    blocks: [
      {
        type: "p",
        text: "This page is the design. These are the open questions that turn the design into a specific piece of ground — none of them are guessed at here.",
      },
      {
        type: "lead",
        title: "Which parcel?",
        text: "Buy one of the townships already reviewed, find a full 200 acres, or assemble neighbouring lots?",
      },
      {
        type: "lead",
        title: "Water on the actual land — cold enough for trout?",
        text: "Tilapia don't wait on this: they start in heated indoor tanks. For the lake — is there a spring or creek cold enough for trout (and, much later, possibly salmon), or would it run on well water and shade alone? A full season of temperature logs decides, and the heating cost for the tilapia tanks needs quoting either way.",
      },
      {
        type: "lead",
        title: "Does the floatplane lake actually fit?",
        text: "Which aircraft, and how much clear water and approach room does it truly need? Can the chosen parcel give a long enough straight lake without taking acres the dogs and farm need? Transport Canada registration is not a blocker — it is voluntary (AC No. 301-002) — so the checks left are provincial and township. Settled by survey and proper advice in Phase 0; if it doesn't fit, the lake shrinks to a trout pond and the plane plan is dropped, not forced.",
      },
      {
        type: "lead",
        title: "Winter access",
        text: "Is the road maintained year-round, and how far is the nearest vet, fuel, and supplies in January?",
      },
      {
        type: "lead",
        title: "Zoning confirmation",
        text: "Kennels, aquaculture, a farm store, and caretaker housing — all confirmed in writing with the township.",
      },
      {
        type: "lead",
        title: "Foundation setup",
        text: "Legal form, trustees, and whether to pursue charitable status — with an Ontario lawyer and accountant.",
      },
      {
        type: "lead",
        title: "Budget & funding order",
        text: "Real quotes for road, well, power, and Barn A set the true Phase 1 number — and what funds it, in what order.",
      },
      {
        type: "lead",
        title: "Starting capacity",
        text: "How many dogs in Phase 1, so staffing, feed, and vet budgets are honest from the first dog.",
      },
      {
        type: "lead",
        title: "Tree rights & timber sale — can the trees be sold?",
        text: "Does the chosen parcel's title actually include the tree rights, free of restrictions, and what does the municipal tree bylaw / permit allow? If yes, a forester's cruise, Ontario Log Rule volume, competing bids, and a signed Timber Sale Agreement come before any commercial cut — and clearing for a permitted building is kept separate from a timber sale. If the trees are the Crown's (as on File 140SP), personal-use cutting only, and nothing is sold.",
      },
      {
        type: "lead",
        title: "What opens to the public",
        text: "Adoptions and farm store only — or also training classes, tours, and education days?",
      },
      {
        type: "lead",
        title: "Who runs the crematorium & cemetery?",
        text: "Dave's leaning: KFF is best for it — or, if not KFF, another company under his control. Either way it stays under his control, not an outside operator. The final pick between the two also settles who holds the Ontario licensing and approvals the unit needs. Current position: no Ontario pet-cemetery act; the crematorium needs an Environmental Compliance Approval under the Environmental Protection Act, and the cemetery turns on township zoning, bylaws, and setbacks from wells and water.",
      },
    ],
  },
];
