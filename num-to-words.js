const convertNumberToPersianWords = (number) => {
    number = +number;

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
    const persianThousands = [
        '',
        'هزار',
        'میلیون',
        'میلیارد',
        'تریلیون',
        'کوادریلیون',
    ];
    const persianDecimalThousands = [
        'دهم',
        'صدم',
        'هزارم',
        'ده هزارم',
        'صد هزارم',
        'میلیونم',
        'ده میلیونم',
        'صد میلیونم',
        'میلیاردم',
        'ده میلیاردم',
        'صد میلیاردم',
    ];
    var decimalSegmentsZeros = '',
        segmentsZeros = '';

    var digits = 0,
        isFirstSegmentsZerosLoop = true;

    var zerosCount = 0;

    const pushNumInSegments = (num, segmentsType) => {
        while (num > 0) {
            if (segmentsType == decimalSegments) {
                if (num[0] == 0)
                    decimalSegmentsZeros = num.match(/^0+/)
                        ? num.match(/^0+/)[0]
                        : '';
                segmentsType.push(String(num % 1000));
            } else {
                try {
                    while (
                        String(num).match(/0{3}$/)[0] &&
                        isFirstSegmentsZerosLoop
                    ) {
                        try {
                            segmentsZeros += String(num).match(/0{3}$/)[0];
                        } catch {}
                        num = num.toString().replace('000', '');
                    }
                } catch {}
                if (num % 1000 === 0) digits++;
                else segmentsType.push(num % 1000);
                isFirstSegmentsZerosLoop = false;
            }
            num = Math.floor(num / 1000);
        }
    };
    let isNegative = false,
        isOnlyDecimal = false;
    let words = '',
        preWords = '',
        decimalAndIntSeparator = '',
        decimalWords = '',
        preDecimalWords = '';
    let segments = [],
        decimalSegments = [];

    if (number === 0) return persianNumbers[0];
    else if (number < 0) {
        number = Math.abs(number);
        isNegative = true;
    }
    if (number > 0 && number < 1) isOnlyDecimal = true;
    if (number === Math.floor(number)) pushNumInSegments(number, segments);
    else {
        let integerPart = number.toString().split('.')[0];
        let decimalPart = number.toString().split('.')[1];

        pushNumInSegments(integerPart, segments);
        pushNumInSegments(decimalPart, decimalSegments);
    }

    //* Vars for loop
    let count = 0;
    let isFirstDecimalSegment = true;
    let backupDecimalSegment = '';

    for (
        let i =
            segments.length -
            1 +
            (decimalSegments.length != 0 ? decimalSegments.length : 0);
        i >= 0;
        i--
    ) {
        let segment = null,
            decimalSegment = null;
        if (segments[count] != null && segments[count] != '') {
            segment = segments[count];
            segments[count] = null;
        } else {
            if (isFirstDecimalSegment) {
                count = 0;
                isFirstDecimalSegment = false;
            }
            decimalSegment = decimalSegments[count];
            backupDecimalSegment += decimalSegments[count];
            decimalSegments[count] = null;
        }
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
        if (segment != null) {
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
                    decimalSegmentWords += persianNumbers[decimalSegment];
                }
            }
        }
        // console.log(
        //     i,
        //     segments.length -
        //         1 +
        //         (decimalSegments.length != 0 ? decimalSegments.length - 1 : 0),
        //     count
        // );
        if (
            i <=
                segments.length -
                    1 +
                    (decimalSegments.length != 0
                        ? decimalSegments.length - 1
                        : 0) &&
            !segmentsZeros
        ) {
            let persianThousandsVal = //* for ifs
                persianThousands[decimalSegmentWords ? count + 1 : count];

            if (words && preWords && segmentWords) {
                if (
                    segmentWords.trim().slice(-1) === 'و' &&
                    segmentWords.trim().slice(-2) !== 'دو'
                )
                    segmentWords = segmentWords.trim().slice(0, -1);
                words =
                    segmentWords + ' ' + persianThousandsVal + ' و ' + words;
                segmentWords = '';
            } else if (words && !words.includes('هزار')) {
                //* if only integer numbers exist

                if (
                    words.trim().slice(-1) === 'و' &&
                    words.trim().slice(-2) === ' '
                )
                    words = words.trim().slice(0, -1);
                words += ' ' + persianThousandsVal + ' و ';
            } else if (preWords && preWords !== ' هزار' && segmentWords) {
                if (
                    segmentWords.trim().slice(-1) === 'و' &&
                    segmentWords.trim().slice(-2) !== 'دو'
                )
                    segmentWords = segmentWords.trim().slice(0, -1);
                segmentWords +=
                    ' ' +
                    persianThousands[
                        decimalSegmentWords
                            ? count + 1
                            : count + digits + zerosCount
                    ] +
                    ' و ';
            }
            if (preDecimalWords)
                decimalSegmentWords += ' ' + persianThousands[count] + ' و ';
        }
        if (segmentsZeros) {
            if (
                segmentWords.trim().slice(-1) === 'و' &&
                segmentWords.trim().slice(-2) !== 'دو'
            )
                segmentWords = segmentWords.trim().slice(0, -1);
            segmentWords +=
                ' ' + persianThousands[count + segmentsZeros.length / 3];
            segmentsZeros = '';
            zerosCount++;
        }
        if (
            i <
                segments.length -
                    1 +
                    (decimalSegments.length != 0
                        ? decimalSegments.length
                        : 0) &&
            count !== 0
        ) {
            if (segmentWords) {
                if (words) words = segmentWords + words;
                else words += segmentWords;
            }
            if (decimalSegmentWords)
                decimalWords = decimalSegmentWords + decimalWords;
        } else {
            if (segmentWords) preWords += segmentWords;
            if (decimalSegmentWords) preDecimalWords += decimalSegmentWords;
        }
        if (i === 0) {
            if (decimalSegmentWords && !isOnlyDecimal) {
                words +=
                    preWords +
                    ' ' +
                    ' ممیز ' +
                    decimalWords +
                    ' ' +
                    preDecimalWords +
                    ' ' +
                    persianDecimalThousands[
                        backupDecimalSegment.length -
                            1 +
                            decimalSegmentsZeros.length
                    ];
            } else if (isOnlyDecimal) {
                words +=
                    decimalWords +
                    ' ' +
                    preDecimalWords +
                    ' ' +
                    persianDecimalThousands[
                        backupDecimalSegment.length -
                            1 +
                            decimalSegmentsZeros.length
                    ];
            } else {
                if (
                    words.slice(-2) === 'و ' &&
                    (preWords === ' هزار' ||
                        preWords === ' میلیون' ||
                        preWords === ' میلیارد' ||
                        preWords === ' تریلیون' ||
                        preWords === ' کوادریلیون')
                ) {
                    words = words.replace(words.slice(-2, -1), '');
                    words = words.trim() + ' ' + preWords.trim();
                } else words += preWords;
            }
        }
        count++;
    }

    if (isNegative) words = 'منفی ' + words;
    if (words.trim().endsWith('و') && words.trim().slice(-2) !== 'دو')
        words = words.trim().slice(0, -1);

    return words.trim();
};

export { convertNumberToPersianWords };

console.log(convertNumberToPersianWords(1234.1));
