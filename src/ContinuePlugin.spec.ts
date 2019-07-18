import ContinuePlugin from '.';

test(`usage info defaults to 'n', 'start continue mode'`, () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })

  expect(subject.getUsageInfo()).toEqual({ key: 'n', prompt: 'start continue mode' })
})

test('is not enabled on start', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  expect(subject.enabled).toBe(false)
})

test('enable will start tests', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  expect(await subject.run()).toBe(true)
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
