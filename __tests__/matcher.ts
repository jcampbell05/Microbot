import { matcher } from '../src/matcher'
import * as XRegExp from 'xregexp'

test('If object matches then result should be true', () => {
  let pattern = {
    'text': 'hello'
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match then result should be false', () => {
  let pattern = {
    'text': 'goodbye'
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If deep-object matches then result should be true', () => {
  let pattern = {
    'sender': {
      'id': 1
    }
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If deep-object does not match then result should be false', () => {
  let pattern = {
    'sender': {
      'id': 2
    }
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If deep-object matches via keypath then result should be true', () => {
  let pattern = {
    'sender.id': 1
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If deep-object does not match via keypath then result should be false', () => {
  let pattern = {
    'sender.id': 2
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches regexp then result should be true', () => {
  let pattern = {
    'text': /hello/
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match regexp then result should be false', () => {
  let pattern = {
    'text': /goodbye/
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches xregexp then result should be true', () => {
  let pattern = {
    'text': new XRegExp('hello')
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match xregexp then result should be false', () => {
  let pattern = {
    'text': new XRegExp('goodbye')
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches function then result should be true', () => {
  let pattern = {
    'text': (value) => {
      return true
    }
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match function then result should be false', () => {
  let pattern = {
    'text': (value) => {
      return false
    }
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

// Array -> Object
// Array -> Function

test('If function returns true then result should be true', () => {
  let pattern = (event) => {
    return true
  }
  let event = {}
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If function returns false then result should be false', () => {
  let pattern = (event) => {
    return false
  }
  let event = {}
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});