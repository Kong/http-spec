import { SchemaObject } from 'openapi3-ts';
import { translateHeaderObject, translateMediaTypeObject } from '../content';

describe('translateMediaTypeObject', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('given single example should translate to IHttpContent', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          example: 'hey',
          encoding: {},
        },
        'mediaType',
      ),
    ).toMatchSnapshot();
  });

  test('given multiple examples should translate to IHttpContent', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: { example: { summary: 'multi example', value: 'hey' } },
          encoding: {},
        },
        'mediaType',
      ),
    ).toMatchSnapshot();
  });

  test('given encodings should translate each encoding to array item', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: {
            example: {
              id: 12133433,
              summary: 'multi example',
              value: 'hey',
            },
          },
          encoding: {
            enc1: {
              contentType: 'text/plain',
              headers: {
                h1: {},
              },
              style: 'form',
              explode: true,
              allowReserved: true,
            },
            enc2: {
              contentType: 'text/plain',
              headers: {
                h1: {},
              },
              style: 'form',
              explode: true,
              allowReserved: true,
            },
          },
        },
        'mediaType',
      ),
    ).toMatchSnapshot();
  });

  test('given complex nested media type object should translate correctly', () => {
    expect(
      translateMediaTypeObject(
        {
          schema: {},
          examples: { example: { summary: 'multi example', value: 'hey' } },
          encoding: {
            enc1: {
              contentType: 'text/plain',
              style: 'form',
              headers: {
                h1: {
                  description: 'descr',
                  style: 'matrix',
                  examples: {
                    a: {
                      summary: 'example summary',
                      value: 'hey',
                    },
                  },
                  content: {
                    'nested/media': {},
                  },
                },
              },
            },
          },
        },
        'mediaType',
      ),
    ).toMatchSnapshot();
  });

  test('given encoding with incorrect style should throw an error', () => {
    const testedFunction = () => {
      translateMediaTypeObject(
        {
          schema: {},
          examples: { example: { summary: 'multi example' } },
          encoding: {
            enc1: {
              contentType: 'text/plain',
              style: 'xyz',
            },
          },
        },
        'mediaType',
      );
    };
    expect(testedFunction).toThrowErrorMatchingSnapshot();
  });

  test('given encoding with no style it should not throw an error', () => {
    const testedFunction = () => {
      translateMediaTypeObject(
        {
          schema: {},
          examples: { example: { summary: 'multi example' } },
          encoding: {
            enc1: {
              contentType: 'text/plain',
            },
          },
        },
        'mediaType',
      );
    };
    expect(() => testedFunction()).not.toThrow();
  });

  describe('schema integrity after transform', () => {
    const schema = ({
      type: ['string', 'object'],
      description: 'A simple string',
      example: 'hello',
    } as unknown) as SchemaObject;

    const originalSchema = JSON.parse(JSON.stringify(schema));

    test('will not modify the original schema so it can be reused in references ', () => {
      translateMediaTypeObject(
        {
          schema,
          example: 'hey',
          encoding: {},
        },
        'mediaType',
      );

      expect(schema).toStrictEqual(originalSchema);
    });

    test('will keep the example property', () => {
      const translatedObject = translateMediaTypeObject(
        {
          schema,
          example: 'hey',
          encoding: {},
        },
        'mediaType',
      );
      expect(translatedObject.schema).toHaveProperty('example', 'hello');
    });
  });
});

describe('translateHeaderObject', () => {
  test('should translate to IHttpHeaderParam', () => {
    expect(
      translateHeaderObject(
        {
          description: 'descr',
          required: true,
          deprecated: true,
          allowEmptyValue: true,
          style: 'matrix',
          explode: true,
          allowReserved: true,
          schema: {},
          examples: {
            a: {
              summary: 'example summary',
              value: 'hey',
            },
          },
          example: {},
          content: {},
        },
        'header-name',
      ),
    ).toMatchSnapshot();
  });
});
