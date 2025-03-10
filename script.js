// بيانات القرآن (مثال لسورة الفاتحة والبقرة)
const quranData = {
    "الفاتحة": [
        "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ],
"البقرة": [
    "الم", // <button class="citation-flag" data-index="5">: "الم" كحروف مقطعة بدون أشكال إضافية
    "ذلك الكتاب لا ريب فيه هدىً للمتّقين", // <button class="citation-flag" data-index="3">, <button class="citation-flag" data-index="5">
    "الذين يؤمنون بالغيب ويقيمون الصلاة ومما رزقناهم ينفقون", // <button class="citation-flag" data-index="3">, <button class="citation-flag" data-index="8">
    "والذين يؤمنون بما أنزل عليك وما أنزل من قبلك ومصدّقِ بهِ وبالآخرة لهم كتبتِ الرّشاد", // <button class="citation-flag" data-index="6">, <button class="citation-flag" data-index="8">
    "أولئك على هدى من ربهم وأولئك هم المفلحون" // <button class="citation-flag" data-index="9">, <button class="citation-flag" data-index="10">
]};

// دالة لحذف الحركات (التشكيل) <button class="citation-flag" data-index="3">
String.prototype.normalizeDiacritics = function() {
    return this.normalize("NFD").replace(/[\u064B-\u0652]/g, "");
};

document.addEventListener('DOMContentLoaded', () => {
    const surahSelect = document.getElementById('surahSelect');
    const quranContent = document.getElementById('quranContent');
    const searchInput = document.getElementById('searchInput');

    // عرض السورة عند التغيير
    surahSelect.addEventListener('change', () => {
        const selectedSurah = surahSelect.value;
        displayVerses(selectedSurah);
    });

    // البحث عن آية بدون تشكيل <button class="citation-flag" data-index="3">
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.normalizeDiacritics().toLowerCase();
        const verses = quranData[surahSelect.value] || [];
        const filteredVerses = verses.filter(verse => 
            verse.normalizeDiacritics().toLowerCase().includes(searchTerm)
        );
        displayFilteredVerses(filteredVerses);
    });

    // عرض الآيات
    function displayVerses(surahName) {
        const verses = quranData[surahName] || [];
        const html = verses.map((verse, index) => 
            `<div class="verse">${index + 1}. ${verse}</div>`
        ).join('');
        quranContent.innerHTML = html;
    }

    // عرض النتائج المُرشحة
    function displayFilteredVerses(verses) {
        const html = verses.map((verse, index) => 
            `<div class="verse">${index + 1}. ${verse}</div>`
        ).join('');
        quranContent.innerHTML = html;
    }

    // عرض السورة الافتراضية عند التحميل
    displayVerses(surahSelect.value);
});