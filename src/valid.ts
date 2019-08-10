const simpleValidation = (input: string) => {
  return input ? input.length > 0 : false;
};

// Check required and non-zero length

export default simpleValidation;
