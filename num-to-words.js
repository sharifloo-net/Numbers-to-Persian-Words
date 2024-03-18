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
    const pushNumInSegments = (num, segmentsType) => {
        while (num > 0) {
            if (segmentsType == decimalSegments) {
                if (num[0] == 0)
                    decimalSegmentsZeros = num.match(/^0+/)
                        ? num.match(/^0+/)[0]
                        : '';
                segmentsType.push(String(num % 1000));
            } else {
                if (num.toString().endsWith('0')) {
                    try {
                        segmentsZeros = String(num).match(/0{3}$/)[0];
                    } catch {
                        segmentsZeros = '';
                    }
                    num = Number(String(num).replace(segmentsZeros, ''));
                }
                segmentsType.push(num % 1000);
            }
            num = Math.floor(num / 1000);
        }
    };
    let isNegative = false;
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
        i =
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
            backupDecimalSegment += String(decimalSegments[count]); //? is need String() ?
            decimalSegments[count] = null;
        }
        // if (segment === 0) continue; //? needs count++ ?
        let segmentWords = '',
            decimalSegmentWords = '';

        if (segment >= 100) {
            segmentWords += persianHundreds[Math.floor(segment / 100)];
            segment %= 100;
            if (segment !== 0) segmentWords += ' و ';
        } else if (decimalSegment >= 100) {
            decimalSegmentWords +=
                persianHundreds[Math.floor(decimalSegment / 100)];
            decimalSegment %= 100;
            if (decimalSegment !== 0) decimalSegmentWords += ' و ';
        }
        if (segment != null) {
            if (segment > 10 && segment < 20) {
                segmentWords += persianExceptions[segment % 10];
            } else {
                if (segment >= 10) {
                    segmentWords += persianTens[Math.floor(segment / 10)];
                    segment %= 10;
                    if (segment !== 0) segmentWords += ' و ';
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
                        persianTens[Math.floor(decimalSegment / 10)];
                    decimalSegment %= 10;
                    if (decimalSegment !== 0) decimalSegmentWords += ' و ';
                }
                if (decimalSegment > 0) {
                    decimalSegmentWords += persianNumbers[decimalSegment] + ' ';
                }
            }
        }
        if (
            i <
                segments.length -
                    1 +
                    (decimalSegments.length != 0
                        ? decimalSegments.length - 1
                        : 0) &&
            count !== 0
        ) {
            if (preWords) segmentWords += ' ' + persianThousands[count] + ' و ';
            if (preDecimalWords && segmentsZeros === '')
                decimalSegmentWords += ' ' + persianThousands[count] + ' و ';
        }
        //* here
        if (segmentsZeros !== '') {
            segmentWords +=
                ' ' + persianThousands[count + segmentsZeros.length / 3];
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
            if (segmentWords) words += segmentWords;
            if (decimalSegmentWords) decimalWords += decimalSegmentWords;
        } else {
            if (segmentWords) preWords += segmentWords;
            else preDecimalWords += decimalSegmentWords;
        }
        if (i === 0) {
            if (decimalSegmentWords) {
                words +=
                    preWords +
                    ' ' +
                    ' ممیز ' +
                    decimalWords +
                    ' ' +
                    preDecimalWords +
                    persianDecimalThousands[
                        backupDecimalSegment.length -
                            1 +
                            decimalSegmentsZeros.length
                    ];
            } else words += preWords;
        }
        count++;
    }
    if (isNegative) words = 'منفی ' + words;
    return words.trim();
}

console.log(convertNumberToPersianWords(200000.03));
