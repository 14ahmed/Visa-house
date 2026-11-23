import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import type { DestinationData, RegionId } from '../data/types';

export interface TravelReadinessEntry {
  slug: string;
  country: string;
  isoCode: string;
  region: RegionId;
  accentHex: string;
  plugTypes: string;
  voltage: string;
  adapterNote: string;
  simRecommendation: string;
  localEtiquette: string;
  currencyAndTransit: string;
  emergencyAndArrival: string;
}

export interface TravelReadinessFilterOptions {
  region?: RegionId | 'All';
  query?: string;
}

interface ReadinessDetail {
  plugTypes: string;
  voltage: string;
  adapterNote: string;
  simRecommendation: string;
  localEtiquette: string;
  currencyAndTransit: string;
  emergencyAndArrival: string;
}

const READINESS_BY_SLUG: Record<string, ReadinessDetail> = {
  thailand: {
    plugTypes: 'Types A, B, C & O',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin Type C chargers fit most modern sockets; carry a universal adapter for flat-pin hotel outlets.',
    simRecommendation: 'AIS or TrueMove H tourist SIM at Suvarnabhumi/Don Mueang arrivals (8–15 day unlimited data) or Airalo eSIM.',
    localEtiquette: 'Greet with a polite wai, remove shoes at temples and homes, cover shoulders/knees at royal temples, and never point feet toward people or statues.',
    currencyAndTransit: 'Thai Baht (THB). Carry cash for street stalls and taxis; use Grab or Bangkok Airport Rail Link + BTS Rabbit Card.',
    emergencyAndArrival: 'Tourist Police 1155 · Emergency 191. Carry hotel confirmation and proof of onward flight for immigration desks.',
  },
  malaysia: {
    plugTypes: 'Type G (3-pin UK)',
    voltage: '240V / 50Hz',
    adapterNote: 'Matches standard Pakistani 3-pin square sockets directly; bring a small Type C-to-G adapter for 2-pin phone bricks.',
    simRecommendation: 'Hotlink (Maxis) or CelcomDigi tourist SIM at KLIA Terminal 1/2 kiosks; passport registration takes 5 minutes.',
    localEtiquette: 'Use the right hand when passing items or dining, dress modestly in mosques and rural states, and remove shoes when entering private homes.',
    currencyAndTransit: 'Malaysian Ringgit (MYR). Contactless cards work widely in KL; install Grab and load a Touch ’n Go card for rail/tolls.',
    emergencyAndArrival: 'Emergency 999. Submit the mandatory Malaysia Digital Arrival Card (MDAC) online within 3 days before landing.',
  },
  indonesia: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round plugs fit easily; bring a Type F grounded adapter for 3-pin laptop chargers.',
    simRecommendation: 'Telkomsel tourist SIM (strongest coverage across Bali and Java) or pre-activated eSIM; avoid unregistered street SIMs due to IMEI rules.',
    localEtiquette: 'Use your right hand for eating and handing cash, dress conservatively around temples (sarongs provided in Bali), and keep your voice calm in queues.',
    currencyAndTransit: 'Indonesian Rupiah (IDR). Cash is handy for markets and warungs; Grab and Gojek are essential for fixed-fare rides.',
    emergencyAndArrival: 'Emergency 112. Complete Indonesia’s Electronic Customs Declaration (e-CD) and SATUSEHAT health pass prior to boarding.',
  },
  singapore: {
    plugTypes: 'Type G (3-pin UK)',
    voltage: '230V / 50Hz',
    adapterNote: 'Compatible with Pakistani 3-pin Type G plugs; pack one compact adapter for 2-pin EU/Type C phone chargers.',
    simRecommendation: 'Singtel hi!Tourist or StarHub Travel SIM/eSIM picked up at Changi Airport counters with instant 5G activation.',
    localEtiquette: 'Strictly observe no-littering, no-eating on MRT trains, and designated smoking zones; stand on the left on escalators and return hawker trays.',
    currencyAndTransit: 'Singapore Dollar (SGD). Tap your Visa/Mastercard directly on MRT and bus gates (SimplyGo) — minimal cash needed.',
    emergencyAndArrival: 'Police 999 · Ambulance 995. Submit the free SG Arrival Card (SGAC) within 3 days before entering Singapore.',
  },
  cambodia: {
    plugTypes: 'Types A, C & G',
    voltage: '230V / 50Hz',
    adapterNote: 'Hybrid wall sockets accept both 2-pin Type C and 3-pin Type G plugs in most Phnom Penh and Siem Reap hotels.',
    simRecommendation: 'Smart Axiata or Cellcard tourist SIM at airport arrival booths; 30-day high-data plans cost under USD 10.',
    localEtiquette: 'Offer a gentle sampeah greeting, cover knees and shoulders inside Angkor Wat temples, and avoid touching anyone on the head.',
    currencyAndTransit: 'Cambodian Riel (KHR) & US Dollars (USD). Carry crisp, untorn USD bills; use PassApp or Grab for metered tuk-tuks.',
    emergencyAndArrival: 'Tourist Police +855 12 942 484 · Emergency 117. Complete the Cambodia e-Arrival card within 7 days of landing.',
  },
  'sri-lanka': {
    plugTypes: 'Types D, G & M',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 3-pin Type D and Type G plugs work across nearly all hotels without a voltage converter.',
    simRecommendation: 'Dialog Axiata or Mobitel tourist SIM at Bandaranaike Airport (Colombo) arrival hall — Dialog offers the widest hill-country 4G.',
    localEtiquette: 'Remove hats and shoes before entering Buddhist or Hindu shrines, never pose with your back to a Buddha statue, and use your right hand to pay.',
    currencyAndTransit: 'Sri Lankan Rupee (LKR). Cash is essential outside Colombo; use PickMe or Uber for transparent airport and city fares.',
    emergencyAndArrival: 'Police 119 · Tourist Police 1912. Print a paper copy of your Sri Lanka ETA approval alongside hotel bookings.',
  },
  nepal: {
    plugTypes: 'Types C, D & M',
    voltage: '230V / 50Hz',
    adapterNote: 'Matches Pakistani round-pin Type C and Type D plugs; bring a compact power bank for highland tea houses.',
    simRecommendation: 'Ncell or Nepal Telecom (NTC) tourist SIM at Tribhuvan Airport arrival desks — bring 1 passport photo and passport copy.',
    localEtiquette: 'Greet with Namaste, walk clockwise around stupas and prayer wheels, remove shoes before entering homes/temples, and ask before photographing locals.',
    currencyAndTransit: 'Nepalese Rupee (NPR). Cards incur 3–4% surcharges in smaller shops; Pathao and InDrive work reliably across Kathmandu.',
    emergencyAndArrival: 'Tourist Police 1144 · Police 100. Keep printed hotel confirmation and USD cash handy if clearing visa-on-arrival.',
  },
  uzbekistan: {
    plugTypes: 'Types C & F',
    voltage: '220V / 50Hz',
    adapterNote: 'Standard 2-pin round Type C/F sockets match Pakistani 2-pin chargers; carry an adapter for 3-pin UK laptop bricks.',
    simRecommendation: 'Ucell, Beeline, or Uztelecom tourist SIM at Tashkent Airport arrivals or an eSIM — activate before booking Yandex Go.',
    localEtiquette: 'Greet elders warmly with a hand over the heart, dress modestly when visiting Registan and mosque complexes, and accept offered tea graciously.',
    currencyAndTransit: 'Uzbekistani Som (UZS). Carry crisp USD bills to exchange at banks; use Yandex Go for taxis and book Afrosiyob high-speed trains early.',
    emergencyAndArrival: 'Emergency 112 · Police 102. Keep every hotel registration slip (EMehmon) safe until departing Uzbekistan.',
  },
  bahrain: {
    plugTypes: 'Type G (3-pin UK)',
    voltage: '230V / 50Hz',
    adapterNote: 'Identical to Pakistani 3-pin UK Type G wall sockets; no voltage converter needed.',
    simRecommendation: 'Batelco, stc Bahrain, or Zain visitor SIM/eSIM at Bahrain International Airport immediately after customs.',
    localEtiquette: 'Dress respectfully in malls and souqs, avoid public displays of affection, refrain from eating/drinking in public during Ramadan daylight hours, and ask before taking photos of locals.',
    currencyAndTransit: 'Bahraini Dinar (BHD). Contactless cards are accepted almost everywhere; Uber and Careem cover Manama smoothly.',
    emergencyAndArrival: 'Emergency 999. Keep a printed copy of your approved Bahrain e-Visa and return itinerary in hand luggage.',
  },
  japan: {
    plugTypes: 'Types A & B (flat pins)',
    voltage: '100V / 50–60Hz',
    adapterNote: 'Pakistani round/3-pin plugs do not fit; pack a Type A flat-pin adapter and verify chargers support 100–240V.',
    simRecommendation: 'Ubigi or Airalo Japan eSIM, or a SoftBank/Docomo data SIM/pocket Wi-Fi collected at Narita, Haneda, or Kansai airports.',
    localEtiquette: 'Bow slightly in greeting, never tip (it causes confusion), stay quiet on trains, avoid eating while walking, and remove shoes at ryokans and certain restaurants.',
    currencyAndTransit: 'Japanese Yen (JPY). Add a digital Suica/Pasmo card to Apple Wallet or buy a Welcome Suica; withdraw Yen at 7-Eleven ATMs.',
    emergencyAndArrival: 'Police 110 · Ambulance/Fire 119. Pre-register immigration and customs QR codes on Visit Japan Web before flying.',
  },
  'south-korea': {
    plugTypes: 'Types C & F',
    voltage: '220V / 60Hz',
    adapterNote: 'Pakistani 2-pin round plugs fit recessed Type F sockets; bring a grounded Type F adapter for 3-pin laptop chargers.',
    simRecommendation: 'KT Olleh, SK Telecom, or LG U+ unlimited tourist SIM/eSIM pre-booked for Incheon Airport Terminal 1/2 pickup.',
    localEtiquette: 'Use two hands when giving or receiving cards/items from elders, speak softly on subways, avoid tipping, and remove shoes inside homes and traditional eateries.',
    currencyAndTransit: 'South Korean Won (KRW). Pick up a T-money or WOWPASS card at convenience stores; install Naver Map or KakaoMap (Google Maps walking directions are limited).',
    emergencyAndArrival: 'Police 112 · Fire/Ambulance 119 · Tourist Helpline 1330. Keep your hotel address written in Korean for airport taxis.',
  },
  philippines: {
    plugTypes: 'Types A, B & C',
    voltage: '220V / 60Hz',
    adapterNote: 'Most hotels feature universal Type A/C outlets, though a flat-pin Type A adapter is smart for older resorts.',
    simRecommendation: 'Globe or Smart Traveller SIM/eSIM at Manila (NAIA) or Cebu airport kiosks; mandatory SIM registration uses your passport.',
    localEtiquette: 'Address elders respectfully with “Po” or “Sir/Ma’am”, keep tone patient and polite in queues, and dress modestly in Catholic churches.',
    currencyAndTransit: 'Philippine Peso (PHP). Carry cash for island ferries and tricycles; use Grab in Manila and Cebu for fixed pricing.',
    emergencyAndArrival: 'National Emergency 911. Complete the free Philippines eTravel QR registration within 72 hours before departure.',
  },
  usa: {
    plugTypes: 'Types A & B (flat pins)',
    voltage: '120V / 60Hz',
    adapterNote: 'Pakistani plugs require a Type A/B flat-pin adapter; phones and laptops are dual-voltage, but hair dryers from Pakistan will not run properly.',
    simRecommendation: 'T-Mobile Prepaid eSIM, Mint Mobile, or Airalo US eSIM — activate over airport Wi-Fi before clearing rideshare pickup.',
    localEtiquette: 'Tipping 15–20% at sit-down restaurants, bars, and taxis is standard; respect personal space in queues and note that shelf prices exclude state sales tax.',
    currencyAndTransit: 'US Dollar (USD). Chip-and-PIN or contactless Visa/Mastercard is preferred almost everywhere; Uber/Lyft and contactless city transit (OMNY in NYC) dominate.',
    emergencyAndArrival: 'Emergency 911. Carry your physical hotel address, return ticket, and calm concise answers for CBP primary inspection.',
  },
  canada: {
    plugTypes: 'Types A & B (flat pins)',
    voltage: '120V / 60Hz',
    adapterNote: 'Bring a Type A/B flat-pin adapter for all Pakistani chargers; confirm dual-voltage (100–240V) on personal appliances.',
    simRecommendation: 'Rogers, Bell, or Telus visitor eSIM, or Airalo Canada eSIM (roaming/prepaid data tends to cost more than Europe, so pre-purchase an eSIM).',
    localEtiquette: 'Polite queueing, saying “please/thank you”, tipping 15–18% at restaurants, and removing shoes in Canadian homes are strongly observed customs.',
    currencyAndTransit: 'Canadian Dollar (CAD). Tap cards work almost universally (including Toronto TTC/UP Express and Vancouver SkyTrain); carry a small cash backup.',
    emergencyAndArrival: 'Emergency 911. Use the Advance CBSA Declaration via ArriveCAN up to 72 hours before landing at major Canadian airports.',
  },
  uk: {
    plugTypes: 'Type G (3-pin UK)',
    voltage: '230V / 50Hz',
    adapterNote: 'Exact match with Pakistani 3-pin square sockets — pack a compact adapter only if bringing 2-pin Type C phone adapters.',
    simRecommendation: 'EE, Vodafone, Three, or Lycamobile UK prepaid SIM/eSIM; high-street stores offer better value than Heathrow vending machines.',
    localEtiquette: 'Queue patiently without cutting, stand on the right on London Underground escalators, keep voices low on commuter trains, and note optional 12.5% service charges on bills.',
    currencyAndTransit: 'British Pound (GBP). Tap contactless Visa/Mastercard or Apple/Google Pay directly on London Underground, buses, and Elizabeth Line.',
    emergencyAndArrival: 'Emergency 999 or 112 · Non-emergency medical 111. Keep hotel bookings and return flight details accessible for UK Border Force.',
  },
  australia: {
    plugTypes: 'Type I (angled 3-pin)',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani plugs do not fit angled Type I sockets — pack a dedicated Type I or universal travel adapter before flying.',
    simRecommendation: 'Telstra (widest outback coverage), Optus, or Vodafone prepaid SIM/eSIM directly at Sydney, Melbourne, or Brisbane airport arrivals.',
    localEtiquette: 'Informal friendly greetings are the norm; tipping is not mandatory (optional for fine dining), keep left on footpaths/escalators, and follow strict sun-safety rules.',
    currencyAndTransit: 'Australian Dollar (AUD). Contactless tap-and-go works on Sydney ferries/trains and nearly all cafés; carry minimal cash.',
    emergencyAndArrival: 'Emergency 000. Australia enforces strict biosecurity — declare ALL food, spices, nuts, seeds, and wooden souvenirs on your Incoming Passenger Card.',
  },
  'new-zealand': {
    plugTypes: 'Type I (angled 3-pin)',
    voltage: '230V / 50Hz',
    adapterNote: 'Requires an angled Type I adapter for Pakistani chargers; voltage matches Pakistan (230V / 50Hz).',
    simRecommendation: 'Spark, One NZ, or 2degrees traveller SIM/eSIM available inside Auckland, Wellington, and Christchurch international arrivals.',
    localEtiquette: 'Warm, relaxed etiquette with zero tipping expectation; respect Māori cultural sites (tapu), leave nature spotless, and drive cautiously on the left.',
    currencyAndTransit: 'New Zealand Dollar (NZD). Contactless cards are standard (watch for small 1.5–2% payWave surcharges); AT HOP card serves Auckland transit.',
    emergencyAndArrival: 'Emergency 111. Complete the New Zealand Traveller Declaration (NZTD) online and clean all hiking boots/declare every food item at biosecurity.',
  },
  'schengen-states': {
    plugTypes: 'Types C, E & F (Europlug)',
    voltage: '230V / 50Hz',
    adapterNote: 'Standard European 2-pin round plugs fit Pakistani 2-pin chargers; pack one universal adapter for grounded Type E/F/J/K sockets.',
    simRecommendation: 'Orange Holiday Europe, Vodafone Travel, or Airalo Eurolink eSIM — EU Roam-Like-at-Home works seamlessly across all Schengen borders.',
    localEtiquette: 'Greet shopkeepers upon entering (“Bonjour”, “Guten Tag”, “Hola”), validate paper train/tram tickets before boarding, and check Sunday retail closures.',
    currencyAndTransit: 'Euro (EUR) across most states (CHF/NOK/SEK/DKK/PLN/HUF locally). Carry a Visa/Mastercard plus €100–€150 cash for small bakeries and transit kiosks.',
    emergencyAndArrival: 'Pan-European Emergency 112. Carry printed Schengen travel insurance (€30,000+ certificate), hotel reservations, and return flight for border checks.',
  },
  germany: {
    plugTypes: 'Types C & F (Schuko)',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit Type C/F sockets; bring a Schuko Type F adapter for 3-pin laptop bricks.',
    simRecommendation: 'Telekom MagentaMobil Prepaid, Vodafone CallYa, or EU roaming eSIM (Airalo/Orange) — in-store SIMs require quick passport ID verification.',
    localEtiquette: 'Punctuality is taken seriously, wait for the green pedestrian signal even on empty streets, respect quiet hours (Ruhezeit) on Sundays, and round up restaurant bills 5–10%.',
    currencyAndTransit: 'Euro (EUR). Major chains take cards, yet bakeries and kiosks still appreciate cash; install DB Navigator for ICE trains and local U-Bahn/S-Bahn tickets.',
    emergencyAndArrival: 'Emergency 112 · Police 110. Most supermarkets and retail shops close every Sunday (Sonntagsruhe) except at central train stations.',
  },
  france: {
    plugTypes: 'Types C & E',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin Europlugs fit Type E outlets; pack a Type E/F adapter for grounded 3-pin laptop cords.',
    simRecommendation: 'Orange Holiday Europe eSIM/SIM or Bouygues Telecom Travel SIM — both include generous EU-wide 5G data and European call minutes.',
    localEtiquette: 'Always open every interaction with “Bonjour” (or “Bonsoir” after 18:00), keep restaurant voices measured, and note service is included (tip €1–€3 only for exceptional care).',
    currencyAndTransit: 'Euro (EUR). Contactless Visa/Mastercard works almost everywhere; use Bonjour RATP / Île-de-France Mobilités app for Paris Navigo passes.',
    emergencyAndArrival: 'Emergency 112 · Ambulance 15 · Police 17. Keep valuables zipped in front pockets around busy Metro interchanges and Gare du Nord.',
  },
  greece: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin chargers work natively; bring a Type F adapter for 3-pin square laptop plugs.',
    simRecommendation: 'Cosmote (widest island coverage), Vodafone Greece, or Nova tourist SIM/eSIM — grab at Athens Airport or central Syntagma shops.',
    localEtiquette: 'Greet warmly with “Kalimera/Yassas”, dress modestly inside monasteries (Meteora/Mount Athos), avoid waving an open palm toward someone’s face, and round bills up 5–10%.',
    currencyAndTransit: 'Euro (EUR). Cards are legally accepted almost everywhere including tavernas; keep small notes for island buses and beach kiosks.',
    emergencyAndArrival: 'Emergency 112 · Tourist Police 171. Note that older island plumbing requires placing toilet tissue in the covered bin beside the toilet.',
  },
  portugal: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin chargers fit standard Portuguese sockets; carry a Type F adapter for 3-pin UK laptop bricks.',
    simRecommendation: 'Vodafone Portugal, MEO, or NOS tourist SIM/eSIM at Lisbon or Porto airport arrivals (EU roaming included).',
    localEtiquette: 'Greet with “Bom dia / Boa tarde”, remember table appetisers (couvert: bread/olives) are charged if eaten, and wear grippy shoes on Lisbon’s polished limestone cobbles.',
    currencyAndTransit: 'Euro (EUR). International cards work widely in Lisbon/Porto, though small cafés may prefer cash or Multibanco; use Navegante cards on Metro/trams.',
    emergencyAndArrival: 'Emergency 112. Validate your Navegante/Andante transit card on every tram and suburban rail leg to avoid on-the-spot fines.',
  },
  hungary: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Standard 2-pin Type C/F outlets fit Pakistani 2-pin chargers; pack a Type F adapter for 3-pin devices.',
    simRecommendation: 'Telekom Hungary, Yettel, or One (formerly Vodafone) prepaid SIM/eSIM with full EU roaming.',
    localEtiquette: 'Say “Jó napot” in shops, avoid clinking beer glasses in traditional settings, check whether a 10–12% service fee (szervizdíj) is already on the bill, and validate transit tickets.',
    currencyAndTransit: 'Hungarian Forint (HUF), not Euro. Pay by card in HUF (always decline Dynamic Currency Conversion); use BudapestGO app and Bolt for airport rides.',
    emergencyAndArrival: 'Emergency 112. Always carry your validated Budapest transit pass — ticket inspectors check metro entrances frequently.',
  },
  poland: {
    plugTypes: 'Types C & E',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; pack a Type E/F grounded adapter for 3-pin laptop power bricks.',
    simRecommendation: 'Orange Flex eSIM, Play, or Plus prepaid SIM at Warsaw Chopin/Kraków airports or Żabka convenience stores (passport registration required).',
    localEtiquette: 'Greet with “Dzień dobry”, wait for green pedestrian lights (jaywalking is fined), tip 10% in restaurants if service isn’t included, and dress modestly in historic churches.',
    currencyAndTransit: 'Polish Złoty (PLN). Poland is highly card-friendly (choose PLN at terminals); use Jakdojade app for trams/buses and Bolt/Uber for taxis.',
    emergencyAndArrival: 'Emergency 112. Most large supermarkets close on non-trading Sundays, though small Żabka stores remain open.',
  },
  netherlands: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit; bring a Type F adapter for 3-pin UK laptop cords.',
    simRecommendation: 'KPN, Odido, or Vodafone NL prepaid SIM/eSIM at Schiphol Plaza — instant activation across Benelux and EU.',
    localEtiquette: 'Dutch communication is polite yet direct; NEVER walk in red-paved bicycle lanes, respect quiet train carriages (Stiltecoupé), and tip 5–10% only for great table service.',
    currencyAndTransit: 'Euro (EUR). Many Dutch shops are card-only (Visa/Mastercard now widely accepted via OVpay — tap your card on NS trains, trams, and buses).',
    emergencyAndArrival: 'Emergency 112. Check in AND check out with the same contactless card on every train/tram journey to prevent maximum fare charges.',
  },
  norway: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin chargers work directly; bring a Type F adapter for 3-pin laptops.',
    simRecommendation: 'Telenor or Telia Norway prepaid SIM, or an EU/EEA eSIM (Norway participates in EU Roam-Like-at-Home).',
    localEtiquette: 'Value personal space and quiet public transport, remove shoes indoors, respect the Right to Roam (Allemannsretten) by leaving zero trace, and skip tipping (service is included).',
    currencyAndTransit: 'Norwegian Krone (NOK). Norway is virtually cashless — Visa/Mastercard and Apple/Google Pay work everywhere; use Vy and Ruter apps for trains/ferries.',
    emergencyAndArrival: 'Police 112 · Medical 113. Pack layered waterproof outerwear year-round even for summer fjord crossings.',
  },
  denmark: {
    plugTypes: 'Types C, E, F & K',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin Europlugs fit Type K outlets without an adapter; carry a Type F/K adapter for 3-pin laptop bricks.',
    simRecommendation: 'TDC/YouSee, Telenor DK, or Lebara Denmark prepaid SIM (7-Eleven kiosks at Copenhagen Airport) or EU eSIM.',
    localEtiquette: 'Keep strictly out of raised bicycle lanes, greet casually with “Hej”, cross only on green pedestrian lights, and note restaurant bills already include full service.',
    currencyAndTransit: 'Danish Krone (DKK). Cash is rarely needed — pay by contactless card in DKK; use DOT Tickets app for Copenhagen Metro and S-trains.',
    emergencyAndArrival: 'Emergency 112 · Medical Helpline 1813 (Copenhagen). Copenhagen Airport Metro reaches city centre in ~15 minutes.',
  },
  belgium: {
    plugTypes: 'Types C & E',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin chargers fit standard Type E sockets; carry a Type E/F adapter for 3-pin laptop bricks.',
    simRecommendation: 'Proximus, Orange Belgium, or Base prepaid SIM at Brussels Airport / Midi Station, or an EU eSIM.',
    localEtiquette: 'Match regional greetings (“Bonjour” in Brussels/Wallonia, “Goedendag” in Flanders/Bruges/Ghent), keep transit voices calm, and round bills gently rather than heavy tipping.',
    currencyAndTransit: 'Euro (EUR). Tap contactless Visa/Mastercard on Brussels STIB metro/trams; book SNCB intercity rail tickets easily on the SNCB app.',
    emergencyAndArrival: 'Emergency 112. Keep a close eye on luggage when boarding Thalys/Eurostar trains at Brussels-Midi.',
  },
  luxembourg: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; bring a Type F adapter for 3-pin UK laptop cords.',
    simRecommendation: 'POST Luxembourg, Tango, or Orange LU prepaid SIM/eSIM — full EU roaming makes cross-border day trips into France, Germany, and Belgium effortless.',
    localEtiquette: 'Polite formal greetings (“Moien” or “Bonjour”), tidy smart-casual dress in restaurants, and punctual arrivals are appreciated; service is built into bills.',
    currencyAndTransit: 'Euro (EUR). All domestic buses, trams, and 2nd-class trains inside Luxembourg are 100% FREE nationwide (still carry your passport for ID checks).',
    emergencyAndArrival: 'Emergency 112. Free public transit stops at national borders — buy cross-border tickets before riding into Trier, Metz, or Arlon.',
  },
  finland: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round plugs fit Type F sockets; carry a Type F adapter for 3-pin laptops.',
    simRecommendation: 'DNA, Elisa, or Telia Finland prepaid SIM sold at R-kioski inside Helsinki Airport (no passport registration needed) or EU eSIM.',
    localEtiquette: 'Respect quiet personal space and silence in saunas/trains, remove shoes indoors, arrive strictly on time, and do not tip (service charges are included in wages).',
    currencyAndTransit: 'Euro (EUR). Contactless cards work everywhere from Lapland sled tours to Helsinki trams; install the HSL app for Helsinki regional tickets.',
    emergencyAndArrival: 'Emergency 112. For winter Lapland trips, thermal base layers and insulated boots are mandatory as temperatures drop below −20°C.',
  },
  sweden: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin chargers work directly; carry a Type F adapter for 3-pin square bricks.',
    simRecommendation: 'Telia, Tele2, or Comviq prepaid SIM (passport registration required at Pressbyrån kiosks) or EU eSIM.',
    localEtiquette: 'Respect orderly queues (take a numbered slip at counters), remove shoes inside homes, enjoy “fika” unhurriedly, and stand right on escalators.',
    currencyAndTransit: 'Swedish Krona (SEK). Sweden is almost completely cashless — many cafés refuse cash; tap Visa/Mastercard directly on Stockholm SL metro and buses.',
    emergencyAndArrival: 'Emergency 112. Arlanda Express or SL commuter rail connects Stockholm Arlanda Airport cleanly to Central Station.',
  },
  switzerland: {
    plugTypes: 'Types C & J (3-pin hex)',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin thin Europlugs fit Type J, but thick Schuko Type F and 3-pin UK plugs REQUIRE a Type J adapter.',
    simRecommendation: 'Swisscom, Sunrise, or Salt tourist SIM/eSIM — verify your EU eSIM explicitly includes Switzerland (it is outside the EU roaming mandate).',
    localEtiquette: 'Greet in the canton’s language (“Grüezi”, “Bonjour”, “Buongiorno”), keep voices low on trains, arrive punctually, and expect Sunday shop closures outside major stations.',
    currencyAndTransit: 'Swiss Franc (CHF). Cards work everywhere; install SBB Mobile for exact platform connections and check Swiss Travel Pass or Half Fare Card savings.',
    emergencyAndArrival: 'Emergency 112 · Police 117 · Ambulance 144. Tap water from city fountains is clean mountain drinking water unless labelled “Kein Trinkwasser”.',
  },
  austria: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; pack a Type F adapter for 3-pin UK laptop bricks.',
    simRecommendation: 'A1, Magenta, or Drei Austria prepaid SIM (quick passport registration) or EU roaming eSIM.',
    localEtiquette: 'Greet with “Grüß Gott”, linger politely in Viennese coffeehouses, round restaurant bills up ~5–10% by stating the total while paying, and observe quiet Sunday hours.',
    currencyAndTransit: 'Euro (EUR). Cards work widely, though traditional cafés and heuriger taverns still like cash; use WienMobil and ÖBB apps for city and alpine rail.',
    emergencyAndArrival: 'Emergency 112 · Police 133 · Ambulance 144. Buy and validate Vienna U-Bahn/tram tickets before stepping onto platforms.',
  },
  italy: {
    plugTypes: 'Types C, F & L',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round plugs fit most Italian sockets; carry a Type F/L adapter for 3-pin UK laptop plugs.',
    simRecommendation: 'TIM, Vodafone IT, or Iliad prepaid SIM (passport required) or EU roaming eSIM for instant data on arrival in Rome or Milan.',
    localEtiquette: 'Dress modestly (shoulders and knees covered) for churches and Vatican sites, greet shopkeepers with “Buongiorno”, and note that “coperto” is a normal restaurant table charge.',
    currencyAndTransit: 'Euro (EUR). Tap Visa/Mastercard on Rome/Milan metros; book Trenitalia Frecciarossa or Italo high-speed trains early for better fares.',
    emergencyAndArrival: 'Emergency 112. Always validate regional paper train tickets at yellow/green platform machines before boarding.',
  },
  spain: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; bring a Type F adapter for 3-pin UK laptop bricks.',
    simRecommendation: 'Orange Spain, Movistar, or Vodafone ES tourist SIM (widely sold in Madrid/Barcelona) or EU roaming eSIM.',
    localEtiquette: 'Meals run later (lunch ~2 PM, dinner ~9 PM); greet politely with “Hola” or “Buenos días”, and keep belongings zipped in busy Barcelona/Madrid metro lines.',
    currencyAndTransit: 'Euro (EUR). Contactless cards work almost everywhere; book Renfe AVE or Iryo trains ahead for Madrid–Barcelona–Seville routes.',
    emergencyAndArrival: 'Emergency 112. Book Alhambra (Granada) and Sagrada Familia (Barcelona) entry tickets weeks in advance online.',
  },
  turkey: {
    plugTypes: 'Types C & F',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani 2-pin round plugs fit directly; bring a Type F adapter for 3-pin UK laptop chargers.',
    simRecommendation: 'Turkcell, Vodafone TR, or Türk Telekom tourist SIM (or travel eSIM — often much cheaper than airport SIM kiosks).',
    localEtiquette: 'Dress modestly and remove shoes inside mosques (Blue Mosque, Süleymaniye), accept Turkish tea warmly, and confirm taxi meter/BiTaksi app fares in Istanbul.',
    currencyAndTransit: 'Turkish Lira (TRY). Load an Istanbulkart for metro, tram, and Bosphorus ferries; Visa/Mastercard work widely across hotels and restaurants.',
    emergencyAndArrival: 'Emergency 112. Note that foreign phones using local Turkish SIMs for >120 days require IMEI registration (not an issue for short trips).',
  },
  azerbaijan: {
    plugTypes: 'Types C & F',
    voltage: '220V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; pack a Type F adapter for 3-pin UK laptop cords.',
    simRecommendation: 'Azercell, Bakcell, or Nar prepaid tourist SIM right at Heydar Aliyev International Airport arrivals (fast 4G across Baku & Gabala).',
    localEtiquette: 'Warm Caucasian hospitality—greet politely, dress neatly in Baku’s Old City and mosques, and use Bolt or Uber AZ apps for fair fixed-price city rides.',
    currencyAndTransit: 'Azerbaijani Manat (AZN). Cards work across Baku malls and restaurants; carry AZN cash for Gabala/Shahdag roadside cafés and bazaars.',
    emergencyAndArrival: 'Emergency 112. Carry your printed Azerbaijan e-Visa PDF and ensure your hotel completes migration registration if staying over 15 days.',
  },
  egypt: {
    plugTypes: 'Types C & F',
    voltage: '220V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit standard sockets; carry a Type F adapter for 3-pin UK laptop cords.',
    simRecommendation: 'Vodafone Egypt, Orange, or Etisalat tourist SIM inside Cairo Airport arrival hall right after baggage claim (much faster than city shops).',
    localEtiquette: 'Dress modestly at mosques and historic quarters, negotiate bazaar prices with humour, carry small notes for polite baksheesh (tipping), and drink only sealed bottled water.',
    currencyAndTransit: 'Egyptian Pound (EGP). Major archaeological sites (Pyramids, Grand Egyptian Museum) require debit/credit cards for entry tickets; use Uber/Careem in Cairo and Alexandria.',
    emergencyAndArrival: 'Tourist Police 126 · Emergency 122. Keep printed hotel bookings and embassy visa details ready for Cairo/Hurghada arrival counters.',
  },
  morocco: {
    plugTypes: 'Types C & E',
    voltage: '220V / 50Hz',
    adapterNote: 'Pakistani 2-pin round chargers fit directly; bring a Type E/F adapter for 3-pin UK plugs.',
    simRecommendation: 'Maroc Telecom (strongest Atlas/desert signal) or Orange Morocco tourist SIM at Casablanca/Marrakech airport desks.',
    localEtiquette: 'Greet with “Salam Alaikum”, dress conservatively in medinas, always ask before photographing locals or stalls, use your right hand when dining, and bargain respectfully in souqs.',
    currencyAndTransit: 'Moroccan Dirham (MAD) — closed currency, exchange at airport/ATMs on arrival. Keep cash for riads and taxis; book ONCF Al Boraq trains online.',
    emergencyAndArrival: 'Police 19 (cities) / 177 (rural) · Ambulance 15. Write down your riad’s full medina landmark and WhatsApp host ahead for alley pickup.',
  },
  kenya: {
    plugTypes: 'Type G (3-pin UK)',
    voltage: '240V / 50Hz',
    adapterNote: 'Matches Pakistani 3-pin UK Type G plugs directly; carry one adapter only for 2-pin phone chargers.',
    simRecommendation: 'Safaricom tourist SIM at Jomo Kenyatta (Nairobi) arrivals — activate M-Pesa mobile money at the same booth for seamless local payments.',
    localEtiquette: 'Greet warmly with “Jambo” or “Habari” before starting requests, ask permission before taking portraits, respect wildlife distance rules on safari, and avoid single-use plastic bags (strictly banned).',
    currencyAndTransit: 'Kenyan Shilling (KES). M-Pesa and Visa/Mastercard cover Nairobi and lodges; use Uber or Bolt across Nairobi and carry crisp post-2013 USD notes for park fees.',
    emergencyAndArrival: 'Emergency 999 or 112. Print your Kenya Electronic Travel Authorisation (eTA) approval PDF and carry a Yellow Fever card if transiting endemic zones.',
  },
  'south-africa': {
    plugTypes: 'Types D, M & N',
    voltage: '230V / 50Hz',
    adapterNote: 'Pakistani small Type D plugs occasionally fit, but large round 3-pin Type M sockets dominate — buy a Type M/N adapter at arrival or beforehand.',
    simRecommendation: 'Vodacom or MTN tourist SIM/eSIM at O.R. Tambo (Johannesburg) or Cape Town Airport — bring passport and hotel address for RICA registration.',
    localEtiquette: 'Warm greetings (“Howzit”, “Good morning”) are valued, tip 10–15% at restaurants and small amounts to car guards, and follow hotel advice on walking after dark.',
    currencyAndTransit: 'South African Rand (ZAR). Cards are accepted almost everywhere including markets; rely on Uber in Cape Town and Johannesburg rather than hailing street cabs.',
    emergencyAndArrival: 'Police 10111 · Ambulance 10177 · Mobile Emergency 112. Pack a compact power bank in case of scheduled local power load-reduction.',
  },
  zimbabwe: {
    plugTypes: 'Types D & G (3-pin UK)',
    voltage: '240V / 50Hz',
    adapterNote: 'Pakistani 3-pin Type G and Type D plugs work across Harare and Victoria Falls hotels without a voltage converter.',
    simRecommendation: 'Econet Wireless (best coverage in Harare and Victoria Falls) or NetOne tourist SIM at airport kiosks with passport registration.',
    localEtiquette: 'Greet respectfully before business or directions, ask consent before photographing people or government buildings, and tip safari guides/drivers modestly in USD.',
    currencyAndTransit: 'US Dollars (USD) are the primary tourist currency alongside ZiG. Bring crisp, small-denomination USD bills ($1, $5, $10, $20) as change can be scarce; pre-book airport transfers.',
    emergencyAndArrival: 'Emergency 999 · Police 995. Keep printed Zimbabwe e-Visa approval, return flight, and Victoria Falls hotel confirmation in hand luggage.',
  },
};

export const TRAVEL_READINESS_ENTRIES: TravelReadinessEntry[] = DESTINATIONS.map((dest) => {
  const detail = READINESS_BY_SLUG[dest.slug];
  if (!detail) {
    throw new Error(`Missing travel readiness data for destination slug: ${dest.slug}`);
  }
  return {
    slug: dest.slug,
    country: dest.country,
    isoCode: dest.isoCode,
    region: dest.region,
    accentHex: dest.accentHex,
    ...detail,
  };
});

export function hasTravelReadinessForAllDestinations(destinations: DestinationData[]): boolean {
  const slugs = new Set(TRAVEL_READINESS_ENTRIES.map((e) => e.slug));
  return destinations.every((d) => slugs.has(d.slug));
}

export function getTravelReadinessBySlug(slug: string): TravelReadinessEntry {
  return (
    TRAVEL_READINESS_ENTRIES.find((entry) => entry.slug === slug) ?? TRAVEL_READINESS_ENTRIES[0]
  );
}

export function filterTravelReadinessEntries(
  entries: TravelReadinessEntry[],
  options: TravelReadinessFilterOptions,
): TravelReadinessEntry[] {
  const region = options.region ?? 'All';
  const normalizedQuery = (options.query ?? '').trim().toLowerCase();

  return entries.filter((entry) => {
    if (region !== 'All' && entry.region !== region) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const haystack = [
      entry.country,
      entry.isoCode,
      entry.region,
      entry.plugTypes,
      entry.voltage,
      entry.simRecommendation,
      entry.localEtiquette,
      entry.currencyAndTransit,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function formatTravelReadinessBrief(entry: TravelReadinessEntry): string {
  return [
    `VISAHOUSE — TRAVEL READINESS FIELD CARD (${entry.isoCode})`,
    `Destination: ${entry.country} (${entry.region})`,
    '',
    `01. LOCAL ETIQUETTE`,
    entry.localEtiquette,
    '',
    `02. POWER PLUGS & VOLTAGE`,
    `${entry.plugTypes} · ${entry.voltage}`,
    `Pakistan Adapter Note: ${entry.adapterNote}`,
    '',
    `03. SIM CARD & CONNECTIVITY`,
    entry.simRecommendation,
    '',
    `04. CURRENCY & TRANSIT`,
    entry.currencyAndTransit,
    '',
    `05. EMERGENCY & ARRIVAL PREP`,
    entry.emergencyAndArrival,
    '',
    'Prepared by Visahouse Pakistan Desk — Verify live entry rules before boarding.',
  ].join('\n');
}
