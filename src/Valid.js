export const valid = (selected, previousTurn) => {
  let selKeys = Object.keys(selected);
  let preKeys = Object.keys(previousTurn);
  let selVals = [];
  let preVals = [];

  for (let i = 0; i < selKeys.length; i++) {
    selVals.push(selected[selKeys[i]].value);
  }
  for (let i = 0; i < preKeys.length; i++) {
    preVals.push(previousTurn[preKeys[i]].value);
  }

  let selTotal = selVals.reduce((a, b) => a + b);
  let preTotal = preVals.reduce((a, b) => a + b);

  if (previousTurn === "pass") {
    preKeys = selKeys;
    preTotal = -1;
  }

  console.log(selVals, preVals);
  console.log(selTotal, preTotal);
  console.log(selKeys, preKeys);

  //testSingle
  if (selKeys.length === 1 && preKeys.length === 1) {
    if (selTotal > preTotal) {
      return true;
    }
  }

  //testDouble
  if (selKeys.length === 2 && preKeys.length === 2) {
    if (selTotal > preTotal) {
      if (Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4)) {
        if (
          Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) ||
          preTotal === -1
        ) {
          return true;
        }
      }
    }
  }

  //testTriple
  if (selKeys.length === 3 && preKeys.length === 3) {
    if (selTotal > preTotal) {
      if (
        Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[2] / 4)
      ) {
        console.log("1");
        if (
          (Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[2] / 4)) ||
          preTotal === -1
        ) {
          return true;
        }
        console.log("2");
      }
    }
  }

  //testQuadru
  if (selKeys.length === 4 && preKeys.length === 4) {
    if (selTotal > preTotal) {
      if (
        Math.floor(selVals[0] / 4) === Math.floor(selVals[1] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[2] / 4) &&
        Math.floor(selVals[0] / 4) === Math.floor(selVals[3] / 4)
      ) {
        if (
          (Math.floor(preVals[0] / 4) === Math.floor(preVals[1] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[2] / 4) &&
            Math.floor(preVals[0] / 4) === Math.floor(preVals[3] / 4)) ||
          preTotal === -1
        ) {
          return true;
        }
      }
    }
  }

  //testString
  if (selKeys.length === preKeys.length) {
    if (selTotal > preTotal) {
      for (let i = 0; i < selKeys.length - 1; i++) {
        if (Math.floor(selVals[i] / 4) + 1 !== Math.floor(selVals[i + 1] / 4)) {
          return false;
        }
        if (
          Math.floor(preVals[i] / 4) + 1 !== Math.floor(preVals[i + 1] / 4) &&
          preTotal !== -1
        ) {
          return false;
        }
        return true;
      }
    }
  }

  return false;
};
