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
    const persianDecimalThousands = [
        'دهم',
        'صدم',
        'هزارم',
        'ده هزارم',
        'صد هزارم',
        'میلیونم',
    ];
    var decimalSegmentsZeros = '';
    const pushNumInSegments = (num, segmentsType) => {
        while (num > 0) {
            if (segmentsType == decimalSegments) {
                decimalSegmentsZeros = num.match(/^0+/)[0];
                segmentsType.push(String(num % 1000));
            } else segmentsType.push(num % 1000);
            num = Math.floor(num / 1000);
        }
    };
    let isNegative = false;
    let words = '';
    let segments = [],
        decimalSegments = [];

    if (number === 0) return persianNumbers[0];
    else if (number < 0) {
        number = Math.abs(number);
        isNegative = true;
    }
    if (number === Math.floor(number)) pushNumInSegments(number, segments);
    else {
        let integerPart = number.toString().split('.')[0];
        let decimalPart = number.toString().split('.')[1];

        pushNumInSegments(integerPart, segments);
        pushNumInSegments(decimalPart, decimalSegments);
    }
    for (
        i =
            segments.length -
            1 +
            (decimalSegments.length != 0 ? decimalSegments.length : 0);
        i >= 0;
        i--
    ) {
        let segment = null,
            decimalSegment = null,
            backupDecimalSegment = null;
        if (segments[i - 1] != null) segment = segments[i - 1];
        else {
            decimalSegment = backupDecimalSegment = decimalSegments[i]; //* here
        }
        if (segment === 0) continue;
        let segmentWords = '',
            decimalSegmentWords = '';

        if (segment >= 100) {
            segmentWords += persianHundreds[Math.floor(segment / 100)] + ' و ';
            segment %= 100;
        } else if (decimalSegment >= 100) {
            decimalSegmentWords +=
                persianHundreds[Math.floor(decimalSegment / 100)] + ' و ';
            decimalSegment %= 100;
        }
        //* changed
        if (segment != null && segment != 0) {
            if (segment > 10 && segment < 20) {
                segmentWords += persianExceptions[segment % 10];
            } else {
                if (segment >= 10) {
                    segmentWords +=
                        persianTens[Math.floor(segment / 10)] + ' و ';
                    segment %= 10;
                }
                if (segment > 0) {
                    segmentWords += persianNumbers[segment];
                    segment = 0; //* new code
                }
            }
        } else {
            if (decimalSegment > 10 && decimalSegment < 20) {
                decimalSegmentWords += persianExceptions[decimalSegment % 10];
            } else {
                if (decimalSegment >= 10) {
                    decimalSegmentWords +=
                        persianTens[Math.floor(decimalSegment / 10)] + ' و ';
                    decimalSegment %= 10;
                }
                if (decimalSegment > 0) {
                    decimalSegmentWords += persianNumbers[decimalSegment] + ' ';
                }
            }
        }
        if (i > segments.length - 1 + decimalSegments.length) {
            if (segmentWords != '')
                segmentWords += ' ' + persianThousands[i] + ' و ';
            else decimalSegmentWords += ' ' + persianThousands[i] + ' و ';
        }
        if (i === 0 && decimalSegmentWords !== '') {
            words +=
                ' ممیز ' +
                decimalSegmentWords +
                persianDecimalThousands[
                    backupDecimalSegment.toString().length - 1
                ];
        } else words += segmentWords + ' ';
    }
    if (isNegative) words = 'منفی ' + words;

    return words.trim();
}

console.log(convertNumberToPersianWords(12.023));
