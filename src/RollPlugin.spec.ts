import RollPlugin from '.';

test(`usage info defaults to 'o', 'enter roll mode'`, () => {
  const subject = new RollPlugin({ config: {}, stdout: process.stdout })

  expect(subject.getUsageInfo()).toEqual({ key: 'o', prompt: 'enter roll mode.' })
})

test('is not enabled on start', async () => {
  const subject = new RollPlugin({ config: {}, stdout: process.stdout })
  expect(subject.isEnabled).toBe(false)
})
