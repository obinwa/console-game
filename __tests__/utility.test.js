// @ts-nocheck
let { getAlphabetFromNumber } = require("../utility");

describe("getAlphabetFromNumber()", () => {
  test("valid alphabet", () => {
    let alphabet = getAlphabetFromNumber(5);
    expect(alphabet).toBe("E");
  });
});
