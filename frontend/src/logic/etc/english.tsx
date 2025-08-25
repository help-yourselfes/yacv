

function wordEnding(count: number, wordOne: string): string {
    if (count === 1) return wordOne;

    const end = wordOne.at(-1);
    const pend = wordOne.at(-2);

    let wordMany = wordOne;

    switch (end) {
        case 's':
            wordMany += pend === 's' ? 'es' : 'ses'
        default:
            wordMany += 's'
    }
    return wordMany;
}

function wordCounter(count: number, word: string): string {

    if (count === 1) return `1 ${word}`
    const newWord = wordEnding(count, word);
    console.log(word, newWord)
    if (count === 0) return `no ${newWord}`
    return `${count} ${newWord}`;
}

export { wordEnding, wordCounter };