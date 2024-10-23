/* eslint-disable no-console */
import chalk from 'chalk'
import { stopSpinner } from './spinner'

export function error(text?: string) {
  stopSpinner()
  console.log(`${chalk.bgRed(' ERROR ')} ${chalk.red(text ?? '')}`)
}

export function log(text?: string) {
  stopSpinner()
  console.log(text ?? '')
}

export function warn(coloredText?: string, uncoloredText?: string) {
  console.log(`${chalk.bgYellowBright(' WARN ')}  ${chalk.yellow(coloredText ?? '')} ${uncoloredText ?? ''}`)
}

export function ok(text?: string) {
  console.log(`${chalk.bgGreen('  OK  ')}  ${text ?? ''}`)
}
