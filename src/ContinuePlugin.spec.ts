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
