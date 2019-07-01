module.exports = {
  isEmpty: value => {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "object" &&
        Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  },
  isEmail: value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@callutheran.edu/;
    return re.test(value);
  }
};
