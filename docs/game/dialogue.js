// Hebrew clauses were checked against Mechon Mamre. English renderings are original.
// Character adaptations are screenplay, never presented as recorded historical speech.
const sources={ex25:['Exodus 25','pt0225'],ex37:['Exodus 37','pt0237'],num4:['Numbers 4','pt0404'],j3:['Joshua 3','pt0603'],j4:['Joshua 4','pt0604'],j6:['Joshua 6','pt0606'],s4:['1 Samuel 4','pt08a04'],s5:['1 Samuel 5','pt08a05'],s6:['1 Samuel 6','pt08a06'],s7:['1 Samuel 7','pt08a07'],d6:['2 Samuel 6','pt08b06'],k8:['1 Kings 8','pt09a08']};
export const DIALOGUE={};
function line(key,he,en,source,verses,kind='adapted',speaker=null){const [book,path]=sources[source];DIALOGUE[key]={he,text:en,ref:`${book}:${verses}`,url:`https://mechon-mamre.org/p/pt/${path}.htm`,kind,speaker};}
line('Bring me the acacia and the gold offerings. There is work to do.','הביאו אלי עצי שטים וזהב למלאכה.','Bring me acacia wood and gold for the work.','ex25','2–3, 10–11');
line('The curtain first. Then the hide. The blue cloth goes on the outside.','הפרכת תחלה, ואחריה מכסה עור; ועליהם בגד תכלת.','The curtain first, then a hide covering; over them, a blue cloth.','num4','5–6');
line('Seven days. Keep the Ark in the procession.','שבעת ימים נסב את העיר, וארון הברית עמנו.','For seven days we will circle the city, with the Ark of the covenant among us.','j6','3–8');
line('Take up the Ark. Go before the people into the Jordan.','שאו את ארון הברית ועברו לפני העם','Take up the Ark of the covenant and cross ahead of the people.','j3','6','biblical');
line('The Philistines send the Ark away on a new cart. The cows take the road.','הפלשתים משלחים את הארון בעגלה חדשה, והפרות הולכות בדרך.','The Philistines send the Ark away on a new cart, and the cows take the road.','s6','7–12');
line('Israel has been defeated. The captured Ark stands in the temple of Dagon.','וארון אלהים נלקח','The Ark of God was captured.','s4','11','biblical','Narrator');
line('Three months have passed. The Ark is carried toward Jerusalem with rejoicing.','אחרי שלשה חדשים נושאים את הארון אל ירושלים בשמחה.','After three months, the Ark is carried toward Jerusalem with joy.','d6','11–15');
line('David brings the Ark toward his city on a new cart. Music fills the road.','דוד מעלה את הארון אל עירו בעגלה חדשה, והעם מנגנים לפניו.','David brings the Ark toward his city on a new cart, and the people play music before it.','d6','3–5');
line('The priests bring the Ark into the house Solomon has built.','הכהנים מביאים את הארון אל הבית אשר בנה שלמה.','The priests bring the Ark into the house that Solomon built.','k8','3–6');
line('Wood within. Gold within and without. The poles will stay in their rings.','עצי שטים בפנים, וזהב מבית ומחוץ; הבדים ישארו בטבעות.','Acacia wood within, gold inside and outside; the poles will remain in the rings.','ex25','10–15');
line('The acacia and gold are still waiting in the camp.','עצי השטים והזהב עודם במחנה.','The acacia wood and gold are still in the camp.','ex25','2–3, 10–11');
line('A chest of acacia. Gold within and without. Two winged figures above the cover.','נעשה ארון עצי שטים ונצפה אותו זהב מבית ומחוץ, ושני כרבים על הכפרת.','We will make an acacia chest and cover it with gold inside and outside, with two cherubim on the cover.','ex25','10–22');
line('Now the Kohathites may carry it. They must not touch the sacred objects.','ועתה יבאו בני קהת לשאת; אל יגעו בקדש.','Now the sons of Kohath may come to carry; they must not touch the sacred things.','num4','15');
line('Bring the covering to the Ark.','הביאו את המכסה אל הארון.','Bring the covering to the Ark.','num4','5–6');
line('My sons and I prepare the coverings. The Kohathites carry what is covered.','אני ובני נכסה את הארון; בני קהת ישאו אותו.','My sons and I will cover the Ark; the sons of Kohath will carry it.','num4','5, 15');
line('At dawn, Dagon lies fallen before the Ark. They raise him again.','והנה דגון נפל לפניו ארצה לפני ארון יהוה','There was Dagon, fallen face down on the ground before the Ark of the LORD.','s5','3','biblical');
line('The next morning he lies fallen again. His head and hands are broken off.','למחרת דגון שוב נפל, וראשו וכפות ידיו כרתות.','The next morning Dagon has fallen again, with his head and hands cut off.','s5','4');
line('Send the Ark back. Do not send it empty.','שלחו את הארון; אל תשלחו אותו ריקם.','Send the Ark away; do not send it empty.','s6','3, 8');
line('Captured, but not subdued. The story gives the Ark a power its captors cannot command.','הארון נלקח, אך שוביו אינם שולטים בכחו.','The Ark was captured, but its captors do not control its power.','s5','1–12');
line('A new cart. Two cows. Gold offerings for what has befallen us.','עגלה חדשה ושתי פרות; נשיב אשם זהב על אשר קרה לנו.','A new cart and two cows; we will return a gold reparation offering for what has happened to us.','s6','3–8');
line('The Ark remains in Obed-edom’s house for three months. His household is blessed.','הארון ישב בבית עבד אדם שלשה חדשים, וביתו התברך.','The Ark stayed in Obed-edom’s house for three months, and his household was blessed.','d6','11');
line('David dances before the Ark. It is brought into the tent in his city.','דוד מכרכר לפני הארון, ומביאים אותו אל האהל בעירו.','David dances before the Ark, and it is brought into the tent in his city.','d6','14–17');
line('Bring it up with rejoicing.','העלו את הארון בשמחה.','Bring up the Ark with joy.','d6','12');
line('The Ark rests beneath the great cherubim. Only the two stone tablets are inside.','אין בארון רק שני לחות האבנים','There was nothing in the Ark except the two stone tablets.','k8','9','biblical');
line('The priests go outside. A cloud fills the house.','והענן מלא את בית יהוה','The cloud filled the house of the LORD.','k8','10','biblical');
line('And Solomon asks whether even the heavens can contain God.','כי האמנם ישב אלהים על הארץ','Will God really dwell on the earth?','k8','27','biblical','Solomon');
line('The priests’ feet enter the water. In Joshua’s story, the Jordan stops.','רגלי הכהנים באו במים, ומי הירדן עמדו.','The priests’ feet entered the water, and the waters of the Jordan stood still.','j3','15–17');
line('All have crossed. Take the Ark out of the riverbed.','כל העם עברו. עלו מן הירדן.','All the people have crossed. Come up out of the Jordan.','j4','11, 17');
line('Six days have passed. On the seventh, circle seven times.','ששת ימים עברו; ביום השביעי סבו את העיר שבע פעמים.','Six days have passed; on the seventh day, circle the city seven times.','j6','3–4');
line('The trumpets sound. Joshua tells of the walls falling, and the city’s destruction.','השופרות נשמעים, החומה נופלת, והעיר נחרבת.','The horns sound, the wall falls, and the city is destroyed.','j6','20–21');
line('Rahab and her household are spared.','רחב ובית אביה נצלו.','Rahab and her father’s household were spared.','j6','22–25');
line('From Beth-shemesh, the Ark is taken to Abinadab’s house at Kiriath-jearim.','מבית שמש הובא הארון אל בית אבינדב בקרית יערים.','From Beth-shemesh the Ark was brought to Abinadab’s house at Kiriath-jearim.','s7','1');
line('The cattle stumble. Uzzah reaches for the Ark. He dies beside it.','הבקר שמטו; עזא שלח ידו אל הארון ומת שם.','The cattle stumbled; Uzzah reached toward the Ark and died there.','d6','6–7');
line('David is angry. Then afraid. The journey stops.','לדוד חרה; אחר כך ירא. המסע נעצר.','David was angry, then afraid. The journey stopped.','d6','8–10');
export function dialogueFor(key,name='Narrator'){const value=DIALOGUE[key];if(!value)throw new Error(`Unresearched dialogue: ${key}`);return {...value,name:value.speaker||name};}
