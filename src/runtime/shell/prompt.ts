import * as chalk from 'chalk';
import * as readline from 'readline';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export interface PromptOptions {
    allowEmpty?: boolean;
    hint?: string;
    defaultValue?: string;
    intent?: 'danger' | 'success' | 'warning' | 'info';
}

function parseIntent(intent: 'danger' | 'success' | 'warning' | 'info' | undefined, message: string) {
    switch (intent) {
    case 'success':
        return chalk.green(message);
    case 'danger':
        return chalk.green(message);
    case 'warning':
        return chalk.green(message);
    case 'info':
        return chalk.green(message);
    default: return message;
    }
}

export async function prompt(question: string, options: PromptOptions = {}): Promise<string> {
    let questionText = parseIntent(options.intent, question);

    if (options.hint) {
        questionText = `${questionText} ${chalk.dim(`(${options.hint})`)}`;
    }

    const answer: string = await new Promise((resolve) => readLineInterface.question(questionText, resolve));

    if (answer && String(answer).trim().length > 0) {
        return answer;
    }

    if (options.defaultValue) {
        return options.defaultValue;
    }

    return prompt(question, options);
}
