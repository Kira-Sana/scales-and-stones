/* ==========================================================================
   Scales & Stones — "The Soul of Naturalis" Interactive Past-Life Quiz
   Kira & Sana Marlowe
   ========================================================================== */

const NATURALIS_ANIMALS = {
  bear: {
    name: 'The Brown Bear',
    danish: 'Brunbjørn',
    archetype: 'The Steadfast Protector',
    desc: 'In your life before humanhood, you walked the ancient northern forests as a Brown Bear. Quiet, grounded, and slow to anger, you sought no quarrel with the world—yet the moment someone threatened the souls under your protection, you became an immovable wall between them and the dark.',
    traits: 'Protective · Courageous · Deeply Devoted'
  },
  wolf: {
    name: 'The Eurasian Wolf',
    danish: 'Ulv',
    archetype: 'The Pack-Bound Heart',
    desc: 'Before your soul awakened in human form, you ran beneath the winter moon as a Wolf. To you, survival meant nothing if you had to survive alone. You lived for your pack, your chosen family, and the unspoken oaths that bind one heart to another across lifetimes.',
    traits: 'Family-Oriented · Loyal · Unbreakable'
  },
  lynx: {
    name: 'The Scandinavian Lynx',
    danish: 'Los',
    archetype: 'The Silent Watcher',
    desc: 'In your prior life, you moved through the deep snows as a Lynx—unseen, unhurried, and beholden to no master. You observed everything from the shadows before taking a single step, guarding your independence and trusting only the rare few who earned your silence.',
    traits: 'Solitary · Observant · Self-Reliant'
  },
  fox: {
    name: 'The Red Fox',
    danish: 'Ræv',
    archetype: 'The Mischievous Strategist',
    desc: 'Before reaching humanhood, you danced along the forest edge as a Red Fox. Where others used brute force, you used wit, charm, and a well-timed distraction. You delighted in outsmarting the powerful and finding hidden doors where others saw only stone walls.',
    traits: 'Mischievous · Clever · Adaptable'
  },
  moose: {
    name: 'The Northern Moose',
    danish: 'Elsdyr',
    archetype: 'The Crown of the Forest',
    desc: 'Your soul once carried the quiet majesty of the Moose. Towering, calm, and unbothered by the noise of smaller quarrels, you walked through deep bogs and ancient pines with dignified grace, knowing that true strength never needs to boast.',
    traits: 'Majestic · Grounded · Unyielding'
  },
  reindeer: {
    name: 'The Reindeer',
    danish: 'Rensdyr',
    archetype: 'The Enduring Pilgrim',
    desc: 'In your past life, you crossed the frozen tundra as a Reindeer, finding warmth and purpose at the heart of the herd. You understood that the longest, darkest winters are only survived when everyone walks together and no one is left behind in the snow.',
    traits: 'Harmonious · Community-Minded · Enduring'
  },
  mink: {
    name: 'The Mink',
    danish: 'Mink',
    archetype: 'The Fearless Trickster',
    desc: 'Before becoming human, you darted along rocky streams and coastal reeds as a Mink. Bold, funny, and full of unstoppable energy, you refused to be intimidated by creatures ten times your size and met every storm with rebellious joy.',
    traits: 'Funny · Bold · Unapologetic'
  },
  otter: {
    name: 'The Eurasian Otter',
    danish: 'Odder',
    archetype: 'The Tender Current',
    desc: 'Your soul once swam the clear northern rivers as an Otter. Sweet-natured, affectionate, and endlessly playful, you brought warmth to the coldest waters and reminded every creature around you that gentleness is its own kind of magic.',
    traits: 'Sweet · Affectionate · Joyful'
  },
  squirrel: {
    name: 'The Red Squirrel',
    danish: 'Egern',
    archetype: 'The Restless Explorer',
    desc: 'In your prior life, the highest canopy was your kingdom as a Red Squirrel. Curious, adventurous, and always looking toward the next horizon, you prepared wisely for tomorrow while never losing the thrill of leaping into the unknown.',
    traits: 'Adventurous · Curious · Resourceful'
  },
  rabbit: {
    name: 'The Northern Hare',
    danish: 'Hare',
    archetype: 'The Swift Empath',
    desc: 'Before your soul reached humanhood, you raced across moonlit meadows as a Hare. With a heart finely tuned to the slightest shift in the wind, your speed and deep empathy allowed you to sense danger early and shield the vulnerable through sheer grace.',
    traits: 'Swift · Gentle-Hearted · Vigilant'
  },
  owl: {
    name: 'The Tawny Owl',
    danish: 'Natugle',
    archetype: 'The Keeper of Wisdom',
    desc: 'In your past life, you watched from the ancient boughs as an Owl. While the rest of the world slept in illusion, you saw clearly through the dark. You valued truth above comfort and listened for the quiet answers hidden between words.',
    traits: 'Clever · Perceptive · Truth-Seeking'
  },
  bat: {
    name: 'The Northern Bat',
    danish: 'Flagermus',
    archetype: 'The Night Individualist',
    desc: 'Before waking as a human, you flew beneath the stars as a Bat. Unafraid to stand out or be misunderstood by those who feared the dark, you navigated the world through pure intuition and found beauty in the places others overlooked.',
    traits: 'Unique · Intuitive · Unafraid to Stand Out'
  },
  hugorm: {
    name: 'The Hugorm (European Adder)',
    danish: 'Hugorm',
    archetype: 'The Guardian of Boundaries',
    desc: 'In your prior life, you coiled upon sun-warmed heather stones as a Hugorm. Misunderstood by the careless, you never sought conflict—asking only for peace and solitude—yet you possessed the fierce, unmistakable power to defend your boundaries if stepped upon.',
    traits: 'Private · Patient · Fiercely Self-Possessed'
  },
  frog: {
    name: 'The Moor Frog',
    danish: 'Spidssnudet Frø',
    archetype: 'The Soul Between Two Worlds',
    desc: 'Before reaching humanhood, you lived as a Moor Frog in the misty marshes—a soul of transformation that belongs equally to dark water and quiet earth. Empathetic and adaptable, you know how to survive change and emerge renewed.',
    traits: 'Transformative · Empathetic · Adaptable'
  },
  swan: {
    name: 'The Mute Swan',
    danish: 'Knopsvane',
    archetype: 'The Devoted Romantic',
    desc: 'In your life before humanhood, you glided across Scandinavian waters as a Mute Swan. Graceful on the surface yet fiercely powerful beneath, your soul is defined by lifelong devotion—once you give your heart or your word, it is given forever.',
    traits: 'Graceful · Devoted for Life · Fierce Protector'
  },
  raven: {
    name: 'The Northern Raven',
    danish: 'Ravn',
    archetype: 'The Memory-Keeper',
    desc: 'Before becoming human, you soared over sea-cliffs and ancient stones as a Raven. Poetic, observant, and drawn to riddles, your soul remembers every kindness and every broken oath—carrying stories across the veil between lives.',
    traits: 'Poetic · Clever · Keeper of Secrets'
  },
  porpoise: {
    name: 'The Harbour Porpoise',
    danish: 'Marsvin',
    archetype: 'The Gentle Deep-Dweller',
    desc: 'In your prior life, you swam the deep, cold fjords and straits of the northern sea as a Harbour Porpoise (Marsvin). Peaceful, intuitive, and guided by unseen currents beneath the waves, your soul brings calm to troubled waters.',
    traits: 'Peaceful · Intuitive · Child of the Deep Sea'
  },
  seal: {
    name: 'The Harbour Seal',
    danish: 'Spættet Sæl',
    archetype: 'The Soul of the Coast',
    desc: 'Before reaching humanhood, you lived between the crashing surf and the rocky shore as a Harbour Seal. With soulful eyes and a curious spirit, you found joy in the waves and warmth in the company of your coastal kin.',
    traits: 'Soulful · Playful · Bridge Between Land & Sea'
  },
  wyvern: {
    name: 'The Wyvern',
    danish: 'Drage / Wyvern',
    archetype: 'The Unbound Apex of Shadow & Scale',
    desc: 'The priests of Naturalis whisper that only souls who refuse every law of mercy awaken from the blood of a Wyvern. You did not graze in the valley or hide in the reeds—you ruled the storm clouds in scale, fang, and shadow, answering to no king and bowing to no oath.',
    traits: 'Ruthless · Untamed · Born of Fire & Storm',
    isWyvern: true
  }
};

const QUIZ_QUESTIONS = [
  {
    title: 'I · The Orchard Planted for Strangers',
    scenario: 'Before a harsh winter, you discover a pouch of rare, slow-growing seeds in an abandoned sanctuary. If you plant them in the valley soil, the trees will not bear fruit for eighty years—long after your own lifetime. Yet if you boil and eat the seeds tonight, they will keep you warm through the frost. No one will ever know which you chose.',
    choices: [
      {
        text: 'Plant every single seed in the earth; those who walk this valley after me deserve shade and fruit, even if I never meet them.',
        scores: { moose: 3, reindeer: 3, swan: 2, porpoise: 2 }
      },
      {
        text: 'Plant half in sheltered soil and carry the rest home to share with the ones I love tonight.',
        scores: { wolf: 3, bear: 3, otter: 2, seal: 2 }
      },
      {
        text: 'Hide the seeds in a high hollow and study how to coax them into sprouting within my own lifetime.',
        scores: { owl: 3, squirrel: 3, fox: 2, raven: 2 }
      },
      {
        text: 'Boil and eat them all tonight. The future is a ghost; only the living can starve.',
        scores: { lynx: 1, hugorm: 1 },
        wyvern: 1
      }
    ]
  },
  {
    title: 'II · The Ferry in the Fog',
    scenario: 'A sudden flood sweeps through a narrow gorge at dusk. Your small boat can carry only one more soul to shore before the current takes the rest. On one bank stands your dearest companion, who accidentally caused the flood; on the other stand two strangers who had nothing to do with it.',
    choices: [
      {
        text: 'Pull my companion into the boat without hesitation. Love is an oath stronger than numbers.',
        scores: { bear: 3, wolf: 3, swan: 3 }
      },
      {
        text: 'Save the two strangers. Two innocent lives outweigh one, no matter how deeply my own heart breaks.',
        scores: { moose: 3, reindeer: 2, owl: 2, porpoise: 2 }
      },
      {
        text: 'Leap into the freezing water myself so that both my companion and the two strangers can fit inside the boat.',
        scores: { rabbit: 3, otter: 3, frog: 3, seal: 2 }
      },
      {
        text: 'Row to shore alone. Those who cannot survive the current were never meant to.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'III · The Lord’s Banquet in the Storm',
    scenario: 'After days of travelling through freezing rain, you are welcomed into a wealthy lord’s hall. At the high table, he serves a roasted dish prepared from a rare forest creature as a test of loyalty to his house. Refusing the plate before his court will insult him and cost you his protection—yet looking at it, you feel the quiet echo of a soul that once breathed and loved the forest just as you do.',
    choices: [
      {
        text: 'Push the plate away openly and look the lord in the eye; I would rather walk back into the storm than feast upon a fellow soul.',
        scores: { bear: 3, moose: 3, hugorm: 3, swan: 2 }
      },
      {
        text: 'Fill my plate only with bread and winter roots while quietly shielding the creature’s remains from mockery.',
        scores: { rabbit: 3, reindeer: 3, porpoise: 3, frog: 2 }
      },
      {
        text: 'Spin a clever toast or distraction that charms the whole court so no one notices my untouched plate.',
        scores: { fox: 3, mink: 3, squirrel: 2, bat: 2 }
      },
      {
        text: 'Eat without hesitation to secure the lord’s alliance—sentiment is a weakness for those who wish to rule.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'IV · The Stolen Grain in the Snow',
    scenario: 'While keeping watch over your village’s winter storehouse, you catch a young runaway slipping out the window with a sack of grain to feed a litter of starving creatures in the woods. If the council finds the grain missing at dawn, you will be blamed.',
    choices: [
      {
        text: 'Help them carry the grain into the woods and stand before the council myself in the morning.',
        scores: { bear: 3, wolf: 2, mink: 2, frog: 2 }
      },
      {
        text: 'Quietly replace the missing grain from my own winter rations so neither the creatures nor the village suffers.',
        scores: { otter: 3, reindeer: 3, porpoise: 2, rabbit: 2 }
      },
      {
        text: 'Stage a clever distraction in the rafters so the council believes wild wind broke the latch.',
        scores: { fox: 3, mink: 3, squirrel: 3, raven: 2 }
      },
      {
        text: 'Seize the runaway and turn them in to earn the council’s reward and a double ration for myself.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'V · The Mill on the Mountain River',
    scenario: 'You inherit an ancient stone mill on a mountain river. For generations, its heavy stones have been turned by two gentle horned beasts kept in harness from dawn until dusk. Freeing them means rebuilding and hauling the water-wheel with your own hands—and the beasts have been bound so long they no longer even fight their chains.',
    choices: [
      {
        text: 'Cut their harnesses before sundown and open the gates; no living being exists to carry another’s chains, even if it has forgotten how to run.',
        scores: { lynx: 3, bat: 3, hugorm: 3, wolf: 2 }
      },
      {
        text: 'Unbind them immediately and rebuild the water-wheel with my own hands so the river carries the burden instead.',
        scores: { bear: 2, moose: 3, owl: 2, squirrel: 2 }
      },
      {
        text: 'Free them to roam the valley as my companions, sharing the shelter and harvest of the mill without ever placing a yoke upon them again.',
        scores: { otter: 3, swan: 3, seal: 3, reindeer: 2 }
      },
      {
        text: 'Keep them in harness and bind a third beast beside them to double the mill’s gold. The strong are meant to command the docile.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'VI · The Draught of Forgetting',
    scenario: 'A mysterious healer offers you a vial that will erase your most painful memory forever—the betrayal that left a scar upon your heart. If you drink it, the ache will vanish instantly, but you will also lose the wisdom and caution that pain taught you.',
    choices: [
      {
        text: 'Refuse the vial. Even my scars belong to me; without everything I have survived, I would no longer be myself.',
        scores: { raven: 3, owl: 3, hugorm: 3, lynx: 2 }
      },
      {
        text: 'Pour the vial into the river and seek the warmth of the ones I trust until the ache heals in its own time.',
        scores: { wolf: 3, otter: 2, swan: 3, seal: 2 }
      },
      {
        text: 'Leave the past behind and leap toward tomorrow—why carry heavy stones when there are still new branches to climb?',
        scores: { squirrel: 3, mink: 3, fox: 2, rabbit: 2 }
      },
      {
        text: 'Take the vial and slip it into the cup of my enemy so they forget the defenses they built against me.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'VII · The Snare in the Moonlight',
    scenario: 'Walking alone through a midnight forest, you find a winged creature tangled in an iron snare set by royal hunters. Freeing it will cut your hands on the rusted teeth, and the creature will vanish into the night without ever thanking you—nor will any human soul ever know what you did.',
    choices: [
      {
        text: 'Pry open the iron teeth with my bare hands immediately. A caged soul must be freed, no matter the cost to me.',
        scores: { bear: 3, bat: 3, mink: 2, wolf: 2 }
      },
      {
        text: 'Wrap my cloak gently around its wings so it doesn’t hurt itself, then carefully unpick the mechanism in silence.',
        scores: { owl: 3, lynx: 3, fox: 2, raven: 3 }
      },
      {
        text: 'Hum softly to calm its racing heart while I dig into the wet earth beneath the stake to free it without bloodshed.',
        scores: { frog: 3, porpoise: 3, rabbit: 3, seal: 2 }
      },
      {
        text: 'Leave it in the iron snare—or claim the royal hunter’s bounty for myself.',
        scores: {},
        wyvern: 1
      }
    ]
  },
  {
    title: 'VIII · The Final Dawn Before Humanhood',
    scenario: 'According to the old faith of Naturalis, your time as a creature of earth, sky, and water is ending; at dawn, your soul will awaken for the first time in a human body. You are granted one final night in your animal form. How do you spend it?',
    choices: [
      {
        text: 'Curled closely beside the ones I love, breathing in their warmth so my soul will recognize them when we meet again as humans.',
        scores: { wolf: 3, swan: 3, otter: 2, reindeer: 2, bear: 2 }
      },
      {
        text: 'Perched high on a windswept crag or gliding through the night sky alone, drinking in the wild solitude humans so easily forget.',
        scores: { lynx: 3, bat: 3, owl: 2, raven: 3, hugorm: 2 }
      },
      {
        text: 'Diving through moonlit waves and racing beneath the trees—celebrating the sheer joy of motion, water, and wind.',
        scores: { porpoise: 3, seal: 3, mink: 3, squirrel: 2, frog: 3, fox: 2, rabbit: 2 }
      },
      {
        text: 'Hunting from the storm clouds above, making the world below tremble at my shadow one last time.',
        scores: {},
        wyvern: 1
      }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('naturalis-quiz-banner');
  const startBtn = document.getElementById('start-naturalis-quiz');
  if (!banner || !startBtn) return;

  const initialHTML = banner.innerHTML;
  let currentStep = 0;
  let scores = {};
  let wyvernCount = 0;

  function resetScores() {
    currentStep = 0;
    wyvernCount = 0;
    scores = {};
    Object.keys(NATURALIS_ANIMALS).forEach(k => {
      if (k !== 'wyvern') scores[k] = 0;
    });
  }

  function renderQuestion() {
    const q = QUIZ_QUESTIONS[currentStep];
    const progressPct = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);
    const letters = ['A', 'B', 'C', 'D'];

    const choicesHTML = q.choices.map((c, idx) => `
      <button type="button" class="quiz-choice-btn" data-choice="${idx}">
        <span class="quiz-choice-letter">${letters[idx]}.</span>
        <span>${c.text}</span>
      </button>
    `).join('');

    banner.innerHTML = `
      <div class="quiz-stage-box">
        <div class="quiz-progress-row">
          <span>The Trial of Naturalis</span>
          <span>Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
        </div>
        <h3 class="quiz-scenario-title">${q.title}</h3>
        <p class="quiz-scenario-text">${q.scenario}</p>
        <div class="quiz-choices-list">
          ${choicesHTML}
        </div>
      </div>
    `;

    banner.querySelectorAll('.quiz-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-choice'));
        const chosen = q.choices[idx];

        if (chosen.wyvern) {
          wyvernCount += chosen.wyvern;
        }
        if (chosen.scores) {
          Object.entries(chosen.scores).forEach(([animal, pts]) => {
            scores[animal] = (scores[animal] || 0) + pts;
          });
        }

        currentStep++;
        if (currentStep < QUIZ_QUESTIONS.length) {
          renderQuestion();
        } else {
          renderResult();
        }
      });
    });
  }

  function renderResult() {
    let resultKey = 'wolf';

    // If the player picked ruthless/selfish options on at least 5 of the 8 questions -> Wyvern!
    if (wyvernCount >= 5) {
      resultKey = 'wyvern';
    } else {
      let maxScore = -1;
      Object.entries(scores).forEach(([animal, pts]) => {
        if (pts > maxScore) {
          maxScore = pts;
          resultKey = animal;
        }
      });
    }

    const animal = NATURALIS_ANIMALS[resultKey];
    const wyvernClass = animal.isWyvern ? 'wyvern-result' : '';

    banner.innerHTML = `
      <div class="quiz-result-card ${wyvernClass}">
        <div class="quiz-result-kicker">✦ The Old Faith of Naturalis Reveals Your Past Soul ✦</div>
        <h2 class="quiz-result-animal">${animal.name}</h2>
        <div class="quiz-result-archetype">${animal.archetype} &middot; <em>${animal.danish}</em></div>
        <p class="quiz-result-desc">${animal.desc}</p>
        <div class="quiz-result-lore">
          <strong>Soul Affinities:</strong> ${animal.traits}<br>
          <span style="font-size: 0.84rem;">In the faith of Naturalis, every human soul has lived at least once as an animal before reaching humanhood—which is why no follower of Naturalis will ever consume the flesh of another living creature, lest they devour the body of a soul they may one day know and love.</span>
        </div>
        <div class="button-group" style="justify-content: center;">
          <button type="button" class="btn-gothic" id="retake-naturalis-quiz">Walk the Path Again (Retake)</button>
          <a href="bonus.html" class="btn-gothic outline">&larr; Back to Bonus Content &amp; Shop</a>
        </div>
      </div>
    `;

    document.getElementById('retake-naturalis-quiz').addEventListener('click', () => {
      resetScores();
      renderQuestion();
    });
  }

  startBtn.addEventListener('click', () => {
    resetScores();
    renderQuestion();
  });
});
