// import { getCurrentLevel } from "@/src/app/components/CurrentLevel";
// import { getHighestLevel } from "@/src/app/components/HighestLevel";
// import { getLowestLevel } from "@/src/app/components/LowestLevel";
// import { getChangeFromLast } from "@/src/app/components/ChangeFromLast";
import { getCurrentLevel, getHighestLevel, getLowestLevel, getChangeFromLast } from "@/src/app/components/DisplayData";
import { getTotal, getPrediction } from "@/src/app/components/WeatherData";

// Tests for getCurrentLevel()
describe("getCurrentLevel", () => {
    it("should return 0 if data is empty", () => { 
        expect(getCurrentLevel([])).toBe(0);
    });
  
    it("should return the last element's water level", () => {
      const mockData = [{ currentlvl: 1 }, { currentlvl: 5 }];
      expect(getCurrentLevel(mockData)).toBe(5);
    });
  
    it("should work with one element", () => {
      const mockData = [{ currentlvl: 10 }];
      expect(getCurrentLevel(mockData)).toBe(10);
    });
});

// Tests for getHighestLevel()
describe("getHighestLevel", () => {
  it("should return 0 if data is empty", () => { 
    expect(getHighestLevel([])).toBe(0);
  });

  it("should return the water level when array has one item", () => {
    const data = [{ currentlvl: 5 }];
    const result = getHighestLevel(data);
    expect(result).toBe(5);
  });

  it("should return the highest water level from multiple elements", () => {
    const data = [
      { currentlvl: 5 },
      { currentlvl: 10 },
      { currentlvl: 3 },
    ];
    const result = getHighestLevel(data);
    expect(result).toBe(10);
  });

  it("should return the highest water level when elements have the same water level", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 10 },
      { currentlvl: 10 },
    ];
    const result = getHighestLevel(data);
    expect(result).toBe(10);
  });
});

// Tests for getLowestLevel()
describe("getLowestLevel", () => {
  it("should return 0 if data is empty", () => { 
    expect(getLowestLevel([])).toBe(0);
  });

  it("should return water level when array has one item", () => {
    const data = [{ currentlvl: 5 }];
    const result = getLowestLevel(data);
    expect(result).toBe(5);
  });

  it("should return the lowest water level from multiple elements", () => {
    const data = [
      { currentlvl: 5 },
      { currentlvl: 10 },
      { currentlvl: 3 },
    ];
    const result = getLowestLevel(data);
    expect(result).toBe(3);
  });

  it("should return the lowest water level when elements have the same water level", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 10 },
      { currentlvl: 10 },
    ];
    const result = getLowestLevel(data);
    expect(result).toBe(10);
  });
});

// Tests for ChangeFromLast()
describe("getChangeFromLast", () => {
  it("should return 0 if the array has fewer than 2 elements", () => {
    expect(getChangeFromLast([])).toBe(0);
    const data = [{ currentlvl: 5 }];
    expect(getChangeFromLast(data)).toBe(0);
  });

  it("should return the difference between the last two elements when there are exactly two elements", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 15 },
    ];
    const result = getChangeFromLast(data);
    expect(result).toBe(5); 
  });

  it("should return the change from the last two elements when there are more than two", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 15 },
      { currentlvl: 20 },
    ];
    const result = getChangeFromLast(data);
    expect(result).toBe(5); 
  });

  it("should return 0 when the last two elements have the same water level", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 15 },
      { currentlvl: 15 },
    ];
    const result = getChangeFromLast(data);
    expect(result).toBe(0);
  });

  it("should return a negative number when the last element has a lower water level than the second last element", () => {
    const data = [
      { currentlvl: 10 },
      { currentlvl: 15 },
      { currentlvl: 5 },
    ];
    const result = getChangeFromLast(data);
    expect(result).toBe(-10); 
  });
});

// Tests for getTotal()
describe("getTotal", () => {

  it("returns the sum of all numbers in the array", () => {
    expect(getTotal([1, 2, 3, 4, 5])).toBe(15);
  });

  it("returns 0 for an empty array", () => {
      expect(getTotal([])).toBe(0);
  });

  it("works with decimal numbers", () => {
      expect(getTotal([1.5, 2.5, 3.5])).toBe(7.5);
  });

  it("works with a single-element array", () => {
      expect(getTotal([42])).toBe(42);
  });
  
});

// Tests for getPrediction()
describe("getPrediction", () => {

  it("returns 'increase' when number is greater than 20", () => {
    expect(getPrediction(25)).toBe("increase a lot");
    expect(getPrediction(100)).toBe("increase a lot");
  });

  it("returns 'increase slightly' when number is between 6 and 20", () => {
      expect(getPrediction(10)).toBe("increase slightly");
      expect(getPrediction(6)).toBe("increase slightly");
      expect(getPrediction(20)).toBe("increase slightly");
  });

  it("returns 'no change' when number is between -5 and 5", () => {
      expect(getPrediction(0)).toBe("not change significantly");
      expect(getPrediction(5)).toBe("not change significantly");
      expect(getPrediction(-5)).toBe("not change significantly");
  });

  it("returns 'decrease slightly' when number is between -6 and -20", () => {
      expect(getPrediction(-10)).toBe("decrease slightly");
      expect(getPrediction(-6)).toBe("decrease slightly");
      expect(getPrediction(-19)).toBe("decrease slightly");
  });

  it("returns 'decrease' when number is less than -20", () => {
      expect(getPrediction(-25)).toBe("decrease a lot");
      expect(getPrediction(-100)).toBe("decrease a lot");
  });
  
});