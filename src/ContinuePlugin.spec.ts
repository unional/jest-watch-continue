import ContinuePlugin from '.';

test(`usage info defaults to 'n', 'start continue mode'`, () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })

  expect(subject.getUsageInfo()).toEqual({ key: 'n', prompt: 'start continue mode' })
})

test('is not enabled on start', async () => {
  const subject = new ContinuePlugin({ config: {}, stdout: process.stdout })
  expect(subject.enabled).toBe(false)
})
