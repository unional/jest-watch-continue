import { required } from 'unpartial';

export interface UsageInfo {
  key: string,
  prompt: string
}

export class RollPlugin {
  usageInfo: UsageInfo
  isEnabled = false
  constructor({ stdout, config }: {
    config: Partial<UsageInfo>,
    stdout: any
  }) {
    this.usageInfo = required({ key: 'o', prompt: 'enter roll mode.' }, config)
  }

  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(() => {
      return true
    })
  }

  // Get the prompt information for interactive plugins
  getUsageInfo() {
    return this.usageInfo
  }

  // Executed when the key from `getUsageInfo` is input
  run() {
    this.isEnabled = true
    return true
  }
}
