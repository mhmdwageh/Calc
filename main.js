function arrMulNum(ar, num) {
  let nar = [];
  for (let i = 0; i < ar.length; i++) {
    nar[i] = ar[i] * num;
  }
  return nar;
}
function arrPlusArr(ar1, ar2) {
  let nar = [];
  for (let i = 0; i < ar1.length; i++) {
    nar[i] = ar1[i] + ar2[i];
  }
  return nar;
}
function SwapArr(ar1, ar2) {
  let nar = [];
  for (let i = 0; i < ar1.length; i++) {
    nar[i] = ar1[i];
    ar1[i] = ar2[i];
    ar2[i] = nar[i];
  }
}
let rows = [];
// DOM
const form = document.getElementById("Fform");
const Xn = document.getElementsByClassName("xn")[0];
const inputs = document.getElementsByClassName("inputs")[0];
const form2 = document.createElement("form");
form.append(form2);
let arr = [];
let inerarr = [];
form.addEventListener("submit", function (event) {
  event.preventDefault();
  Xn.innerHTML = "";
  inputs.innerHTML = "";

  form2.innerHTML = "";
  const numOfEls = document.getElementById("vc");
  // نفترض أن هناك عنصر واحد فقط بهذا الاسم
  const Vc = numOfEls.value !== "" ? +numOfEls.value : 0;
  for (let row = 0; row <= Vc; row++) {
    for (let colmn = 0; colmn <= Vc; colmn++) {
      if (row == 0) {
        console.log(row);
        const div = document.createElement(`div`);
        if (colmn < Vc) {
          div.textContent = `X${colmn + 1}`;
        } else {
          div.textContent = `C`;
        }
        div.id = `x-${colmn + 1}`;
        div.className = "VariablesName";
        Xn.append(div);
      } else {
        const inp = document.createElement(`input`);
        inp.setAttribute("type", "number");
        inp.style.width = `calc(100% / ${+Vc + 1})`;
        inp.id = `inp-${row - 1}  ${colmn}`;
        rows = [...rows, inp.id];
        inp.className = "input";
        // rows.map((e) => document.getElementById(e).value || 0);
        inputs.append(inp);
      }
    }
  }

  const sub = document.createElement("input");
  sub.addEventListener("click", (e) => {
    rows = rows.map((e) => +document.getElementById(e).value || 0);
    console.log(rows);
    for (let i = 0; i < Vc; i++) {
      arr[i] = rows.slice(0, Vc + 1);
      rows = rows.slice(Vc + 1);
      console.log(arr);
    }
    console.log(arr);
  });
  sub.type = "submit";
  form2.append(sub);
  sub.value = "Show Value";
  form2.addEventListener("submit", function (event) {
    form2.innerHTML = "";
    event.preventDefault();

    const pre = document.createElement("pre");
    pre.textContent = solve(arr);
    form2.append(pre);
  });
});
function solve(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i != arr.length - 1) {
      let newI = i + 1;
      while (arr[i][i] == 0) {
        SwapArr(arr[i], arr[newI]);
        newI++;
        if (newI == arr.length) break;
      }
    }
    if (arr[i][i] == 0) {
      let result = ["Infinty solution"];
      return result;
      break;
    } else {
      arr[i] = arrMulNum(arr[i], 1 / arr[i][i]);
      for (let k = i + 1; k < arr.length; k++) {
        arr[k] = arrPlusArr(arrMulNum(arr[i], -arr[k][i]), arr[k]);
      }
    }
  }
  for (let i = arr.length - 2; i >= 0; i--) {
    for (let k = arr.length - 1; k > i; k--) {
      arr[i] = arrPlusArr(arrMulNum(arr[k], -arr[i][k]), arr[i]);
    }
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i][arr[0].length - 1];
    result[i] = result[i].toFixed(2);
  }
  return result;
}
