//Display Game Title
//Game uses Clicks. Want to modify to use clicks and keyboard
document.getElementById("CompleteThisQuotation").innerHTML = "Complete This Quote";

//virtual keyboard (data-keyboard) from HTML assigned to variable, keyboard. 
// this allows user to make changes to the keyboard
keyboard = document.querySelector("[data-keyboard]");

//create const game object with properties cur,solution, & puzz
const game = { cur: "", solution: "", puzz: [] };

//select page elements & assign them variables for easier access in js code
const puzzle = document.querySelector(".puzzle");

let resolveNextIteration; //variable to store the resolve function of the Promise

// Function to create a Promise that resolves on button click
function waitForButtonClick() { //this function returns a Promise. The resolve function of this...
  // ...Promise is stored in the variable: resolveNextIterartion (declared above)
  //console.log("In waitForButtonClick Function");
  return new Promise(resolve => {
    resolveNextIteration = resolve; // Store the resolve function
  });
}

// Event listener for the button click. When nextIterationBtn is clicked, it...
nextIterationBtn.addEventListener('click', () => {
  //console.log("In nextIterationBtn clicked");

  //remove intro box element styled by CSS
  const elementToRemove = document.querySelector('.my-box');
  if (elementToRemove) {
    elementToRemove.remove();
  }
  if (resolveNextIteration) { //...checks if there resolveNextIteration exists. If it does, it calls resolveNextIteration()...
    resolveNextIteration(); // ...which resolves the Promise when the button is clicked
    resolveNextIteration = null; // Reset the resolver
  }
});

const arrayOfQuotes = [

  "A. A. Milne (1882 - 1956) English writer, author of Winnie-the-Pooh###Bores can be divided into two classes;<br>those who have their own particular subject,<br>and those who do not need a %subject$.",
"A. A. Milne (1882 - 1956) English writer, author of Winnie-the-Pooh###One of the advantages of being disorderly<br>is that one is constantly making exciting %discoveries$.",

"Possibly Abby Buchanan Longstreet (1834-1899) American writer and socialite###I would challenge you to a %battle$ of wits,<br> but I see you are unarmed.",

"Abigail Van Buren (1918-2013) American advice columnist###A bad habit never disappears miraculously;<br>it's an %undo$-it-yourself project.",
"Abigail Van Buren (1918-2013) American advice columnist###The less you talk, the more you're %listened$ to.",
"Abigail Van Buren (1918-2013) American advice columnist###If you want children to keep their feet on the<br>ground, put some responsibility on their %shoulders$.",
"Abigail Van Buren (1918-2013) American advice columnist###If you want your children to turn out well,<br>spend twice as much time with them, and %half$ as much money.",
"Abigail Van Buren (1918-2013) American advice columnist###While forbidden fruit is said to taste sweeter, it usually spoils %faster$.",
"Abigail Van Buren (1918-2013) American advice columnist###If we could sell our experiences for what they %cost$ us, we'd all be millionaires.",
"Abigail Van Buren (1918-2013) American advice columnist###True, a little learning is a dangerous thing,<br>but it still beats total %ignorance$.",

"Abraham Lincoln (1809-1865) American President###Do I not destroy my %enemies$ when I make them my friends?",
"Widely attributed to Abraham Lincoln (1809-1865) American President###Tact: the ability to describe others as they %see$ themselves.",
"Abraham Lincoln (1809-1865) American President###It has been my experience that folks who have no %vices$ have very few virtues.",
"Abraham Lincoln (1809-1865) American President###It's not the years in your life that %count$. It's the life in your years.",
"Abraham Lincoln (1809-1865) American President###The best thing about the %future$ is that it comes one day at a time.",

"Abraham Maslow (1908-1970) American psychologist###If the only tool you have is a hammer,<br>every %problem$ looks like a nail.",

"Adam Phillips (Born 1954) British psychoanalytic psychotherapist###No amount of 'evidence' or research<br>will convince the unamused that a joke is %funny$.",
"Adam Phillips (Born 1954) British psychoanalytic psychotherapist###Not knowing for certain what the %good$ life is,<br>we settle for the enviable life.",

"Adlai E. Stevenson (1900-1965) American politician###Newspaper editors are men who separate the<br>wheat from the chaff, and then %print$ the chaff.",
"Adlai E. Stevenson (1900-1965) American politician###He who slings %mud$ generally loses ground.",
"Aeschylus (525-456 BCE) Greek poet###Of prosperity, mortals can never %have$ enough.",

"Aesop (c. 620-560 BCE) Greek fabulist###We hang the petty thieves and appoint the %great$ ones to public office.",
"Aesop (c. 620-560 BCE) Greek fabulist###Self-conceit may %lead$ to self-destruction.",
"Aesop (c. 620-560 BCE) Greek fabulist###People often grudge %others$ what they cannot enjoy themselves.",
"Aesop (c. 620-560 BCE) Greek fabulist###The injuries we %do$ and those we suffer are rarely weighed in the same scales.",
"Aesop (c. 620-560 BCE) Greek fabulist###It is not only fine feathers that make fine %birds$.",
"Aesop (c. 620-560 BCE) Greek fabulist###Please %all$ and you will please none.",
"Aesop (c. 620-560 BCE) Greek fabulist###Outside show is a poor substitute for %inner$ worth.",

"Albert Camus (19-13-1960) French writer and philosopher###There is no sun without %shadow$, and it is essential to know the night.",

"Albert Einstein (1879-1955) German-born American theoretical physicist###If you can't explain it simply, you don't %understand$ it well enough.",
"Albert Einstein (1879-1955) German-born American theoretical physicist###Logic will get you from A to B. %Imagination$ will take you everywhere.",
"Albert Einstein (1879-1955) German-born American theoretical physicist###In the middle of difficulty %lies$ opportunity.",
"Albert Einstein (1879-1955) German-born American theoretical physicist### The more I learn, the more I realize how much I don't %know$.",
"Albert Einstein (1879-1955) German-born American theoretical physicist###It's not that I'm so %smart$. It's that I stay with problems longer.",
"Wildly attributed to Albert Einstein (1879-1955) German-born American theoretical physicist###Only two things are infinite, the universe and<br>human stupidity, and I'm not sure about the %former$.",

"Albert Szent-Gyorgyi (1893-1986) Hungarian Nobel prize winner in physiology and medicine###Life is nothing but an electron %looking$ for a place to rest.",

"Alexander Pope (1688-1744) English poet###The learned is happy, nature to explore<br>The fool is happy that he knows no %more$.",
"Alexander Pope (1688-1744) English poet###Satan is wiser now than before<br>And tempts by making rich instead of %poor$.",
"Alexander Pope (1688-1744) English poet###The ruling passion, be it what it will.<br>The ruling passion conquers %reason$ still.",  
"Alexander Pope (1688-1744) English poet###A %little$ learning is a dangerous thing<br>Drink deep, or taste not the Pierian spring.",
"Alexander Pope (1688-1744) English poet###Praise undeserved is satire in %disguise$.",
"Alexander Pope (1688-1744) English poet###To be angry is to revenge the faults of others on %ourselves$.",
"Alexander Pope (1688–1744) English poet###Blessed is he who expects nothing, for he shall %never$ be disappointed.<br><br>{letter to John Gay in 1727}",
"Alexander Pope (1688-1744) English poet###They dream in courtship, but in wedlock %wake$.",

"Alfred E. Neuman () Mascot of MAD Magazine###Genius is rarely recognized in its lifetime,<br>but fortunately, neither is gross %incompetence$.",
"Alfred E. Neuman () Mascot of MAD Magazine###The most troublesome side effect of many prescription drugs is<br>that they make you feel %well$ enough to go back to work.",
"Alfred E. Neuman () Mascot of MAD Magazine###Starting a war in the name of peace is like<br>poking a hole in a balloon to get more %air$ into it.",
"Alfred E. Neuman () Mascot of MAD Magazine###Why is it that when someone's fighting to get in the %last$ word it's never 'Sorry'?",
"Alfred E. Neuman () Mascot of MAD Magazine###Whoever said fighting never solves anything obviously never %won$ a fight.",
"Alfred E. Neuman () Mascot of MAD Magazine###Youth is like money. It's only after it's gone<br>that you finally realize how you should have %spent$ it.",
"Alfred E. Neuman () Mascot of MAD Magazine###Parents are the ones who %never$ listen to a word you say<br>until you mutter something under your breath.",
"Alfred E. Neuman () Mascot of MAD Magazine###A %judge$ is nothing more than a lawyer who's been benched.",

"Alfred N. Whitehead (1861-1947) English mathematician and philosopher###If a dog jumps into your lap, it is because he is fond of you;<br>but if a %cat$ does the same thing, it is because your lap is warmer.",
"Alfred N. Whitehead (1861-1947) English mathematician and philosopher###We think in generalities, but we live in %detail$.",

"Alice Roosevelt Longworth (1884-1980) American writer and socialite###You can't make a soufflé %rise$ twice.",
"Alice Roosevelt Longworth (1884-1980) American writer and socialite###If you %haven't$ got anything nice to say about anybody,<br>come sit next to me.",

"Alphonse Daudet (1840-1897) French writer###Pain is always %new$ to the sufferer,<br>but loses its originality for those around him.",

"Anais Nin (1903-1977) American author###We don't see things as they are, we see them as %we$ are.",

"Anita Brookner (1928-2016) English author###In real life, it is the hare who %wins$. Every time. Look around you.<br><br>{Hotel du Lac}",

"Ann Landers (1918-2002) American advice columnist###No one can take advantage of you without your %permission$.",
"Ann Landers (1918-2002) American advice columnist###People who drink to drown their sorrows<br>should be told that sorrow knows how to %swim$.",

"Anna Freud (1895-1982) Austrian psychoanalyst###In our dreams we can have our eggs cooked exactly<br>how we want them, but we %can't$ eat them.",

"Annie Dillard (Born 1945) American author###How we spend our days is of course how we spend our %lives$.",

"Anne Frank (1929-1945) German diarist and Holocaust victim###You can always %give$ something, even if it is only kindness.",

"Anthony Trollope (1815-1882) English author###No man thinks there is much ado about nothing<br>when the ado is about %himself$.",
"Anthony Trollope (1815-1882) English Victorian novelist###Poverty, to be picturesque, should be %rural$.<br>Suburban misery is as hideous as it is pitiable.",

"Anton Chekov (1860-1904) Russian physician and author###You will not become a saint through other people's %sins$.",
"Aristotle (384-322 BCE) Greek philosopher###Dignity does not consist in possessing honors but in %deserving$ them.",
"Aristotle (384-322 BCE) Greek philosopher###Well begun is half %done$.",

"Arthur Bloch (Born 1948) American author of Murphy's Law Books###Every solution breeds new %problems$.<br><br>{Murphy's Law}",

"Arthur Henry Reginald Buller (1874-1944) British-Canadian mycologist###There was a young lady named Bright;<br>Whose speed was far faster than light;<br> She set out one day<br>In a relative way,<br>And returned home the previous %night$.",

"Attributed to several sources###It is better to remain silent and be thought <br>a %fool$, than to speak out and remove all doubt.",
"Attribution Unknown###Jokes don't lie. They're either funny or they're not %true$.",
"Attribution unknown###Tell me your honest opinion, is seldom an %honest$ request.",
"Attribution Unknown###%Everybody$ wants fairness, but nobody knows quite what it is.",

"Barry Switzer (Born 1937) American football coach###Some people are born on %third$ base<br>and go through life thinking they hit a triple.",
"Bart Simpson () Animated sitcom character###Dad, thanks to TV, I can't %remember$<br>what happened eight minutes ago.",
"Baruch Spinoza (1632-1677) Dutch philosopher###When a man is a prey to his emotions, he is not his own %master$.",

"Ben Shapiro (Born 1984) American commentator###Facts don't %care$ about your feelings.",  

"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###We must hang together gentlemen;<br>else we shall most assuredly %hang$ separately.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###I didn't %fail$ the test. I just found 100 ways to do it wrong.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###To succeed, %jump$ as quickly at opportunities as you do at conclusions.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###Wise men don't need advice; %fools$ don't take it.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###Money never made a man happy yet, nor will it.<br>The more a man has, the more he wants.<br>Instead of %filling$ a vacuum, it makes one.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###%Lost$ time is never found again.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###Three may keep a secret if %two$ of them are dead.<br><br>{Poor Richard's Almanack}",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###Half the truth is often a great %lie$.",
"Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###Life's tragedy is that we get old too soon and wise too %late$.",
"Commonly attributed to Benjamin Franklin (1706-1790) American statesman, diplomat, and scientist###If you fail to plan, you are %planning$ to fail.",

"Bertrand Russell (1872-1970) British philosopher###The whole problem with the world is that fools and fanatics<br>are always so certain of themselves, and wiser people so full of %doubts$.",

"Bessel van der Kolk (Born 1948) Dutch psychiatrist###Blaming is a universal human trait<br>that helps people feel good while feeling %bad$.",
"Bessel van der Kolk (Born 1948) Dutch psychiatrist###Traumatized people simultaneously remember too little and too %much$.",

"Bette Davis (1908-1989) American actress###%Old$ age ain't no place for sissies.",

"Bette Midler (Born 1945) American actress###After thirty, a body has a %mind$ of its own.",

"Bil Keane (1922-2011) American cartoonist###Yesterday's the past, tomorrow's the future,<br>but today is a gift.<br>That's why it's called the %present$.",

"Blaise Pascal (1623-1662) French philosopher###If everyone %knew$ what others said about him,<br>there would not be four friends in the world.",
"Blaise Pascal (1623-1662) French philosopher###Little things console us %because$ little things afflict us.",
"Blaise Pascal (1623-1662) French philosopher###The only shame is to have %none$.",
"Blaise Pascal (1623-1662) French philosopher###Do you wish people to think well of you?<br>Don't speak %well$ of yourself.",
"Blaise Pascal (1623-1662) French philosopher###Too much and too little wine.<br>Give him none, he %cannot$ find truth;<br>give him too much, the same.<br><br>{Pensees}",

"Booker T. Washington (1856-1915) American author###A lie doesn't become truth, wrong doesn't become right<br>and evil doesn't become good just because it's accepted by a %majority$.",
"Brant Hansen (?) Radio host###If you met a jerk in the morning, you met a jerk.<br>If you meet jerks all day, %you$ are the jerk.",

"Brian Goldstone (Born 1980) American journalist###Wealth isn't %trickling$ down; it's pooled at the top.",

"Brene Brown (Born 1965) American professor and social worker###The stories we tell ourselves are powerful things.<br>Sometimes we tell the same story over and over,<br>ensuring the ink will %never$ dry.",

"Buddha (c. 563-483 BCE) Founder of Buddhism###To understand everything is to %forgive$ everything.",
"Buddha (c. 563-483 BCE) Founder of Buddhism### The mind is everything. What you %think$ you become. ",

"C. S. Lewis (1898-1963) Irish novelist and poet###This is one of the miracles of love. It gives a power of %seeing$ through<br>its own enchantments and yet not being disenchanted.",
"C. S. Lewis (1898-1963) Irish novelist and poet###Humility is not thinking %less$ of yourself,<br>it's thinking of yourself less.",

"Cardinal Richelieu (1585-1642) French clergy and statesman###If you give me six lines written by the hand of the most %honest$ of men,<br>I will find something in them which will hang him.",

"Carl Jung (1875-1961) Swiss psychologist###Knowing your own darkness is the best<br>method for dealing with the darkness of other %people$.",
"Often attributed to Carl Jung (1875-1961) Swiss psychiatrist###One advertises oneself in all sorts of unconscious<br>ways; %others$ are alert to the signals.",

"Carl von Clausewitz (1780-1831) Prussian army officer###War is a mere continuation of %politics$ by other means.<br><br>{On War}",

"Carolyn Hax (Born 1966) American advice columnist###If you're unwilling to question whether you're wrong,<br>then there's little chance you'll be %right$.",

"Cato the Elder (234-149 BCE) Roman statesman###An angry man %opens$ his mouth and shuts his eyes.",

"Charles Bukowski (1920-1994) Prussian-born American poet###People empty me. I have to get away to %refill$.",
"Charles Bukowski (1920-1994) Prussian-born American poet###I don't like jail; they got the %wrong$ kind of bars in there.",
"Charles Bukowski (1920-1994) Prussian-born American poet###Real loneliness is not necessarily limited to when you are %alone$.",
"Charles Bukowski (1920-1994) Prussian-born American poet###If you're losing your soul and you %know$ it,<br>then you've still got a soul left to lose.",

"Charles Churchill (1732-1764) English poet###A joke is a very %serious$ thing.",
"Charles Churchill (1732-1764) English poet###The best things carried to excess are %wrong$.",

"Charles Darwin (1809-1882) English evolutionary biologist###Ignorance more frequently begets confidence than does %knowledge$.",

"Popularly attributed to Charles de Gaulle (1890-1970) French Prime Minister and General###The graveyards are full of %indispensable$ men.",

"Charles Dickens (1812-1870) English writer and social critic###The civility which %money$ will purchase is rarely extended to those who have none.",
"Charles Dickens (1812-1870) English writer and social critic###No one is %useless$ in this world who lightens the burdens of another.",

"Communist East German joke###There are people who tell jokes.<br>There are people who collect jokes and tell jokes.<br>And there are people who collect %people$ who tell jokes.",
"Attribution unknown###Choose a job you love, and you will never have to %work$ a day in your life.",
"Confucius (551-497 BCE) Chinese philosopher###Our greatest glory is not in never falling, but in %rising$ every time we fall.",
"Confucius (551-497 BCE) Chinese philosopher###A man is great not because he hasn't failed;<br>a man is great because %failure$ hasn't stopped him.",

"Corrie ten Boom (1892-1983) Dutch writer###Worry does not empty tomorrow of its sorrow,<br>it empties %today$ of its strength.",

"Cosimo de' Medici (1389-1464) First of the Medici political dynasty###There is in gardens a plant which one ought to leave dry,<br>although most people %water$ it.<br>It is the weed called envy.",
"Cosimo de' Medici (1389-1464) First of the Medici political dynasty###We read that we ought to forgive our enemies;<br>but we do not read that we ought to forgive our %friends$.",

"Dalai Lama (Born 1935) Tibetan spiritual leader###Remember that %not$ getting what you want is sometimes a wonderful stroke of luck.",
"Dalai Lama (Born 1935) Tibetan spiritual leader###Love and compassion are %necessities$, not luxuries.<br>Without them humanity cannot survive.",

"Daniel Boone (1734-1820) American explorer###I have never been lost, but I will<br>admit to being %confused$ for several weeks.",

"Daniel J. Boorstin (1914-2004) American historian###The greatest obstacle to discovery is not %ignorance$;<br>it is the illusion of knowledge.",

"Daniel Kahneman (1934-2024) Israeli-American economist###Money does not buy you happiness,<br>but lack of money certainly buys you %misery$.",

"Daniel Patrick Moynihan (1927-2003) American politician###Everyone is entitled to his own opinion, but not his own %facts$.",

"David Austin French (Born 1969) American political commentator###Misdirected zeal in a %righteous$ cause can create profound injustice.",

"Davy Crockett (1786-1836) American explorer, folk hero, and politician###I would rather be politically %dead$<br>than hypocritically immortalized.",

"Demitri Martin (Born 1973) American comedian###A know-it-all is a person who knows<br>everything %except$ for how annoying he is.",

"Dennis and Wendy Mannering () American co-pastors###Attitudes are contagious. Are yours worth %catching$?",

"Dolly Parton (Born 1946) American singer###If you don't like the %road$ you're walking, start paving another one.",
"Dolly Parton (Born 1946) American singer###It takes a lot of time and %money$ to look this cheap!",

"Donald O. Hebb (1904-1985) Canadian psychologist###Neurons that %fire$ together, wire together.<br><br>{The Organization of Behavior}",

"Dorothy Rothschild Parker (1893-1967) American humorist and writer###Four be the things I'd have been better without:<br>Love, curiosity, freckles and %doubt$.",
"Dorothy Rothschild Parker (1893-1967) American humorist and writer###I'd rather have a bottle in front of me,<br>than a frontal %lobotomy$.",
"Dorothy Rothschild Parker (1893-1967) American humorist and writer###You can't teach an old %dogma$ new tricks.",
"Dorothy Rothschild Parker (1893-1967) American humorist and writer###Men seldom make passes<br>at girls who wear %glasses$.",

"Douglas Adams (1952-2001) English author### A common mistake that people make when trying<br>to design something completely %foolproof$ is<br>to underestimate the ingenuity of complete fools.",

"E. B. White (1899-1985) American writer###Prejudice is a great time saver.<br>You can form %opinions$ without having to get the facts.",

"e. e. cummings (1894-1962) American poet###To %destroy$ is always the first step in any creation.",

"E. F. Schumacher (1911-1977) English economist###Many people love in themselves what they %hate$ in others.",

"E. O. Wilson (1929-2021) American sociobiologist###The real problem of humanity is as follows:<br>we have %paleolithic$ emotions, medieval institutions,<br>and god-like technology.",

"Ecclesiastes, 1:4###Men go and come, but earth %abides$.",

"Edward Abbey (1927-1989) American writer and advocate of the environment###If my decomposing carcass helps nourish the roots of a juniper tree<br>or the wings of a vulture - that is %immortality$ enough for me.",
"Edward Abbey (1927-1989) American writer and advocate of the environment###You can't study the darkness by flooding it with %light$.",
"Edward Abbey (1927-1989) American advocate of environmental issues###Growth for the sake of growth is the philosophy of the cancer %cell$.",

"Edward Gibbon (1737-1794) English historian###I %never$ make the mistake of arguing with people<br>for whose opinions I have no respect.",

"Elbert Hubbard (1856-1915) American writer###To %avoid$ criticism, do nothing, say nothing, and be nothing.",

"Eleanor Roosevelt (1884-1962) American First Lady and political and human rights activist###Nobody can make you feel inferior %without$ your consent.",
"Eleanor Roosevelt (1884-1962) American First Lady and political and human rights activist### You must learn from the %mistakes$ of others.<br>You can't possibly live long enough to make them all yourself.",

"Elie Wiesel (1928-2016) Romanian-born American writer, Holocaust survivor, and Nobel Laureate###The opposite of love is not hate, it's %indifference$.",

"English Proverb###Don't %dig$ your own grave with your own knife and fork.",
"English Proverb###Advice is least heeded when %most$ needed.",
  
"Epictetus (circa 50-135 CE) Greek stoic philosopher ###You become what you give your %attention$ to.<br>If you don't choose what thoughts and images<br>you expose yourself to, someone else will.",

"Epicurus (341-271 BCE) Greek philosopher###Not what we %have$ but what we enjoy, constitutes our abundance.",

"Eric Hoffer (1902-1983) American philosopher###It is by its promise of a sense of %power$ that evil often attracts the weak.",
"Eric Hoffer (1902-1983) American philosopher###Rudeness is a %weak$ imitation of strength.",
"Eric Hoffer (1902-1983) American philosopher###When we believe ourselves in possession of the only truth,<br>we are likely to be indifferent to common everyday %truths$.",
"Eric Hoffer (1902-1983) American philosopher###Our frustration is greater when we have much and<br>want %more$ than when we have nothing and want some.",
"Eric Hoffer (1902-1983) American philosopher###Propaganda does not deceive people;<br>it merely helps them to %deceive$ themselves.",
"Eric Hoffer (1902-1983) American philosopher###Every great cause begins as a movement, becomes<br>a business, and eventually degenerates into a %racket$.",
"Eric Hoffer (1902-1983) American philosopher###The most dangerous people in a society are not the %poor$<br>and desperate but the well-off and bored.",
"Eric Hoffer (1902-1983) American philosopher###We lie loudest when we lie to %ourselves$.",
"Eric Hoffer (1902-1983) American philosopher###We all have private ails. The troublemakers are they<br>who need %public$ cures for their private ails.",
"Eric Hoffer (1902-1983) American philosopher###People who bite the hand that feeds them<br>usually %lick$ the boot that kicks them.",
"Eric Hoffer (1902-1983) American philosopher###The search for %happiness$ is one of the chief sources of unhappiness.",
"Eric Hoffer (1902-1983) American philosopher###We can be absolutely %certain$ only about things we do not understand.",
"Eric Hoffer (1902-1983) American philosopher###When people are bored it is primarily with %themselves$.",
"Eric Hoffer (1902-1983) American philosopher###The less justified a man is in claiming excellence for his own self,<br>the more %ready$ is he to claim all excellence for his nation,<br>his religion, his race or his holy cause.",
"Eric Hoffer (1902-1983) American philosopher###Every great cause begins as a movement, becomes<br>a business, and eventually degenerates into a %racket$.",

"Ernest Hemingway (1899-1961) American novelist###The world breaks everyone, and afterward,<br>many are strong at the %broken$ places.",
"Ernest Hemingway (1899-1961) American novelist###Write drunk. Edit %sober$.",
"Ernest Hemingway (1899-1961) American novelist###The best way to find out if you can trust somebody is to %trust$ them.",
"Ernest Hemingway (1899-1961) American novelist###There is nothing noble in being superior to your fellow men.<br>True nobility lies in being superior to your former %self$.",

"Ernest John Pickstone Benn (1875-1954) British political publicist###Politics is the art of looking for trouble,<br>finding it everywhere,<br>diagnosing it %wrongly$ and applying unsuitable remedies.",

"Ernie Banks (1931-2015) American baseball player###The only way to %prove$ that you're a<br>good sport is to lose.",

"Euripides (484-406 BCE) Greek dramatist###Talk sense to a %fool$ and he calls you foolish.",
"Euripides (484-406 BCE) Greek dramatist###Waste not %fresh$ tears over old griefs.",
"Euripides (484-406 BCE) Greek dramatist###Short is the %joy$ that guilty pleasure brings.",
"Euripides (484-406 BCE) Greek dramatist###Cleverness is %not$ wisdom.",

"Exact origin is debated###Resentment is like taking poison and waiting for others to %die$.",

"F. Scott Fitzgerald (1896-1940) American writer###First you take a drink, then the drink takes a drink,<br>then the drink takes %you$.",

"Finnish Proverb### Happiness is the place %between$ too much and too little.",

"Francois de La Rochefoucauld (1613-1680) French writer###Few people have the wisdom to prefer the %criticism$<br>that would do them good, to the praise that deceives them.",
"Francois de La Rochefoucauld (1613-1680) French writer###It is often laziness and timidity that keep<br>us within our duty while virtue gets all the %credit$.",
"Francois de La Rochefoucauld (1613-1680) French writer###People always complain about their memories, never about their %minds$.",
"Francois de La Rochefoucauld (1613-1680) French writer###There is no %disguise$ which can hide love for long<br>where it exists, or simulate it where it does not.",
"Francois de La Rochefoucauld (1613-1680) French writer###It is easier to know men in %general$ than men in particular.",
"Francois de La Rochefoucauld (1613-1680) French writer###We seldom find any person of %good$ sense,<br>except those who share our opinions.",
"Francois de La Rochefoucauld (1613-1680) French writer###Passion makes idiots of the cleverest men,<br>and makes the biggest %idiots$ clever.",
"Francois de La Rochefoucauld (1613-1680) French writer###The heart is forever %making$ the head its fool.",
"Francois de La Rochefoucauld (1613-1680) French writer###It is easier to be wise for %others$ than for ourselves.",
"Francois de La Rochefoucauld (1613-1680) French writer###Hypocrisy is the homage vice pays to %virtue$.",
"Francois de La Rochefoucauld (1613-1680) French writer###Nothing %prevents$ one from appearing<br>natural as the desire to appear natural.",
"Francois de La Rochefoucauld (1613-1680) French writer###One is %never$ fortunate or as unfortunate as one imagines.",
"Francois de La Rochefoucauld (1613-1680) French writer###We confess our little faults to persuade people that we have no %large$ ones.",
"Francois de La Rochefoucauld (1613-1680) French writer###No man deserves to be praised for his %goodness$,<br>who has it not in his power to be wicked.",
"Francois de La Rochefoucauld (1613-1680) French writer###We are so accustomed to disguise ourselves to others,<br>that in the end, we become %disguised$ to ourselves.",
"Francois de La Rochefoucauld (1613-1680) French writer###We should often blush at our noblest deeds if<br>the world were to %see$ all their underlying motives.",
"Francois de La Rochefoucauld (1613-1680) French writer###Hypocrisy is the homage vice pays to %virtue$.",

"Franklin Delano Roosevelt (1882-1945) President of the United States###We must especially beware of that small group of selfish men<br>who would clip the wings of the American eagle<br>in order to %feather$ their own nests.",

"Franklin Leonard () American film executive###When you're accustomed to privilege, %equality$ feels like oppression.",

"Franklin P. Jones (1908-1980) American journalist###Experience is a wonderful thing that enables<br>you to recognize a mistake when you %make$ it again.",

"Friedrich Nietzsche (1844-1900) German philosopher###Love is blind; friendship %closes$ its eyes.",
"Friedrich Nietzsche (1844-1900) German philosopher###Those who cannot understand how to put their thoughts<br>on %ice$ should not enter into the heat of debate.",
"Friedrich Nietzsche (1844-1900) German philosopher###Whoever fights monsters should see to it that<br>in the process he does not %become$ a monster.<br><br>{Beyond Good and Evil}",
"Friedrich Nietzsche (1844-1900) German philosopher###And those who were seen dancing were thought<br>to be insane by those who could not hear the %music$.",
"Friedrich Nietzsche (1844-1900) German philosopher###That which does not %kill$ me makes me stronger.<br><br>{Twilight of the Idols}",
"Friedrich Nietzsche (1844-1900) German philosopher###I was in darkness, but I took three steps and<br>found myself in %paradise$. The first step was a good thought,<br>the second, a good word; and the third, a good deed.",
"Friedrich Nietzsche (1844-1900) German philosopher###Enjoy life. This is not a %dress$ rehearsal.",
"Friedrich Nietzsche (1844-1900) German philosopher###To talk much about oneself may also be a means of %concealing$ oneself.",
"Friedrich Nietzsche (1844-1900) German philosopher###One loves ultimately one's desires, %not$ the thing desired.",
"Friedrich Nietzsche (1844-1900) German philosopher###The vanity of others is only counter to our taste when it is counter to our %vanity$.",
"Friedrich Nietzsche (1844-1900) German philosopher###For if we think of %genius$ as something magical,<br>we are not obliged to compare ourselves and find ourselves lacking.",
"Friedrich Nietzsche (1844-1900) German philosopher###He who has a why to live can bear almost any %how$.",


"Fyodor Dostoevsky (1821-1881) Russian novelist and philosopher###Man only likes to count his troubles; he does not calculate his %happiness$.",
"Fyodor Dostoevsky (1821-1881) Russian novelist and philosopher###The cleverest of all, in my opinion, is the man<br>who calls himself a %fool$ at least once a month.",
"Fyodor Dostoevsky (1821-1881) Russian novelist and philosopher###There is no subject so %old$ that something new cannot be said about it.",

"Georg Wilhelm Friedrich Hegel (1770-1831) German philosopher###The only thing we learn from history is that we learn %nothing$ from history.",

"George Bernard Shaw (1856-1950) Irish playwright###When a thing is funny, search it for a %hidden$ truth.",
"George Bernard Shaw (1856-1950) Irish playwright###Beware of the man who does not %return$ your blow:<br>he neither forgives you nor allows you to forgive yourself.",
"George Bernard Shaw (1856-1950) Irish playwright###We learn from experience that men %never$ learn anything from experience.",
"George Bernard Shaw (1856-1950) Irish playwright###The %liar's$ punishment is not in the least that he<br>is not believed, but that he cannot believe anyone else.",
"George Bernard Shaw (1856-1950) Irish playwright###Life isn't about finding yourself; life is about creating %yourself$.",
"George Bernard Shaw (1856-1950) Irish playwright###Both optimists and pessimists contribute to society.<br>The optimist invents the airplane, the pessimist the %parachute$.",
"George Bernard Shaw (1856-1950) Irish playwright###%Marriage$ is an alliance entered into by a man who can't sleep with<br>the window shut, and a woman who can't sleep with the window open.",
"George Bernard Shaw (1856-1950) Irish playwright###A learned man is an idler who %kills$ time by study.",
"George Bernard Shaw (1856-1950) Irish playwright###Democracy substitutes election by the incompetent many<br>for appointment by the corrupt %few$.",
"George Bernard Shaw (1856-1950) Irish playwright###People who say it %cannot$ be done should not interrupt those who are doing it.",
"George Bernard Shaw (1856-1950) Irish playwright###Youth is wasted on the %young$.",
"George Bernard Shaw (1856-1950) Irish playwright###War doesn't decide who is %right$ but who is left.",
"George Bernard Shaw (1856-1950) Irish playwright###Alcohol is the anesthesia by which we endure the %operation$ of life.",
"George Bernard Shaw (1856-1950) Irish playwright###The moment we want to %believe$ something, we suddenly see all<br>the arguments for it, and become blind to the arguments against it.",
"George Bernard Shaw (1856-1950) Irish playwright###I am afraid we must make the world honest before<br>we can %honestly$ say to our children that honesty is the best policy.",
"George Bernard Shaw (1856-1950) Irish playwright###Beware of the man who does not %return$ your blow:<br>he neither forgives you nor allows you to forgive yourself.",
"George Bernard Shaw (1856-1950) Irish playwright###The trouble with her is that she lacks the power<br>of conversation but not the power of %speech$.",
"George Bernard Shaw (1856-1950) Irish playwright###A life spent %making$ mistakes is not only more<br>honorable but more useful than a life spent doing nothing.",
"George Bernard Shaw (1856-1950) Irish playwright###There is always %danger$ for those who are afraid.",
"George Bernard Shaw (1856-1950) Irish playwright###Beware of false %knowledge$. It is more dangerous than ignorance.",


"George Burns (1896-1996) American comedian###It's good to be here. At 98, it's good to be %anywhere$.",
"George Burns (1896-1996) American comedian###The secret of a good sermon is to have a<br>good beginning and a good ending,<br>then having the two as %close$ together as possible.",

"George Eliot (Mary Ann Evans) (1819-1880) British author###Blessed is the man, who having nothing to say,<br>abstains from giving %wordy$ evidence of the fact.",
"George Eliot (Mary Ann Evans) (1819-1880) British author###We hand folks over to God's mercy, and show none %ourselves$.",
"Often attributed to George Eliot (Mary Ann Evans) (1819-1880) British author###It is never too %late$ to be what you might have been.",

"George Orwell (1903-1950) English novelist and journalist###Reality exists in the human %mind$, and nowhere else.<br><br>{1984}",
"George Orwell (1903-1950) English novelist and journalist###He wears a mask, and his face grows to %fit$ it.<br><br>{Shooting an Elephant}",
"George Orwell (1903-1950) English novelist and journalist###All propaganda is lies, even when one is telling the %truth$.",
"George Orwell (1903-1950) English novelist and journalist###War against a foreign country only happens when the<br>moneyed classes think they are going to %profit$ from it.",
"George Orwell (1903-1950) English novelist and journalist###%Free$ speech is my right to say what you don't want to hear.",
"George Orwell (1903-1950) English novelist and journalist###We know that no one ever seizes power with<br>the intention of %relinquishing$ it.<br><br>{1984}",

"Ghanaian Proverb###Wood already touched by %fire$ is not hard to set alight.",

"Gilbert K. Chesterton (1874-1936) English poet###Man seems to be capable of great virtues but not of small virtues;<br>capable of defying his torturer but not of %keeping$ his temper.",

"Giuseppe Tomasi di Lampedusa (1896-1957) Italian writer###If we want things to stay as they are, things will have to %change$.",
"Giuseppe Tomasi di Lampedusa (1896-1957) Italian writer###Love. %Flames$ for a year, ashes for thirty.",

"Greg Schultz (Born 1981) American political advisor###We try so hard to represent everybody, we alienate %everybody$.",

"Groucho Marx (1890-1977) American comedian###Those are my principles, and if you don't like them … well, I have %others$.",

"H.G. Wells (1866-1946) English science fiction writer###No passion in the world is equal to the passion to alter someone %else's$ draft.",
"H.G. Wells (1866-1946) English science fiction writer###What on earth would a man do with himself if something did not %stand$ in his way?",
"H.G. Wells (1866-1946) English science fiction writer###The crisis of today is the joke of %tomorrow$.",

"H.L. Mencken (1880-1956) American writer###When someone says it's not about the money, it's about the %money$.",
"H.L. Mencken (1880-1956) American writer###An idealist is one who, on noticing that roses smell better<br>than a cabbage, concludes that it will also make %better$ soup.",

"Hannah Arendt (1906-1975) German political theorist###The most radical revolutionary will become<br>a %conservative$ the day after the revolution.",

"Paraphrase from Haruki Murakami (Born 1949) Japanese writer###Nobody likes loneliness. But I'm not<br>interested in making %friends$ at any price.<br><br>{Norwegian Wood}",

"Helen Keller (1880-1968) American disability rights activists###I thank God for my %handicaps$, for, through them,<br>I have found myself, my work, and my God.",

"Henry David Thoreau (1817-1862) American philosopher and naturalist###Those whom we can love, we can %hate$; to others we are indifferent.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###How vain it is to sit down to write when you have not %stood$ up to live.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###Men have become the %tools$ of their tools.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###Any fool can make a rule, and any %fool$ will mind it.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###It is %not$ enough to be busy. So are the ants.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###We are always paid for our %suspicion$ by finding what we suspect.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###I took a walk in the woods and came out taller than the %trees$.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###Money is not required to %buy$ one necessity of the soul.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###Every generation laughs at the old fashions,<br>but follows religiously the %new$.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###The squirrel that you kill in jest dies in %earnest$.",
"Henry David Thoreau (1817-1862) American philosopher and naturalist###Truths and roses have %thorns$ about them.",

"Henry Ford (1863-1947) American founder of Ford Motor Company###Don't find %fault$, find a remedy.",
"Henry Ford (1863-1947) American founder of Ford Motor Company###My best friend is the one that brings out the %best$ in me.",
"Henry Ford (1863-1947) American founder of Ford Motor Company###Whether you think you can or you think you can't, you're %right$.",
"Henry Ford (1863-1947) American founder of Ford Motor Company###When everything seems to be going %against$ you,<br>remember that the airplane takes off against the wind, not with it.",

"Henry John Temple (1784-1865) British Prime Minister###Die, my dear doctor? That's the %last$ thing I shall do!",

"Henry Kissinger (1923-2023) American diplomat and political scientist###One of the cardinal maxims of guerrilla war: the guerrilla wins<br>if he does not lose. The %conventional$ army loses if it does not win.",

"Henry Wadsworth Longfellow (1807-1882) American poet###Be still, sad heart! and cease repining;<br>Behind the clouds is the sun still shining;<br>Thy fate is the common fate of all,<br>Into each life some rain must %fall$.",

"Herman Pontzer () American evolutionary anthropologist###If our evolved appetites can push us into a pride of hungry<br>lions for breakfast, how can we keep ourselves out of the %fridge$?",

"Homer Simpson () Animated sitcom character###To alcohol, the cause of and %solution$ to all of life's problems.",

"Honoré de Balzac (1799-1850) French novelist###Laws are spider webs through which<br>the big flies %pass$ and the little ones get caught.",

"Horace (65-8 BCE) Roman poet###A picture is a poem %without$ words.",
"Horace (Quintus Horatius Flaccus) (65-8 BCE) Roman poet###A word once %uttered$ can never be recalled.",
"Horace (65-8 BCE) Roman poet###Seize the day, and put the least possible trust in %tomorrow$.",
"Horace (65-8 BCE) Roman poet###Wisdom is not %wisdom$ when it is derived from books alone.",

"Isaac Goldberg (1887-1938) American journalist###Diplomacy is to do and say<br>The nastiest thing in the %nicest$ way.",

"Widely attributed to Immanuel Kant (1724-1804) German philosopher###Science is organized knowledge. Wisdom is organized %life$.",

"Jack Benny (1894-1974) American entertainer###I don't deserve this award, but I have arthritis, and don't deserve that %either$.",

"James Baldwin (1924-1987) American playwright, poet, social critic###Children have never been very good at %listening$ to<br>their elders, but they have never failed to imitate them.",

"James M. Barrie (1860-1937) British playwright, author of Peter Pan###Nothing is really work unless you'd rather be %doing$ something else.",
"James M. Barrie (1860-1937) British playwright, author of Peter Pan###Those who bring sunshine into the lives<br>of others cannot keep it from %themselves$.",
"James M. Barrie (1860-1937) British playwright, author of Peter Pan###Temper is a %weapon$ that we hold by the blade.",

"James Goldsmith (1933-1997) French-British financier###When you marry your mistress, you create a %job$ vacancy.",

"James Joyce (1882-1941) Irish novelist###Christopher Columbus, as everyone knows, is honored<br>by posterity because he was the %last$ to discover America.",

"James Mattis (Born 1950) American military Officer###No %war$ is over until the enemy says it's over.",

"James Thurber (1894-1961) American author and cartoonist###Why do you have to be a nonconformist like %everybody$ else?",
"James Thurber (1894-1961) American author and cartoonist###One martini is all right. Two are too many, and three are %not$ enough.",
"James Thurber (1894-1961) American author and cartoonist###There are two kinds of light -<br>the glow that illuminates, and the %glare$ that obscures.",

"Jane Goodall (1934-2025) English primatologist###Humans are very clever apes. But seldom are they %wise$.",

"Jean Anthelme Brillat-Savarin (1755-1826) French lawyer and food enthusiast###Tell me what you eat, and I shall tell you what you %are$.<br><br>{The Physiology of Taste}",

"Jean Babtiste Poquelin aka Moliere (1622-1673) French playwright### It infuriates me to be wrong when I know I'm %right$.",
"Jean Babtiste Poquelin aka Moliere (1622-1673) French playwright###The duty of comedy is to correct men by %amusing$ them.",

"Jean Cocteau (1889-1963) French Poet, Artist, Filmmaker###The reward of art is not fame or success but intoxication.<br>That is why so many bad artists are %unable$ to give it up.",

"Jean Giraudoux (1882-1944) French playwright###The secret of success is sincerity. Once you can %fake$ that you've got it made.",

"Jean-Paul Sartre (1905-1980) French existential philosopher###When the rich wage war, it's the %poor$ who die.",
"Jean-Paul Sartre (1905-1980) French existential philosopher###Everything has been figured out, except %how$ to live.",

"Joan Crawford (1906-1977) American film star###Love is a %fire$.<br>But whether it is going to warm your<br>hearth or burn down your house, you can never tell.",

"Johann Gottfried von Herder (1744-1803) German philosopher###Those that embrace the entire %universe$ with love,<br>for the most part, love nothing but their narrow selves.",
"Johann Gottfried von Herder (1744-1803) Prussian philosopher###Touch not the flute when drums are sounding around;<br>when fools have the word, the %wise$ will be silent.",

"Johann Wolfgang von Goethe (1749-1832) German playwright and statesman###Many people take no care of their money till they come nearly<br>to the end of it, and others do just the %same$ with their time.",
"Johann Wolfgang von Goethe (1749-1832) German playwright and statesman###The coward only threatens when he is %safe$.",
"Johann Wolfgang von Goethe (1749-1832) German playwright and statesman###An unused %life$ is an early death.",
"Johann Wolfgang von Goethe (1749-1832) German playwright and statesman###To spend on one side, nature is forced to %economize$ on the other side.",

"John Allen Saunders (1899-1986) American journalist and cartoonist### Life is what happens to us while we are %making$ other plans.",

"John Burroughs (1837-1921) American naturalist###The smallest deed is better than the %greatest$ intention.",

"John Dalberg-Acton, 1st Baron (1834-1902) English Historian###Power tends to corrupt and %absolute$ power corrupts absolutely.",

"John Dryden (1631-1700) English poet###Confidence is the feeling we have before %knowing$ all the facts.",

"John Fitzgerald Kennedy (1917-1963) President of the United States###Too often we enjoy the comfort<br>of opinion without the %discomfort$ of thought.",

"John Galsworthy (1867-1933) British novelist, playwright, and Nobel Laureate###Idealism increases in direct proportion to one's %distance$ from the problem.",

"John Maynard Keynes (1883-1946) English economist###Capitalism is the extraordinary belief that the nastiest of men,<br>for the nastiest of reasons, will somehow work for the %benefit$ of us all.",

"John Milton (1608-1674) English poet and scholar###The mind is its own place, and in %itself$ <br> can make a heaven of hell, a hell of heaven.<br><br>{Paradise Lost}",

"John Neal (1731-1800) American writer and activist###A certain amount of %opposition$ is a great help to a man.<br>Kites rise against, not with, the wind.",

"John Rawls (1921-2002) American moral philosopher###The fairest rules are those to which everyone would<br> %agree$ if they did not know how much power they would have.",

"John Stuart Mill (1806-1873) English philosopher###He who knows only his own side of the case, knows %little$ of that.",
"John Stuart Mill (1806-1873) English philosopher###Tis better to be Socrates %dissatisfied$ than a fool satisfied.",

"John Wilmont (1647-1680) English courtier and poet###Here lies our sovereign lord the King,<br>Whose promise none relies on;<br>He never said a foolish thing,<br>Nor ever did a %wise$ one.",

"John Wooden (1910-2010) American basketball coach###It's what you learn after you know it %all$ that counts.",
"John Wooden (1910-2010) American basketball coach###Time spent getting even would be better %spent$ getting ahead.",
"John Wooden (1910-2010) American basketball coach###Talent is God-given. Be humble. Fame is man-given.<br>Be grateful. Conceit is %self$-given. Be careful.",
"John Wooden (1910-2010) American basketball coach###Things turn out %best$ for the people who make the best of the way things turn out.",
"John Wooden (1910-2010) American basketball coach###You can't let %praise$ or criticism get to you.<br>It's a weakness to get caught up in either one.",
"John Wooden (1910-2010) American basketball coach###Never be disagreeable just because you %disagree$.",
"John Wooden (1910-2010) American basketball coach###The man who is afraid to risk failure seldom has to face %success$.",
"Widely attributed to John Wooden (1910-2010) American basketball coach###Success is never final, %failure$ is never fatal.",
"John Wooden (1910-2010) American basketball coach###The main ingredient of stardom is the %rest$ of the team.",
"John Wooden (1910-2010) American basketball coach###If you don't have time to do it right, when will you have time to do it %over$?",
"John Wooden (1910-2010) American basketball coach###If you're not making mistakes, then you're not %doing$ anything.",

"Jon Stewart (Born 1962) American comedian, political commentator###It takes people with no %shame$ to do shameful things.",

"Jonathan Swift (1667-1745) Irish writer###Every man desires to live long, but no man wishes to be %old$.",
"Jonathan Swift (1667-1745) Irish writer###The best %doctors$ in the world are<br>Doctor Diet, Doctor Quiet, and Doctor Merry-man.",
"Jonathan Swift (1667-1745) Irish writer###Nothing is so great an example of %bad$ manners as flattery.<br>If you flatter all the company, you please none;<br>If you flatter only one or two, you offend the rest.",
"Jonathan Swift (1667-1745) Irish writer###Nothing is so hard for those who abound<br>in riches as to conceive how others can be in %want$.",
"Jonathan Swift (1667-1745) Irish writer###Vision is the art of seeing what is %invisible$ to others.",

"Joseph Campbell (1904-1987) American mythologist and writer###I don't believe people are looking for the meaning<br>of life as much as they are looking for the experience of being %alive$.",
"Joseph Campbell (1904-1987) American mythologist and writer###Myths are public dreams, dreams are %private$ myths.",

"Joseph Epstein (Born 1937) American writer###Of the seven deadly sins, only %envy$ is no fun at all.",

"Josh Billings (aka Henry Wheeler Shaw) (1818-1885) American humorist###Be like a postage %stamp$. Stick to one thing until you get there.",

"Judith Martin aka Miss Manners (Born 1938) American authority on etiquette###It is far more impressive when others<br>discover your good qualities without %your$ help.",
"Judith Martin aka Miss Manners (Born 1938) American authority on etiquette###Honesty has come to mean the privilege<br>of insulting you to your %face$ without expecting redress.",
"Judith Martin aka Miss Manners (Born 1938) American authority on etiquette###When %everyone$ is spoiling<br>for a fight, the result is an unpleasant public.",

"Julie V. Iovine (born 1955) American journalist###%Dogs$ want to be with us wherever we are. If they didn't, they'd still be wolves.",

"Juvenal (c. 1-2 CE) Roman poet and satirist###The blind envy the %one$ eyed.",
"Juvenal (c. 1-2 CE) Roman poet and satirist###Never does nature say one thing and wisdom %another$.",
"Juvenal (c. 1-2 CE) Roman poet and satirist###Give them bread and circuses and they will never %revolt$.",

"Karl Marx (1818-1883) German philosopher###Surround yourself with people who make you happy. People who make<br>you laugh, who help you when you're in need. People who genuinely care.<br>They are the ones worth keeping in your life. Everyone else is just %passing$ through.",

"Kim Edwards (Born 1958) American author###Oh, the trouble we will go to, to justify<br>in our %minds$ what we know in our hearts is wrong.<br><br>{The Memory Keeper's Daughter}",

"Kurt Vonnegut (1922-2007) American writer###A %sane$ person to an insane society must appear insane.",

"Latin Proverb###The liar needs a %good$ memory.",

"Leo Buscaglia (1924-1998) American author and motivational speaker###Worry never robs tomorrow of its sorrow, it only saps %today$ of its joy.",
"Leo Buscaglia (1924-1998) American author and motivational speaker###Never idealize others. They<br>will never live up to your %expectations$.",

"Leo Tolstoy (1828-1910) Russian writer###Everyone thinks of changing the %world$,<br>but no one thinks of changing himself.",

"Popularized by Lewis Carl Davidson Hamilton (1985) British Formula One racing driver###A negative mind will never give you a %positive$ life.",

"Leonardo da Vinci (1452-1519) Italian polymath###The greatest deception men suffer is from their own %opinions$.",

"Lao-Tzu (Died 531 BCE) Chinese philosopher###To attain knowledge, add things every day.<br>To attain wisdom, %remove$ things every day.",

"Louis Brandeis (1856-1941) American supreme court justice###We can have democracy in this country or we can have great<br>wealth concentrated in the hands of the %few$, but we cannot have both.",

"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###A man is as miserable as he %thinks$ he is.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###While we are postponing, life %speeds$ by.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###Everywhere is nowhere. When a person spends all his time in foreign travel,<br>he ends by having many acquaintances, but %no$ friends.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###We are more often frightened than hurt;<br>and we suffer more from %imagination$ than from reality.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###There is no person so severely %punished$ as<br>those who subject themselves to the whip of their own remorse.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###It is not the man who has too little,<br>but the man who craves more, that is %poor$.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###Difficulties strengthen the %mind$, as labor does the body.",
"Lucius Annaeus Seneca (c.4 BCE-65 CE) Roman stoic philosopher###It is not that we have a short time to live, but that we %waste$ a lot of it.",
"Lucius Annaeus Seneca (c. 4 BCE-65 CE) Roman stoic philosopher###If one does not know to which port one is sailing, no %wind$ is favorable.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###Life, if well %lived$, is long enough.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###It is the sign of a %great$ mind to dislike greatness,<br>and to prefer things in measure to things in excess.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###For many men, the %acquisition$ of wealth<br>does not end their troubles, it only changes them.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###No one is laughable who %laughs$ at himself.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###One crime has to be concealed by %another$.",
"Lucius Annaeus Seneca (5 BCE-65 CE) Roman statesman###Poverty wants some, luxury many, and avarice %all$ things.",

"Marcus Aurelius (121-180 CE) Roman emperor and stoic philosopher###Our life is what our thoughts %make$ it.<br><br>{Meditations}",
"Marcus Aurelius (121-180 CE) Roman emperor and stoic philosopher###The things you %think$ about determine the quality of<br>your mind. Your soul takes on the color of your thoughts.<br><br>{Meditations}",

"Marcus Tullius Cicero (106 BCE- 43 BCE) Roman philosopher###Diseases of the soul are more dangerous than those of the %body$.",

"Margaret Mead (1901-1978) American cultural anthropologist###Always remember that you are<br>absolutely unique. Just like %everyone$ else.",

"Margot Fonteyn (1919-1991) English ballerina###Take your work seriously, but %never$ yourself.",

"Mario Cuomo (1932-2015) American politician ###You campaign in %poetry$. You govern in prose.",

"Mark Twain (1835-1910) American author###A clear conscience is the sure sign of a %bad$ memory.",
"Mark Twain (1835-1910) American author###The fear of death follows from the fear of %life$.",
"Mark Twain (1835-1910) American author###If you pick up a starving dog and make him prosperous, he will<br>not bite you. This is the principal %difference$ between a dog and man.",
"Mark Twain (1835-1910) American author###A lie can travel halfway around<br>the world while the %truth$ is putting on its shoes.",
"Widely attributed to Mark Twain (1835-1910)American author###If you don't read a newspaper, you are uninformed.<br>If you do read a newspaper, you are %misinformed$.",
"Often attributed to Mark Twain (1835-1910) American author###The man who does not read has no<br> %advantage$ over the man who cannot read.",
"Mark Twain (1835-1910) American author###All generalizations are false, including %this$ one.",
"Popularly Attributed to Mark Twain (1835-1910) American author###Denial ain't just a %river$ in Egypt.",
"Mark Twain (1835-1910) American author###The difference between the right word and the almost right<br>word is the difference between %lightning$ and a lightning bug.",
"Mark Twain (1835-1910) American author###Never argue with stupid people, they will drag you<br> down to their %level$ and then beat you with experience.",
"Mark Twain (1835-1910) American author###It's easier to fool people than to %convince$ them they've been fooled.",
"Mark Twain (1835-1910) American author###It is curious that physical courage should be<br>so common in the world, and %moral$ courage so rare.",
"Mark Twain (1835-1910) American author###A Frenchman's home is where another man's %wife$ is.",
"Mark Twain (1835-1910) American author###History doesn't repeat itself, but it often %rhymes$.",
"Mark Twain (1835-1910) American author###All you need in this life is ignorance and<br>confidence, and then %Success$ is sure.<br><br>{Notebook, 1887}",


"Mark Young () American Retired Coast Guard Officer###Our world's oceans are like the Wild %West$:<br>Weak rules, few sheriffs, lots of outlaws.",

"Marthe Troly-Curtin (1884-?) Author###Time you enjoy wasting is not %wasted$ time.<br><br>{Phrynette Married}",

"Martin Luther King, Jr. (1929-1968) American civil rights leader###Our scientific power has outrun our spiritual<br>power. We have %guided$ missiles and misguided men.",
"Martin Luther King, Jr. (1929-1968) American civil rights leader###We may have all come on different<br> %ships$, but we're in the same boat now.",

"Mary Wortley Montagu (1689-1762) English writer###Civility costs %nothing$, and buys everything.",

"Maya Angelou (1928-2014) American poet###Life is not measured by the number of breaths<br>we take, but by the moments that take our %breath$ away.",
"Maya Angelou (1928-2014) American poet###There is nothing so pitiful as a young cynic because<br>he has gone from knowing nothing to believing %nothing$.",
"Maya Angelou (1928-2014) American poet###Nothing will work unless %you$ do.",
"Maya Angelou (1928-2014) American poet###I've learned that you shouldn't go through life with a<br>catcher's mitt on both hands; you need to be able to throw something %back$.",
"Maya Angelou (1928-2014) American poet###If you don't like something, change it.<br>If you can't change it, %change$ your attitude.",
"Maya Angelou (1928-2014) American poet###When someone shows you who they are, believe them the %first$ time.",
"Maya Angelou (1928-2014) American poet###I've learned that people will forget what you said,<br>people will forget what you did,<br>but people will never forget how you made them %feel$.",

"Mencius (Mengzi) (372-289 BCE) Chinese philosopher###Never has a man who has bent himself been able to make others %straight$.",

"Michel de Montaigne (1533-1592) French essayist and philosopher###He who fears he shall suffer already %suffers$ what he fears.",

"Mickey Rooney (1920-2014) American actor###You always pass %failure$ on the way to success.",

"Miles Kington (1941-2008) British journalist and humorist###Everyone wants peace - and they will %fight$ the most terrible war to get it.",
"Miles Kington (1941-2008) British journalist and humorist###Knowledge is knowing that a tomato is a fruit;<br>wisdom is not putting it in a %fruit$ salad.",

"Mokokoma Mokhonoana (1985-2023) South African philosopher###Some of our friends are our friends<br>only because we used to be %friends$.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###Needs are imposed by nature. %Wants$ are sold by society.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###In fiction: we find the predictable boring.<br>In real life: we find the %unpredictable$ terrifying.", 
"Mokokoma Mokhonoana (1985-2023) South African philosopher###Spam is a waste of the receivers' time<br>and a %waste$ of the sender's optimism.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###People often give us a piece of their mind<br>with the intention to take away our %peace$ of mind.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###It is easy to be a good person when times are %good$.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###Thanks to photography, some memories %overstay$ their welcome.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###A genuine enemy is more useful than a %fake$ friend.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###Some people talk about other people's failures with so much<br>pleasure that you would swear they are talking about their own %successes$.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###One of the fastest ways to improve your health is to eat %slowly$.",
"Mokokoma Mokhonoana (1985-2023) South African philosopher###Though you can love what you do not<br>master, you cannot %master$ what you do not love.",

"Morgan Scott Peck (1936-2005) American psychiatrist and best-selling author###Emotional sickness is avoiding reality at any cost;<br>emotional health is %facing$ reality at any cost.",

"Mother Teresa (1910-1997) Albanian missionary###One of the greatest diseases is to be nobody to %anybody$.",
"Mother Teresa (1910-1997) Albanian missionary###There is more %hunger$ for love<br>and appreciation in this world than there is for bread.",

"Muriel Strode (1875-1964) American poet###I will not follow where the path may lead, but<br>I will go where there is no path and leave a %trail$.<br><br>{Wind-Wafted Wild Flowers}",

"Niccolò di Bernardo dei Machiavelli (1469-1527) Italian philosopher###A son can bear with equanimity the loss of his father,<br> but the %loss$ of his inheritance may drive him to despair.",

"Niels Bohr (1885-1962) Danish physicist###An expert is a man who has made all the<br> %mistakes$ which can be made, in a narrow field.",
"Niels Bohr (1885-1962) Danish physicist###Prediction is very difficult, especially if it's about the %future$.",

"Nikos Kazantzakis (1883-1957) Greek author and poet###In order to succeed, we must first believe that we %can$.",
"Nikos Kazantzakis (1883-1957) Greek author and poet###A person needs a little madness,<br>or else they never dare %cut$ the rope and be free.",

"Napoleon Bonaparte (1769-1821) French military and political leader###Give me enough ribbons to place on the<br>tunics of my soldiers and I can %conquer$ the world.",

"Naval Ravikant (Born 1974) Indian born American entrepreneur###Desire is a contract that you make with yourself<br>to be unhappy until you %get$ what you want.",

"Niccolò di Bernardo dei Machiavelli (1469-1527) Italian philosopher###The wise man does at %once$ what the fool does finally.",

"Nikos Kazantzakis (1883-1957) Greek author and poet###The real meaning of enlightenment is<br>to gaze with undimmed eyes on all %darkness$.",

"Oliver Goldsmith (1730-1774) Irish Poet###You can preach a better sermon with your life than with your %lips$.",

"Oliver Wendell Holmes Jr. (1841-1935) American Supreme Court Justice###Old age is 15 years %older$ than I am.",
"Oliver Wendell Holmes Sr. (1809-1894) American polymath###The mind of a bigot is like the pupil of the eye.<br>The more light you shine on it, the more it will %contract$.",
"Oliver Wendell Holmes Jr. (1841-1935) American Supreme Court Justice###I like to pay taxes. With them I %buy$ civilization.",

"Oscar R. Benavides (1876-1945) Peruvian president###For my friends, %anything$; for my enemies, the law.",

"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###I like men who have a future and women who have a %past$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###A bore is someone who deprives you of<br>solitude without providing you with %company$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###The only good thing to do with advice is pass it on;<br>it is never of any use to %oneself$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###Anybody can sympathize with the sufferings of a friend, but it<br>requires a very fine nature to sympathize with a friend's %success$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###We are each our own devil, and we make this world our %hell$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###We live in an age when %unnecessary$ things are our only necessities.<br><br>{The Picture of Dorian Gray}",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###Whenever people %agree$ with me, I always feel I must be wrong.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###The best way to appreciate your %job$ is to imagine yourself without one.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###I am so clever that sometimes I<br>don't %understand$ a single word of what I am saying.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###Ridicule is the tribute %paid$ to the genius by the mediocrities.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###It is the confession, not the %priest$ that gives us absolution.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###When the gods wish to punish us, they answer our %prayers$.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###I can resist %everything$ except temptation.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###No man is %rich$ enough to buy back his past.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###Some cause happiness wherever they go; others %whenever$ they go.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###There are only two tragedies in life:<br>one is not getting what one wants, and the other is %getting$ it.",
"Oscar Wilde (1854-1900) Irish writer, poet, and playwright###%Hatred$ is as blind as love.",


"P. J. O'Rourke (1947-2022) American political satirist###When buying and selling are controlled by legislation,<br>the first things to be bought and sold are %legislators$.",
"P. J. O'Rourke (1947-2022) American political satirist###Everybody wants to save the earth;<br> %nobody$ wants to help Mom do the dishes.",

"Pablo Picasso (1881-1973) Spanish artist###Art is a %lie$ that makes us see the truth.",

"Paul Klee (1879-1940) Swiss-born German artist###A line is a dot that went for a %walk$.",

"Paul Laurence Dunbar (1872-1906) American writer and poet###When he beats his bars and he would be free;<br>It is not a carol of joy or glee, …<br>But a plea, that upward to Heaven he flings—<br>I know why the caged bird %sings$!<br><br>{Sympathy}",

"Paul Theroux (Born 1941) American travel writer###It is almost axiomatic that as soon as a place<br>gets a reputation for being paradise it goes to %hell$.",
"Paul Theroux (Born 1941) American travel writer###Tourists don't know where they've %been$,<br>travelers don't know where they're going.",
"Paul Theroux (Born 1941) American travel writer###Gain a modest reputation for being<br>unreliable and you will never be %asked$ to do a thing.",

"Paul Valery (1871-1945) French Poet###The best way to make your dreams come true is to %wake$ up.",

"Peter Drucker (1909-2005) Austrian writer###When you find yourself always compromising<br>with your principles, you probably %don't$ have any.",

"Plato (c.428-348 BCE) Greek philosopher###Wise men speak because they have something<br>to say, fools because they have to %say$ something.",

"Popular Motivational Quote###If you're searching for that one person who<br>will change your life, take a look in the %mirror$.",
"Popular Motivational Quote###There are one thousand reasons to be upset, find one reason to be %happy$.",

"Proverb###The end of an ox is beef<br>And the end of a lie is %grief$.",
"Proverb###False friends are %worse$ than open enemies.",
"Proverb###Don't %speak$ unless you can improve on the silence.",

"Publilius Syrus (85-43 BCE) Syrian born Roman writer###From the errors of others,<br>a wise man %corrects$ his own.",
"Publilius Syrus (85-43 BCE) Syrian born Roman slave; writer###To do two things at once is to do %neither$.",
"Publilius Syrus (85-43 BCE) Syrian born Roman slave; writer###Let a fool hold his tongue and he will %pass$ for a sage.",
"Publilius Syrus (85-43 BCE) Syrian born Roman slave; writer###The miser is as much in %want$ of what he has as of what he has not.",

"Pyotr Ilich Tchaikovsky (1840-1893) Russian composer###Inspiration. This is a guest who<br>does %not$ always appear at the first summons.",

"Pyrrhus of Epirus (c. 318-272 BCE) Greek king###Another such %victory$ over the Romans and we are undone.",

"R.D. Laing (1927-1989) Scottish psychiatrist###Insanity - a perfectly %rational$ <br>adjustment to an insane world.",
"R.D. Laing (1927-1989) Scottish psychiatrist###There is a great deal of pain in life and<br>perhaps the only pain that can be avoided is<br>the pain that comes from trying to %avoid$ pain.",

"Ralph Waldo Emerson (1803-1882) American poet###People only %see$ what they are prepared to see.",
"Ralph Waldo Emerson (1803-1882) American poet###For every minute you remain angry,<br>you give up sixty seconds of %peace$ of mind.",
"Ralph Waldo Emerson (1803-1882) American poet###Life is a perpetual %instruction$ in cause and effects.",
"Ralph Waldo Emerson (1803-1882) American poet###Men succeed when they realize that their<br>failures are the %preparation$ for their victories.",
"Ralph Waldo Emerson (1803-1882) American poet###What lies behind us and what lies before us are<br>tiny matters compared to what lies %within$ us.",
"Ralph Waldo Emerson (1803-1882) American poet###Make the most of %yourself$, for that is all there is of you.",
"Ralph Waldo Emerson (1803-1882) American poet###The only way to have a friend is to be %one$.", 
"Ralph Waldo Emerson (1803-1882) American poet###It is not %length$ of life, but depth of life.",

"Richard Feynman (1918-1988) American physicist###The first principle is that you must not fool<br>yourself - and you are the %easiest$ person to fool.",

"Rick Warren (Born 1954) American pastor###True humility is not thinking less<br>of yourself; it is thinking of yourself %less$.<br><br>{ The Purpose-Driven Life (Day 19)}",

"Robert Browning (1812-1889) English poet###Ah, but a %man's$ reach should exceed his grasp,<br>Or what's a heaven for?",
"Robert Browning (1812-1889) English poet###Grow old along with me!<br>The best is yet to %be$.",

"Robert Burns (1759-1796) Scottish poet###Gathering her brows like gathering storm<br>Nursing her wrath to keep it %warm$.<br><br>{Tam O'Shanter}",
"Robert Burns (1759-1796) Scottish poet###There is no such uncertainty as a %sure$ thing.",
"Robert Burns (1759-1796) Scottish poet###Man's inhumanity to %man$ makes countless thousands mourn.",
"Robert Burns (1759-1796) Scottish poet###The fear o' hell's the hangman's whip<br>To laud the wretch in order<br>But where ye feel your honor grip<br>Let that aye be your %border$.",
"Robert Burns (1759-1796) Scottish poet###But pleasures are like poppies spread<br>You seize the flower, its bloom is shed.<br>Or like the snow falls in the river<br>A moment white--then melts %forever$.<br><br>{Tam O’ Shanter}",

"Robert Frost (1874-1963) American poet###Happiness makes up in height for what it lacks in %length$.",
"Robert Frost (1874-1963) American poet###The afternoon knows what the %morning$ never suspected.",
"Robert Frost (1874-1963) American poet###The best way out is always %through$.",

"Robert H. Schuller (1926-2015) American televangelist###Tough times never last, but tough %people$ do.",
"Robert H. Schuller (1926-2015) American televangelist###I'd rather attempt to do something great<br>and fail than attempt to do nothing and %succeed$.",

"Robert Herrick (1591-1674) English poet###Who covets more is %evermore$ a slave.",

"Robert Louis Stevenson (1850-1894) Scottish writer###You can read Kant by yourself, if you wanted to;<br>but you must %share$ a joke with someone else.",
"Robert Louis Stevenson (1850-1894) Scottish writer###A friend is a gift you %give$ yourself.",

"Robert Orben (1927-2023) American comedy writer###Every morning I get up and look through the Forbes list<br>of the richest people in America. If I'm not there, I go to %work$.",
"Robert Orben (1927-2023) American comedy writer###A graduation ceremony is an event where the<br>commencement speaker tells thousands of students<br>dressed in identical caps and gowns that<br> %individuality$ is the key to success.",
"Robert Orben (1927-2023) American comedy writer###Older people shouldn't eat %health$ food,<br>they need all the preservatives they can get.",
"Robert Orben (1927-2023) American comedy writer###A vacation is having %nothing$ to do and all day to do it in.",
"Robert Orben (1927-2023) American comedy writer###%Noise$ pollution is a relative thing. In a city,<br>it's a jet plane taking off. In a monastery, it's a pen that scratches.",

"Rogers Hornsby (1896-1963) American baseball player###I don't want to play golf. When I hit a ball,<br>I want someone else to go %chase$ it.",

"Robert Trivers (Born 1943) American evolutionary biologist###We deceive ourselves in order to better deceive %others$.",

"Russian Proverb###With %lies$ you may go ahead in the<br>world, but you can never go back.",

"Sacha Guitry (1885-1957) French film director and screenwriter###Our wisdom comes from our experience,<br>and our experience comes from our %foolishness$.",
"Sacha Guitry (1885-1957) French film director and screenwriter###You can pretend to be %serious$;<br>but you can't pretend to be witty.",

"Saint Francis of Assisi (1182-1226) Italian saint###For it is in giving that we %receive$.",

"Samuel Butler (1835-1902) British poet###Life is the art of drawing sufficient<br> %conclusions$ from insufficient premises.",
"Samuel Butler (1835-1902) British poet###People are lucky and unlucky not according to what they get absolutely,<br>but according to the ratio between what they get<br>and what they have been led to %expect$.",

"Samuel Johnson (1709-1784) English poet###The true measure of a man is how he %treats$ <br>someone who can do him absolutely no good.",
"Samuel Johnson (1709-1784) English poet###The use of traveling is to regulate imagination by %reality$,<br>and instead of thinking how things may be, to see them as they are.",
"Samuel Johnson (1709-1784) English poet###Wine makes a man more pleased with himself;<br>I do not say it makes him more %pleasing$ to others.",

"Scottish Proverb###What may be done at %any$ time will be done at no time.",

"Sherry Turkle (Born 1948) American professor of sociology###Technology gives us the illusion of<br>companionship without the demands of %friendship$.<br><br>{Reclaiming Conversation}",
"Sherry Turkle (Born 1948) American professor of sociology###If we don't teach kids how to be %alone$, they will end up only lonely.",
"Sherry Turkle (Born 1948) American professor of sociology###Loneliness is failed %solitude$.",

"Sholom Aleichem (1859-1916) Russian writer###No matter how bad things get, you<br>got to go on %living$, even if it kills you.",
"Sholom Aleichem (1859-1916) Russian writer###Life is a dream for the wise, a game for the fool,<br>a comedy for the rich, a tragedy for the %poor$.",
"Sholom Aleichem (1859-1916) Russian writer###The rich swell up with pride, the %poor$ from hunger.",

"Simone Weil (1909-1943) French philosopher###Imagination and fiction make up<br>more than three quarters of our %real$ life.",

"Socrates (469 BCE-399 BCE) Greek philosopher###Beware the barrenness of a busy %life$.",

"Stephen R. Covey (1932-2012) American author and businessman###If the ladder is not leaning against the right wall<br>every step we take just gets us to the %wrong$ place faster.",

"Steve Cole () American Professor of Biobehavioral Sciences### Your experiences %today$ will influence the<br>molecular composition of your body for the next two to three months,<br>or, perhaps, for the rest of your life. Plan your day accordingly.",

"Steven Morrissey (Born 1959) English singer and songwriter###Heavy words are so %lightly$ thrown.",

"Steven Wright (Born 1955) American comedian###What's another %word$ for Thesaurus?",
"Steven Wright (Born 1955) American comedian###Be nice to your children.<br>After all, they are going to choose your %nursing$ home.",
"Steven Wright (Born 1955) American comedian###Experience is something you don't %get$ until just after you need it.",
"Steven Wright (Born 1955) American comedian###Everywhere is within walking distance if you have the %time$.",

"Strickland Gillilan (1869-1954) American poet###You may have tangible wealth untold;<br>Caskets of jewels and coffers of gold.<br> %Richer$ than I you can never be -<br>I had a mother who read to me.<br><br>{The Reading Mother}",

"Submariner motto###There are only two kinds of ships, submarines and %targets$.",

"Swahili Proverb###Smooth %seas$ do not make skillful sailors.",

"Swedish Proverb###Friendship %doubles$ our joy and divides our grief.",
"Swedish Proverb###Shared joy is a double joy;<br>shared sorrow is %half$ a sorrow.",

"T.S. Eliot (1888-1965) American-born British poet and social critic###Humor is also a way of %saying$ something serious.",

"Tennessee Williams (1911-1983) American playwright###All cruel people describe %themselves$ as paragons of frankness.",
"Tennessee Williams (1911-1983) American playwright###Luck is believing you're %lucky$.",
"Tennessee Williams (1911-1983) American playwright###You can be young without money but you can't be %old$ without it.",
"Tennessee Williams (1911-1983) American playwright###Don't look forward to the day you stop suffering,<br>because when it comes, you'll know you're %dead$.",

"Terry Pratchett (1948-2015) British writer and satirist###Inside every old person is a %young$ person wondering what happened.", 
"Terry Pratchett (1948-2015) British writer and satirist###In ancient times cats were worshipped<br>as gods; they have not %forgotten$ this.",

"Theodore (Teddy) Roosevelt (1858-1919) American president and naturalist###The only man who never makes<br>a mistake is the man who %never$ does anything.",
"Theodore (Teddy) Roosevelt (1858-1919) American president and naturalist###Knowing what's right doesn't<br>mean much %unless$ you do what's right.",

"Theophrastus (370-286 BCE) Greek philosopher###Time is the most valuable thing a man can %spend$.",

"Thomas Carlyle (1795-1881) Scottish Philosopher###The greatest of faults, I should say, is to be conscious of %none$.",
"Thomas Carlyle (1795-1881) Scottish Philosopher###I do not believe in the collective wisdom of %individual$ ignorance.",
"Thomas Carlyle (1795-1881) Scottish Philosopher###Make yourself an honest man,<br>then you will be sure there is one %less$ rascal in the world.",

"Thomas Gray (1716-1771) English poet ###Where ignorance is bliss, tis folly to be %wise$.",

"Thomas Jefferson (1743-1826) President of the United States###An injured %friend$ is the bitterest of foes.",

"Thomas Paine (1737-1809) British-born central figure of the American Revolution###A body of men holding themselves accountable<br>to %nobody$ ought not to be trusted by anybody.",
"Thomas Paine (1737-1809) British-born central figure of the American Revolution###Moderation in temper is always a virtue;<br>but moderation in principle is always a %vice$.",
"Thomas Paine (1737-1809) British-born central figure of the American Revolution###That which we %obtain$ too easily, we esteem too lightly.",

"Thucydides (circa 460-398 BCE) Athenian general and historian###The strong do what they will and the %weak$ suffer what they must.",

"Tibetan proverb###If a problem can be solved, there is no use worrying about it.<br>If it can't be solved, worrying will do no %good$.",

"Titus Maccius Plautus (254-184 BCE) Roman Playwright###No guest is so welcome in a friend's house<br>that he will not become a nuisance after three %days$.",
"Titus Maccius Plautus (254-184 BCE) Roman Playwright###The poor man who enters into a partnership<br>with one who is %rich$ makes a risky venture.",
"Titus Maccius Plautus (254-184 BCE) Roman Playwright###I much prefer a compliment, even if insincere, to sincere %criticism$.",
"Titus Maccius Plautus (254-184 BCE) Roman playwright###Nothing is there more friendly to a man than a %friend$ in need.",

"Tom Magliozzi (1937-2014) American co-host of Car Talk radio show###Happiness %equals$ reality minus expectations.",

"Tom Waits (Born 1949) American musician###Most people don't %care$ if you're telling them the truth<br>or if you're telling them a lie, as long as they're entertained by it.",

"Truman Capote (1924-1984) American novelist###Failure is the condiment that gives %success$ its flavor.",

"Victor Frankl (1905-1997) Austrian psychiatrist and Holocaust survivor###When we are no longer able to change a %situation$,<br>we are challenged to change ourselves.<br><br>{Man's Search For Meaning}",

"Vince Lombardi (1913-1970) American football coach###Winning is not everything, but wanting to %win$ is.",
"Vince Lombardi (1913-1970) American football coach###Winners never quit and %quitters$ never win.",
"Vince Lombardi (1913-1970) American football coach###If it doesn't matter who wins or loses,<br>then why do they keep %score$?",
"Vince Lombardi (1913-1970) American football coach###The only time success comes %before$ work is in the dictionary.",

"Voltaire (1694-1778) French philosopher###It is dangerous to be %right$ in matters<br>on which the established authorities are wrong.",
"Voltaire (1694-1778) French philosopher###The secret to being a bore is to %tell$ everything.",
"Voltaire (1694-1778) French philosopher###Common sense is not so %common$.",
"Voltaire (1694-1778) French philosopher###The comfort of the rich depends<br>upon an abundant supply of the %poor$.",

"Walker Percy (1916 - 1990) American writer###You can get all A's and still %flunk$ life.",

"Walter Lippmann (1889-1974) American journalist###When all men think alike, no one %thinks$ very much.",

"Warren Buffet (Born 1930) American investor and philanthropist###It takes 20 years to build a<br>reputation and five minutes to %ruin$ it.",

"Will Durant (1885-1981) American historian###A great civilization is not conquered from<br>without until it has %destroyed$ itself from within.<br><br>{The Story of Civilization}",

"Will Rogers (1879-1935) American actor###I know worrying works, because none of the stuff<br>I %worried$ about ever happened.",
"Will Rogers (1879-1935) American actor###Never let yesterday use up too much of %today$.",

"William Blake (1757-1827) English poet###It is easier to forgive an enemy than to %forgive$ a friend.",
"William Blake (1757-1827) English poet###A truth that's told with bad intent<br>Beats all the lies you can %invent$.",
"William Blake (1757-1827) English poet###When a sinister person means to be your %enemy$,<br>they always start by trying to become your friend.",
"William Blake (1757-1827) English poet###No bird soars too %high$ if he soars with his own wings.",

"William James (1842-1910) American philosopher###The greatest weapon against stress<br>is our ability to choose one thought over %another$.",
"William James (1842-1910) American philosopher###A chain is no stronger than its %weakest$ link, and life is after all a chain.",

"William Congreve (1670-1729) English poet###Grief walks upon the heels of pleasure;<br>Married in haste, we repent at %leisure$.",

"William Cowper (1731-1800) English poet###The life of %ease$ is a difficult pursuit.",
"William Cowper (1731-1800) English poet###Knowledge is %proud$ that it knows so much;<br>wisdom is humble that it knows no more.",
"William Cowper (1731-1800) English poet###Variety is the very %spice$ of life, that gives it all its flavor.<br><br>{The Task}",

"William Faulkner (1897-1962) American novelist and poet###The past is never dead. It's not even %past$.<br><br>{Requiem for a Nun}",

"William James (1842-1910) American philosopher### Our view of the world is truly shaped by what we %decide$ to hear.",
"William James (1842-1910) American philosopher###The art of being wise is the art of %knowing$ what to overlook.",

"William Penn (1644-1718) British founder of Pennsylvania###Time is what we want %most$ but what we use worst.",

"William Shakespeare (1564-1616) British poet and playwright###Mine honor is my life; both grow in one<br>Take honor from me and my life is %done$.<br><br>{Richard II}",
"William Shakespeare (1564-1616) British poet and playwright###Whatever praises itself,<br>but in the deed, devours the %praise$ in the deed.<br><br>{Troilus and Cressida}",
"William Shakespeare (1564-1616) British poet and playwright###Give everyman thine %ear$; but few thy voice.<br><br>{Hamlet}",
"William Shakespeare (1564-1616) British poet and playwright###I must be %cruel$, only to be kind.<br><br>{Hamlet}",
"William Shakespeare (1564-1616) British poet and playwright###Cowards %die$ many times before their deaths.<br><br>{Julius Caesar}",
"William Shakespeare (1564-1616) British poet and playwright###Rich gifts wax %poor$ when givers prove unkind.<br><br>{Hamlet}",
"William Shakespeare (1564-1616) British poet and playwright###Who knows himself a braggart,<br>Let him fear this, for it will come to pass<br>That every braggart will be found an %ass$.<br><br>{All's Well That Ends Well}",
"William Shakespeare (1564-1616) British poet and playwright###Uneasy lies the head that %wears$ a crown.<br><br>{Henry IV} ",
"William Shakespeare (1564-1616) British poet and playwright###Our remedies oft in %ourselves$ do lie.<br><br>{All's Well That Ends Well}",
"William Shakespeare (1564-1616) British poet and playwright###Love all; trust but a few; do wrong to %none$.<br><br>{All's Well That Ends Well}",
"William Shakespeare (1564-1616) British poet and playwright###Things sweet to taste prove in digestion %sour$.<br><br>{Richard II}",
"William Shakespeare (1564-1616) British poet and playwright###Society is no comfort to one not %sociable$.<br><br>{Cymbeline}",
"William Shakespeare (1564-1616) British poet and playwright###Golden lads and girls all must<br>As chimney-sweepers, come to %dust$.<br><br>{Cymbeline}",
"William Shakespeare (1564-1616) British poet and playwright###The fault, dear Brutus, is not in our stars, but in %ourselves$.<br><br>{Julius Caesar}",
"William Shakespeare (1564-1616) British poet and playwright###Tis neither %here$ nor there.<br><br>{Othello}",
"William Shakespeare (1564-1616) British poet and playwright###%Poor$ and content is rich and rich enough.<br><br>{Othello}",
"William Shakespeare (1564-1616) British poet and playwright###He that loves to be %flattered$ is worthy of the flatterer.<br><br>{Timon of Athens}",
"William Shakespeare (1564-1616) British poet and playwright###Things without all %remedy$ should be without regard. What's done is done.<br><br>{Macbeth}",
"William Shakespeare (1564-1616) British poet and playwright###How much better is it to %weep$ at joy than to joy at weeping.<br><br>{Much Ado About Nothing}", 
"William Shakespeare (1564-1616) British poet and playwright###In nature there's no blemish but the mind<br>None can be called deformed but the %unkind$.<br><br>{Twelfth Night}",
"William Shakespeare (1564-1616) British poet and playwright###Things ill-got had ever %bad$ success.<br><br>{Henry VI}",
"William Shakespeare (1564-1616) British poet and playwright###Small showers last long, but sudden storms are %short$.<br><br>{Richard II}",
"William Shakespeare (1564-1616) British poet and playwright###Where having nothing, nothing can he %lose$.<br><br>{Henry VI}",
"William Shakespeare (1564-1616) British poet and playwright###The devil can cite scripture for his purpose<br>An %evil$ soul producing holy witness.<br><br>{Merchant of Venice}",
"William Shakespeare (1564-1616) British poet and playwright###All that glisters is not %gold$.<br><br>{Merchant of Venice}",
"William Shakespeare (1564-1616) British poet and playwright###The fool doth think he is %wise$,<br>but the wise man knows himself to be a fool.<br><br>{As You Like It}",
"William Shakespeare (1564-1616) British poet and playwright###This momentary joy breeds months of pain<br>This hot desire converts to %cold$ distain.<br><br>{The Rape of Lucrece}",
"William Shakespeare (1564-1616) British poet and playwright###Love looks not with the eyes, but with the mind<br>And therefore is winged Cupid painted %blind$.<br><br>{Midsummer Night's Dream}",
"William Shakespeare (1564-1616) British poet and playwright###Your hands than mine are quicker for a fray<br>My legs are longer though, to run %away$.<br><br>{Midsummer Night's Dream}",
"William Shakespeare (1564-1616) British poet and playwright###This is the %short$ and the long of it.<br><br>{Merry Wives of Windsor}",
"William Shakespeare (1564-1616) British poet and playwright###What our contempt doth often hurl from us,<br>We wish it %ours$ again.<br><br>{Antony and Cleopatra}",
"William Shakespeare (1564-1616) British poet and playwright###Everyone that flatters %thee$<br>Is no friend in misery.<br><br>{Sonnets to Sundry Notes of Music, VI.}",
"William Shakespeare (1564-1616) British poet and playwright###Every man will be thy friend<br>Whilst thou hast wherewith to %spend$.<br>But if store of crowns be scant<br>No man will supply thy want.<br><br>{Sonnets to Sundry Notes of Music, VI.}",
"William Shakespeare (1564-1616) British poet and playwright### I wasted time, and now time doth %waste$ me.<br><br>{Richard II}",

"William Somerset Maugham (1874-1965) British playwright and author###It is one of the defects of my character that I<br> %cannot$ altogether dislike anyone who makes me laugh.<br><br>{The Moon and Sixpence}",
"William Somerset Maugham (1874-1965) British playwright and author###There are three rules for writing a novel. Unfortunately, no one %knows$ what they are.",
"William Somerset Maugham (1874-1965) British playwright and author###She had a pretty gift for quotation,<br>which is a serviceable %substitute$ for wit.<br><br>{The Creative Impulse}",
"William Somerset Maugham (1874-1965) British playwright and author###Love is only a dirty %trick$ played on<br>us to achieve continuation of the species.",
"Possibly attributed to William Somerset Maugham (1874-1965) British playwright and author###Sometimes the longest journey is the distance between %two$ people.<br><br>{Trailer epigram to 2006 film, The Painted Veil}",

"William Wordsworth (1770-1850) English poet###Pictures deface walls more often than they %decorate$ them.",

"Wilson Mizner (1876-1933) American playwright###Be nice to people on your way up because<br>you'll %meet$ them on your way down.",
"Wilson Mizner (1876-1933) American playwright###Don't talk about yourself; it will be %done$ when you leave.",

"Winston Churchill (1874-1965) British prime minister###An appeaser is one who feeds a crocodile, hoping it will %eat$ him last.",
"Winston Churchill (1874-1965) British prime minister###Courage is what it takes to stand up and speak;<br>courage is also what it takes to sit down and %listen$.",
"Winston Churchill (1874-1965) British prime minister###If you're going through hell, keep %going$.",
"Winston Churchill (1874-1965) British prime minister###Don't %interrupt$ me when I'm interrupting.",
"Winston Churchill (1874-1965) British prime minister###A fanatic is one who can't change<br>his mind and won't %change$ the subject.",
"Winston Churchill (1874-1965) British prime minister###He has all the virtues I dislike and none of the %vices$ I admire.",
"Winston Churchill (1874-1965) British prime minister###History will be %kind$ to me, for I intend to write it.",
"Winston Churchill (1874-1965) British prime minister###Men occasionally stumble over the truth,<br>but most of them pick themselves up<br>and hurry off as if %nothing$ ever happened.",
"Winston Churchill (1874-1965) British prime minister###It has been said that democracy is the worst form of government,<br> %except$ for all the others that have been tried from time to time.<br><br>{Speech in the House of Commons on November 11, 1947}",
"Winston Churchill (18741965) British prime minister###The best argument against %democracy$ is<br>a five-minute conversation with the average voter.",
"Winston Churchill (1874-1965) British prime minister###I am always ready to learn although I do not always like being %taught$.",

"Woody Allen (Born 1935) American playwright and comedian###My one regret in life is that I am not %someone$ else.",
"Woody Allen (Born 1935) American playwright and comedian###I don't want to achieve immortality through my work.<br>I want to achieve it through not %dying$.",
"Woody Allen (Born 1935) American playwright and comedian###Some guy hit my fender, and I told him,<br>'Be fruitful and multiply,' but not in those %words$.",

"Yiddish Proverb###If you sit in a %hot$ bath,<br>you think the whole town is warm.",
"Yogi Berra (1925-2015) American Baseball Catcher###Always go to other people's funerals,<br>otherwise they won't come to %yours$.",

"Xunzi born Xun Kuang (c. 312-230 BCE) Chinese philosopher###Tell me and I forget, teach me and I remember, %involve$ me and I learn.",

"Zen Proverb###The way you do %anything$ is the way you do everything.",

"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Whoever is trying to bring you %down$ is already below you.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###There is a story behind every person. There's a reason why they're<br>the way they are. Think about that before you %judge$ anyone.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Time is a currency you can only spend %once$.", 
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Excuses are %useless$. Results are priceless.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Be careful who you trust, the devil was once an %angel$.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###A truly rich man is one whose children<br>run into his arms when his hands are %empty$.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Time decides who you meet in life,<br> your heart decides who you want in life,<br>and your behavior decides who %stays$ in your life.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###There are two things you should never waste your time on:<br>things that don't matter and people who think you don't %matter$.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###Be strong enough to stand alone,<br>smart enough to know when you need %help$,<br>and brave enough to ask for it.",
"Ziad K. Abdelnour (Born 1960) Lebanese born American financier and author###I'm strong because I know my weakness.<br>I'm wise because I've been %foolish$.<br>I laugh because I've known sadness.",

"Zig Ziglar (1926-2012) American motivational speaker###Money won't make you happy,<br>but %everybody$ wants to find out for themselves.",
"Zig Ziglar (1926-2012) American motivational speaker###If you learn from defeat, you haven't really %lost$.",
"Zig Ziglar (1926-2012) American motivational speaker###There will always be people in your life who treat you %wrong$.<br>Be sure to thank them for making you strong.",
"Zig Ziglar (1926-2012) American motivational speaker###Attitude is a little thing that makes a %big$ difference.",
"Zig Ziglar (1926-2012) American motivational speaker###A lot of people quit looking for %work$ as soon as they find a job.",
"Zig Ziglar (1926-2012) American motivational speaker###People often say that motivation doesn't last.<br>Well, neither does bathing -<br>that's why we recommend it %daily$.",


];


runLoopWithPause();

//Asynchronous function to execute loop with a pause
async function runLoopWithPause() {

  for (let q = 0; q < 5; q++) { //arrayOfQuotes.length; q++) { //iterate thru every quote//
    //console.log("loop number: " + q);
    await waitForButtonClick();

    //clear previous quote data
    document.getElementById("BeginGamePrompt").innerHTML = "";
    document.getElementById("fullQuoteWithTargetWord").innerHTML = "";
    document.getElementById("congratsMsg").innerHTML = "";
    //console.log("loop completed");
        randomInteger =  Math.floor(Math.random() * arrayOfQuotes.length); //random integer from array of quotes
console.log("randomInteger is: " + randomInteger);        
    quoteLine = arrayOfQuotes[randomInteger]; //quoteLine is the string of the quote, author's bio, and target word with markers for start and end of each.
console.log("quoteLine is: " + quoteLine);
 
    //get author's bio
    let endOfBio = quoteLine.indexOf("###");//end marker of biography of author
    let authorsBio = quoteLine.substring(0, endOfBio);

    //get target word(answer)
    let startMarkOfTargetWord = quoteLine.indexOf("%");//% in front of the target word
    let endOfTargetWord = quoteLine.indexOf("$");//$ is just after the target word
    window.targetWord = quoteLine.substring(startMarkOfTargetWord + 1, endOfTargetWord);//GLOBAL Variable of word to guess
    window.targetWordLowerCase = targetWord.toLowerCase(); //make string lower case
    window.arrayAnswer = [""]; //will be == to window.targetWord when all the correct letters are entered

    //create blanks
    window.targetWordLength = targetWord.length;
    let blanks = "";
    for (i = 0; i <= targetWordLength - 1; i++) {
      blanks = blanks + " _ ";
    }

    //get string pre and post of the target word & concat w/blanks       
    let endOfSentence = 0;
    let preTargetWordLine = quoteLine.substring(endOfBio + 3, startMarkOfTargetWord - 1);//between the ### and the %
    //console.log(preTargetWordLine + "is the preTargetWord");

    //Will be the case caused by the target word being the 1st word of the quotation
    const firstChar = preTargetWordLine.charAt(0);
    if (firstChar === "#") {
      preTargetWordLine = "";
    }

    //concat preTargetWordLine with blanks
    let preTargetWordLineWithBlanks = preTargetWordLine.concat(blanks);//concat with blanks

    //get string post target word
    endOfSentence = quoteLine.length;
    let postTargetLine = quoteLine.substring(endOfTargetWord + 1, endOfSentence); //after the $ to quote's end
    //console.log(postTargetLine);

    //full quote with the blanks
    let fullQuoteWithBlanks = preTargetWordLineWithBlanks + postTargetLine;
    //console.log("fullQuoteWithBlanks: " + fullQuoteWithBlanks);

    //make compatible with html for output
    document.getElementById("fullQuoteWithBlanks").innerHTML = fullQuoteWithBlanks;
    document.getElementById("authorsBio").innerHTML = authorsBio;


    //full quote with targetWord
    window.fullQuoteWithTargetWord = preTargetWordLine + " " + targetWord + " " + postTargetLine;
    //console.log(fullQuoteWithTargetWord);

    //clear puzzle array & set cur(current word)
    game.puzz = [];
    game.cur = targetWordLowerCase;  //targetWord in lower case is assigned as game.cur
    game.solution = game.cur.split(""); //targetWord(game.cur) is made an array of individual letters

    buildPuzzleArray(); //call function to create puzzle (puzz) array
    startInteraction(); // call function to add eventListener(s)

    function createElements(elType, parentEl, output) {
      const temp = document.createElement(elType);  //create element div & assign it to variable temp
      temp.classList.add("box"); //create css .class box
      parentEl.append(temp); //append temp to its parent, puzzle
      temp.textContent = output; //set the textContent to "_"
      return temp;
    }

    function buildPuzzleArray() {
      puzzle.innerHTML = "";
      //iterate thru solution array generating an element of div for each char
      game.solution.forEach((lett) => {
        let div = createElements("div", puzzle, "_", "box"); //forEach char in solution array, output a box w/ "_" using createElements().
        game.puzz.push(div);//push each new element to the end of game.puzz array
      });
    }

    function startInteraction() {
      document.addEventListener("click", handleMouseClick);
      document.addEventListener('keydown', handleKeydown);
    }


    function handleMouseClick(e) {
      //console.log("In handleMouseClick: " + e.target);
      if (e.target.matches("[data-key]")) { //if clicked key matches any of the data-keys in html listing
        checkKey(e.target.dataset.key);
        console.log("e.target.dataset.key is: " + e.target.dataset.key);
      }
      return;
    }

    function handleKeydown(event) {
      const pressedKey = event.key;
      //console.log("pressedKey value is: " + pressedKey);
      let charCode = pressedKey.charCodeAt(0);//ASCII code of first character entered
      let inputChar = "";

      if (charCode >= 97 && charCode <= 122) { //if lowercase letter,
        inputChar = String.fromCharCode(charCode); //convert charCode to string
        checkKey(inputChar);
      } else if (charCode >= 65 && charCode <= 90) { //if uppercase,
        charCode = charCode + 32;  // convert upper to lowercase
        inputChar = String.fromCharCode(charCode); //convert charCode to string
        checkKey(inputChar);
      } else if (charCode == 39) { //ascii value for apostrophe
        inputChar = String.fromCharCode(charCode);
        checkKey(inputChar);
      }
    }

    function checkKey(keyEntered) {
      const letterEntered = keyEntered;
      //console.log("key clicked was: " + letterEntered);
      const key = keyboard.querySelector(`[data-key="${letterEntered}"i]`);

      if (game.cur.includes(letterEntered)) {
        key.classList.add("correct");
        //console.log("correct letter clicked: " + letterEntered);
      }
      else {
        key.classList.add("wrong");
        //console.log("wrong letter clicked: " + letterEntered);
      }

      //update puzzle boxes using correct letter
      for (i = 0; i <= targetWordLength; i++) {
        if (game.solution[i] === letterEntered) {// if game.solution[i] === letterEntered ...
          //console.log("game.solution letter is: " + game.solution[i]);
          game.puzz[i].textContent = letterEntered;  //...character is displayed in browser &
          arrayAnswer[i] = letterEntered; //...arrayAnswer index[i] is assigned the character
          if (window.arrayAnswer.join("") === targetWordLowerCase) {
            //Remove the event listener as condition is met)
            document.removeEventListener("click", handleMouseClick);
            document.removeEventListener('keydown', handleKeydown);
            //console.log("THEY MATCH!!!!" + q); //if strings match, then all chars are assigned
            if ((q + 1) === 5) { //arrayOfQuotes.length) {
              const btn = document.querySelector("#nextIterationBtn");
              btn.style.display = 'none';
              document.getElementById("ThanksForPlaying").innerHTML = "Reload the page for 5 more randomly selected quotes.<br>quotetalk@mail.com";
              /*document.getElementById("ThanksForPlaying").innerHTML = "Thanks For Playing. Five new quotes coming tommorow!<br> Send comments to quotetalk@mail.com";*/
            } // 5 quotes have been played 

            displayCongrats(fullQuoteWithTargetWord);

          } //end of if (window.arrayAnswer.join("") === targetWordLowerCase)
        } //end of if letterEntered is in game.solution[i] spot
      } //end of FOR loop
    } //end of checkKey function updating puzzle boxes

    //Congrats Msg 
    function displayCongrats(successQuote) {
      //console.log("in displayCongrats function for loop: " + (q));
      //console.log(successQuote);
      document.getElementById("fullQuoteWithBlanks").innerHTML = "";
      document.getElementById("congratsMsg").innerHTML = "Congratulations!";
      document.getElementById("fullQuoteWithTargetWord").innerHTML = fullQuoteWithTargetWord;
      resetKeyboard();
    }
    waitForButtonClick();
  } //end of for loop q iterating thru every quote

  //console.log("FOR LOOP END");

}//end of async function runLoopWithPause()

//function to remove green or dark grey from key style colors
function restoreKeyStyle(keyToRestore) {
  if (keyToRestore.classList.contains('correct')) {
    keyToRestore.classList.remove('correct');
  }
  else if (keyToRestore.classList.contains('wrong')) {
    keyToRestore.classList.remove('wrong');
  }
}//end of restoreKeyStyle function

function resetKeyboard() { //select each virtual key button to restor any style changes
  let keyQ = keyboard.querySelector(`[data-key="q"]`);
  restoreKeyStyle(keyQ);
  let keyW = keyboard.querySelector(`[data-key="w"]`);
  restoreKeyStyle(keyW);
  let keyE = keyboard.querySelector(`[data-key="e"]`);
  restoreKeyStyle(keyE);
  let keyR = keyboard.querySelector(`[data-key="r"]`);
  restoreKeyStyle(keyR);
  let keyT = keyboard.querySelector(`[data-key="t"]`);
  restoreKeyStyle(keyT);
  let keyY = keyboard.querySelector(`[data-key="y"]`);
  restoreKeyStyle(keyY);
  let keyU = keyboard.querySelector(`[data-key="u"]`);
  restoreKeyStyle(keyU);
  let keyI = keyboard.querySelector(`[data-key="i"]`);
  restoreKeyStyle(keyI);
  let keyO = keyboard.querySelector(`[data-key="o"]`);
  restoreKeyStyle(keyO);
  let keyP = keyboard.querySelector(`[data-key="p"]`);
  restoreKeyStyle(keyP);

  let keyA = keyboard.querySelector(`[data-key="a"]`);
  restoreKeyStyle(keyA);
  let keyS = keyboard.querySelector(`[data-key="s"]`);
  restoreKeyStyle(keyS);
  let keyD = keyboard.querySelector(`[data-key="d"]`);
  restoreKeyStyle(keyD);
  let keyF = keyboard.querySelector(`[data-key="f"]`);
  restoreKeyStyle(keyF);
  let keyG = keyboard.querySelector(`[data-key="g"]`);
  restoreKeyStyle(keyG);
  let keyH = keyboard.querySelector(`[data-key="h"]`);
  restoreKeyStyle(keyH);
  let keyJ = keyboard.querySelector(`[data-key="j"]`);
  restoreKeyStyle(keyJ);
  let keyK = keyboard.querySelector(`[data-key="k"]`);
  restoreKeyStyle(keyK);
  let keyL = keyboard.querySelector(`[data-key="l"]`);
  restoreKeyStyle(keyL);

  let keyZ = keyboard.querySelector(`[data-key="z"]`);
  restoreKeyStyle(keyZ);
  let keyX = keyboard.querySelector(`[data-key="x"]`);
  restoreKeyStyle(keyX);
  let keyC = keyboard.querySelector(`[data-key="c"]`);
  restoreKeyStyle(keyC);
  let keyV = keyboard.querySelector(`[data-key="v"]`);
  restoreKeyStyle(keyV);
  let keyB = keyboard.querySelector(`[data-key="b"]`);
  restoreKeyStyle(keyB);
  let keyN = keyboard.querySelector(`[data-key="n"]`);
  restoreKeyStyle(keyN);
  let keyM = keyboard.querySelector(`[data-key="m"]`);
  restoreKeyStyle(keyM);
  let keyApostrophe = keyboard.querySelector(`[data-key="'"]`);
  restoreKeyStyle(keyApostrophe);

} //end of resetKeyboard function

