import * as chalk from 'chalk';
import * as readline from 'readline';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export interface PromptOptions {
    /**
     * Allow empty responses
     * @note if defaultValue is set allowEmpty will be useless
     */
    allowEmpty?: boolean;
    /**
     * Prompt hint text
     */
    hint?: string;
    /**
     * Default value, if is not set empty answers be prompted again
     */
    defaultValue?: string;
    /**
     * Primpt intent, like dang be red
     */
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

/**
 * Displays a message and waits for a response from the user.
 * @param question the question text
 * @param options PromptOptions
 */
export async function prompt(question: string, options: PromptOptions = {}): Promise<string | null> {
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

    if (options.allowEmpty) {
        return null;
    }

    return prompt(question, options);
}
