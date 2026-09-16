import { describe, expect, it } from 'vitest';
import { urlBase64ToUint8Array } from './push-subscription';

describe('urlBase64ToUint8Array', () => {
  it('decodes url-safe base64 without padding (Safari-compatible)', () => {
    // "hello" in standard base64 is aGVsbG8=, url-safe without padding: aGVsbG8
    const bytes = urlBase64ToUint8Array('aGVsbG8');
    expect(Array.from(bytes)).toEqual([104, 101, 108, 108, 111]);
  });
});
