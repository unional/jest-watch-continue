import { required } from 'unpartial';
import chalk from 'chalk'

export interface UsageInfo {
  key: string,
  prompt: string
}

export type ProjectConfig = any

export type JestHooks = {
  shouldRunTestSuite(handler: (context: { testPath: string }) => boolean | Promise<boolean>): void,
  onTestRunComplete(handler: (results: any) => void): void,
  onFileChange(handler: (changes: { projects: Array<{ config: ProjectConfig, testPaths: string[] }> }) => void): void
}

export class ContinuePlugin {
  usageInfo: UsageInfo
  promptMessage: string
  enabled = false
  log = console.info
  passedSuites: string[] = []
  constructor({ config }: {
    config: Partial<UsageInfo>,
    stdout: any
  }) {
    this.usageInfo = required({ key: 'n', prompt: 'start continue mode' }, config)
    this.promptMessage = this.usageInfo.prompt
  }
  // Add hooks to Jest lifecycle events
  apply(jestHooks: JestHooks) {
    jestHooks.onFileChange(({ projects }) => {
      if (this.enabled) {
        const changedFiles = projects.reduce((p, v) => { p.push(...v.testPaths); return p }, [] as string[])
        changedFiles.forEach(f => {
          let i = this.passedSuites.indexOf(f)
          while (i !== -1) {
            this.passedSuites.splice(i, 1)
            i = this.passedSuites.indexOf(f)
          }
        })
      }
    })

    jestHooks.shouldRunTestSuite(({ testPath }) => {
      return this.passedSuites.indexOf(testPath) === -1
    })

    jestHooks.onTestRunComplete((results) => {
      if (this.enabled) {
        const totalTestSuites = results.numTotalTestSuites
        if (totalTestSuites === 0) return

        results.testResults.forEach(r => {
          if (!r.failureMessage) {
            this.passedSuites.push(r.testFilePath)
          }
        })
        const passedSuiteCount = this.passedSuites.length
        if (totalTestSuites === this.passedSuites.length) {
          this.log(chalk.bold('Continue Mode:'), `All test suites passed, exiting continue mode`)
          this.toggleMode()
        }
        else {
          this.log(chalk.bold('Continue Mode:'), `${chalk.green.bold(`${passedSuiteCount} passed`)}, ${chalk.cyan(`${totalTestSuites - passedSuiteCount} more to go`)}`)
        }
      }
    })
  }

  // Get the prompt information for interactive plugins
  getUsageInfo() {
    return this.enabled ? { ...this.usageInfo, prompt: 'start continue mode' } : this.usageInfo
  }

  // Executed when the key from `getUsageInfo` is input
  run() {

    if (this.toggleMode()) {
      this.log(chalk.bold('\nContinue Mode started.'))
    }
    else {
      this.log(chalk.bold('\nContinue Mode stopped.'))
    }
    return Promise.resolve(false)
  }
  toggleMode() {
    this.enabled = !this.enabled
    if (!this.enabled) this.passedSuites = []
    return this.enabled
  }
}
