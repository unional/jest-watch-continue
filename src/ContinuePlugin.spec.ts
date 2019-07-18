import { AssertOrder } from 'assertron';
import chalk from 'chalk';
import ContinuePlugin from '.';

test(`usage info defaults to 'n', 'start continue mode'`, () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })

  expect(subject.getUsageInfo()).toEqual({ key: 'n', prompt: 'start continue mode' })
})

test(`starting continue mode prints the message 'Continue Mode enabled.'`, async () => {
  const o = new AssertOrder(1)

  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })

  subject.log = msg => {
    o.once(1)
    expect(msg).toEqual(chalk.bold('\nContinue Mode started.'))
  }

  await subject.run()

  o.end()
})

test('exit continue mode will prints a message', async () => {
  const o = new AssertOrder(2)

  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })

  subject.log = msg => {
    o.on(2, () => {
      expect(msg).toEqual(chalk.bold('\nContinue Mode stopped.'))
    })
    o.any([1, 2])
  }

  await subject.run()
  await subject.run()

  expect(subject.getUsageInfo()).toEqual({ key: 'n', prompt: 'start continue mode' })
  o.end()
})

test('is not enabled on start', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  expect(subject.enabled).toBe(false)
})

test('enable will not start tests', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  expect(await subject.run()).toBe(false)
})

test('when entering continue mode with no test, assume it is suspended and will not exist continue mode immediately', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  let completeHandler: any
  subject.apply({
    onFileChange() { },
    shouldRunTestSuite() { },
    onTestRunComplete(handler) { completeHandler = handler }
  })

  await subject.run()

  completeHandler({ numTotalTestSuites: 0, testResults: [] })
  expect(subject.enabled).toBe(true)
})

test('with no test, prints a message about continue mode is on.', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  let completeHandler: any
  subject.apply({
    onFileChange() { },
    shouldRunTestSuite() { },
    onTestRunComplete(handler) { completeHandler = handler }
  })

  const o = new AssertOrder(2)
  subject.log = msg => {
    o.on(2, () => expect(msg).toEqual(chalk.bold(`Continue Mode is on.`)))
    o.any([1, 2])
  }

  await subject.run()

  completeHandler({ numTotalTestSuites: 0, testResults: [] })
  o.end()
})

test('when a test suite passes, it will not be executed next time', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  let completeHandler: any
  let shouldRunHandler: any
  subject.apply({
    onFileChange() { },
    shouldRunTestSuite(handler) { shouldRunHandler = handler },
    onTestRunComplete(handler) { completeHandler = handler }
  })

  await subject.run()

  completeHandler({
    numTotalTestSuites: 2, testResults: [
      { testFilePath: 'a' },
      { testFilePath: 'b', failureMessage: 'some message' }
    ]
  })

  expect(shouldRunHandler({ testPath: 'a' })).toBe(false)
})

test('when some tests failed, will stay in continue mode', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  let completeHandler: any
  subject.apply({
    onFileChange() { },
    shouldRunTestSuite() { },
    onTestRunComplete(handler) { completeHandler = handler }
  })

  await subject.run()

  completeHandler({
    numTotalTestSuites: 1, testResults: [{ testFilePath: 'a', failureMessage: 'some message' }]
  })
  expect(subject.enabled).toBe(true)
})

test('when all test passed, will exit continue mode', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  let completeHandler: any
  subject.apply({
    onFileChange() { },
    shouldRunTestSuite() { },
    onTestRunComplete(handler) { completeHandler = handler }
  })

  await subject.run()

  completeHandler({
    numTotalTestSuites: 1, testResults: [{ testFilePath: 'a' }]
  })
  expect(subject.enabled).toBe(false)
})
