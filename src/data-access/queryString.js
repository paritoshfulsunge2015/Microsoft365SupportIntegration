const isNullOrUndefined = (value) => value === null || value === undefined;

const encoderForArrayFormat = (options) => {
  switch (options.arrayFormat) {
    case "index":
      return (key) => (result, value) => {
        const index = result.length;

        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), "[", index, "]"].join("")];
        }

        return [
          ...result,
          [
            encode(key, options),
            "[",
            encode(index, options),
            "]=",
            encode(value, options),
          ].join(""),
        ];
      };

    case "bracket":
      return (key) => (result, value) => {
        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), "[]"].join("")];
        }

        return [
          ...result,
          [encode(key, options), "[]=", encode(value, options)].join(""),
        ];
      };

    case "comma":
    case "separator":
      return (key) => (result, value) => {
        if (value === null || value === undefined || value.length === 0) {
          return result;
        }

        if (result.length === 0) {
          return [[encode(key, options), "=", encode(value, options)].join("")];
        }

        return [
          [result, encode(value, options)].join(options.arrayFormatSeparator),
        ];
      };

    default:
      return (key) => (result, value) => {
        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, encode(key, options)];
        }

        return [
          ...result,
          [encode(key, options), "=", encode(value, options)].join(""),
        ];
      };
  }
};

const validateArrayFormatSeparator = (value) => {
  if (typeof value !== "string" || value.length !== 1) {
    throw new TypeError("arrayFormatSeparator must be single character string");
  }
};

const encode = (value, options) => {
  if (options.encode) {
    return encodeURIComponent(value);
  }

  return value;
};

export const stringify = (object, options) => {
  if (!object) {
    return "";
  }

  options = Object.assign(
    {
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
    },
    options
  );

  validateArrayFormatSeparator(options.arrayFormatSeparator);

  const shouldFilter = (key) =>
    (options.skipNull && isNullOrUndefined(object[key])) ||
    (options.skipEmptyString && object[key] === "");

  const formatter = encoderForArrayFormat(options);

  const objectCopy = {};

  for (const key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  const keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys
    .map((key) => {
      const value = object[key];

      if (value === undefined) {
        return "";
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join("&");
      }

      return encode(key, options) + "=" + encode(value, options);
    })
    .filter((x) => x.length > 0)
    .join("&");
};
