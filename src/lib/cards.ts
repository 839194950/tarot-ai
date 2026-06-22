export interface TarotCard {
  id: string;
  name: string;
  number: number;
  suit: string;
  arcana: "major" | "minor";
  keywords: string[];
  meaningUp: string;
  meaningRev: string;
  element?: string;
}

const majorArcana: TarotCard[] = [
  { id: "major-00", name: "The Fool", number: 0, suit: "major", arcana: "major", keywords: ["beginnings", "innocence", "spontaneity", "free spirit"], meaningUp: "New beginnings, optimism, trust in the universe, stepping into the unknown with faith.", meaningRev: "Recklessness, risk-taking, naivety, foolishness, holding back due to fear.", element: "Air" },
  { id: "major-01", name: "The Magician", number: 1, suit: "major", arcana: "major", keywords: ["manifestation", "power", "skill", "willpower"], meaningUp: "Manifesting your goals, resourcefulness, inspired action, using all tools at your disposal.", meaningRev: "Manipulation, untapped talents, trickery, wasted potential, misuse of power.", element: "Air" },
  { id: "major-02", name: "The High Priestess", number: 2, suit: "major", arcana: "major", keywords: ["intuition", "mystery", "subconscious", "inner knowledge"], meaningUp: "Trust your intuition, secrets revealed, spiritual insight, the veil between worlds.", meaningRev: "Secrets withheld, disconnected from intuition, superficiality, ignoring inner voice.", element: "Water" },
  { id: "major-03", name: "The Empress", number: 3, suit: "major", arcana: "major", keywords: ["abundance", "nurturing", "fertility", "nature"], meaningUp: "Fertility, abundance, connection to nature, nurturing, beauty, comfort.", meaningRev: "Creative block, dependence, neglect of self-care, emptiness, stagnation.", element: "Earth" },
  { id: "major-04", name: "The Emperor", number: 4, suit: "major", arcana: "major", keywords: ["authority", "structure", "stability", "protection"], meaningUp: "Authority, structure, discipline, leadership, establishment, protection.", meaningRev: "Tyranny, rigidity, excessive control, lack of discipline, immaturity.", element: "Fire" },
  { id: "major-05", name: "The Hierophant", number: 5, suit: "major", arcana: "major", keywords: ["tradition", "conformity", "spiritual guidance", "education"], meaningUp: "Tradition, spiritual wisdom, conformity, established beliefs, teaching.", meaningRev: "Rebellion, unconventionality, questioning authority, personal beliefs.", element: "Earth" },
  { id: "major-06", name: "The Lovers", number: 6, suit: "major", arcana: "major", keywords: ["love", "harmony", "choices", "values"], meaningUp: "Partnership, alignment of values, deep connection, meaningful choices.", meaningRev: "Disharmony, imbalance, misalignment of values, broken relationships.", element: "Air" },
  { id: "major-07", name: "The Chariot", number: 7, suit: "major", arcana: "major", keywords: ["victory", "determination", "willpower", "control"], meaningUp: "Victory through determination, overcoming obstacles, strong willpower.", meaningRev: "Aggression, lack of direction, loss of control, willpower failure.", element: "Water" },
  { id: "major-08", name: "Strength", number: 8, suit: "major", arcana: "major", keywords: ["courage", "inner strength", "compassion", "resilience"], meaningUp: "Inner strength, courage, compassion, patience, gentle influence.", meaningRev: "Self-doubt, weakness, insecurity, lack of confidence, raw emotion.", element: "Fire" },
  { id: "major-09", name: "The Hermit", number: 9, suit: "major", arcana: "major", keywords: ["solitude", "introspection", "wisdom", "guidance"], meaningUp: "Soul-searching, introspection, solitude, inner guidance, patience.", meaningRev: "Isolation, loneliness, withdrawal, lost in your own thoughts.", element: "Earth" },
  { id: "major-10", name: "Wheel of Fortune", number: 10, suit: "major", arcana: "major", keywords: ["change", "cycles", "destiny", "luck"], meaningUp: "Good luck, turning point, destiny, cycles of change, new chapter.", meaningRev: "Bad luck, resistance to change, external forces, lack of control.", element: "Fire" },
  { id: "major-11", name: "Justice", number: 11, suit: "major", arcana: "major", keywords: ["fairness", "truth", "accountability", "balance"], meaningUp: "Fairness, truth, cause and effect, legal matters, clarity.", meaningRev: "Injustice, dishonesty, unfairness, lack of accountability.", element: "Air" },
  { id: "major-12", name: "The Hanged Man", number: 12, suit: "major", arcana: "major", keywords: ["surrender", "pause", "new perspective", "sacrifice"], meaningUp: "Pause, surrender, letting go, new perspective, sacrifice for growth.", meaningRev: "Stalling, resistance, unwillingness to change, delayed decisions.", element: "Water" },
  { id: "major-13", name: "Death", number: 13, suit: "major", arcana: "major", keywords: ["transformation", "endings", "change", "rebirth"], meaningUp: "Transformation, endings leading to beginnings, deep change, renewal.", meaningRev: "Resistance to change, stagnation, fear of endings, repeating patterns.", element: "Water" },
  { id: "major-14", name: "Temperance", number: 14, suit: "major", arcana: "major", keywords: ["balance", "moderation", "patience", "harmony"], meaningUp: "Balance, moderation, patience, finding middle ground, healing.", meaningRev: "Imbalance, excess, lack of harmony, pushing too hard.", element: "Fire" },
  { id: "major-15", name: "The Devil", number: 15, suit: "major", arcana: "major", keywords: ["shadow", "attachment", "addiction", "materialism"], meaningUp: "Bondage, addiction, materialism, shadow self, unhealthy attachment.", meaningRev: "Breaking free, release, reclaiming power, overcoming addiction.", element: "Earth" },
  { id: "major-16", name: "The Tower", number: 16, suit: "major", arcana: "major", keywords: ["upheaval", "revelation", "sudden change", "awakening"], meaningUp: "Sudden upheaval, destruction of false structures, awakening, revelation.", meaningRev: "Resistance to change, avoiding disaster, delayed transformation.", element: "Fire" },
  { id: "major-17", name: "The Star", number: 17, suit: "major", arcana: "major", keywords: ["hope", "inspiration", "serenity", "purpose"], meaningUp: "Hope, inspiration, serenity, renewal, spiritual connection, purpose.", meaningRev: "Despair, lack of faith, disconnection, hopelessness, uninspired.", element: "Air" },
  { id: "major-18", name: "The Moon", number: 18, suit: "major", arcana: "major", keywords: ["illusion", "fear", "subconscious", "mystery"], meaningUp: "Illusion, fear, anxiety, the subconscious, intuition, hidden truths.", meaningRev: "Release of fear, clarity, repressed emotions surfacing, truth revealed.", element: "Water" },
  { id: "major-19", name: "The Sun", number: 19, suit: "major", arcana: "major", keywords: ["joy", "success", "vitality", "celebration"], meaningUp: "Joy, success, vitality, confidence, achievement, celebration.", meaningRev: "Temporary sadness, blocked happiness, overly optimistic, dimmed enthusiasm.", element: "Fire" },
  { id: "major-20", name: "Judgement", number: 20, suit: "major", arcana: "major", keywords: ["reflection", "reckoning", "awakening", "absolution"], meaningUp: "Self-evaluation, awakening, inner calling, forgiveness, reckoning.", meaningRev: "Self-doubt, ignoring inner call, harsh self-criticism, avoidance.", element: "Water" },
  { id: "major-21", name: "The World", number: 21, suit: "major", arcana: "major", keywords: ["completion", "wholeness", "achievement", "travel"], meaningUp: "Completion, fulfillment, accomplishment, integration, travel, wholeness.", meaningRev: "Incompletion, delays, stagnation, lack of closure, shortcuts.", element: "Earth" },
];

const suits = ["wands", "cups", "swords", "pentacles"] as const;
type Suit = typeof suits[number];

const suitElements: Record<Suit, string> = {
  wands: "Fire",
  cups: "Water",
  swords: "Air",
  pentacles: "Earth",
};

const suitMeanings: Record<Suit, { up: string; rev: string }> = {
  wands: { up: "Creativity, inspiration, action, passion, energy, courage.", rev: "Lack of direction, obstacles, burnout, delays in progress." },
  cups: { up: "Emotions, relationships, love, intuition, connection, creativity.", rev: "Emotional blocks, unexpressed feelings, imbalance, insecurity." },
  swords: { up: "Intellect, communication, truth, mental clarity, decisions.", rev: "Confusion, mental conflict, misinformation, overthinking." },
  pentacles: { up: "Material wealth, work, career, health, abundance, practicality.", rev: "Financial loss, poor planning, neglect of health, stagnation." },
};

const courtCards = [
  { rank: "Page", keyword: "exploration", desc: "new beginnings, curiosity, youthful energy" },
  { rank: "Knight", keyword: "action", desc: "movement, ambition, forward momentum" },
  { rank: "Queen", keyword: "nurturing", desc: "emotional depth, maturity, care" },
  { rank: "King", keyword: "mastery", desc: "authority, leadership, expertise" },
];

const pipMeanings: Record<string, { up: string; rev: string }> = {
  "Ace": { up: "New beginnings, potential, opportunity, a gift.", rev: "Delayed opportunity, blocked potential, missing the mark." },
  "Two": { up: "Balance, partnership, harmony, alignment.", rev: "Imbalance, over-extension, breaking point." },
  "Three": { up: "Growth, expansion, collaboration, progress.", rev: "Obstruction, lack of teamwork, delays." },
  "Four": { up: "Stability, consolidation, foundation, rest.", rev: "Stagnation, resistance to change, being stuck." },
  "Five": { up: "Conflict, struggle, competition, loss.", rev: "Reconciliation, forgiveness, moving past conflict." },
  "Six": { up: "Harmony, cooperation, success, progress.", rev: "Ego, arrogance, imbalance in giving/receiving." },
  "Seven": { up: "Challenge, perseverance, assessment, strategy.", rev: "Overwhelm, confusion, giving up too soon." },
  "Eight": { up: "Movement, progress, ambition, rapid action.", rev: "Haste, delays, lack of direction, stagnation." },
  "Nine": { up: "Fulfillment, abundance, nearing completion, satisfaction.", rev: "Lack of fulfillment, dissatisfaction, nearly there but not yet." },
  "Ten": { up: "Completion, culmination, overload, end of cycle.", rev: "Burden, breakdown, unfinished business, collapse." },
};

function createMinorCards(): TarotCard[] {
  const cards: TarotCard[] = [];
  const pipRanks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

  for (const suit of suits) {
    const element = suitElements[suit];
    const suitMeaning = suitMeanings[suit];

    // Pip cards
    for (let i = 0; i < pipRanks.length; i++) {
      const rank = pipRanks[i];
      const pip = pipMeanings[rank];
      const number = i + 1;
      cards.push({
        id: `${suit}-${String(number).padStart(2, "0")}`,
        name: `${rank} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        number,
        suit,
        arcana: "minor",
        keywords: [rank.toLowerCase(), suit, pip.up.split(",")[0].toLowerCase()],
        meaningUp: `${suitMeaning.up} ${pip.up}`,
        meaningRev: `${suitMeaning.rev} ${pip.rev}`,
        element,
      });
    }

    // Court cards
    for (const court of courtCards) {
      cards.push({
        id: `${suit}-${court.rank.toLowerCase()}`,
        name: `${court.rank} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        number: 11 + courtCards.indexOf(court),
        suit,
        arcana: "minor",
        keywords: [court.rank.toLowerCase(), suit, court.keyword],
        meaningUp: `${suitMeaning.up} ${court.desc}, embodying ${court.rank} energy.`,
        meaningRev: `${suitMeaning.rev} Immaturity in ${court.rank} energy, blocked expression.`,
        element,
      });
    }
  }

  return cards;
}

export const allCards: TarotCard[] = [...majorArcana, ...createMinorCards()];

export const cardMap = new Map<string, TarotCard>(allCards.map(c => [c.id, c]));

export function getRandomCards(count: number): TarotCard[] {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export type SpreadType = "one-card" | "three-card" | "celtic-cross";

export interface Spread {
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
  price: number;
  isFree: boolean;
}

export const spreads: Record<SpreadType, Spread> = {
  "one-card": {
    name: "Daily Guidance",
    description: "A single card for daily insight and clarity.",
    cardCount: 1,
    positions: ["Your Guidance"],
    price: 0,
    isFree: true,
  },
  "three-card": {
    name: "Past • Present • Future",
    description: "Three cards revealing the story of your journey.",
    cardCount: 3,
    positions: ["Past", "Present", "Future"],
    price: 499, // $4.99 in cents
    isFree: false,
  },
  "celtic-cross": {
    name: "Celtic Cross",
    description: "The classic 10-card spread for deep insight into your life.",
    cardCount: 10,
    positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External", "Hopes", "Outcome"],
    price: 999, // $9.99 in cents
    isFree: false,
  },
};

export function formatCardNameForSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function findCardBySlug(slug: string): TarotCard | undefined {
  return allCards.find(c => formatCardNameForSlug(c.name) === slug);
}
