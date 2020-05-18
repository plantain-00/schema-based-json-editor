import * as common from '../packages/core/src'
import test from 'ava'

test('getDefaultValue', (t) => {
  t.is(common.getDefaultValue(true, { type: 'string' }, 'initial value'), 'initial value')
  t.is(common.getDefaultValue(false, { type: 'string' }, 'initial value'), 'initial value')
  t.is(common.getDefaultValue(true, { type: 'string', default: 'default value' }, 'initial value'), 'initial value')
  t.is(common.getDefaultValue(false, { type: 'string', default: 'default value' }, 'initial value'), 'initial value')
  t.is(common.getDefaultValue(true, { type: 'string' }, undefined), '')
  t.is(common.getDefaultValue(false, { type: 'string' }, undefined), undefined)
  t.is(common.getDefaultValue(true, { type: 'string', default: 'default value' }, undefined), 'default value')
  t.is(common.getDefaultValue(false, { type: 'string', default: 'default value' }, undefined), undefined)

  t.is(common.getDefaultValue(false, { type: 'string' }, 123), undefined)

  t.is(common.getDefaultValue(true, { type: 'object', properties: {} }, undefined), {})
  t.is(common.getDefaultValue(true, { type: 'array', items: { type: 'string' } }, undefined), [])
  t.is(common.getDefaultValue(true, { type: 'number' }, undefined), 0)
  t.is(common.getDefaultValue(true, { type: 'integer' }, undefined), 0)
  t.is(common.getDefaultValue(true, { type: 'boolean' }, undefined), false)

  t.is(common.getDefaultValue(true, { type: 'null' }, undefined), null)

  t.is(common.getDefaultValue(true, { type: 'number', enum: [1, 2] }, undefined), 1)
  t.is(common.getDefaultValue(true, { type: 'integer', enum: [1, 2] }, undefined), 1)
  t.is(common.getDefaultValue(true, { type: 'string', enum: ['a', 'b'] }, undefined), 'a')
})

test('isSame', (t) => {
  t.is(common.isSame(null, null), true)
  t.is(common.isSame(1, 1), true)
  t.is(common.isSame('abc', 'abc'), true)
  t.is(common.isSame(true, true), true)
  t.is(common.isSame(false, false), true)
  t.is(common.isSame([1, 2], [1, 2]), true)
  t.is(common.isSame({ a: 1, b: 2 }, { a: 1, b: 2 }), true)
  t.is(common.isSame({ a: [1, 2], b: [2, 3] }, { a: [1, 2], b: [2, 3] }), true)
  t.is(common.isSame([{ a: 1, b: 2 }, { b: 3, c: 4 }], [{ a: 1, b: 2 }, { b: 3, c: 4 }]), true)

  t.is(common.isSame(null, 1), false)
  t.is(common.isSame([1, 2], [2, 1]), false)
})

test('getErrorMessageOfArray', (t) => {
  t.is(common.getErrorMessageOfArray(undefined, { type: 'array', items: { type: 'string' } }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfArray(['abc'], { type: 'array', items: { type: 'string' }, minItems: 2 }, common.defaultLocale), 'The length of the array must be >= 2.')
  t.is(common.getErrorMessageOfArray(['abc'], { type: 'array', items: { type: 'string' }, minItems: 1 }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfArray(['abc', 'abc'], { type: 'array', items: { type: 'string' }, uniqueItems: true }, common.defaultLocale), 'The item in 0 and 1 must not be same.')
  t.is(common.getErrorMessageOfArray(['abc', 'abd'], { type: 'array', items: { type: 'string' }, uniqueItems: true }, common.defaultLocale), '')
})

test('getErrorMessageOfNumber', (t) => {
  t.is(common.getErrorMessageOfNumber(undefined, { type: 'number' }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfNumber(123, { type: 'number', minimum: 124 }, common.defaultLocale), 'Value must be >= 124.')
  t.is(common.getErrorMessageOfNumber(123, { type: 'number', minimum: 123, exclusiveMinimum: true }, common.defaultLocale), 'Value must be > 123.')
  t.is(common.getErrorMessageOfNumber(123, { type: 'number', minimum: 122 }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfNumber(123, { type: 'number', maximum: 122 }, common.defaultLocale), 'Value must be <= 122.')
  t.is(common.getErrorMessageOfNumber(123, { type: 'number', maximum: 123, exclusiveMaximum: true }, common.defaultLocale), 'Value must be < 123.')
  t.is(common.getErrorMessageOfNumber(123, { type: 'number', maximum: 124 }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfNumber(123, { type: 'number', multipleOf: 2 }, common.defaultLocale), 'Value must be multiple value of 2.')
})

test('getErrorMessageOfString', (t) => {
  t.is(common.getErrorMessageOfString(undefined, { type: 'string' }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfString('abc', { type: 'string', minLength: 4 }, common.defaultLocale), 'Value must be at least 4 characters long.')
  t.is(common.getErrorMessageOfString('abc', { type: 'string', minLength: 3 }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfString('abc', { type: 'string', maxLength: 2 }, common.defaultLocale), 'Value must be at most 2 characters long.')
  t.is(common.getErrorMessageOfString('abc', { type: 'string', maxLength: 3 }, common.defaultLocale), '')

  t.is(common.getErrorMessageOfString('abcd', { type: 'string', pattern: '^[A-z]{3}$' }, common.defaultLocale), "Value doesn't match the pattern ^[A-z]{3}$.")
  t.is(common.getErrorMessageOfString('abc', { type: 'string', pattern: '^[A-z]{3}$' }, common.defaultLocale), '')
})

test('recordInvalidPropertiesOfObject', (t) => {
  const invalidProperties1 = ['a', 'b']
  common.recordInvalidPropertiesOfObject(invalidProperties1, true, 'b')
  t.is(invalidProperties1, ['a'])

  const invalidProperties2 = ['a', 'b']
  common.recordInvalidPropertiesOfObject(invalidProperties2, false, 'c')
  t.is(invalidProperties2, ['a', 'b', 'c'])
})

test('recordInvalidIndexesOfArray', (t) => {
  const invalidIndexes1 = [0, 2]
  common.recordInvalidIndexesOfArray(invalidIndexes1, true, 2)
  t.is(invalidIndexes1, [0])

  const invalidIndexes2 = [0, 2]
  common.recordInvalidIndexesOfArray(invalidIndexes2, false, 1)
  t.is(invalidIndexes2, [0, 2, 1])
})

test('isImageUrl', (t) => {
  t.is(common.isImageUrl('http://www.example.com/a.png'), true)
  t.is(common.isImageUrl('https://www.example.com/a.png'), true)
  t.is(common.isImageUrl('http://www.example.com/a.jpg'), true)
  t.is(common.isImageUrl('http://www.example.com/a.gif'), true)
  t.is(common.isImageUrl('http://www.example.com/a.bmp'), true)

  t.is(common.isImageUrl(undefined), false)
  t.is(common.isImageUrl('abc'), false)
  t.is(common.isImageUrl('htt://www.example.com/a.png'), false)
  t.is(common.isImageUrl('http://www.example.com/a.html'), false)
})

test('replaceProtocal', (t) => {
  t.is(common.replaceProtocal('http://example/a.png'), 'https://example/a.png')
  t.is(common.replaceProtocal('https://example/a.png'), 'https://example/a.png')
  t.is(common.replaceProtocal('ws://example/a.png'), 'ws://example/a.png')
})

test('findTitle', (t) => {
  t.is(common.findTitle(undefined, [
    { property: 'a', schema: { type: 'string' } }
  ]), undefined)
  t.is(common.findTitle({ a: 'b' }, [
    { property: 'a', schema: { type: 'string' } }
  ]), 'b')
  t.is(common.findTitle({ a: 1 }, [
    { property: 'a', schema: { type: 'number' } }
  ]), undefined)
  t.is(common.findTitle({ a: '', b: 'c' }, [
    { property: 'a', schema: { type: 'string' } },
    { property: 'b', schema: { type: 'string' } }
  ]), 'c')
  t.is(common.findTitle({ a: 'bbbbbcccccdddddeeeeeffff' }, [
    { property: 'a', schema: { type: 'string' } }
  ]), 'bbbbbcccccdddddeeeee...')
  t.is(common.findTitle({ a: 'bbbbbcccccdddddeeeeefff' }, [
    { property: 'a', schema: { type: 'string' } }
  ]), 'bbbbbcccccdddddeeeeefff')
})

test('getTitle', (t) => {
  t.is(common.getTitle(undefined), '')
  t.is(common.getTitle(0, 1), '0')
  t.is(common.getTitle(null, 0, 1), '0')
})

test('compare', (t) => {
  t.is(common.compare({ property: 'a', schema: { type: 'string', propertyOrder: 1 } }, { property: 'a', schema: { type: 'string', propertyOrder: 3 } }), -2)
  t.is(common.compare({ property: 'a', schema: { type: 'string' } }, { property: 'a', schema: { type: 'string', propertyOrder: 3 } }), 1)
  t.is(common.compare({ property: 'a', schema: { type: 'string', propertyOrder: 1 } }, { property: 'a', schema: { type: 'string' } }), -1)
  t.is(common.compare({ property: 'a', schema: { type: 'string' } }, { property: 'a', schema: { type: 'string' } }), 0)
})
