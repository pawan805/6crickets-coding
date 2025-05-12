import { Injectable } from '@angular/core';

export type Range = [number, number];

export interface CameraRange {
  distance: Range;
  light: Range;
}

export interface SoftwareCameraRequirement {
  distance: Range;
  light: Range;
}

@Injectable({
  providedIn: 'root'
})
export class CameraUtilService {

  constructor() { }

  isCameraSetupSufficient(required: CameraRange, cameras: CameraRange[]) {
    const distance = cameras.map(res => res.distance);
    const lightRange = cameras.map(res => res.light);

    const mergedDistance = this.mergeRanges(distance);
    const mergedLight = this.mergeRanges(lightRange);
    return (
      this.isRangeCovered(mergedDistance, required.distance) &&
      this.isRangeCovered(mergedLight, required.light)
    );

  }

  mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) return [];
    //Sort ranges by their start value to prepare for merging
    ranges.sort((a, b) => a[0] - b[0]);

    //Initialize the merged list with the first range
    const merged: Range[] = [ranges[0]];

    for (let i = 1; i < ranges.length; i++) {
      //Last range in the merged list
      const last = merged[merged.length - 1];
      const current = ranges[i];

      // If current range overlaps or touches the last merged range
      if (current[0] <= last[1]) {
        last[1] = Math.max(last[1], current[1]);
      } else {
        // If no overlap, add the current range as a new entry
        merged.push(current);
      }
    }

    return merged;
  }


  /**
  * Checks if the given required range is fully covered by the list of available (merged) ranges.
  */
  private isRangeCovered(availableRanges: Range[], required: Range): boolean {
    let [start, end] = required;
    for (const [rStart, rEnd] of availableRanges) {
      if (rStart <= start && rEnd >= start) {
        if (rEnd >= end) return true;
        start = rEnd;
      }
    }

    return false;
  }
}
