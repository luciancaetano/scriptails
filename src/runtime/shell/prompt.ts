import * as chalk from 'chalk';
import * as readline from 'readline';
import { PromptOptions } from '../types';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

/**
 * Displays a message and waits for a response from the user.
 * For more advanced features use https://www.npmjs.com/package/prompts
 * @param question the question text
 * @param settings PromptOptions
 */
export async function prompt(question: string, settings: PromptOptions = {}): Promise<string | null> {
    let questionText = parseIntent(settings.intent, question);

    if (settings.hint) {
        questionText = `${questionText} ${chalk.dim(`(${settings.hint})`)}`;
    }

    const answer: string = await new Promise((resolve) => readLineInterface.question(questionText, resolve));

    if (answer && String(answer).trim().length > 0) {
        return answer;
    }

    if (settings.defaultValue) {
        return settings.defaultValue;
    }

    if (settings.allowEmpty) {
        return null;
    }

    return prompt(question, settings);
}
