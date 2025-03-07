import { getCurrentLevel } from "@/src/app/components/CurrentLevel";
import { getHighestLevel } from "@/src/app/components/HighestLevel";
import { getLowestLevel } from "@/src/app/components/LowestLevel";
import { getChangeFromLast } from "@/src/app/components/ChangeFromLast";

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