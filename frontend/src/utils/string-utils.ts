const capitalise = (str: string): string =>
    str.length === 0
        ? str
        : str.charAt(0).toUpperCase() + str.slice(1);

const screamingSnakeCaseToSentence = (str: string): string =>
    str.replaceAll('_', ' ').toLowerCase();

const possessive = (str: string): string =>
    str.endsWith('s') ? `${str}'` : `${str}'s`;


export { capitalise, screamingSnakeCaseToSentence, possessive };
