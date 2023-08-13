/**
 *
 * Classe permettant de retourner un GUID
 *	UUID v4
 *
 *	varsion: M=4
 * variant: N
 *	pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 *
 *
 * @returns function generate
 *
 */
export default function () {
  const generateNumber = (limit: number): number => {
    const value = limit * Math.random();
    return value | 0;
  };

  const generateX = (): string => {
    const value = generateNumber(16);
    return value.toString(16);
  };

  const generateXes = (count: number): string => {
    let result = '';
    for (let i = 0; i < count; ++i) {
      result += generateX();
    }
    return result;
  };

  const generateVariant = (): string => {
    const value = generateNumber(16);
    const variant = (value & 0x3) | 0x8;
    return variant.toString(16);
  };

  const generate = (): string => {
    const result =
      generateXes(8) +
      '-' +
      generateXes(4) +
      '-' +
      '4' +
      generateXes(3) +
      '-' +
      generateVariant() +
      generateXes(3) +
      '-' +
      generateXes(12);
    return result;
  };

  return {
    generate,
  };
}
