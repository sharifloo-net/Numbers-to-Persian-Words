function convertNumberToPersianWords(number) {
    const persianNumbers = [
        'صفر',
        'یک',
        'دو',
        'سه',
        'چهار',
        'پنج',
        'شش',
        'هفت',
        'هشت',
        'نه',
    ];
    const persianExceptions = [
        '',
        'یازده',
        'دوازده',
        'سیزده',
        'چهارده',
        'پانزده',
        'شانزده',
        'هفده',
        'هجده',
        'نوزده',
    ];
    const persianTens = [
        '',
        'ده',
        'بیست',
        'سی',
        'چهل',
        'پنجاه',
        'شصت',
        'هفتاد',
        'هشتاد',
        'نود',
    ];
    const persianHundreds = [
        '',
        'صد',
        'دویست',
        'سیصد',
        'چهارصد',
        'پانصد',
        'ششصد',
        'هفتصد',
        'هشتصد',
        'نهصد',
    ];
    const persianThousands = ['', 'هزار', 'میلیون', 'میلیارد'];

    if (number === 0) {
        return persianNumbers[0];
    }

    let words = '';
    let segments = [];

    while (number > 0) {
        segments.push(number % 1000);
        number = Math.floor(number / 1000);
    }

    for (let i = segments.length - 1; i >= 0; i--) {
        let segment = segments[i];
        if (segment === 0) continue;

        let segmentWords = '';

        if (segment >= 100) {
            segmentWords += persianHundreds[Math.floor(segment / 100)] + ' و ';
            segment %= 100;
        }

        if (segment >= 10 && segment <= 19) {
            segmentWords += persianExceptions[segment % 10];
        } else {
            if (segment >= 10) {
                segmentWords += persianTens[Math.floor(segment / 10)] + ' و ';
                segment %= 10;
            }
            if (segment > 0) {
                segmentWords += persianNumbers[segment];
            }
        }

        if (i > 0) {
            segmentWords += ' ' + persianThousands[i] + ' و ';
        }

        words += segmentWords + ' ';
    }

    return words.trim();
}

// Example usage
console.log(convertNumberToPersianWords(12015)); // صد بیست و سه میلیون چهارصد پنجاه و شش هزار هفتصد هشتاد و نه