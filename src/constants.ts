
import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'doctor-visit',
    title: 'Приём у врача (Der Termin beim Arzt)',
    description: 'Медицинские термины, симптомы и лечение',
    icon: 'fa-user-md',
    color: 'bg-red-500',
    level: 'A1-A2',
    videoUrl: 'https://kinescope.io/embed/aGsVV4gqk7DfF1maWZCcgX',
    dialog: {
      text: `Als Thomas an einem Montagmorgen aufwacht, merkt er sofort, dass etwas nicht stimmt. Er ist völlig verschwitzt, sein Kopf tut weh, der Rücken ist steif, und er hat Schmerzen im Magen. Außerdem fühlt er sich müde und schwach. Seine Frau schaut ihn besorgt an: „Thomas, du siehst gar nicht gut aus. Ich mache mir Sorgen. Du solltest lieber zum Arzt gehen.“

Thomas nickt, aber er hat Angst, dass es etwas Schlimmes sein könnte. „Vielleicht ist es nur Stress“, murmelt er. „Vielleicht“, antwortet sie ruhig, „aber deine Gesundheit ist wichtiger.“

Er ruft an der Rezeption der Praxis an. Die Mitarbeiterin hört ihm aufmerksam zu, als er seine Beschwerden beschreibt. „Kommen Sie heute Nachmittag vorbei“, sagt sie. „Wenn Sie Schmerzen haben, bekommen Sie natürlich schnell einen Termin.“

Am Nachmittag sitzt Thomas im Wartezimmer. Es ist stickig, und er beginnt wieder zu schwitzen. Viele Menschen warten. Eine ältere Frau hustet, ein Kind hält sich das Auge, und jemand stöhnt leise vor Schmerzen. Thomas versucht ruhig zu atmen, doch der Magen brennt stärker, und ihm wird schwindlig.

Endlich ruft die Arzthelferin: „Herr Berger, bitte!“ Dr. Keller, ein freundlicher Hausarzt, begrüßt ihn: „Was fehlt Ihnen?“ Thomas erzählt, dass er seit zwei Tagen kaum essen kann, sich schwach fühlt und nachts leidet.

Der Arzt misst den Blutdruck, hört den Körper ab und erklärt: „Sie haben wahrscheinlich eine Magenentzündung. Ich verschreibe Ihnen starke Antibiotika. Sie müssen sie regelmäßig einnehmen – drei Mal am Tag nach dem Essen. Hier ist außerdem ein Rezept, damit Sie die Medikamente in der Apotheke bekommen.“

Dann fügt er hinzu: „Sie sollen die Antibiotika immer nach dem Essen einnehmen, damit der Magen sie besser verträgt. Und Sie sollen mindestens drei Tage zu Hause bleiben und sich ausruhen.“

Thomas fragt: „Wie lange soll ich die Tabletten nehmen?“ Dr. Keller antwortet: „Fünf Tage, dann sollte es Ihnen deutlich besser gehen. Die Antibiotika wirken schnell, aber Sie brauchen Ruhe. Vermeiden Sie Kaffee und Alkohol.“

Dann fragt er: „Brauchen Sie auch ein Attest für die Arbeit?“ Thomas antwortet: „Ja, bitte – für drei Tage.“ Dr. Keller notiert es und lächelt: „In Ordnung. Dann ruhen Sie sich gut aus.“

Zu Hause hilft ihm seine Frau, das Fenster zu öffnen, bringt Tee und Suppe ans Bett: „Ich werde dich gut pflegen, bis es dir besser geht.“ Nach zwei Tagen geht es ihm schon besser. Die Schmerzen sind fast weg, das Brennen im Magen ist vorbei, und er kann wieder schlafen.

Am dritten Tag fühlt sich Thomas stark und ausgeruht. Er beschließt, am nächsten Morgen wieder zur Arbeit zu gehen – froh, dass alles harmlos war und die Medikamente gut wirken.`,
      translation: "Полный перевод истории доступен в режиме изучения.",
      audioUrl: "/doctor_visit.mp3" 
    },
    words: [
      { id: 'antibiotikum', de: 'das Antibiotikum', ru: 'антибиотик', audioDe: '/audio/words/doctor-visit/antibiotikum.wav' },
      { id: 'beschwerde', de: 'die Beschwerde', ru: 'жалоба', audioDe: '/audio/words/doctor-visit/beschwerde.wav' },
      { id: 'gesundheit', de: 'die Gesundheit', ru: 'здоровье', audioDe: '/audio/words/doctor-visit/gesundheit.wav' },
      { id: 'koerper', de: 'der Körper', ru: 'тело', audioDe: '/audio/words/doctor-visit/koerper.wav' },
      { id: 'magen', de: 'der Magen', ru: 'желудок', audioDe: '/audio/words/doctor-visit/magen.wav' },
      { id: 'medikament', de: 'das Medikament', ru: 'лекарство', audioDe: '/audio/words/doctor-visit/medikament.wav' },
      { id: 'rezept', de: 'das Rezept', ru: 'рецепт', audioDe: '/audio/words/doctor-visit/rezept.wav' },
      { id: 'ruecken', de: 'der Rücken', ru: 'спина', audioDe: '/audio/words/doctor-visit/ruecken.wav' },
      { id: 'ruhe', de: 'die Ruhe', ru: 'покой, тишина', audioDe: '/audio/words/doctor-visit/ruhe.wav' },
      { id: 'schmerz', de: 'der Schmerz', ru: 'боль', audioDe: '/audio/words/doctor-visit/schmerz.wav' },
      { id: 'sorge', de: 'die Sorge', ru: 'забота, тревога', audioDe: '/audio/words/doctor-visit/sorge.wav' },
      { id: 'auftragen', de: 'auftragen', ru: 'наносить (мазь)', audioDe: '/audio/words/doctor-visit/auftragen.wav' },
      { id: 'brennen', de: 'brennen', ru: 'жечь, гореть', audioDe: '/audio/words/doctor-visit/brennen.wav' },
      { id: 'einnehmen', de: 'einnehmen', ru: 'принимать (лекарство)', audioDe: '/audio/words/doctor-visit/einnehmen.wav' },
      { id: 'fuehlen', de: 'fühlen', ru: 'чувствовать', audioDe: '/audio/words/doctor-visit/fuehlen.wav' },
      { id: 'leiden', de: 'leiden', ru: 'страдать', audioDe: '/audio/words/doctor-visit/leiden.wav' },
      { id: 'messen', de: 'messen', ru: 'измерять', audioDe: '/audio/words/doctor-visit/messen.wav' },
      { id: 'sich-kuemmern-um', de: 'sich kümmern um', ru: 'заботиться о', audioDe: '/audio/words/doctor-visit/sich-kuemmern-um.wav' },
      { id: 'sollen', de: 'sollen', ru: 'должен (совет)', audioDe: '/audio/words/doctor-visit/sollen.wav' },
      { id: 'vermeiden', de: 'vermeiden', ru: 'избегать', audioDe: '/audio/words/doctor-visit/vermeiden.wav' },
      { id: 'verschreiben', de: 'verschreiben', ru: 'выписывать', audioDe: '/audio/words/doctor-visit/verschreiben.wav' },
      { id: 'verschwitzen', de: 'verschwitzen', ru: 'вспотеть', audioDe: '/audio/words/doctor-visit/verschwitzen.wav' },
      { id: 'wirken', de: 'wirken', ru: 'действовать', audioDe: '/audio/words/doctor-visit/wirken.wav' },
      { id: 'schlimm', de: 'schlimm', ru: 'сильный, ужасный', audioDe: '/audio/words/doctor-visit/schlimm.wav' },
      { id: 'stickig', de: 'stickig', ru: 'душный', audioDe: '/audio/words/doctor-visit/stickig.wav' }
    ],
    mantras: [
      { id: 'termin-vereinbaren', de: 'Ich möchte einen Termin vereinbaren.', ru: 'Я хочу назначить термин.', audioDe: '/audio/mantras/doctor-visit/termin-vereinbaren.wav' },
      { id: 'termin-verschieben', de: 'Ich möchte meinen Termin verschieben.', ru: 'Я хочу перенести свой термин.', audioDe: '/audio/mantras/doctor-visit/termin-verschieben.wav' },
      { id: 'termin-absagen', de: 'Ich muss den Termin leider absagen.', ru: 'К сожалению, я должен отменить термин.', audioDe: '/audio/mantras/doctor-visit/termin-absagen.wav' },
      { id: 'beschwerde-haben', de: 'Ich habe eine Beschwerde.', ru: 'У меня есть жалоба.', audioDe: '/audio/mantras/doctor-visit/beschwerde-haben.wav' },
      { id: 'starke-schmerzen', de: 'Er hat starke Schmerzen.', ru: 'У него сильные боли.', audioDe: '/audio/mantras/doctor-visit/starke-schmerzen.wav' },
      { id: 'schmerz-sehr-stark', de: 'Der Schmerz ist sehr stark.', ru: 'Боль очень сильная.', audioDe: '/audio/mantras/doctor-visit/schmerz-sehr-stark.wav' },
      { id: 'schmerzen-schlimm', de: 'Die Schmerzen sind schlimm.', ru: 'Боли ужасные.', audioDe: '/audio/mantras/doctor-visit/schmerzen-schlimm.wav' },
      { id: 'sich-nicht-gut-fuehlen', de: 'Sie fühlt sich heute nicht gut.', ru: 'Она чувствует себя сегодня нехорошо.', audioDe: '/audio/mantras/doctor-visit/sich-nicht-gut-fuehlen.wav' },
      { id: 'sich-schwach-fuehlen', de: 'Ich fühle mich heute sehr schwach.', ru: 'Я чувствую себя сегодня очень слабым.', audioDe: '/audio/mantras/doctor-visit/sich-schwach-fuehlen.wav' },
      { id: 'unter-schmerzen-leiden', de: 'Sie leidet unter starken Schmerzen.', ru: 'Она страдает от сильных болей.', audioDe: '/audio/mantras/doctor-visit/unter-schmerzen-leiden.wav' },
      { id: 'magen-brennt', de: 'Mein Magen brennt.', ru: 'У меня жжение в желудке.', audioDe: '/audio/mantras/doctor-visit/magen-brennt.wav' },
      { id: 'magen-brennt-seit-gestern', de: 'Ihr Magen brennt seit gestern.', ru: 'У неё жжение в желудке со вчерашнего дня.', audioDe: '/audio/mantras/doctor-visit/magen-brennt-seit-gestern.wav' },
      { id: 'rueckenschmerzen', de: 'Er hat Rückenschmerzen.', ru: 'У него боли в спине.', audioDe: '/audio/mantras/doctor-visit/rueckenschmerzen.wav' },
      { id: 'schmerzen-im-ruecken', de: 'Ich habe Schmerzen im Rücken.', ru: 'У меня боли в спине.', audioDe: '/audio/mantras/doctor-visit/schmerzen-im-ruecken.wav' },
      { id: 'medikament-einnehmen', de: 'Ich nehme ein Medikament ein.', ru: 'Я принимаю лекарство.', audioDe: '/audio/mantras/doctor-visit/medikament-einnehmen.wav' },
      { id: 'medikament-schon-einnehmen', de: 'Er nimmt dieses Medikament schon ein.', ru: 'Он уже принимает это лекарство.', audioDe: '/audio/mantras/doctor-visit/medikament-schon-einnehmen.wav' },
      { id: 'medikament-einnehmen-wie', de: 'Wie soll ich das Medikament einnehmen?', ru: 'Как мне принимать лекарство?', audioDe: '/audio/mantras/doctor-visit/medikament-einnehmen-wie.wav' },
      { id: 'medikament-wirkt-gut', de: 'Das Medikament wirkt gut.', ru: 'Лекарство действует хорошо.', audioDe: '/audio/mantras/doctor-visit/medikament-wirkt-gut.wav' },
      { id: 'medikament-wirkt-schnell', de: 'Wirkt das Medikament schnell?', ru: 'Действует ли лекарство быстро?', audioDe: '/audio/mantras/doctor-visit/medikament-wirkt-schnell.wav' },
      { id: 'rezept-brauchen', de: 'Sie braucht ein Rezept.', ru: 'Ей нужен рецепт.', audioDe: '/audio/mantras/doctor-visit/rezept-brauchen.wav' },
      { id: 'rezept-brauchen-frage', de: 'Brauche ich dafür ein Rezept?', ru: 'Нужен ли мне для этого рецепт?', audioDe: '/audio/mantras/doctor-visit/rezept-brauchen-frage.wav' },
      { id: 'medikament-verschreiben', de: 'Könnten Sie mir ein Medikament verschreiben?', ru: 'Не могли бы вы выписать мне лекарство?', audioDe: '/audio/mantras/doctor-visit/medikament-verschreiben.wav' },
      { id: 'antibiotikum-brauchen', de: 'Braucht er ein Antibiotikum?', ru: 'Нужен ли ему антибиотик?', audioDe: '/audio/mantras/doctor-visit/antibiotikum-brauchen.wav' },
      { id: 'salbe-auftragen', de: 'Soll ich die Salbe auftragen?', ru: 'Мне наносить мазь?', audioDe: '/audio/mantras/doctor-visit/salbe-auftragen.wav' },
      { id: 'sich-kuemmern-um-dich', de: 'Ich kümmere mich um dich.', ru: 'Я позабочусь о тебе.', audioDe: '/audio/mantras/doctor-visit/sich-kuemmern-um-dich.wav' },
      { id: 'gesundheit-kuemmern', de: 'Er soll sich mehr um seine Gesundheit kümmern.', ru: 'Ему следует больше заботиться о своем здоровье.', audioDe: '/audio/mantras/doctor-visit/gesundheit-kuemmern.wav' },
      { id: 'schwere-arbeit-vermeiden', de: 'Sie soll schwere Arbeit vermeiden.', ru: 'Ей следует избегать тяжелой работы.', audioDe: '/audio/mantras/doctor-visit/schwere-arbeit-vermeiden.wav' },
      { id: 'alkohol-vermeiden', de: 'Soll ich Alkohol vermeiden?', ru: 'Мне следует избегать алкоголя?', audioDe: '/audio/mantras/doctor-visit/alkohol-vermeiden.wav' },
      { id: 'dringend-ruhe', de: 'Ich brauche dringend Ruhe.', ru: 'Мне срочно нужен покой.', audioDe: '/audio/mantras/doctor-visit/dringend-ruhe.wav' },
      { id: 'koerper-braucht-ruhe', de: 'Mein Körper braucht Ruhe.', ru: 'Моему телу нужен покой.', audioDe: '/audio/mantras/doctor-visit/koerper-braucht-ruhe.wav' },
      { id: 'blutdruck-messen', de: 'Könnten Sie meinen Blutdruck messen?', ru: 'Не могли бы вы измерить мне давление?', audioDe: '/audio/mantras/doctor-visit/blutdruck-messen.wav' },
      { id: 'grosse-sorgen', de: 'Ich mache mir große Sorgen.', ru: 'Я очень беспокоюсь.', audioDe: '/audio/mantras/doctor-visit/grosse-sorgen.wav' },
      { id: 'voellig-verschwitzt', de: 'Er ist völlig verschwitzt.', ru: 'Он весь вспотел.', audioDe: '/audio/mantras/doctor-visit/voellig-verschwitzt.wav' },
      { id: 'sehr-stickig', de: 'Es ist sehr stickig hier.', ru: 'Здесь очень душно.', audioDe: '/audio/mantras/doctor-visit/sehr-stickig.wav' }
    ],
    quiz: [
      {
        question: "Was denkt Thomas zuerst über seine Beschwerden?",
        options: ["Es ist eine Erkältung", "Es ist vielleicht Stress", "Es ist etwas sehr Gefährliches"],
        correctAnswer: "Es ist vielleicht Stress"
      },
      {
        question: "Wie bekommt Thomas einen Termin beim Arzt?",
        options: ["Er ruft selbst in der Praxis an", "Seine Frau ruft an", "Er geht direkt in die Praxis"],
        correctAnswer: "Er ruft selbst in der Praxis an"
      },
      {
        question: "Wann soll Thomas in die Praxis kommen?",
        options: ["Am Vormittag", "Am nächsten Tag", "Am Nachmittag"],
        correctAnswer: "Am Nachmittag"
      },
      {
        question: "Was sagt der Arzt über Thomas’ Krankheit?",
        options: ["Er weiß es nicht точно", "Es ist wahrscheinlich eine Magenentzündung", "Es ist eine schwere Krankheit"],
        correctAnswer: "Es ist wahrscheinlich eine Magenentzündung"
      },
      {
        question: "Wie oft soll Thomas die Medikamente nehmen?",
        options: ["Einmal am Tag", "Zwei Mal am Tag", "Drei Mal am Tag"],
        correctAnswer: "Drei Mal am Tag"
      },
      {
        question: "Wie geht es Thomas nach ein paar Tagen?",
        options: ["Es geht ihm deutlich besser", "Er fühlt sich schlechter", "Es gibt keine Veränderung"],
        correctAnswer: "Es geht ihm deutlich besser"
      }
    ],
    exercises: [
      {
        sentence_ru: "У меня сильная боль в желудке.",
        sentence: "Ich habe starke Schmerzen im ____.",
        options: ["Magen", "Magenentzündung", "Bauch", "Körper"],
        explanation: "Magen означает желудок. Это правильный ответ для выражения боли в желудке."
      },
      {
        sentence_ru: "Врач выписывает мне лекарство.",
        sentence: "Der Arzt ____ mir ein Medikament.",
        options: ["verschreibt", "verschreiben", "gibt", "misst"],
        explanation: "verschreibt - форма глагола verschreiben (выписывать) в 3-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Я должен принимать антибиотик три раза в день.",
        sentence: "Ich soll das ____ drei Mal am Tag einnehmen.",
        options: ["Antibiotikum", "Antibiotika", "Medikament", "Rezept"],
        explanation: "Antibiotikum - антибиотик в винительном падеже (Akkusativ) после артикля das."
      },
      {
        sentence_ru: "Мне нужно избегать алкоголя.",
        sentence: "Ich soll Alkohol ____.",
        options: ["vermeiden", "vermeide", "trinken", "einnehmen"],
        explanation: "vermeiden - инфинитив глагола избегать. После модального глагола sollen используется инфинитив."
      },
      {
        sentence_ru: "Лекарство действует хорошо.",
        sentence: "Das Medikament ____ gut.",
        options: ["wirkt", "wirken", "hilft", "brennt"],
        explanation: "wirkt - форма глагола wirken (действовать) в 3-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "У меня есть жалоба.",
        sentence: "Ich habe eine ____.",
        options: ["Beschwerde", "Beschwerden", "Sorge", "Gesundheit"],
        explanation: "Beschwerde - жалоба. После eine используется единственное число в именительном падеже."
      },
      {
        sentence_ru: "Здоровье важнее всего.",
        sentence: "Die ____ ist am wichtigsten.",
        options: ["Gesundheit", "Gesundheiten", "Beschwerde", "Ruhe"],
        explanation: "Gesundheit - здоровье. Это существительное женского рода в единственном числе."
      },
      {
        sentence_ru: "Моё тело болит.",
        sentence: "Mein ____ tut weh.",
        options: ["Körper", "Körpers", "Magen", "Rücken"],
        explanation: "Körper - тело. В именительном падеже после mein используется основная форма."
      },
      {
        sentence_ru: "Мне нужен рецепт.",
        sentence: "Ich brauche ein ____.",
        options: ["Rezept", "Rezepte", "Medikament", "Antibiotikum"],
        explanation: "Rezept - рецепт. После ein используется единственное число в винительном падеже."
      },
      {
        sentence_ru: "У меня болит спина.",
        sentence: "Ich habe Schmerzen im ____.",
        options: ["Rücken", "Rückens", "Körper", "Magen"],
        explanation: "Rücken - спина. После предлога im (в + дательный падеж) используется дательный падеж."
      },
      {
        sentence_ru: "Мне нужен покой.",
        sentence: "Ich brauche ____.",
        options: ["Ruhe", "Ruhen", "Gesundheit", "Sorge"],
        explanation: "Ruhe - покой, тишина. Это существительное женского рода в винительном падеже."
      },
      {
        sentence_ru: "Боль очень сильная.",
        sentence: "Der ____ ist sehr stark.",
        options: ["Schmerz", "Schmerzen", "Körper", "Magen"],
        explanation: "Schmerz - боль. В именительном падеже после der используется основная форма."
      },
      {
        sentence_ru: "Я забочусь о тебе.",
        sentence: "Ich ____ mich um dich.",
        options: ["kümmere", "kümmern", "fühle", "leide"],
        explanation: "kümmere - форма глагола sich kümmern (заботиться) в 1-м лице единственного числа."
      },
      {
        sentence_ru: "Я чувствую себя плохо.",
        sentence: "Ich ____ mich nicht gut.",
        options: ["fühle", "fühlen", "kümmere", "leide"],
        explanation: "fühle - форма глагола fühlen (чувствовать) в 1-м лице единственного числа."
      },
      {
        sentence_ru: "Она страдает от боли.",
        sentence: "Sie ____ unter Schmerzen.",
        options: ["leidet", "leiden", "fühlt", "misst"],
        explanation: "leidet - форма глагола leiden (страдать) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Врач измеряет давление.",
        sentence: "Der Arzt ____ den Blutdruck.",
        options: ["misst", "messen", "verschreibt", "wirkt"],
        explanation: "misst - форма глагола messen (измерять) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Мой желудок жжёт.",
        sentence: "Mein Magen ____.",
        options: ["brennt", "brennen", "wirkt", "tut weh"],
        explanation: "brennt - форма глагола brennen (жечь, гореть) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Здесь очень душно.",
        sentence: "Es ist hier sehr ____.",
        options: ["stickig", "stickigem", "schlimm", "ruhig"],
        explanation: "stickig - душный. После es ist используется предикативная форма прилагательного."
      }
    ],
    articleExercises: [
      {
        word: "Körper",
        translation: "тело",
        correctArticle: "der",
        explanation: "Körper - мужской род (der). Большинство слов, обозначающих части тела, имеют мужской род."
      },
      {
        word: "Magen",
        translation: "желудок",
        correctArticle: "der",
        explanation: "Magen - мужской род (der). Органы тела часто имеют мужской род."
      },
      {
        word: "Rücken",
        translation: "спина",
        correctArticle: "der",
        explanation: "Rücken - мужской род (der). Части тела часто имеют мужской род."
      },
      {
        word: "Schmerz",
        translation: "боль",
        correctArticle: "der",
        explanation: "Schmerz - мужской род (der). Слова, оканчивающиеся на -er, часто имеют мужской род."
      },
      {
        word: "Beschwerde",
        translation: "жалоба",
        correctArticle: "die",
        explanation: "Beschwerde - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Gesundheit",
        translation: "здоровье",
        correctArticle: "die",
        explanation: "Gesundheit - женский род (die). Абстрактные существительные, оканчивающиеся на -heit, имеют женский род."
      },
      {
        word: "Ruhe",
        translation: "покой, тишина",
        correctArticle: "die",
        explanation: "Ruhe - женский род (die). Абстрактные существительные часто имеют женский род."
      },
      {
        word: "Sorge",
        translation: "забота, тревога",
        correctArticle: "die",
        explanation: "Sorge - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Antibiotikum",
        translation: "антибиотик",
        correctArticle: "das",
        explanation: "Antibiotikum - средний род (das). Медицинские термины, оканчивающиеся на -um, имеют средний род."
      },
      {
        word: "Medikament",
        translation: "лекарство",
        correctArticle: "das",
        explanation: "Medikament - средний род (das). Лекарственные препараты часто имеют средний род."
      },
      {
        word: "Rezept",
        translation: "рецепт",
        correctArticle: "das",
        explanation: "Rezept - средний род (das). Медицинские документы часто имеют средний род."
      }
    ]
  },
  {
    id: 'house-cleaning',
    title: 'Уборка в доме (Das Putzen zu Hause)',
    description: 'История о "спокойном" дне домохозяйки и слова для уборки',
    icon: 'fa-broom',
    color: 'bg-green-500',
    level: 'A2-B1',
    videoUrl: 'https://kinescope.io/embed/8RK6zGztTfdNjCg7jxS1jQ',
    dialog: {
      title: 'Ich mache doch Nichts.',
      imageUrl: '/Thema2_text_photo.png',
      text: `Ich bin Hausfrau, eine glückliche Mutter von zwei Kindern.

Mein Mann ist sehr beschäftigt. Er arbeitet von morgens bis abends.

Und ich? Laut ihm sitze ich zu Hause und mache nichts.

Das ist natürlich sehr lustig.

Jetzt erzähle ich euch, wie mein gestriger „ruhiger" Tag wirklich war. Dann versteht ihr auch, warum ich so nervös bin.

Wie immer stand ich als Erste auf, verabschiedete meinen Mann zur Arbeit, bereitete den Kindern Frühstück vor und wollte ganz ruhig anfangen und einfach die Wäsche waschen.

Nichts deutete auf Probleme hin.

Aber dann kam unsere Hündin von draußen hereingelaufen. Es regnete, ihre Pfoten waren nass, dreckig und schmutzig.

Ich wollte sie schnell mit einem Lappen abwischen, aber sie rannte durch die Wohnung, über den Teppich, und hinterließ überall nasse, schmutzige Spuren.

Der Boden war sofort voller Schmutz.

Also musste ich die Wäsche erst einmal vergessen. Ich nahm den Wischmopp und begann, den Boden zu wischen.

Als alles sauber war, ging ich in die Küche.

Plötzlich knackte es unter meinen Füßen. Die Kinder hatten sehr kreativ gefrühstückt. Der Boden war voller Cornflakes.

Ich nahm den Staubsauger und saugte alles weg.

In der Küche spülte ich noch schnell ein paar Teller ab, bevor ich alles in die Spülmaschine einräumte.

Plötzlich tropfte der Wasserhahn, also reparierte ich ihn schnell.

Ein Eimer mit Müll stand schon bereit, ein paar Sachen musste ich wegwerfen.

Dann nahm ich den Korb mit der Schmutzwäsche und ging in den Keller, um die Waschmaschine zu starten.

Aber auch dort wartete eine neue Aufgabe.

Unsere Katze hatte begeistert Mäuse gejagt und dabei einen Sack Mehl umgeworfen. Das ganze Mehl lag auf dem Boden.

Ich nahm Kehrblech und Besen und begann zu fegen.

Dabei musste ich ständig niesen, so staubig war es.

Dann entdeckte ich auch noch Schimmel in einer Ecke. Ich dachte mir, dass ich meinem Mann sagen muss, er soll ein Spray dagegen kaufen.

Als ich später ins Kinderzimmer ging, klebten meine Füße plötzlich am Boden.

Die Kinder hatten gebastelt, und überall war es klebrig.

Ich musste auf den Knien den Boden sauber machen und den Kleber abreiben.

Danach folgten noch viele Kleinigkeiten: Mittagessen kochen, mit den Kindern lernen, Fenster putzen, Spiegel abwischen, Wäsche aufhängen und bügeln.

Am Abend war der Haushalt endlich erledigt.

Dann kam mein Mann nach Hause und fragte: „Na, hast du heute etwas gemacht?"

Ich lächelte.

Nein. Gar nichts.`,
      translation: `Я ведь ничего не делаю. Я домохозяйка, счастливая мать двоих детей.

Мой муж очень занят. Он работает с утра до вечера.

А я? По его словам, я сижу дома и ничего не делаю.

Это, конечно, очень забавно.

Теперь я расскажу вам, каким на самом деле был мой вчерашний "спокойный" день. Тогда вы поймёте, почему я так нервничаю.

Как всегда, я встала первой, проводила мужа на работу, приготовила детям завтрак и хотела спокойно начать и просто постирать бельё.

Ничто не предвещало проблем.

Но потом наша собака вбежала с улицы. Шёл дождь, её лапы были мокрыми, грязными и испачканными.

Я хотела быстро вытереть её тряпкой, но она побежала по квартире, по ковру, и оставила везде мокрые, грязные следы.

Пол сразу же стал полным грязи.

Так что мне пришлось забыть о стирке. Я взяла швабру и начала мыть пол.

Когда всё было чисто, я пошла на кухню.

Вдруг под ногами что-то хрустнуло. Дети очень креативно позавтракали. Пол был полон кукурузных хлопьев.

Я взяла пылесос и всё пропылесосила.

На кухне я ещё быстро помыла несколько тарелок, прежде чем убрать всё в посудомоечную машину.

Вдруг закапал кран, так что я быстро его починила.

Ведро с мусором уже стояло готовое, несколько вещей мне пришлось выбросить.

Затем я взяла корзину с грязным бельём и пошла в подвал, чтобы запустить стиральную машину.

Но и там ждала новая задача.

Наша кошка с энтузиазмом охотилась на мышей и при этом опрокинула мешок муки. Вся мука лежала на полу.

Я взяла совок и веник и начала подметать.

При этом мне постоянно приходилось чихать, так пыльно было.

Затем я также обнаружила плесень в углу. Я подумала, что мне нужно сказать мужу, чтобы он купил спрей против неё.

Когда я позже пошла в детскую, мои ноги вдруг прилипли к полу.

Дети занимались поделками, и везде было липко.

Мне пришлось на коленях очистить пол и оттереть клей.

После этого последовало ещё много мелочей: приготовить обед, позаниматься с детьми, помыть окна, протереть зеркала, развесить бельё и погладить.

К вечеру домашнее хозяйство наконец было закончено.

Затем мой муж пришёл домой и спросил: "Ну, ты сегодня что-то делала?"

Я улыбнулась.

Нет. Вообще ничего.`,
      audioUrl: '/thema2_text.wav'
    },
    words: [
      { id: 'boden', de: 'der Boden', ru: 'пол', audioDe: '/audio/words/house-cleaning/boden.wav' },
      { id: 'teppich', de: 'der Teppich', ru: 'ковёр', audioDe: '/audio/words/house-cleaning/teppich.wav' },
      { id: 'spiegel', de: 'der Spiegel', ru: 'зеркало', audioDe: '/audio/words/house-cleaning/spiegel.wav' },
      { id: 'fenster', de: 'das Fenster', ru: 'окно', audioDe: '/audio/words/house-cleaning/fenster.wav' },
      { id: 'fegen', de: 'fegen', ru: 'подметать', audioDe: '/audio/words/house-cleaning/fegen.wav' },
      { id: 'wegwerfen', de: 'wegwerfen', ru: 'выбрасывать', audioDe: '/audio/words/house-cleaning/wegwerfen.wav' },
      { id: 'waschen', de: 'waschen', ru: 'стирать', audioDe: '/audio/words/house-cleaning/waschen.wav' },
      { id: 'aufhaengen', de: 'aufhängen', ru: 'вешать (сушиться)', audioDe: '/audio/words/house-cleaning/aufhaengen.wav' },
      { id: 'trocknen', de: 'trocknen', ru: 'сушить(ся)', audioDe: '/audio/words/house-cleaning/trocknen.wav' },
      { id: 'haushalt', de: 'der Haushalt', ru: 'домашнее хозяйство', audioDe: '/audio/words/house-cleaning/haushalt.wav' },
      { id: 'wischmopp', de: 'der Wischmopp', ru: 'швабра', audioDe: '/audio/words/house-cleaning/wischmopp.wav' },
      { id: 'lappen', de: 'der Lappen', ru: 'тряпка', audioDe: '/audio/words/house-cleaning/lappe.wav' },
      { id: 'besen', de: 'der Besen', ru: 'веник / метла', audioDe: '/audio/words/house-cleaning/besen.wav' },
      { id: 'buegeln', de: 'bügeln', ru: 'гладить', audioDe: '/audio/words/house-cleaning/buegeln.wav' },
      { id: 'schimmel', de: 'der Schimmel', ru: 'плесень', audioDe: '/audio/words/house-cleaning/schimmel.wav' },
      { id: 'fleck', de: 'der Fleck', ru: 'пятно', audioDe: '/audio/words/house-cleaning/fleck.wav' },
      { id: 'wischen', de: 'wischen', ru: 'мыть пол (влажная уборка)', audioDe: '/audio/words/house-cleaning/wischen.wav' },
      { id: 'spuelen', de: 'spülen', ru: 'мыть посуду', audioDe: '/audio/words/house-cleaning/spuelen.wav' },
      { id: 'abspuelen', de: 'abspülen', ru: 'мыть посуду', audioDe: '/audio/words/house-cleaning/abspuelen.wav' },
      { id: 'staub', de: 'der Staub', ru: 'пыль', audioDe: '/audio/words/house-cleaning/staub.wav' },
      { id: 'staubig', de: 'staubig', ru: 'пыльный', audioDe: '/audio/words/house-cleaning/staubig.wav' },
      { id: 'klebrig', de: 'klebrig', ru: 'липкий', audioDe: '/audio/words/house-cleaning/klebrig.wav' },
      { id: 'wasserhahn', de: 'der Wasserhahn', ru: 'кран (водопроводный)', audioDe: '/audio/words/house-cleaning/wasserhahn.wav' },
      { id: 'schmutz', de: 'der Schmutz', ru: 'грязь', audioDe: '/audio/words/house-cleaning/schmutz.wav' },
      { id: 'schmutzig', de: 'schmutzig', ru: 'грязный', audioDe: '/audio/words/house-cleaning/schmutzig.wav' },
      { id: 'eimer', de: 'der Eimer', ru: 'ведро', audioDe: '/audio/words/house-cleaning/eimer.wav' },
      { id: 'muell', de: 'der Müll', ru: 'мусор', audioDe: '/audio/words/house-cleaning/muell.wav' },
      { id: 'aufraeumen', de: 'aufräumen', ru: 'убирать, наводить порядок', audioDe: '/audio/words/house-cleaning/aufraeumen.wav' },
      { id: 'entfernen', de: 'entfernen', ru: 'удалять', audioDe: '/audio/words/house-cleaning/entfernen.wav' },
      { id: 'abwischen', de: 'abwischen', ru: 'вытирать', audioDe: '/audio/words/house-cleaning/abwischen.wav' },
      { id: 'spuelmittel', de: 'das Spülmittel', ru: 'моющее средство', audioDe: '/audio/words/house-cleaning/spuelmittel.wav' },
      { id: 'staubsauger', de: 'der Staubsauger', ru: 'пылесос', audioDe: '/audio/words/house-cleaning/staubsauger.wav' },
      { id: 'lueften', de: 'lüften', ru: 'проветривать', audioDe: '/audio/words/house-cleaning/lueften.wav' },
      { id: 'abtrocknen', de: 'abtrocknen', ru: 'вытирать насухо', audioDe: '/audio/words/house-cleaning/abtrocknen.wav' },
      { id: 'spuelmaschine', de: 'die Spülmaschine', ru: 'посудомоечная машина', audioDe: '/audio/words/house-cleaning/spuelmaschine.wav' },
      { id: 'kehrblech', de: 'das Kehrblech', ru: 'совок', audioDe: '/audio/words/house-cleaning/kehrblech.wav' }
    ],
    mantras: [
      { id: 'boden-fegen', de: 'Ich fege den Boden.', ru: 'Я подметаю пол.', audioDe: '/audio/mantras/house-cleaning/1.WAV' },
      { id: 'teppich-staubig', de: 'Der Teppich ist staubig.', ru: 'Ковёр пыльный.', audioDe: '/audio/mantras/house-cleaning/2.WAV' },
      { id: 'muell-wegwerfen', de: 'Ich werfe den Müll weg.', ru: 'Я выбрасываю мусор.', audioDe: '/audio/mantras/house-cleaning/3.WAV' },
      { id: 'fenster-aufmachen', de: 'Mach bitte das Fenster auf.', ru: 'Пожалуйста, открой окно.', audioDe: '/audio/mantras/house-cleaning/4.WAV' },
      { id: 'schimmel-bad', de: 'Da ist Schimmel im Bad.', ru: 'В ванной плесень.', audioDe: '/audio/mantras/house-cleaning/5.WAV' },
      { id: 'ueberall-staub', de: 'Hier ist überall Staub.', ru: 'Здесь везде пыль.', audioDe: '/audio/mantras/house-cleaning/6.WAV' },
      { id: 'geschirr-spuelen', de: 'Wer muss heute das Geschirr spülen?', ru: 'Кто сегодня должен мыть посуду?', audioDe: '/audio/mantras/house-cleaning/7.WAV' },
      { id: 'muell-voll', de: 'Der Mülleimer ist voll.', ru: 'Мусорное ведро полное.', audioDe: '/audio/mantras/house-cleaning/8.WAV' },
      { id: 'haushalt-helfen', de: 'Hilfst du mir beim Haushalt?', ru: 'Поможешь мне по хозяйству?', audioDe: '/audio/mantras/house-cleaning/9.WAV' },
      { id: 'handfeger-wo', de: 'Wo ist der Handfeger?', ru: 'Где совок / щётка?', audioDe: '/audio/mantras/house-cleaning/10.WAV' },
      { id: 'fleck-weg', de: 'Der Fleck geht nicht weg.', ru: 'Пятно не отходит.', audioDe: '/audio/mantras/house-cleaning/11.wav' },
      { id: 'lappen-brauchen', de: 'Ich brauche einen Lappen.', ru: 'Мне нужна тряпка.', audioDe: '/audio/mantras/house-cleaning/12.wav' },
      { id: 'hemden-buegeln', de: 'Ich bügle die Hemden.', ru: 'Я глажу рубашки.', audioDe: '/audio/mantras/house-cleaning/13.wav' },
      { id: 'buegeleisen-heiss', de: 'Das Bügeleisen ist heiß.', ru: 'Утюг горячий.', audioDe: '/audio/mantras/house-cleaning/14.wav' },
      { id: 'boden-wischen', de: 'Ich wische den Boden.', ru: 'Я мою / протираю пол.', audioDe: '/audio/mantras/house-cleaning/15.wav' },
      { id: 'waesche-waschen', de: 'Ich muss die Wäsche waschen.', ru: 'Мне нужно постирать бельё.', audioDe: '/audio/mantras/house-cleaning/16.wav' },
      { id: 'spiegel-fleckig', de: 'Der Spiegel ist fleckig.', ru: 'Зеркало в пятнах.', audioDe: '/audio/mantras/house-cleaning/17.wav' },
      { id: 'fleck-entfernen', de: 'Der Fleck muss entfernt werden.', ru: 'Пятно нужно удалить.', audioDe: '/audio/mantras/house-cleaning/18.wav' },
      { id: 'waesche-trocken', de: 'Ist die Wäsche schon trocken?', ru: 'Бельё уже сухое?', audioDe: '/audio/mantras/house-cleaning/19.wav' },
      { id: 'waesche-aufhaengen', de: 'Ich hänge die Wäsche auf.', ru: 'Я вешаю бельё сушиться.', audioDe: '/audio/mantras/house-cleaning/20.wav' },
      { id: 'wischmopp-schmutzig', de: 'Der Wischmopp ist schmutzig.', ru: 'Швабра грязная.', audioDe: '/audio/mantras/house-cleaning/21.wav' },
      { id: 'tisch-klebrig', de: 'Der Tisch ist klebrig.', ru: 'Стол липкий.', audioDe: '/audio/mantras/house-cleaning/22.wav' },
      { id: 'wasserhahn-tropft', de: 'Der Wasserhahn tropft.', ru: 'Кран капает.', audioDe: '/audio/mantras/house-cleaning/23.wav' },
      { id: 'zimmer-schmutzig', de: 'Das Zimmer ist schmutzig.', ru: 'Комната грязная.', audioDe: '/audio/mantras/house-cleaning/24.wav' },
      { id: 'eimer-voll-wasser', de: 'Der Eimer ist voll mit Wasser.', ru: 'Ведро полное воды.', audioDe: '/audio/mantras/house-cleaning/25.wav' },
      { id: 'kehrblech-ausleeren', de: 'Leere das Kehrblech aus, bitte.', ru: 'Высыпь, пожалуйста, совок.', audioDe: '/audio/mantras/house-cleaning/26.wav' },
      { id: 'aufraeumen-frage', de: 'Räumst du noch auf?', ru: 'Ты ещё приберёшься?', audioDe: '/audio/mantras/house-cleaning/27.wav' }
    ],
    quiz: [
      {
        question: "Was denkt der Mann über seine Frau?",
        options: ["Sie arbeitet sehr viel", "Sie sitzt zu Hause und macht nichts", "Sie ist sehr müde"],
        correctAnswer: "Sie sitzt zu Hause und macht nichts"
      },
      {
        question: "Was passierte zuerst am gestrigen Tag?",
        options: ["Die Hündin kam herein", "Die Kinder frühstückten", "Sie wollte die Wäsche waschen"],
        correctAnswer: "Sie wollte die Wäsche waschen"
      },
      {
        question: "Warum wurde der Boden schmutzig?",
        options: ["Die Kinder spielten", "Die Hündin kam mit nassen, schmutzigen Pfoten herein", "Es regnete"],
        correctAnswer: "Die Hündin kam mit nassen, schmutzigen Pfoten herein"
      },
      {
        question: "Was passierte im Keller?",
        options: ["Die Waschmaschine war kaputt", "Die Katze hatte einen Sack Mehl umgeworfen", "Es war sehr dunkel"],
        correctAnswer: "Die Katze hatte einen Sack Mehl umgeworfen"
      },
      {
        question: "Was entdeckte sie in einer Ecke?",
        options: ["Einen Fleck", "Schimmel", "Einen Besen"],
        correctAnswer: "Schimmel"
      },
      {
        question: "Was fragte der Mann am Abend?",
        options: ["Was hast du heute gemacht?", "Bist du müde?", "Ist alles sauber?"],
        correctAnswer: "Was hast du heute gemacht?"
      }
    ],
    exercises: [
      {
        sentence_ru: "Пол был полон грязи.",
        sentence: "Der ____ war voller Schmutz.",
        options: ["Boden", "Böden", "Tisch", "Teppich"],
        explanation: "Boden означает пол. Это правильный ответ в именительном падеже."
      },
      {
        sentence_ru: "Я беру швабру и начинаю мыть пол.",
        sentence: "Ich nehme den ____ und beginne, den Boden zu wischen.",
        options: ["Wischmopp", "Wischmopps", "Besen", "Staubsauger"],
        explanation: "Wischmopp означает швабра. Это правильный ответ в винительном падеже."
      },
      {
        sentence_ru: "Я взяла пылесос и всё пропылесосила.",
        sentence: "Ich nahm den ____ und saugte alles weg.",
        options: ["Staubsauger", "Staubsaugers", "Wischmopp", "Besen"],
        explanation: "Staubsauger означает пылесос. Это правильный ответ в винительном падеже."
      },
      {
        sentence_ru: "Я мою посуду перед тем, как убрать всё в посудомоечную машину.",
        sentence: "Ich ____ noch schnell ein paar Teller ab, bevor ich alles einräume.",
        options: ["spüle", "spülen", "wasche", "wische"],
        explanation: "spüle - форма глагола spülen (мыть посуду) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Всё было очень пыльно.",
        sentence: "Es war sehr ____.",
        options: ["staubig", "staubigem", "schmutzig", "klebrig"],
        explanation: "staubig означает пыльный. После es war используется предикативная форма прилагательного."
      },
      {
        sentence_ru: "Я взяла совок и веник и начала подметать.",
        sentence: "Ich nahm ____ und Besen und begann zu fegen.",
        options: ["Kehrblech", "Kehrblechs", "Eimer", "Schwamm"],
        explanation: "Kehrblech означает совок. Это правильный ответ в винительном падеже."
      },
      {
        sentence_ru: "Я должна выбросить несколько вещей.",
        sentence: "Ein paar Sachen musste ich ____.",
        options: ["wegwerfen", "wegwerfe", "einräumen", "aufräumen"],
        explanation: "wegwerfen - инфинитив глагола выбрасывать. После модального глагола müssen используется инфинитив."
      },
      {
        sentence_ru: "Всё было липко.",
        sentence: "Überall war es ____.",
        options: ["klebrig", "klebrigem", "staubig", "schmutzig"],
        explanation: "klebrig означает липкий. После es war используется предикативная форма прилагательного."
      },
      {
        sentence_ru: "На ковре были грязные следы.",
        sentence: "Auf dem ____ waren schmutzige Spuren.",
        options: ["Teppich", "Teppiche", "Boden", "Tisch"],
        explanation: "Teppich означает ковёр. После auf dem (на + дательный падеж) используется дательный падеж."
      },
      {
        sentence_ru: "Я протираю зеркало.",
        sentence: "Ich wische den ____ ab.",
        options: ["Spiegel", "Spiegels", "Fenster", "Boden"],
        explanation: "Spiegel означает зеркало. После den используется винительный падеж."
      },
      {
        sentence_ru: "Я открываю окно.",
        sentence: "Ich öffne das ____.",
        options: ["Fenster", "Fensters", "Spiegel", "Bügeleisen"],
        explanation: "Fenster означает окно. После das используется винительный падеж."
      },
      {
        sentence_ru: "Я подметаю пол.",
        sentence: "Ich ____ den Boden.",
        options: ["fege", "fegen", "wische", "wasche"],
        explanation: "fege - форма глагола fegen (подметать) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Я стираю бельё.",
        sentence: "Ich ____ die Wäsche.",
        options: ["wasche", "waschen", "trockne", "bügle"],
        explanation: "wasche - форма глагола waschen (стирать) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Я вешаю бельё сушиться.",
        sentence: "Ich ____ die Wäsche zum Trocknen.",
        options: ["hänge auf", "aufhängen", "wasche", "trockne"],
        explanation: "hänge auf - форма глагола aufhängen (вешать) в 1-м лице единственного числа. Разделяемый глагол."
      },
      {
        sentence_ru: "Бельё сохнет.",
        sentence: "Die Wäsche ____.",
        options: ["trocknet", "trocknen", "wascht", "hängt"],
        explanation: "trocknet - форма глагола trocknen (сушить) в 3-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Домашнее хозяйство требует много времени.",
        sentence: "Der ____ braucht viel Zeit.",
        options: ["Haushalt", "Haushalts", "Boden", "Eimer"],
        explanation: "Haushalt означает домашнее хозяйство. В именительном падеже после der используется основная форма."
      },
      {
        sentence_ru: "Я использую тряпку для уборки.",
        sentence: "Ich benutze einen ____ zum Putzen.",
        options: ["Lappen", "Lappens", "Schwamm", "Besen"],
        explanation: "Lappen означает тряпка. После einen используется винительный падеж."
      },
      {
        sentence_ru: "Я подметаю веником.",
        sentence: "Ich fege mit dem ____.",
        options: ["Besen", "Besens", "Kehrblech", "Wischmopp"],
        explanation: "Besen означает веник. После mit dem (с + дательный падеж) используется дательный падеж."
      },
      {
        sentence_ru: "Я глажу бельё утюгом.",
        sentence: "Ich bügle mit dem ____.",
        options: ["Bügeleisen", "Bügeleisens", "Besen", "Schwamm"],
        explanation: "Bügeleisen означает утюг. После mit dem используется дательный падеж."
      },
      {
        sentence_ru: "Я глажу рубашку.",
        sentence: "Ich ____ das Hemd.",
        options: ["bügle", "bügeln", "wasche", "trockne"],
        explanation: "bügle - форма глагола bügeln (гладить) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "В углу появилась плесень.",
        sentence: "In der Ecke war ____.",
        options: ["Schimmel", "Schimmels", "Fleck", "Staub"],
        explanation: "Schimmel означает плесень. После war используется именительный падеж."
      },
      {
        sentence_ru: "На ковре есть пятно.",
        sentence: "Auf dem Teppich ist ein ____.",
        options: ["Fleck", "Flecks", "Schimmel", "Staub"],
        explanation: "Fleck означает пятно. После ein используется именительный падеж."
      },
      {
        sentence_ru: "Я мою пол.",
        sentence: "Ich ____ den Boden.",
        options: ["wische", "wischen", "fege", "wasche"],
        explanation: "wische - форма глагола wischen (мыть пол) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "На столе много пыли.",
        sentence: "Auf dem Tisch ist viel ____.",
        options: ["Staub", "Staubs", "Schmutz", "Müll"],
        explanation: "Staub означает пыль. После viel используется именительный падеж."
      },
      {
        sentence_ru: "Кран капает.",
        sentence: "Der ____ tropft.",
        options: ["Wasserhahn", "Wasserhahns", "Eimer", "Spülmittel"],
        explanation: "Wasserhahn означает кран. В именительном падеже после der используется основная форма."
      },
      {
        sentence_ru: "Всё было грязно.",
        sentence: "Alles war ____.",
        options: ["schmutzig", "schmutzigem", "staubig", "klebrig"],
        explanation: "schmutzig означает грязный. После war используется предикативная форма прилагательного."
      },
      {
        sentence_ru: "Я убираю вещи в шкаф.",
        sentence: "Ich ____ die Sachen in den Schrank.",
        options: ["räume ein", "einräumen", "aufräumen", "wegwerfen"],
        explanation: "räume ein - форма глагола einräumen (убирать внутрь) в 1-м лице единственного числа. Разделяемый глагол."
      },
      {
        sentence_ru: "Я навожу порядок в комнате.",
        sentence: "Ich ____ das Zimmer auf.",
        options: ["räume auf", "aufräumen", "einräumen", "wischen"],
        explanation: "räume auf - форма глагола aufräumen (наводить порядок) в 1-м лице единственного числа. Разделяемый глагол."
      },
      {
        sentence_ru: "Я вытираю стол.",
        sentence: "Ich ____ den Tisch ab.",
        options: ["wische ab", "abwischen", "wischen", "spülen"],
        explanation: "wische ab - форма глагола abwischen (вытирать) в 1-м лице единственного числа. Разделяемый глагол."
      },
      {
        sentence_ru: "Я использую моющее средство.",
        sentence: "Ich benutze ____.",
        options: ["Spülmittel", "Spülmittels", "Schwamm", "Lappen"],
        explanation: "Spülmittel означает моющее средство. После benutze используется винительный падеж."
      },
      {
        sentence_ru: "Я использую губку для мытья.",
        sentence: "Ich benutze einen ____ zum Waschen.",
        options: ["Schwamm", "Schwamms", "Lappen", "Besen"],
        explanation: "Schwamm означает губка. После einen используется винительный падеж."
      },
      {
        sentence_ru: "Я проветриваю комнату.",
        sentence: "Ich ____ das Zimmer.",
        options: ["lüfte", "lüften", "wische", "räume"],
        explanation: "lüfte - форма глагола lüften (проветривать) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Я вытираю посуду насухо.",
        sentence: "Ich ____ das Geschirr ab.",
        options: ["trockne ab", "abtrocknen", "spüle", "wische"],
        explanation: "trockne ab - форма глагола abtrocknen (вытирать насухо) в 1-м лице единственного числа. Разделяемый глагол."
      },
      {
        sentence_ru: "Я складываю бельё.",
        sentence: "Ich ____ die Wäsche.",
        options: ["falte", "falten", "bügle", "wasche"],
        explanation: "falte - форма глагола falten (складывать) в 1-м лице единственного числа настоящего времени."
      },
      {
        sentence_ru: "Ведро стоит в углу.",
        sentence: "Der ____ steht in der Ecke.",
        options: ["Eimer", "Eimers", "Müll", "Schwamm"],
        explanation: "Eimer означает ведро. В именительном падеже после der используется основная форма."
      },
      {
        sentence_ru: "Я выношу мусор.",
        sentence: "Ich bringe den ____ raus.",
        options: ["Müll", "Mülls", "Eimer", "Staub"],
        explanation: "Müll означает мусор. После den используется винительный падеж."
      }
    ],
    articleExercises: [
      {
        word: "Boden",
        translation: "пол",
        correctArticle: "der",
        explanation: "Boden - мужской род (der). Слова, обозначающие поверхности, часто имеют мужской род."
      },
      {
        word: "Teppich",
        translation: "ковёр",
        correctArticle: "der",
        explanation: "Teppich - мужской род (der). Предметы интерьера часто имеют мужской род."
      },
      {
        word: "Spiegel",
        translation: "зеркало",
        correctArticle: "der",
        explanation: "Spiegel - мужской род (der). Предметы домашнего обихода часто имеют мужской род."
      },
      {
        word: "Haushalt",
        translation: "домашнее хозяйство",
        correctArticle: "der",
        explanation: "Haushalt - мужской род (der). Слова, оканчивающиеся на -halt, имеют мужской род."
      },
      {
        word: "Wischmopp",
        translation: "швабра",
        correctArticle: "der",
        explanation: "Wischmopp - мужской род (der). Инструменты для уборки часто имеют мужской род."
      },
      {
        word: "Lappen",
        translation: "тряпка",
        correctArticle: "der",
        explanation: "Lappen - мужской род (der). Предметы для уборки часто имеют мужской род."
      },
      {
        word: "Besen",
        translation: "веник / метла",
        correctArticle: "der",
        explanation: "Besen - мужской род (der). Инструменты для уборки часто имеют мужской род."
      },
      {
        word: "Schimmel",
        translation: "плесень",
        correctArticle: "der",
        explanation: "Schimmel - мужской род (der). Слова, оканчивающиеся на -el, часто имеют мужской род."
      },
      {
        word: "Fleck",
        translation: "пятно",
        correctArticle: "der",
        explanation: "Fleck - мужской род (der). Короткие слова часто имеют мужской род."
      },
      {
        word: "Staub",
        translation: "пыль",
        correctArticle: "der",
        explanation: "Staub - мужской род (der). Слова, обозначающие вещества, часто имеют мужской род."
      },
      {
        word: "Wasserhahn",
        translation: "кран (водопроводный)",
        correctArticle: "der",
        explanation: "Wasserhahn - мужской род (der). Составные слова с -hahn имеют мужской род."
      },
      {
        word: "Schmutz",
        translation: "грязь",
        correctArticle: "der",
        explanation: "Schmutz - мужской род (der). Слова, обозначающие вещества, часто имеют мужской род."
      },
      {
        word: "Eimer",
        translation: "ведро",
        correctArticle: "der",
        explanation: "Eimer - мужской род (der). Слова, оканчивающиеся на -er, часто имеют мужской род."
      },
      {
        word: "Müll",
        translation: "мусор",
        correctArticle: "der",
        explanation: "Müll - мужской род (der). Слова, обозначающие отходы, часто имеют мужской род."
      },
      {
        word: "Staubsauger",
        translation: "пылесос",
        correctArticle: "der",
        explanation: "Staubsauger - мужской род (der). Составные слова с -sauger имеют мужской род."
      },
      {
        word: "Schwamm",
        translation: "губка",
        correctArticle: "der",
        explanation: "Schwamm - мужской род (der). Предметы для уборки часто имеют мужской род."
      },
      {
        word: "Handfeger",
        translation: "совок (маленький)",
        correctArticle: "der",
        explanation: "Handfeger - мужской род (der). Инструменты для уборки часто имеют мужской род."
      },
      {
        word: "Kehrblech",
        translation: "совок",
        correctArticle: "die",
        explanation: "Kehrblech - женский род (die). Составные слова с -blech могут иметь женский род."
      },
      {
        word: "Fenster",
        translation: "окно",
        correctArticle: "das",
        explanation: "Fenster - средний род (das). Слова, оканчивающиеся на -er, могут иметь средний род."
      },
      {
        word: "Bügeleisen",
        translation: "утюг",
        correctArticle: "das",
        explanation: "Bügeleisen - средний род (das). Составные слова с -eisen имеют средний род."
      },
      {
        word: "Spülmittel",
        translation: "моющее средство",
        correctArticle: "das",
        explanation: "Spülmittel - средний род (das). Составные слова с -mittel имеют средний род."
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'На собеседовании (Die Vorstellungsgespräch)',
    description: 'Тема доступна с 10.01.2026',
    icon: 'fa-briefcase',
    color: 'bg-purple-500',
    level: 'B1-B2',
    videoUrl: 'https://kinescope.io/embed/7wuLuXcpvNwJ9bMBe5ruVF',
    availableFrom: '2026-01-10',
    dialog: {
      title: 'Eine schwarze Katze – ein schlechtes Zeichen?',
      imageUrl: '/Thema3_photo.png',
      text: `„Ach nein, das hat mir gerade noch gefehlt", denkt Anna, als ihr eine schwarze Katze über den Weg läuft. Doch Anna vergisst die schlechten Gedanken schnell. Sie beeilt sich, weil sie pünktlich ankommen möchte, denn heute hat sie ein wichtiges Vorstellungsgespräch für eine Position als Führungskraft.

Sie hat viel Mühe in ihre Bewerbung gesteckt. Als sie die Stellenanzeige im Internet sah, bewarb sie sich sofort, weil die Branche sehr kompetitiv ist. Sie hat ihren Lebenslauf aktualisiert, ein überzeugendes Anschreiben verfasst und zusammen mit ihren Zeugnissen online verschickt. Nachdem sie lange nach Arbeit gesucht und viele Interviews geführt hatte, bekam sie bisher oft nur Absagen. Aber diesmal hofft Anna, dass alles anders läuft. Sie hofft, dass die Firma ihr Vertrauen schenkt.

Im Büro wird Anna von der Assistentin empfangen, die sie zu Herrn Müller begleitet, dem erfahrenen Leiter des Unternehmens. Der Chef begrüßt sie freundlich und bietet ihr eine Tasse Kaffee an. Anna lehnt höflich ab, weil ihre Hände sehr zittern. 

Am Anfang läuft alles gut. Herr Müller bittet Anna: „Können Sie sich kurz vorstellen?" Anna erzählt ruhig von ihrer Berufserfahrung und davon, für welche Aufgaben sie zuständig war. Dann fragt Herr Müller nach ihren Stärken und Schwächen. Anna beschreibt sich als zuverlässig sowie zielstrebig und erklärt, dass sie manchmal zu perfektionistisch ist, aber gerne Verantwortung übernimmt. Sie hat das Gefühl, dass sie einen sehr guten Eindruck macht.

Danach sprechen sie über die Konditionen. Sie verhandeln über das Gehalt, und Herr Müller erklärt auch, dass die Probezeit sechs Monate dauert. Alles scheint unter Kontrolle zu sein — als plötzlich laute Musik aus Annas Tasche ertönt. Eine Männerstimme singt laut: „Ich liebe dich bis zu den Tränen …" Anna sieht auf das Display und erkennt sofort, dass es ihre Mutter ist. Sie wird rot, entschuldigt sich und wühlt nervös in ihrer Tasche. Die Musik hört nicht auf. Herr Müller wartet geduldig. Endlich findet Anna das Handy und schaltet es aus.

Auf die restlichen Fragen antwortet Anna nicht mehr mit demselben Enthusiasmus. Sie denkt, dass man sie nach diesem Vorfall sicher nicht einstellt. Herr Müller beendet das Vorstellungsgespräch mit einem Lächeln und sagt, dass sie sich melden, sobald eine Entscheidung getroffen ist.

Anna geht niedergeschlagen nach Hause und denkt an die schwarze Katze vom Morgen. Vielleicht war sie doch ein schlechtes Zeichen. Zu Hause ruft Anna ihre Mutter zurück. Die Mutter möchte wissen, wie das Gespräch gelaufen ist. Anna will sie nicht beunruhigen und sagt, dass alles in Ordnung sei. Die Mutter lädt sie zu Pfannkuchen ein, aber Anna ist so enttäuscht über den Verlauf des Tages, dass sie keinen Appetit hat.

Am Abend klingelt plötzlich das Telefon. „Hallo Frau Schneider, hier ist Herr Müller. Wir haben uns entschieden: Sie sind die passende Kandidatin für diese Position. Wir möchten Sie einstellen und Ihnen einen Vertrag anbieten. Sie können schon ab dem nächsten Monat anfangen. Sind Sie bereit?"

Anna stockt der Atem. Dann nimmt sie sich zusammen und sagt ruhig: „Natürlich, Herr Müller. Vielen Dank für Ihr Vertrauen. Ich kann es kaum erwarten, anzufangen." Nachdem sie aufgelegt hat, springt Anna vor Freude durch das Zimmer, zieht schnell ihre Jacke an und rennt zu ihrer Mutter — die Pfannkuchen warten.`,
      translation: "Полный перевод истории доступен в режиме изучения.",
      audioUrl: '/Thema3_audio.wav'
    },
    words: [
      { id: 'vorstellung', de: 'die Vorstellung', ru: 'представление, собеседование', audioDe: '/audio/words/job-interview/vorstellung.wav' },
      { id: 'vorstellen', de: 'vorstellen', ru: 'представлять, знакомить', audioDe: '/audio/words/job-interview/vorstellen.wav' },
      { id: 'muehe', de: 'die Mühe', ru: 'усилие, труд', audioDe: '/audio/words/job-interview/muehe.wav' },
      { id: 'sich-bemuehen', de: 'sich bemühen', ru: 'стараться, прилагать усилия', audioDe: '/audio/words/job-interview/sich-bemuehen.wav' },
      { id: 'bewerbung', de: 'die Bewerbung', ru: 'заявка, резюме', audioDe: '/audio/words/job-interview/bewerbung.wav' },
      { id: 'sich-bewerben-um', de: 'sich bewerben um', ru: 'подавать заявку на', audioDe: '/audio/words/job-interview/sich-bewerben-um.wav' },
      { id: 'absage', de: 'die Absage', ru: 'отказ, отмена', audioDe: '/audio/words/job-interview/absage.wav' },
      { id: 'absagen', de: 'absagen', ru: 'отменять, отказывать', audioDe: '/audio/words/job-interview/absagen.wav' },
      { id: 'vertrauen', de: 'das Vertrauen', ru: 'доверие', audioDe: '/audio/words/job-interview/vertrauen-noun.wav' },
      { id: 'vertrauen-verb', de: 'vertrauen', ru: 'доверять', audioDe: '/audio/words/job-interview/vertrauen.wav' },
      { id: 'unternehmen-noun', de: 'das Unternehmen', ru: 'предприятие, компания', audioDe: '/audio/words/job-interview/unternehmen-noun.wav' },
      { id: 'unternehmen-verb', de: 'unternehmen', ru: 'предпринимать', audioDe: '/audio/words/job-interview/unternehmen.wav' },
      { id: 'leiter', de: 'der Leiter', ru: 'руководитель, директор', audioDe: '/audio/words/job-interview/leiter.wav' },
      { id: 'erfahrung', de: 'die Erfahrung', ru: 'опыт', audioDe: '/audio/words/job-interview/erfahrung.wav' },
      { id: 'erfahren', de: 'erfahren', ru: 'узнавать, испытывать', audioDe: '/audio/words/job-interview/erfahren.wav' },
      { id: 'erfolg', de: 'der Erfolg', ru: 'успех', audioDe: '/audio/words/job-interview/erfolg.wav' },
      { id: 'entscheidung', de: 'die Entscheidung', ru: 'решение', audioDe: '/audio/words/job-interview/entscheidung.wav' },
      { id: 'entscheiden', de: 'entscheiden', ru: 'решать', audioDe: '/audio/words/job-interview/entscheiden.wav' },
      { id: 'fehlen', de: 'fehlen', ru: 'отсутствовать, не хватать', audioDe: '/audio/words/job-interview/fehlen.wav' },
      { id: 'sich-beeilen', de: 'sich beeilen', ru: 'торопиться', audioDe: '/audio/words/job-interview/sich-beeilen.wav' },
      { id: 'ablehnen', de: 'ablehnen', ru: 'отклонять, отказывать', audioDe: '/audio/words/job-interview/ablehnen.wav' },
      { id: 'uebernehmen', de: 'übernehmen', ru: 'брать на себя, принимать', audioDe: '/audio/words/job-interview/uebernehmen.wav' },
      { id: 'aufhoeren', de: 'aufhören', ru: 'прекращать, переставать', audioDe: '/audio/words/job-interview/aufhoeren.wav' },
      { id: 'einstellen', de: 'einstellen', ru: 'нанимать, устанавливать', audioDe: '/audio/words/job-interview/einstellen.wav' },
      { id: 'zustaendig', de: 'zuständig', ru: 'ответственный за', audioDe: '/audio/words/job-interview/zustaendig.wav' },
      { id: 'zuverlaessig', de: 'zuverlässig', ru: 'надёжный', audioDe: '/audio/words/job-interview/zuverlaessig.wav' },
      { id: 'zuverlaessigkeit', de: 'die Zuverlässigkeit', ru: 'надёжность', audioDe: '/audio/words/job-interview/zuverlaessigkeit.wav' },
      { id: 'zielstrebig', de: 'zielstrebig', ru: 'целеустремлённый', audioDe: '/audio/words/job-interview/zielstrebig.wav' },
      { id: 'branche', de: 'die Branche', ru: 'отрасль, сфера', audioDe: '/audio/words/job-interview/branche.wav' },
      { id: 'lebenslauf', de: 'der Lebenslauf', ru: 'резюме, биография', audioDe: '/audio/words/job-interview/lebenslauf.wav' },
      { id: 'empfangen', de: 'empfangen', ru: 'принимать, встречать', audioDe: '/audio/words/job-interview/empfangen.wav' }
    ],
    mantras: [
      { id: 'leiter-des-teams', de: 'Er ist Leiter des Teams.', ru: 'Он руководитель команды.', audioDe: '/audio/mantras/job-interview/leiter-des-teams.wav' },
      { id: 'vorstellungsgespraech-heute', de: 'Heute habe ich ein Vorstellungsgespräch.', ru: 'Сегодня у меня собеседование.', audioDe: '/audio/mantras/job-interview/vorstellungsgespraech-heute.wav' },
      { id: 'projekt-vorstellen', de: 'Stellen Sie das neue Projekt vor?', ru: 'Представьте новый проект?', audioDe: '/audio/mantras/job-interview/projekt-vorstellen.wav' },
      { id: 'kostet-muehe', de: 'Das kostet Mühe.', ru: 'Это требует усилий.', audioDe: '/audio/mantras/job-interview/kostet-muehe.wav' },
      { id: 'bemueht-sich-sehr', de: 'Sie bemüht sich jetzt sehr.', ru: 'Она сейчас очень старается.', audioDe: '/audio/mantras/job-interview/bemueht-sich-sehr.wav' },
      { id: 'bewerbe-mich-um-job', de: 'Ich bewerbe mich heute um den Job.', ru: 'Я сегодня подаю заявку на эту работу.', audioDe: '/audio/mantras/job-interview/bewerbe-mich-um-job.wav' },
      { id: 'termin-absagen', de: 'Er sagt den Termin heute ab.', ru: 'Он отменяет встречу сегодня.', audioDe: '/audio/mantras/job-interview/termin-absagen.wav' },
      { id: 'vertrauen-wichtig', de: 'Vertrauen ist sehr wichtig.', ru: 'Доверие очень важно.', audioDe: '/audio/mantras/job-interview/vertrauen-wichtig.wav' },
      { id: 'kinder-vertrauen-eltern', de: 'Kinder vertrauen ihren Eltern.', ru: 'Дети доверяют своим родителям.', audioDe: '/audio/mantras/job-interview/kinder-vertrauen-eltern.wav' },
      { id: 'unternehmen-sucht-mitarbeiter', de: 'Das Unternehmen sucht Mitarbeiter.', ru: 'Компания ищет сотрудников.', audioDe: '/audio/mantras/job-interview/unternehmen-sucht-mitarbeiter.wav' },
      { id: 'unternehmen-etwas-neues', de: 'Wir unternehmen heute etwas Neues.', ru: 'Мы сегодня предпринимаем что-то новое.', audioDe: '/audio/mantras/job-interview/unternehmen-etwas-neues.wav' },
      { id: 'viel-erfahrung', de: 'Sie hat viel Erfahrung.', ru: 'У неё большой опыт.', audioDe: '/audio/mantras/job-interview/viel-erfahrung.wav' },
      { id: 'erfolg-bringt-freude', de: 'Erfolg bringt große Freude.', ru: 'Успех приносит большую радость.', audioDe: '/audio/mantras/job-interview/erfolg-bringt-freude.wav' },
      { id: 'entscheiden-gemeinsam', de: 'Wir entscheiden alles gemeinsam.', ru: 'Мы решаем всё вместе.', audioDe: '/audio/mantras/job-interview/entscheiden-gemeinsam.wav' },
      { id: 'fehlt-geld', de: 'Meinem Bruder fehlt Geld.', ru: 'Моему брату не хватает денег.', audioDe: '/audio/mantras/job-interview/fehlt-geld.wav' },
      { id: 'empfangen-gaeste', de: 'Wir empfangen Gäste herzlich.', ru: 'Мы сердечно принимаем гостей.', audioDe: '/audio/mantras/job-interview/empfangen-gaeste.wav' },
      { id: 'lehnt-einladung-ab', de: 'Sie lehnt die Einladung höflich ab.', ru: 'Она вежливо отклоняет приглашение.', audioDe: '/audio/mantras/job-interview/lehnt-einladung-ab.wav' },
      { id: 'chef-uebernimmt-verantwortung', de: 'Der Chef übernimmt Verantwortung.', ru: 'Шеф берёт на себя ответственность.', audioDe: '/audio/mantras/job-interview/chef-uebernimmt-verantwortung.wav' },
      { id: 'regen-hoert-auf', de: 'Der Regen hört jetzt auf.', ru: 'Дождь сейчас прекращается.', audioDe: '/audio/mantras/job-interview/regen-hoert-auf.wav' },
      { id: 'firma-stellt-ein', de: 'Die Firma stellt Mitarbeiter ein.', ru: 'Фирма нанимает сотрудников.', audioDe: '/audio/mantras/job-interview/firma-stellt-ein.wav' },
      { id: 'zuverlaessiger-arbeiter', de: 'Dieser Arbeiter ist sehr zuverlässig.', ru: 'Этот работник очень надёжный.', audioDe: '/audio/mantras/job-interview/zuverlaessiger-arbeiter.wav' },
      { id: 'zielstrebige-studentin', de: 'Sie ist immer eine zielstrebige Studentin.', ru: 'Она всегда целеустремлённая студентка.', audioDe: '/audio/mantras/job-interview/zielstrebige-studentin.wav' },
      { id: 'schicke-lebenslauf', de: 'Ich schicke meinen Lebenslauf.', ru: 'Я отправляю своё резюме.', audioDe: '/audio/mantras/job-interview/schicke-lebenslauf.wav' }
    ],
    exercises: [
      {
        sentence_ru: "Сегодня у меня собеседование.",
        sentence: "Heute habe ich ein ____.",
        options: ["Vorstellungsgespräch", "Vorstellung", "Bewerbung", "Unternehmen"],
        explanation: "Vorstellungsgespräch - собеседование. После ein используется средний род в винительном падеже."
      },
      {
        sentence_ru: "Представьте себя, пожалуйста.",
        sentence: "____ Sie sich bitte vor.",
        options: ["Stellen", "Stelle", "Vorstellen", "Stellt"],
        explanation: "Stellen - форма глагола vorstellen (представлять) в повелительном наклонении множественного числа."
      },
      {
        sentence_ru: "Это требует усилий.",
        sentence: "Das kostet ____.",
        options: ["Mühe", "Mühen", "Anstrengung", "Aufwand"],
        explanation: "Mühe - усилие, труд. После kostet используется единственное число в винительном падеже (Akkusativ)."
      },
      {
        sentence_ru: "Она очень старается.",
        sentence: "Sie ____ sich sehr.",
        options: ["bemüht", "bemühen", "bemühe", "bemüht sich"],
        explanation: "bemüht - форма глагола sich bemühen (стараться) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Я подаю заявку на эту работу.",
        sentence: "Ich ____ mich um diese Stelle.",
        options: ["bewerbe", "bewerben", "bewirbt", "bewarb"],
        explanation: "bewerbe - форма глагола sich bewerben (подавать заявку) в 1-м лице единственного числа."
      },
      {
        sentence_ru: "Он отменяет встречу.",
        sentence: "Er ____ den Termin ab.",
        options: ["sagt ab", "absagen", "absagt", "abgesagt"],
        explanation: "sagt ab - форма разделяемого глагола absagen (отменять) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Доверие очень важно.",
        sentence: "____ ist sehr wichtig.",
        options: ["Vertrauen", "Vertrauens", "Vertraue", "Vertraut"],
        explanation: "Vertrauen - доверие. Это существительное среднего рода в именительном падеже."
      },
      {
        sentence_ru: "Дети доверяют родителям.",
        sentence: "Kinder ____ ihren Eltern.",
        options: ["vertrauen", "vertraut", "vertraue", "vertraute"],
        explanation: "vertrauen - форма глагола vertrauen (доверять) в 3-м лице множественного числа."
      },
      {
        sentence_ru: "Компания ищет сотрудников.",
        sentence: "Das ____ sucht Mitarbeiter.",
        options: ["Unternehmen", "Unternehmens", "Unternehme", "Firma"],
        explanation: "Unternehmen - предприятие, компания. Это существительное среднего рода в именительном падеже."
      },
      {
        sentence_ru: "Мы предпринимаем что-то новое.",
        sentence: "Wir ____ heute etwas Neues.",
        options: ["unternehmen", "unternehmt", "unternehme", "unternahm"],
        explanation: "unternehmen - форма глагола unternehmen (предпринимать) в 1-м лице множественного числа."
      },
      {
        sentence_ru: "Он руководитель компании.",
        sentence: "Er ist ____ des Unternehmens.",
        options: ["Leiter", "Leiters", "Leiterin", "Leitern"],
        explanation: "Leiter - руководитель. В именительном падеже после ist используется основная форма."
      },
      {
        sentence_ru: "У неё большой опыт.",
        sentence: "Sie hat viel ____.",
        options: ["Erfahrung", "Erfahrungen", "Erfahrungs", "Erfahren"],
        explanation: "Erfahrung - опыт. После viel используется единственное число в винительном падеже."
      },
      {
        sentence_ru: "Успех приносит радость.",
        sentence: "____ bringt Freude.",
        options: ["Erfolg", "Erfolgs", "Erfolge", "Erfolgen"],
        explanation: "Erfolg - успех. В именительном падеже после артикля используется основная форма."
      },
      {
        sentence_ru: "Мы решаем всё вместе.",
        sentence: "Wir ____ alles gemeinsam.",
        options: ["entscheiden", "entscheidet", "entscheide", "entschied"],
        explanation: "entscheiden - форма глагола entscheiden (решать) в 1-м лице множественного числа."
      },
      {
        sentence_ru: "Мне не хватает времени.",
        sentence: "Mir ____ Zeit.",
        options: ["fehlt", "fehlen", "fehle", "fehlte"],
        explanation: "fehlt - форма глагола fehlen (не хватать) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Она торопится на работу.",
        sentence: "Sie ____ sich zur Arbeit.",
        options: ["beeilt", "beeilen", "beeile", "beeilte"],
        explanation: "beeilt - форма глагола sich beeilen (торопиться) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Она отклоняет приглашение.",
        sentence: "Sie ____ die Einladung ab.",
        options: ["lehnt ab", "ablehnen", "ablehnt", "abgelehnt"],
        explanation: "lehnt ab - форма разделяемого глагола ablehnen (отклонять) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Шеф берёт на себя ответственность.",
        sentence: "Der Chef ____ Verantwortung.",
        options: ["übernimmt", "übernehmen", "übernehme", "übernahm"],
        explanation: "übernimmt - форма глагола übernehmen (брать на себя) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Дождь прекращается.",
        sentence: "Der Regen ____ auf.",
        options: ["hört auf", "aufhören", "aufhört", "aufgehört"],
        explanation: "hört auf - форма разделяемого глагола aufhören (прекращать) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Фирма нанимает сотрудников.",
        sentence: "Die Firma ____ Mitarbeiter ein.",
        options: ["stellt ein", "einstellen", "einstellt", "eingestellt"],
        explanation: "stellt ein - форма разделяемого глагола einstellen (нанимать) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Он ответственный за этот проект.",
        sentence: "Er ist ____ dieses Projekt.",
        options: ["zuständig für", "zuständig", "zuständigen", "zuständiges"],
        explanation: "zuständig für - ответственный за. После ist используется предикативная форма прилагательного."
      },
      {
        sentence_ru: "Он очень надёжный работник.",
        sentence: "Er ist ein sehr ____ Arbeiter.",
        options: ["zuverlässiger", "zuverlässig", "zuverlässigen", "zuverlässiges"],
        explanation: "zuverlässiger - надёжный. После ein используется мужской род в именительном падеже."
      },
      {
        sentence_ru: "Она целеустремлённая студентка.",
        sentence: "Sie ist eine ____ Studentin.",
        options: ["zielstrebige", "zielstrebig", "zielstrebigen", "zielstrebiger"],
        explanation: "zielstrebige - целеустремлённая. После eine используется женский род в именительном падеже."
      },
      {
        sentence_ru: "Эта отрасль очень конкурентная.",
        sentence: "Diese ____ ist sehr kompetitiv.",
        options: ["Branche", "Branchen", "Branches", "Bereich"],
        explanation: "Branche - отрасль, сфера. В именительном падеже после diese используется основная форма."
      },
      {
        sentence_ru: "Я отправляю своё резюме.",
        sentence: "Ich ____ meinen Lebenslauf.",
        options: ["schicke", "schicken", "schickt", "schickte"],
        explanation: "schicke - форма глагола schicken (отправлять) в 1-м лице единственного числа."
      },
      {
        sentence_ru: "Они принимают гостей.",
        sentence: "Sie ____ Gäste.",
        options: ["empfangen", "empfängt", "empfange", "empfing"],
        explanation: "empfangen - форма глагола empfangen (принимать) в 3-м лице множественного числа."
      }
    ],
    articleExercises: [
      {
        word: "Vorstellung",
        translation: "представление, собеседование",
        correctArticle: "die",
        explanation: "Vorstellung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Mühe",
        translation: "усилие, труд",
        correctArticle: "die",
        explanation: "Mühe - женский род (die). Абстрактные существительные часто имеют женский род."
      },
      {
        word: "Bewerbung",
        translation: "заявка, резюме",
        correctArticle: "die",
        explanation: "Bewerbung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Absage",
        translation: "отказ, отмена",
        correctArticle: "die",
        explanation: "Absage - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Vertrauen",
        translation: "доверие",
        correctArticle: "das",
        explanation: "Vertrauen - средний род (das). Абстрактные существительные часто имеют средний род."
      },
      {
        word: "Unternehmen",
        translation: "предприятие, компания",
        correctArticle: "das",
        explanation: "Unternehmen - средний род (das). Слова, оканчивающиеся на -en, могут иметь средний род."
      },
      {
        word: "Leiter",
        translation: "руководитель, директор",
        correctArticle: "der",
        explanation: "Leiter - мужской род (der). Слова, оканчивающиеся на -er, часто имеют мужской род."
      },
      {
        word: "Erfahrung",
        translation: "опыт",
        correctArticle: "die",
        explanation: "Erfahrung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Erfolg",
        translation: "успех",
        correctArticle: "der",
        explanation: "Erfolg - мужской род (der). Слова, оканчивающиеся на -g, часто имеют мужской род."
      },
      {
        word: "Entscheidung",
        translation: "решение",
        correctArticle: "die",
        explanation: "Entscheidung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Zuverlässigkeit",
        translation: "надёжность",
        correctArticle: "die",
        explanation: "Zuverlässigkeit - женский род (die). Слова, оканчивающиеся на -keit, имеют женский род."
      },
      {
        word: "Branche",
        translation: "отрасль, сфера",
        correctArticle: "die",
        explanation: "Branche - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Lebenslauf",
        translation: "резюме, биография",
        correctArticle: "der",
        explanation: "Lebenslauf - мужской род (der). Составные слова с -lauf имеют мужской род."
      }
    ],
    quiz: []
  },
  {
    id: 'apartment-search',
    title: 'Поиск жилья (Die Wohnungssuche)',
    description: 'История о поиске квартиры и слова для общения с арендодателями',
    icon: 'fa-key',
    color: 'bg-yellow-500',
    level: 'A2-B1',
    videoUrl: 'https://play.boomstream.com/dyfrCcmz',
    dialog: {
      title: 'Eine Wohnung, drei Monate und ein Kollege',
      text: `Markus sitzt gerade in einem Meeting mit seinem Team im Büro. Seine Kollegen sprechen über Termine, Zahlen und neue Aufgaben. Markus versucht, ihnen zuzuhören, doch es fällt ihm schwer, sich zu konzentrieren. Seine Gedanken sind ganz woanders.

Schon sehr bald sollen seine Frau und sein Kind nachkommen. Deshalb muss er dringend eine richtige Wohnung mieten. Ein einzelnes Zimmer reicht dafür einfach nicht mehr, und seit drei Monaten sucht er nun eine Wohnung.

Am Anfang hat Markus gedacht, dass die Wohnungssuche nicht so kompliziert sein kann. Er hat jeden Abend Wohnungsanzeigen im Internet angeschaut. Viele Wohnungen waren zwar verfügbar, aber oft unmöbliert oder mit einer sehr kleinen Wohnfläche. Manchmal hat ihm der Grundriss nicht gefallen, manchmal hat die Wohnung in einem hohen Stockwerk ohne Aufzug gelegen.

Markus hat Nachrichten an Vermieter geschrieben, hat sich zu Besichtigungen angemeldet und hat auf Antworten gewartet.
In diesen Monaten hat er unzählige Nachrichten geschrieben, viele Besichtigungen gemacht, aber am Ende keine passende Wohnung gefunden.

Sehr schnell hat er gemerkt, dass die Wohnungssuche in Deutschland ein echtes Problem ist. Auf jede Anzeige hat es viele Interessenten gegeben, und oft hat er gar keine Antwort bekommen oder sofort eine Absage erhalten.

Bei einer Besichtigung war die Kaltmiete noch akzeptabel, doch mit den Nebenkosten war die Warmmiete viel zu hoch und nicht mehr bezahlbar. Bei einer anderen Wohnung hat zwar die Lage gepasst, aber der Vermieter hat eine hohe Kaution verlangt. Außerdem waren viele Wohnungen leer und unmöbliert – ohne Küche, ohne Lampen, ohne alles.

Einmal hat Markus bei einer Besichtigung das Wort „Übernahme gehört": Der Vormieter wollte, dass Markus die Küche und einen Teil der Möbel übernimmt. Das war ihm zu teuer.

Er hat alles versucht, aber bis jetzt hat er noch keinen Mietvertrag unterschrieben und hat nicht gewusst, wie lange er diese Situation noch aushält.

Nach drei Monaten ist Markus völlig erschöpft.

Plötzlich reißt ihn die Stimme eines Kollegen aus seinen Gedanken.

„Markus, ist alles in Ordnung? Du siehst wirklich sehr niedergeschlagen aus."

„Ach, ich habe genug Probleme. Ich suche seit drei Monaten eine Wohnung. Entweder bekomme ich nur Absagen oder die Wohnungen sind einfach nicht bezahlbar."

Der Kollege schaut ihn plötzlich überrascht an.

„Warum hast du mir das nicht früher gesagt?"

„Wieso?" fragt Markus.

Der Kollege lacht.

Ich habe meinen Mietvertrag gekündigt, weil meine Frau eine neue Arbeit hat. Wir ziehen näher an ihren Arbeitsplatz, deshalb suche ich jetzt einen Nachmieter.

Markus hebt den Kopf - „Was meinst du?"

„Der Einzug ist in einem Monat möglich", erklärt Paul.
„Die Wohnung ist noch verfügbar, die Warmmiete ist fair, und die Küche bleibt drin."

Zum ersten Mal seit Wochen lächelt Markus - „Das ist genial. Ich kenne deine Wohnung. Die Lage passt perfekt."

Manchmal ist es im Leben so:
Die Lösung liegt näher, als man denkt.`,
      translation: `Маркус сидит на совещании со своей командой в офисе. Его коллеги говорят о встречах, цифрах и новых задачах. Маркус пытается их слушать, но ему трудно сосредоточиться. Его мысли совсем в другом месте.

Очень скоро должны приехать его жена и ребёнок. Поэтому ему срочно нужно снять настоящую квартиру. Одной комнаты для этого уже просто недостаточно, и вот уже три месяца он ищет квартиру.

В начале Маркус думал, что поиск квартиры не может быть таким сложным. Он каждый вечер просматривал объявления о квартирах в интернете. Много квартир было доступно, но часто они были без мебели или с очень маленькой жилой площадью. Иногда ему не нравилась планировка, иногда квартира находилась на высоком этаже без лифта.

Маркус писал сообщения арендодателям, записывался на просмотры и ждал ответов.
За эти месяцы он написал бесчисленное количество сообщений, провёл много просмотров, но в итоге не нашёл подходящей квартиры.

Очень быстро он понял, что поиск квартиры в Германии – это настоящая проблема. На каждое объявление было много заинтересованных, и часто он вообще не получал ответа или сразу получал отказ.

На одном просмотре холодная арендная плата ещё была приемлемой, но с коммунальными услугами тёплая арендная плата была слишком высокой и уже неподъёмной. В другой квартире расположение подходило, но арендодатель требовал высокий залог. Кроме того, многие квартиры были пустыми и без мебели – без кухни, без ламп, без всего.

Однажды на просмотре Маркус услышал слово "передача": предыдущий арендатор хотел, чтобы Маркус взял кухню и часть мебели. Это было для него слишком дорого.

Он всё перепробовал, но до сих пор не подписал договор аренды и не знал, как долго он ещё выдержит эту ситуацию.

После трёх месяцев Маркус совершенно измотан.

Внезапно голос коллеги вырывает его из мыслей.

"Маркус, всё в порядке? Ты выглядишь очень подавленным."

"Ах, у меня достаточно проблем. Я ищу квартиру уже три месяца. Либо я получаю только отказы, либо квартиры просто неподъёмные."

Коллега внезапно смотрит на него удивлённо.

"Почему ты мне об этом раньше не сказал?"

"Почему?" – спрашивает Маркус.

Коллега смеётся.

Я расторг свой договор аренды, потому что у моей жены новая работа. Мы переезжаем ближе к её месту работы, поэтому я сейчас ищу преемника.

Маркус поднимает голову – "Что ты имеешь в виду?"

"Въезд возможен через месяц", объясняет Пауль.
"Квартира ещё свободна, тёплая арендная плата справедливая, и кухня остаётся."

Впервые за несколько недель Маркус улыбается – "Это гениально. Я знаю твою квартиру. Расположение идеально подходит."

Иногда в жизни бывает так:
Решение ближе, чем кажется.`,
      audioUrl: '/Thema4_audio.mp3',
      imageUrl: '/Thema4_photo.png',
      pdfUrl: '/Thema 4.pdf'
    },
    words: [
      { id: 'aufgabe', de: 'die Aufgabe', ru: 'задача, задание', audioDe: '/audio/words/apartment-search/aufgabe.wav' },
      { id: 'geben', de: 'geben', ru: 'давать', audioDe: '/audio/words/apartment-search/geben.wav' },
      { id: 'fallen', de: 'fallen', ru: 'падать', audioDe: '/audio/words/apartment-search/fallen.wav' },
      { id: 'nachkommen', de: 'nachkommen', ru: 'приезжать, следовать', audioDe: '/audio/words/apartment-search/nachkommen.wav' },
      { id: 'kommen', de: 'kommen', ru: 'приходить, приезжать', audioDe: '/audio/words/apartment-search/kommen.wav' },
      { id: 'mieten', de: 'mieten', ru: 'снимать, арендовать', audioDe: '/audio/words/apartment-search/mieten.wav' },
      { id: 'vermieter', de: 'der Vermieter', ru: 'арендодатель', audioDe: '/audio/words/apartment-search/vermieter.wav' },
      { id: 'nachmieter', de: 'der Nachmieter', ru: 'преемник (арендатор)', audioDe: '/audio/words/apartment-search/nachmieter.wav' },
      { id: 'mieter', de: 'der Mieter', ru: 'арендатор', audioDe: '/audio/words/apartment-search/mieter.wav' },
      { id: 'mietvertrag', de: 'der Mietvertrag', ru: 'договор аренды', audioDe: '/audio/words/apartment-search/mietvertrag.wav' },
      { id: 'warmmiete', de: 'die Warmmiete', ru: 'тёплая арендная плата (с коммунальными услугами)', audioDe: '/audio/words/apartment-search/warmmiete.wav' },
      { id: 'kaltmiete', de: 'die Kaltmiete', ru: 'холодная арендная плата (без коммунальных услуг)', audioDe: '/audio/words/apartment-search/kaltmiete.wav' },
      { id: 'wohnung', de: 'die Wohnung', ru: 'квартира', audioDe: '/audio/words/apartment-search/wohnung.wav' },
      { id: 'anzeige', de: 'die Anzeige', ru: 'объявление', audioDe: '/audio/words/apartment-search/anzeige.wav' },
      { id: 'anzeigen', de: 'anzeigen', ru: 'показывать, объявлять', audioDe: '/audio/words/apartment-search/anzeigen.wav' },
      { id: 'verfuegbar', de: 'verfügbar', ru: 'доступный, имеющийся в наличии', audioDe: '/audio/words/apartment-search/verfuegbar.wav' },
      { id: 'verfuegbarkeit', de: 'die Verfügbarkeit', ru: 'доступность', audioDe: '/audio/words/apartment-search/verfuegbarkeit.wav' },
      { id: 'verfuegen', de: 'verfügen', ru: 'располагать, иметь в распоряжении', audioDe: '/audio/words/apartment-search/verfuegen.wav' },
      { id: 'grundriss', de: 'der Grundriss', ru: 'план, планировка', audioDe: '/audio/words/apartment-search/grundriss.wav' },
      { id: 'kaution', de: 'die Kaution', ru: 'залог', audioDe: '/audio/words/apartment-search/kaution.wav' },
      { id: 'vertrag', de: 'der Vertrag', ru: 'договор', audioDe: '/audio/words/apartment-search/vertrag.wav' },
      { id: 'aufzug', de: 'der Aufzug', ru: 'лифт', audioDe: '/audio/words/apartment-search/aufzug.wav' },
      { id: 'besichtigen', de: 'besichtigen', ru: 'осматривать', audioDe: '/audio/words/apartment-search/besichtigen.wav' },
      { id: 'besichtigung', de: 'die Besichtigung', ru: 'просмотр', audioDe: '/audio/words/apartment-search/besichtigung.wav' },
      { id: 'absagen', de: 'absagen', ru: 'отменять, отказывать', audioDe: '/audio/words/apartment-search/absagen.wav' },
      { id: 'absage', de: 'die Absage', ru: 'отказ, отмена', audioDe: '/audio/words/apartment-search/absage.wav' },
      { id: 'erhalten', de: 'erhalten', ru: 'получать', audioDe: '/audio/words/apartment-search/erhalten.wav' },
      { id: 'kuendigen', de: 'kündigen', ru: 'расторгать, увольнять', audioDe: '/audio/words/apartment-search/kuendigen.wav' },
      { id: 'einzug', de: 'der Einzug', ru: 'въезд, переезд', audioDe: '/audio/words/apartment-search/einzug.wav' },
      { id: 'einziehen', de: 'einziehen', ru: 'въезжать', audioDe: '/audio/words/apartment-search/einziehen.wav' }
    ],
    mantras: [
      { id: 'wohnung-suchen', de: 'Ich suche eine Wohnung.', ru: 'Я ищу квартиру.', audioDe: '/audio/mantras/apartment-search/wohnung-suchen.wav' },
      { id: 'zwei-zimmer', de: 'Ich brauche eine Wohnung mit zwei Zimmern.', ru: 'Мне нужна квартира с двумя комнатами.', audioDe: '/audio/mantras/apartment-search/zwei-zimmer.wav' },
      { id: 'miete-zu-hoch', de: 'Die Miete ist zu hoch.', ru: 'Арендная плата слишком высокая.', audioDe: '/audio/mantras/apartment-search/miete-zu-hoch.wav' },
      { id: 'besichtigungstermin', de: 'Können wir einen Besichtigungstermin vereinbaren?', ru: 'Можем ли мы назначить просмотр?', audioDe: '/audio/mantras/apartment-search/besichtigungstermin.wav' },
      { id: 'wohnung-gefällt', de: 'Die Wohnung gefällt mir sehr gut.', ru: 'Мне очень нравится квартира.', audioDe: '/audio/mantras/apartment-search/wohnung-gefaellt.wav' },
      { id: 'kaution-zahlen', de: 'Ich muss eine Kaution zahlen.', ru: 'Мне нужно заплатить залог.', audioDe: '/audio/mantras/apartment-search/kaution-zahlen.wav' },
      { id: 'mietvertrag-unterschreiben', de: 'Wann können wir den Mietvertrag unterschreiben?', ru: 'Когда мы можем подписать договор аренды?', audioDe: '/audio/mantras/apartment-search/mietvertrag-unterschreiben.wav' },
      { id: 'einziehen-wann', de: 'Wann kann ich einziehen?', ru: 'Когда я могу въехать?', audioDe: '/audio/mantras/apartment-search/einziehen-wann.wav' },
      { id: 'lage-gut', de: 'Die Lage ist sehr gut.', ru: 'Расположение очень хорошее.', audioDe: '/audio/mantras/apartment-search/lage-gut.wav' },
      { id: 'lage-ruhig', de: 'Die Lage ist sehr ruhig.', ru: 'Местоположение очень тихое.', audioDe: '/audio/mantras/apartment-search/lage-ruhig.wav' },
      { id: 'wohnung-frei', de: 'Ist die Wohnung noch frei?', ru: 'Квартира ещё свободна?', audioDe: '/audio/mantras/apartment-search/wohnung-frei.wav' },
      { id: 'besichtigung-morgen', de: 'Kann ich die Wohnung morgen besichtigen?', ru: 'Могу ли я осмотреть квартиру завтра?', audioDe: '/audio/mantras/apartment-search/besichtigung-morgen.wav' },
      { id: 'vermieter-anrufen', de: 'Ich rufe den Vermieter an.', ru: 'Я звоню арендодателю.', audioDe: '/audio/mantras/apartment-search/vermieter-anrufen.wav' },
      { id: 'anzeige-gesehen', de: 'Ich habe Ihre Anzeige gesehen.', ru: 'Я видел ваше объявление.', audioDe: '/audio/mantras/apartment-search/anzeige-gesehen.wav' },
      { id: 'wohnung-mieten', de: 'Ich möchte diese Wohnung mieten.', ru: 'Я хочу снять эту квартиру.', audioDe: '/audio/mantras/apartment-search/wohnung-mieten.wav' },
      { id: 'er-mietet-wohnung', de: 'Er mietet hier eine Wohnung.', ru: 'Он снимает здесь квартиру.', audioDe: '/audio/mantras/apartment-search/er-mietet-wohnung.wav' },
      { id: 'mieter-zahlt-puenktlich', de: 'Der Mieter zahlt pünktlich.', ru: 'Жилец платит вовремя.', audioDe: '/audio/mantras/apartment-search/mieter-zahlt-puenktlich.wav' },
      { id: 'nachmieter-suchen', de: 'Wir suchen dringend Nachmieter.', ru: 'Мы срочно ищем следующего жильца.', audioDe: '/audio/mantras/apartment-search/nachmieter-suchen.wav' },
      { id: 'mietvertrag-bereit', de: 'Der Mietvertrag ist bereit.', ru: 'Договор аренды готов.', audioDe: '/audio/mantras/apartment-search/mietvertrag-bereit.wav' },
      { id: 'vertrag-besprechen', de: 'Sie besprechen heute den Vertrag.', ru: 'Они обсуждают сегодня контракт.', audioDe: '/audio/mantras/apartment-search/vertrag-besprechen.wav' },
      { id: 'kaltmiete-guenstig', de: 'Die Kaltmiete ist günstig.', ru: 'Аренда без отопления выгодная.', audioDe: '/audio/mantras/apartment-search/kaltmiete-guenstig.wav' },
      { id: 'warmmiete-fair', de: 'Die Warmmiete ist fair.', ru: 'Тёплая арендная плата справедливая.', audioDe: '/audio/mantras/apartment-search/warmmiete-fair.wav' },
      { id: 'aufgabe-neu', de: 'Das ist eine neue Aufgabe.', ru: 'Это новая задача.', audioDe: '/audio/mantras/apartment-search/aufgabe-neu.wav' },
      { id: 'aufgeben-nicht', de: 'Ich gebe nicht auf.', ru: 'Я не сдаюсь.', audioDe: '/audio/mantras/apartment-search/aufgeben-nicht.wav' },
      { id: 'es-faellt-schwer', de: 'Es fällt ihm schwer.', ru: 'Ему это трудно.', audioDe: '/audio/mantras/apartment-search/es-faellt-schwer.wav' },
      { id: 'fallen-lassen', de: 'Lass es nicht fallen.', ru: 'Не роняй это.', audioDe: '/audio/mantras/apartment-search/fallen-lassen.wav' },
      { id: 'nachkommen-bald', de: 'Sie kommen bald nach.', ru: 'Они скоро приедут.', audioDe: '/audio/mantras/apartment-search/nachkommen-bald.wav' },
      { id: 'kommen-sie', de: 'Kommen Sie bitte.', ru: 'Пожалуйста, приходите.', audioDe: '/audio/mantras/apartment-search/kommen-sie.wav' },
      { id: 'anzeigen-wohnung', de: 'Ich zeige die Wohnung an.', ru: 'Я размещаю объявление о квартире.', audioDe: '/audio/mantras/apartment-search/anzeigen-wohnung.wav' },
      { id: 'verfuegbar-wohnung', de: 'Die Wohnung ist noch verfügbar.', ru: 'Квартира ещё доступна.', audioDe: '/audio/mantras/apartment-search/verfuegbar-wohnung.wav' },
      { id: 'verfuegbarkeit-prufen', de: 'Ich prüfe die Verfügbarkeit.', ru: 'Я проверяю доступность.', audioDe: '/audio/mantras/apartment-search/verfuegbarkeit-prufen.wav' },
      { id: 'verfuegen-ueber', de: 'Wir verfügen über eine Wohnung.', ru: 'У нас есть квартира в распоряжении.', audioDe: '/audio/mantras/apartment-search/verfuegen-ueber.wav' },
      { id: 'grundriss-gefällt', de: 'Der Grundriss gefällt mir nicht.', ru: 'Мне не нравится планировка.', audioDe: '/audio/mantras/apartment-search/grundriss-gefaellt.wav' },
      { id: 'aufzug-fehl', de: 'Es gibt keinen Aufzug.', ru: 'Нет лифта.', audioDe: '/audio/mantras/apartment-search/aufzug-fehl.wav' },
      { id: 'absagen-termin', de: 'Ich muss den Termin absagen.', ru: 'Мне нужно отменить встречу.', audioDe: '/audio/mantras/apartment-search/absagen-termin.wav' },
      { id: 'absage-bekommen', de: 'Ich habe eine Absage bekommen.', ru: 'Я получил отказ.', audioDe: '/audio/mantras/apartment-search/absage-bekommen.wav' },
      { id: 'erhalten-antwort', de: 'Ich habe keine Antwort erhalten.', ru: 'Я не получил ответа.', audioDe: '/audio/mantras/apartment-search/erhalten-antwort.wav' },
      { id: 'kuendigen-vertrag', de: 'Ich kündige den Vertrag.', ru: 'Я расторгаю договор.', audioDe: '/audio/mantras/apartment-search/kuendigen-vertrag.wav' },
      { id: 'einzug-moeglich', de: 'Der Einzug ist möglich.', ru: 'Въезд возможен.', audioDe: '/audio/mantras/apartment-search/einzug-moeglich.wav' }
    ],
    quiz: [
      {
        question: "Warum sucht Markus eine Wohnung?",
        options: ["Er möchte alleine wohnen", "Seine Frau und sein Kind sollen nachkommen", "Seine alte Wohnung ist zu klein"],
        correctAnswer: "Seine Frau und sein Kind sollen nachkommen"
      },
      {
        question: "Wie lange sucht Markus schon eine Wohnung?",
        options: ["Ein Monat", "Zwei Monate", "Drei Monate"],
        correctAnswer: "Drei Monate"
      },
      {
        question: "Was war das Problem bei vielen Wohnungen?",
        options: ["Sie waren zu teuer", "Sie waren unmöbliert oder zu klein", "Sie waren zu weit weg"],
        correctAnswer: "Sie waren unmöbliert oder zu klein"
      },
      {
        question: "Was bedeutet das Wort 'Übernahme' in der Geschichte?",
        options: ["Die Wohnung übernehmen", "Küche und Möbel vom Vormieter kaufen", "Den Mietvertrag unterschreiben"],
        correctAnswer: "Küche und Möbel vom Vormieter kaufen"
      },
      {
        question: "Wie findet Markus schließlich eine Wohnung?",
        options: ["Er findet sie im Internet", "Sein Kollege bietet ihm seine Wohnung an", "Er ruft einen Vermieter an"],
        correctAnswer: "Sein Kollege bietet ihm seine Wohnung an"
      }
    ],
    exercises: [
      {
        sentence_ru: "Я ищу квартиру с двумя комнатами.",
        sentence: "Ich suche eine ____ mit zwei Zimmern.",
        options: ["Wohnung", "Wohnungen", "Zimmer", "Haus"],
        explanation: "Wohnung означает квартиру. После eine используется винительный падеж единственного числа."
      },
      {
        sentence_ru: "Арендная плата слишком высокая.",
        sentence: "Die ____ ist zu hoch.",
        options: ["Miete", "Mieten", "Mietvertrag", "Kaution"],
        explanation: "Miete означает арендную плату. В именительном падеже после die используется основная форма."
      },
      {
        sentence_ru: "Я хочу снять эту квартиру.",
        sentence: "Ich möchte diese Wohnung ____.",
        options: ["mieten", "miete", "vermieten", "gemietet"],
        explanation: "mieten - инфинитив глагола снимать. После модального глагола möchte используется инфинитив."
      },
      {
        sentence_ru: "Можем ли мы назначить просмотр?",
        sentence: "Können wir einen ____ vereinbaren?",
        options: ["Besichtigungstermin", "Besichtigungstermins", "Termin", "Besichtigung"],
        explanation: "Besichtigungstermin означает назначенный просмотр. После einen используется винительный падеж."
      },
      {
        sentence_ru: "Мне очень нравится квартира.",
        sentence: "Die Wohnung ____ mir sehr gut.",
        options: ["gefällt", "gefallen", "gefällt sich", "mag"],
        explanation: "gefällt - форма глагола gefallen (нравиться) в 3-м лице единственного числа."
      },
      {
        sentence_ru: "Мне нужно заплатить залог.",
        sentence: "Ich muss eine ____ zahlen.",
        options: ["Kaution", "Kautions", "Miete", "Vertrag"],
        explanation: "Kaution означает залог. После eine используется винительный падеж."
      },
      {
        sentence_ru: "Когда мы можем подписать договор аренды?",
        sentence: "Wann können wir den ____ unterschreiben?",
        options: ["Mietvertrag", "Mietvertrags", "Vertrag", "Termin"],
        explanation: "Mietvertrag означает договор аренды. После den используется винительный падеж."
      },
      {
        sentence_ru: "Я подписываю договор.",
        sentence: "Ich ____ den Vertrag.",
        options: ["unterschreibe", "unterschreiben", "unterschreibt", "unterschrieb"],
        explanation: "unterschreibe - форма глагола unterschreiben (подписывать) в 1-м лице единственного числа."
      },
      {
        sentence_ru: "Когда я могу въехать?",
        sentence: "Wann kann ich ____?",
        options: ["einziehen", "einziehe", "ausziehen", "einzieht"],
        explanation: "einziehen - инфинитив глагола въезжать. После модального глагола kann используется инфинитив."
      },
      {
        sentence_ru: "Расположение очень хорошее.",
        sentence: "Die ____ ist sehr gut.",
        options: ["Lage", "Lagen", "Wohnung", "Miete"],
        explanation: "Lage означает расположение. В именительном падеже после die используется основная форма."
      },
      {
        sentence_ru: "Я звоню арендодателю.",
        sentence: "Ich rufe den ____ an.",
        options: ["Vermieter", "Vermieters", "Mieter", "Vermieterin"],
        explanation: "Vermieter означает арендодателя. После den используется винительный падеж."
      },
      {
        sentence_ru: "Я арендатор.",
        sentence: "Ich bin ____.",
        options: ["Mieter", "Mieters", "Vermieter", "Mieterin"],
        explanation: "Mieter означает арендатора. После bin используется именительный падеж."
      },
      {
        sentence_ru: "Я видел ваше объявление.",
        sentence: "Ich habe Ihre ____ gesehen.",
        options: ["Anzeige", "Anzeigen", "Wohnung", "Miete"],
        explanation: "Anzeige означает объявление. После Ihre используется винительный падеж."
      }
    ],
    articleExercises: [
      {
        word: "Wohnung",
        translation: "квартира",
        correctArticle: "die",
        explanation: "Wohnung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Zimmer",
        translation: "комната",
        correctArticle: "das",
        explanation: "Zimmer - средний род (das). Слова, оканчивающиеся на -er, могут иметь средний род."
      },
      {
        word: "Küche",
        translation: "кухня",
        correctArticle: "die",
        explanation: "Küche - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Miete",
        translation: "арендная плата",
        correctArticle: "die",
        explanation: "Miete - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Vermieter",
        translation: "арендодатель",
        correctArticle: "der",
        explanation: "Vermieter - мужской род (der). Слова, оканчивающиеся на -er, часто имеют мужской род."
      },
      {
        word: "Mieter",
        translation: "арендатор",
        correctArticle: "der",
        explanation: "Mieter - мужской род (der). Слова, оканчивающиеся на -er, часто имеют мужской род."
      },
      {
        word: "Besichtigung",
        translation: "просмотр",
        correctArticle: "die",
        explanation: "Besichtigung - женский род (die). Слова, оканчивающиеся на -ung, имеют женский род."
      },
      {
        word: "Anzeige",
        translation: "объявление",
        correctArticle: "die",
        explanation: "Anzeige - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      },
      {
        word: "Kaution",
        translation: "залог",
        correctArticle: "die",
        explanation: "Kaution - женский род (die). Слова, оканчивающиеся на -ion, имеют женский род."
      },
      {
        word: "Mietvertrag",
        translation: "договор аренды",
        correctArticle: "der",
        explanation: "Mietvertrag - мужской род (der). Составные слова с -vertrag имеют мужской род."
      },
      {
        word: "Lage",
        translation: "расположение",
        correctArticle: "die",
        explanation: "Lage - женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род."
      }
    ]
  },
  // ============================================
  // ЗАПЛАНИРОВАННЫЕ ТЕМЫ (В РАЗРАБОТКЕ)
  // ============================================
  {
    id: 'housing-furniture',
    title: 'Покупка мебели (Möbel kaufen)',
    description: 'Поход в IKEA за мебелью',
    icon: 'fa-couch',
    color: 'bg-orange-500',
    level: 'A1-A2',
    isNew: true,
    availableFrom: '2025-02-01',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      title: 'Der teure Ausflug zu IKEA',
      text: `Am Samstag fährt eine Familie zu IKEA. Die Kinder sind 8 und 12 Jahre alt und brauchen neue Betten. Die alten Betten sind zu klein.

Im Auto diskutieren alle laut. Der Sohn träumt von einem Bett wie ein Raumschiff. Die Tochter will lieber ein Schlafsofa. „Oder ein Etagenbett?" schlägt der Vater vor.

Bei IKEA gehen sie direkt zur Schlafzimmer-Abteilung. Die Kinder probieren alles aus: Sie sitzen, liegen und klettern auf den Betten. Ein Etagenbett gefällt ihnen am besten. Der Preis ist gut, die Größe passt perfekt. Nur eine Frage bleibt: Wer schläft oben und wer unten?

„Welche Farbe nehmen wir?" fragt die Mutter. „Grau!" ruft der Sohn. „Rosa!" sagt die Tochter. Nach kurzer Diskussion einigen sich alle auf Weiß.

„Wir brauchen auch Kissen und Decken", sagt die Mutter. Die Familie geht weiter durch die langen Gänge. Überall sehen sie schöne Möbel und praktische Sachen.

Sie laufen durch verschiedene Abteilungen: Küche, Kinderzimmer, Wohnzimmer. „Hier ist alles so gut geplant", sagt die Mutter. „Wirklich gemütlich", stimmt der Vater zu.

Die Kinder werden müde. Sie setzen sich in weiche Sessel. „Nur fünf Minuten Pause", bittet der Sohn. Der Vater setzt sich auch.

Aber sie kaufen nicht nur das Bett. Bald liegt noch viel mehr im Einkaufswagen:

ein Schreibtisch für den Vater

zwei Stühle mit Rollen fürs Kinderzimmer

ein Regal und ein Spiegel für den Flur

eine Vase fürs Wohnzimmer

ein Werkzeug-Set

eine Tafel und ein Plüschtier für die Kinder

Geschirr, eine Pfanne, Besteck und Blumen

Im IKEA-Restaurant machen sie eine Pause. Jetzt haben alle großen Hunger. Sie sehen viele Gerichte, aber nehmen Hot Dogs. Die Eltern trinken Tee und die Kinder trinken Saft. Endlich können sie sich ausruhen!

An der Kasse wird der Vater blass. Er sieht den Preis und schüttelt den Kopf: „Wir wollten doch nur ein Bett kaufen! Wie ist das alles passiert?"

Der Vater seufzt und bezahlt alles mit der Kreditkarte. „Na ja, was macht man nicht alles für die Familie. Am Wochenende muss ich jetzt alle Möbel aufbauen!" 😊`,
      translation: 'Полный перевод истории доступен в режиме изучения.',
      audioUrl: '/placeholder.mp3'
    },
    words: [
      { id: 'ausflug', de: 'der Ausflug', ru: 'поездка, экскурсия' },
      { id: 'ausfluege', de: 'die Ausflüge', ru: 'поездки, экскурсии' },
      { id: 'fahren', de: 'fahren', ru: 'ехать' },
      { id: 'fahrt', de: 'die Fahrt', ru: 'поездка' },
      { id: 'ausfahren', de: 'ausfahren', ru: 'выезжать' },
      { id: 'ausfahrt', de: 'die Ausfahrt', ru: 'выезд' },
      { id: 'traeumen-von', de: 'träumen von', ru: 'мечтать о' },
      { id: 'raum', de: 'der Raum', ru: 'комната, пространство' },
      { id: 'schiff', de: 'das Schiff', ru: 'корабль' },
      { id: 'raumschiff', de: 'das Raumschiff', ru: 'космический корабль' },
      { id: 'abteilung', de: 'die Abteilung', ru: 'отдел' },
      { id: 'klettern', de: 'klettern', ru: 'лазить, карабкаться' },
      { id: 'ausprobieren', de: 'ausprobieren', ru: 'пробовать, испытывать' },
      { id: 'sich-einigen', de: 'sich einigen', ru: 'договориться' },
      { id: 'kissen', de: 'das Kissen', ru: 'подушка' },
      { id: 'decke', de: 'die Decke', ru: 'одеяло; потолок' },
      { id: 'sache', de: 'die Sache', ru: 'вещь' },
      { id: 'gang', de: 'der Gang', ru: 'коридор, проход' },
      { id: 'sessel', de: 'der Sessel', ru: 'кресло' },
      { id: 'sich-setzen', de: 'sich setzen', ru: 'садиться' },
      { id: 'einkaufswagen', de: 'der Einkaufswagen', ru: 'тележка для покупок' },
      { id: 'regal', de: 'das Regal', ru: 'полка' },
      { id: 'spiegel', de: 'der Spiegel', ru: 'зеркало' },
      { id: 'gericht', de: 'das Gericht', ru: 'блюдо (еда)' },
      { id: 'blass', de: 'blass', ru: 'бледный' },
      { id: 'schuetteln', de: 'schütteln', ru: 'трясти' },
      { id: 'aufbauen', de: 'aufbauen', ru: 'собирать (мебель)' }
    ],
    mantras: [
      { id: 'ausflug-machen', de: 'Lass uns einen Ausflug machen.', ru: 'Давай съездим на природу.' },
      { id: 'ausfluege-schoen', de: 'Die Ausflüge machen Spaß.', ru: 'Экскурсии — это весело.' },
      { id: 'fahren-bus', de: 'Ich fahre mit dem Bus.', ru: 'Я еду на автобусе.' },
      { id: 'fahrt-gut', de: 'Gute Fahrt!', ru: 'Счастливого пути!' },
      { id: 'ausfahren-frueh', de: 'Wir fahren früh aus.', ru: 'Мы выезжаем рано.' },
      { id: 'ausfahrt-wo', de: 'Wo ist die Ausfahrt?', ru: 'Где выезд?' },
      { id: 'traeumen-von', de: 'Wovon träumst du?', ru: 'О чём ты мечтаешь?' },
      { id: 'raum-platz', de: 'Ist noch Platz im Raum?', ru: 'В комнате ещё есть место?' },
      { id: 'schiff-faehrt', de: 'Das Schiff fährt um zehn.', ru: 'Корабль отходит в десять.' },
      { id: 'raumschiff-traeumen', de: 'Er träumt vom Raumschiff.', ru: 'Он мечтает о космосе.' },
      { id: 'abteilung-wo', de: 'In welcher Abteilung?', ru: 'В каком отделе?' },
      { id: 'klettern-nicht', de: 'Kletter nicht so hoch!', ru: 'Не лазь так высоко!' },
      { id: 'ausprobieren-darf', de: 'Darf ich das ausprobieren?', ru: 'Можно попробовать?' },
      { id: 'sich-einigen-muessen', de: 'Wir müssen uns einigen.', ru: 'Нам нужно договориться.' },
      { id: 'kissen-brauchen', de: 'Brauchst du ein Kissen?', ru: 'Тебе нужна подушка?' },
      { id: 'decke-hast', de: 'Hast du eine Decke?', ru: 'У тебя есть одеяло?' },
      { id: 'sache-eine', de: 'Eine Sache noch.', ru: 'Ещё одно дело.' },
      { id: 'gang-links', de: 'Der Gang ist links.', ru: 'Коридор слева.' },
      { id: 'sessel-setzen', de: 'Setz dich in den Sessel.', ru: 'Садись в кресло.' },
      { id: 'sich-setzen-darf', de: 'Darf ich mich setzen?', ru: 'Можно присесть?' },
      { id: 'einkaufswagen-nehmen', de: 'Nimm einen Einkaufswagen.', ru: 'Возьми тележку.' },
      { id: 'regal-stellen', de: 'Stell das ins Regal.', ru: 'Поставь это на полку.' },
      { id: 'spiegel-wo', de: 'Wo ist der Spiegel?', ru: 'Где зеркало?' },
      { id: 'gericht-was', de: 'Was für ein Gericht?', ru: 'Какое блюдо?' },
      { id: 'blass-aussehen', de: 'Du siehst blass aus.', ru: 'Ты бледно выглядишь.' },
      { id: 'schuetteln-kopf', de: 'Er schüttelt den Kopf.', ru: 'Он качает головой.' },
      { id: 'aufbauen-koennen', de: 'Kannst du das aufbauen?', ru: 'Ты можешь это собрать?' }
    ],
    quiz: [],
    exercises: [
      { sentence_ru: 'Давай съездим на природу.', sentence: 'Lass uns einen ____ machen.', options: ['Ausflug', 'Ausfahrt', 'Ausgang', 'Urlaub'], explanation: 'Ausflug – поездка, вылазка. «Einen Ausflug machen» – устойчивое выражение.' },
      { sentence_ru: 'Экскурсии — это весело.', sentence: 'Die ____ machen Spaß.', options: ['Ausflüge', 'Ausflug', 'Reisen', 'Fahrten'], explanation: 'Ausflüge – множественное число от der Ausflug (поездки, экскурсии).' },
      { sentence_ru: 'Я еду на автобусе.', sentence: 'Ich ____ mit dem Bus.', options: ['fahre', 'fährt', 'fahren', 'fuhr'], explanation: 'fahre – форма глагола fahren (ехать) в 1-м лице единственного числа.' },
      { sentence_ru: 'Счастливого пути!', sentence: 'Gute ____!', options: ['Fahrt', 'Reise', 'Fahren', 'Weg'], explanation: 'Fahrt – поездка. «Gute Fahrt!» – пожелание в дорогу.' },
      { sentence_ru: 'Мы выезжаем рано.', sentence: 'Wir fahren früh ____.', options: ['aus', 'ein', 'weg', 'los'], explanation: 'aus – приставка глагола ausfahren (выезжать). Отделяется в настоящем времени.' },
      { sentence_ru: 'Где выезд?', sentence: 'Wo ist die ____?', options: ['Ausfahrt', 'Ausflug', 'Ausgang', 'Einfahrt'], explanation: 'Ausfahrt – выезд (например, с парковки или автострады).' },
      { sentence_ru: 'О чём ты мечтаешь?', sentence: 'Wovon ____ du?', options: ['träumst', 'träumen', 'träumt', 'denkst'], explanation: 'träumst – форма глагола träumen (мечтать) во 2-м лице единственного числа.' },
      { sentence_ru: 'В комнате ещё есть место?', sentence: 'Ist noch Platz im ____?', options: ['Raum', 'Zimmer', 'Haus', 'Bett'], explanation: 'Raum – комната, пространство. Der Raum в дательном падеже: im Raum.' },
      { sentence_ru: 'Корабль отходит в десять.', sentence: 'Das ____ fährt um zehn.', options: ['Schiff', 'Boot', 'Fahrt', 'Zug'], explanation: 'Schiff – корабль, судно. Средний род (das).' },
      { sentence_ru: 'Он мечтает о космосе.', sentence: 'Er träumt vom ____.', options: ['Raumschiff', 'Schiff', 'Raum', 'Flugzeug'], explanation: 'Raumschiff – космический корабль. «vom» = von + dem.' },
      { sentence_ru: 'В каком отделе?', sentence: 'In welcher ____?', options: ['Abteilung', 'Abteil', 'Teil', 'Büro'], explanation: 'Abteilung – отдел (в магазине, учреждении). Женский род (die).' },
      { sentence_ru: 'Не лазь так высоко!', sentence: '____ nicht so hoch!', options: ['Kletter', 'Klettern', 'Klettert', 'Steig'], explanation: 'Kletter – повелительное наклонение от klettern (лазить) для «du».' },
      { sentence_ru: 'Можно попробовать?', sentence: 'Darf ich das ____?', options: ['ausprobieren', 'probieren', 'versuchen', 'anprobieren'], explanation: 'ausprobieren – пробовать, испытывать. Инфинитив в конце предложения.' },
      { sentence_ru: 'Нам нужно договориться.', sentence: 'Wir müssen uns ____.', options: ['einigen', 'einigen uns', 'einigt', 'vereinbaren'], explanation: 'einigen – инфинитив от sich einigen (договориться). После müssen – инфинитив.' },
      { sentence_ru: 'Тебе нужна подушка?', sentence: 'Brauchst du ein ____?', options: ['Kissen', 'Decke', 'Korb', 'Bett'], explanation: 'Kissen – подушка. Средний род (das).' },
      { sentence_ru: 'У тебя есть одеяло?', sentence: 'Hast du eine ____?', options: ['Decke', 'Kissen', 'Tuch', 'Bettdecke'], explanation: 'Decke – одеяло, покрывало. Женский род (die).' },
      { sentence_ru: 'Ещё одно дело.', sentence: 'Eine ____ noch.', options: ['Sache', 'Ding', 'Angelegenheit', 'Frage'], explanation: 'Sache – вещь, дело. «Eine Sache noch» – разговорная фраза.' },
      { sentence_ru: 'Коридор слева.', sentence: 'Der ____ ist links.', options: ['Gang', 'Flur', 'Weg', 'Tür'], explanation: 'Gang – коридор, проход. Мужской род (der).' },
      { sentence_ru: 'Садись в кресло.', sentence: 'Setz dich in den ____.', options: ['Sessel', 'Stuhl', 'Sitz', 'Sofa'], explanation: 'Sessel – кресло. Мужской род (der), винительный: den Sessel.' },
      { sentence_ru: 'Можно присесть?', sentence: 'Darf ich mich ____?', options: ['setzen', 'sitzen', 'setze', 'legen'], explanation: 'setzen – инфинитив от sich setzen (садиться). После darf – инфинитив.' },
      { sentence_ru: 'Возьми тележку.', sentence: 'Nimm einen ____.', options: ['Einkaufswagen', 'Wagen', 'Korb', 'Einkauf'], explanation: 'Einkaufswagen – тележка для покупок в магазине.' },
      { sentence_ru: 'Поставь это на полку.', sentence: 'Stell das ins ____.', options: ['Regal', 'Schrank', 'Tisch', 'Kasten'], explanation: 'Regal – полка. Средний род (das). «ins» = in + das.' },
      { sentence_ru: 'Где зеркало?', sentence: 'Wo ist der ____?', options: ['Spiegel', 'Fenster', 'Bild', 'Glas'], explanation: 'Spiegel – зеркало. Мужской род (der).' },
      { sentence_ru: 'Какое блюдо?', sentence: 'Was für ein ____?', options: ['Gericht', 'Essen', 'Mahlzeit', 'Speise'], explanation: 'Gericht – блюдо (еда). Средний род (das).' },
      { sentence_ru: 'Ты бледно выглядишь.', sentence: 'Du siehst ____ aus.', options: ['blass', 'krank', 'müde', 'schlecht'], explanation: 'blass – бледный. Прилагательное после «aussehen» в неизменяемой форме.' },
      { sentence_ru: 'Он качает головой.', sentence: 'Er ____ den Kopf.', options: ['schüttelt', 'schütteln', 'schüttelte', 'nickt'], explanation: 'schüttelt – форма глагола schütteln (трясти) в 3-м лице единственного числа.' },
      { sentence_ru: 'Ты можешь это собрать?', sentence: 'Kannst du das ____?', options: ['aufbauen', 'bauen', 'zusammenbauen', 'einbauen'], explanation: 'aufbauen – собирать (мебель, конструкцию). Инфинитив после können.' }
    ],
    articleExercises: [
      { word: 'Ausflug', translation: 'поездка, экскурсия', correctArticle: 'der', explanation: 'Ausflug – мужской род (der). Слова, оканчивающиеся на -ug, часто имеют мужской род.' },
      { word: 'Fahrt', translation: 'поездка', correctArticle: 'die', explanation: 'Fahrt – женский род (die). Слова, оканчивающиеся на -t после гласной, часто женского рода.' },
      { word: 'Ausfahrt', translation: 'выезд', correctArticle: 'die', explanation: 'Ausfahrt – женский род (die). Существительные от глаголов с приставкой aus- часто женского рода (die Fahrt).' },
      { word: 'Raum', translation: 'комната, пространство', correctArticle: 'der', explanation: 'Raum – мужской род (der). Слова, оканчивающиеся на -um, имеют мужской род.' },
      { word: 'Schiff', translation: 'корабль', correctArticle: 'das', explanation: 'Schiff – средний род (das). Многие названия транспортных средств среднего рода.' },
      { word: 'Raumschiff', translation: 'космический корабль', correctArticle: 'das', explanation: 'Raumschiff – средний род (das). Составное от das Schiff сохраняет средний род.' },
      { word: 'Abteilung', translation: 'отдел', correctArticle: 'die', explanation: 'Abteilung – женский род (die). Слова, оканчивающиеся на -ung, имеют женский род.' },
      { word: 'Kissen', translation: 'подушка', correctArticle: 'das', explanation: 'Kissen – средний род (das). Предметы обихода, оканчивающиеся на -en, часто среднего рода.' },
      { word: 'Decke', translation: 'одеяло, потолок', correctArticle: 'die', explanation: 'Decke – женский род (die). Слова, оканчивающиеся на -e, часто имеют женский род.' },
      { word: 'Sache', translation: 'вещь, дело', correctArticle: 'die', explanation: 'Sache – женский род (die). Слова, оканчивающиеся на -e, часто женского рода.' },
      { word: 'Gang', translation: 'коридор, проход', correctArticle: 'der', explanation: 'Gang – мужской род (der). Слова, оканчивающиеся на -ang, имеют мужской род.' },
      { word: 'Sessel', translation: 'кресло', correctArticle: 'der', explanation: 'Sessel – мужской род (der). Названия мебели часто мужского рода (der Stuhl, der Tisch).' },
      { word: 'Einkaufswagen', translation: 'тележка для покупок', correctArticle: 'der', explanation: 'Einkaufswagen – мужской род (der). Составное от der Wagen – мужской род.' },
      { word: 'Regal', translation: 'полка', correctArticle: 'das', explanation: 'Regal – средний род (das). Предметы мебели могут быть среднего рода.' },
      { word: 'Spiegel', translation: 'зеркало', correctArticle: 'der', explanation: 'Spiegel – мужской род (der). Предметы домашнего обихода часто мужского рода.' },
      { word: 'Gericht', translation: 'блюдо, суд', correctArticle: 'das', explanation: 'Gericht – средний род (das). Многозначное слово: и блюдо, и суд – das Gericht.' }
    ]
  },
  {
    id: 'sport-health',
    title: 'Спорт и здоровье (Sport & Gesundheit)',
    description: 'Планируется к публикации',
    icon: 'fa-dumbbell',
    color: 'bg-green-500',
    level: 'A2-B1',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'shopping',
    title: 'Шоппинг (Einkaufen)',
    description: 'Планируется к публикации',
    icon: 'fa-shopping-bag',
    color: 'bg-pink-500',
    level: 'A1-A2',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'travel-transport',
    title: 'Поездки и транспорт (Reisen & Transport)',
    description: 'Планируется к публикации',
    icon: 'fa-plane',
    color: 'bg-cyan-500',
    level: 'A2-B1',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'bank-bills',
    title: 'Банк и счета (Bank & Rechnungen)',
    description: 'Планируется к публикации',
    icon: 'fa-credit-card',
    color: 'bg-indigo-500',
    level: 'B1-B2',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'work-termination',
    title: 'Работа и увольнение (Arbeit & Kündigung)',
    description: 'Планируется к публикации',
    icon: 'fa-briefcase',
    color: 'bg-teal-500',
    level: 'B1-B2',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'neighbors-complaints',
    title: 'Соседи и жалобы (Nachbarn & Beschwerden)',
    description: 'Планируется к публикации',
    icon: 'fa-users',
    color: 'bg-amber-500',
    level: 'A2-B1',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'doctor-insurance',
    title: 'Врач и медицинское страхование (Arzt & Krankenversicherung)',
    description: 'Планируется к публикации',
    icon: 'fa-heartbeat',
    color: 'bg-red-500',
    level: 'A2-B1',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  },
  {
    id: 'travel-hotels',
    title: 'Путешествия и отели (Reisen und Hotels)',
    description: 'Планируется к публикации',
    icon: 'fa-hotel',
    color: 'bg-purple-500',
    level: 'A1-A2',
    videoUrl: 'https://kinescope.io/embed/placeholder',
    dialog: {
      text: 'Тема в разработке',
      translation: 'Тема в разработке',
      audioUrl: '/placeholder.mp3'
    },
    words: [],
    mantras: [],
    quiz: [],
    exercises: [],
    articleExercises: []
  }
];
