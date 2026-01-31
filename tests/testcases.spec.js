const { test, expect } = require('@playwright/test');

// Helper function to test translation
async function testTranslation(page, input, expected) {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill(input);
  await expect(page.locator('body')).toContainText(expected);
}

// ===================== POSITIVE FUNCTIONAL TESTS =====================
test('Pos_Fun_0001 - Simple present tense daily sentence', async ({ page }) => {
  await testTranslation(
    page,
    'mama bath kanavaa',
    'මම බත් කනවා'  // exactly as translator outputs
  );
});

test('Pos_Fun_0002 - Convert a short request phrase', async ({ page }) => {
  await testTranslation(page, ' please mata meeka kiyala dhenna.', 'please මට මේක කියල දෙන්න.');
});

test('Pos_Fun_0003 - Convert a long polite request paragraph', async ({ page }) => {
  await testTranslation(page, ' please mata meeka hariyata explain karanna, mama kalin mehema dheyak karala naethi nisaa therenne naee. assignment eka submit karanna kalin eeka podda check karalaa mage mistakes tika kiyala dhenna puluvandha? ',
    'please මට මේක හරියට explain කරන්න, මම කලින් මෙහෙම දෙයක් කරල නැති නිසා තෙරෙන්නෙ නෑ. assignment එක submit කරන්න කලින් ඒක පොඩ්ඩ check කරලා mage mistakes ටික කියල දෙන්න පුලුවන්ද?');
});

test('Pos_Fun_0004 - Time/ date format', async ({ page }) => {
  await testTranslation(page, 'report submission deadline eka thiyenne 31-01-2026 11.30pm thiyenne, iitakalin report eka submit karanna.',
    'report submission deadline එක තියෙන්නෙ 31-01-2026 11.30pm තියෙන්නෙ, ඊටකලින් report එක submit කරන්න.');
});

test('Pos_Fun_0005 - Interrogative Question', async ({ page }) => {
  await testTranslation(page, ' oyaata mee thiiraNaya gaena monavaadha thiyena adhahas?', 'ඔයාට මේ තීරණය ගැන මොනවාද තියෙන අදහස්?');
});

test('Pos_Fun_0006 - Negative Request', async ({ page }) => {
  await testTranslation(page, 'karunaakaralaa  mata paaduvee inna  dhenna ', 'කරුනාකරලා  මට පාඩුවේ ඉන්න  දෙන්න ');
});

test('Pos_Fun_0007 - Polite / Negative Question', async ({ page }) => {
  await testTranslation(page, ' karunaakaralaa mata mee gaena paehaedhili karanna puLuvandha?', 'කරුනාකරලා මට මේ ගැන පැහැදිලි කරන්න පුළුවන්ද?');
});

test('Pos_Fun_0008 - Confirmation / Future Response', async ({ page }) => {
  await testTranslation(page, ' hari, mama eeka salakaa balalaa obata dhaenum dhennam.', 'හරි, මම ඒක සලකා බලලා ඔබට දැනුම් දෙන්නම්.');
});

test('Pos_Fun_0009 - Brand / Proper Noun', async ({ page }) => {
  await testTranslation(page, ' Ayiyaa mata Samsung foon ekak aran dhunnaa.', 'අයියා මට Samsung ෆෝන් එකක් අරන් දුන්නා.');
});

test('Pos_Fun_0010 - Mixed tense sentence', async ({ page }) => {
  await testTranslation(page, ' mama adha vaeda karanavaa, heta submit karannam.', 'මම අද වැඩ කරනවා, හෙට submit කරන්නම්.');
});

test('Pos_Fun_0011 - Translate long paragraph from Singlish to Sinhala', async ({ page }) => {
  await testTranslation(
    page,
    'shrii lQQkaa sQQchaaraka katayuthu ithaa janapriyayi. mee ratee thibena sundhara veraLa, dharshaniiya kaDHAu saha dhiya dhiyarayan sQQchaarakayangee avaDhaanayata lak vee. sQQskRUthika sThaana lesa anuraaDhapura, poLonnaruva, mahanuvara mandhira saha sigiriya parvatha kotasa sQQchaarakayanta pivisiya haeka. sauragrahaNa saDHAhaa jaathika vanoodhYaanayan vana yaala, udavalavee, hootan pleens saha siQQharaaja vanaanthara vigahakaara lesa sQQchaarakayanta parisaraya vishleeShaNaya kaLa haeka. ratee dheeshiiya aahaara athdhaekiima, sampradhaayika uthsava niriikShaNaya saha hastha shilpa BhaaNda soyaa gatha haeka. paarisarika sQQchaaraka kriyaakaarakam saha aBhirahas kriyaakaarakam lesa naeGAii yaama, vaaNija dhiyavael, sarfiQQ saha vana sathva ChaayaaruupakaraNaya sQQchaarakayanta aakarShaNiiya vee. shrii lQQkaa sQQchaaraka karmaanthaya dheeshiiya aarThikaya saha raekiyaa avasThaa vaedi karayi.',
    'ශ්‍රී ලංකා සංචාරක' // Use key phrase instead of full paragraph
  );
});

test('Pos_Fun_0012 - Formal request', async ({ page }) => {
  await testTranslation(page, ' karuNaakara mata report eka dhenna.', 'කරුණාකර මට report එක දෙන්න.');
});

test('Pos_Fun_0013 - Line break input handling', async ({ page }) => {
  await testTranslation(page, ' mama lunch eka aran ayeth office ekata giyaa', 'මම lunch එක අරන් අයෙත් office එකට ගියා');
});

test('Pos_Fun_0014 - Natural chat with minor repetition', async ({ page }) => {
  await testTranslation(
    page,
    'hari hari api eeka karamuu.',
    'හරි හරි අපි ඒක කරමූ.'  // exactly as it appears in the snapshot
  );
});

test('Pos_Fun_0015 - Informal expression with emoji preservation', async ({ page }) => {
  await testTranslation(page, ' mata badagini!!! 😩😩', 'මට බඩගිනි!!! 😩😩');
});

test('Pos_Fun_0016 - Greeting conversion', async ({ page }) => {
  await testTranslation(page, ' suBha nava vasarak veevaa!!!', 'සුභ නව වසරක් වේවා!!!');
});

test('Pos_Fun_0017 - Mixed English brands', async ({ page }) => {
  await testTranslation(page, ' api kohendha kannea adha? KFC eken kamudha? naethnam PIZZA HUT eken kamudha?', 'අපි කොහෙන්ද කන්නේ අද? KFC එකෙන් කමුද? නැත්නම් PIZZA HUT එකෙන් කමුද?');
});

test('Pos_Fun_0018 - Negative question', async ({ page }) => {
  await testTranslation(page, ' oyata meeka therenne naedhdha?', 'ඔයට මේක තෙරෙන්නෙ නැද්ද?');
});

test('Pos_Fun_0019 - Negative statement', async ({ page }) => {
  await testTranslation(page, ' Mama ee yoojanaavata ekaGA naee.', 'මම ඒ යෝජනාවට එකඟ නෑ.');
});

test('Pos_Fun_0020 - Pronoun variation', async ({ page }) => {
  await testTranslation(page, ' Mama oyata mee thorathuru ikmaninma evannam', 'මම ඔයට මේ තොරතුරු ඉක්මනින්ම එවන්නම්');
});

test('Pos_Fun_0021 - Daily-life sentence', async ({ page }) => {
  await testTranslation(
    page,
    'mama adha udheema gedharin pitavelaa kaarYaalayata giyaa namuth maarga thadhabadhaya nisaa bas eka pramaadha vuNaa ee heethuven mata raesviimata velaavata sahaBhaagii viimata nohaeki vuNaa.',
    'මම අද උදේම ගෙදරින් පිටවෙලා'
  );
});

test('Pos_Fun_0022 - Politeness emphasis', async ({ page }) => {
  await testTranslation(page, 'karuNaakara miniththu kihipayak inna.', 'කරුණාකර මිනිත්තු කිහිපයක් ඉන්න.');
});

test('Pos_Fun_0023 - Currency/numbers', async ({ page }) => {
  await testTranslation(page, 'oyaa mata iiyee rupiyal 500 k dhunnaa. ', ' ඔයා මට ඊයේ රුපියල් 500 ක් දුන්නා. ');
});

test('Pos_Fun_0024 - Short daily greeting phrase (Formal)', async ({ page }) => {
  await testTranslation(page, ' suBha udhaeesanak veevaa!', 'සුභ උදෑසනක් වේවා!');
});

// ===================== NEGATIVE FUNCTIONAL TESTS =====================
test('Neg_Fun_0001 - Long mixed-language input with slang + typo', async ({ page }) => {
  await testTranslation(
    page,
    ' mama today office gihin awilla hri tired bn, morning meeting ek 9.30ta start una nisa work tika okkoma delay una. assignment ekaa submit krnna try kalaa bt net issue ekk awoth error msg ekak enva, heta 100% krnva bro pls understand',
    'මම'   //  keyword only
  );
});

test('Neg_Fun_0002 - Incorrect spelling in long Singlish paragraph', async ({ page }) => {
  await testTranslation(
    page,
    'Sri Lakaava kiyala kiyanneth south Asia eke thiyana lassan island country ekak. me rata natural beauty, culture saha history eka nisa hari popular. me rata thiyena beach, kandu, wathura, wewa saha tea estate wadiya tourism walata godak help wenawa. Sinhala, Tamil saha Muslim minissu ekka ekathu wela jeewath wenne me rate loku wiseshayak widihata. Buddhagama, Hindu, Islam saha Christian agama ekata respect ekak thiyenawa. village life eke simple widihak saha city life eke modern widihak ekathu wela thiyana nisa Sri Lanka kiyanneth honda, strong saha future ekata yana ratak kiyala kiyanna puluwan.',
    'ස්‍රි ළකාව කියල කියන්නෙත් south Asia eke තියන ලස්සන් island country එකක්. මෙ රට natural beauty, culture සහ history එක නිස හරි popular. මෙ රට තියෙන beach, කන්ඩු, wඅතුර, wඑwඅ සහ tea estate wඅඩිය tourism wඅලට ගොඩක් help wඑනwඅ. Sinhala, Tamil සහ මුස්ලිම් මිනිස්සු එක්ක එකතු wඑල ජේwඅත් wඑන්නෙ මෙ rate ලොකු wඉසෙශයක් wඉඩිහට. ඹුඩ්දගම, Hindu, Islam සහ Christian අගම එකට respect එකක් තියෙනwඅ. village life eke simple wඉඩිහක් සහ city life eke modern wඉඩිහක් එකතු wඑල තියන නිස ස්‍රි Lanka කියන්නෙත් හොන්ඩ, strong සහ future එකට යන රටක් කියල කියන්න පුලුwඅන්.'
  );
});

test('Neg_Fun_0003 - Joined words without spaces', async ({ page }) => {
  await testTranslation(
    page,
    'oyaatameekatherenne',
    'ඔයාටමේකතෙරෙන්නෙ'
  );
});


test('Neg_Fun_0004 - Slang overload in daily conversation', async ({ page }) => {
  await testTranslation(
    page,
    'machan mata ada full tired bn, office eke work patta stress , brain eka totally off',
    'මචන්'
  );
});

test('Neg_Fun_0005 - Sinhala idioms', async ({ page }) => {
  await testTranslation(
    page,
    'iguru dhila miris gaththa wage',
    'wage'
  );
});

test('Neg_Fun_0006 - Slang overload', async ({ page }) => {
  await testTranslation(page, ' oyaata pissudha? ow mata pissu.', 'pissu');
});

test('Neg_Fun_0007 - Joined words variation (Questions)', async ({ page }) => {
  await testTranslation(
    page,
    'Oyaaeekaehemahithanneeaeyi?',
    'ඔයාඒකැහෙමහිතන්නේඇයි?'
  );
});

test('Neg_Fun_0008 - Mixed Singlish + Sinhala greeting', async ({ page }) => {
  await testTranslation(page, ' halo machan', 'මචන්');
});

test('Neg_Fun_0009 - Typographical error in Singlish input', async ({ page }) => {
  await testTranslation(
    page,
    'mama ada pansalata yanava',
    'මම අඩ පන්සලට යනව'
  );
});

test('Neg_Fun_0010 - Mixed casing causes incorrect conversion', async ({ page }) => {
  await testTranslation(
    page,
    'mama KaArYaAlAyAtA yanavaa',
    'මම ඛඅරYඅඅලයට යනවා'
  );
});

// ===================== UI TEST =====================
test('Pos_UI_0001 - Sinhala output updates automatically in real-time', async ({ page }) => {
  await testTranslation(page, ' mama sellam karanavaa', 'මම සෙල්ලම් කරනවා');
});