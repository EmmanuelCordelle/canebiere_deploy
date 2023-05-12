export function coef(Dext, B, g1, g0, h, Ep, Type_bride) {
  let coef_result
  if (Type_bride === 'plate') {
    let K = Dext / B
    let Y = (1 / (K - 1)) * (0.66845 + (5.7169 * K * K * Math.log10(K)) / (K * K - 1))

    coef_result = {Y}
  } else {
    //ASME SECTION VIII DIV1 APENDIX 2
    let A = g1 / g0 - 1
    let h0 = Math.sqrt(B * g0)

    let rapport_h = h / h0

    let C = 43.68 * Math.pow(rapport_h, 4)
    let C1 = 1 / 3 + A / 12
    let C2 = 5 / 42 + (17 * A) / 336
    let C3 = 1 / 210 + A / 360
    let C4 = 11 / 360 + (59 * A) / 5040 + (1 + 3 * A) / C
    let C5 = 1 / 90 + (5 * A) / 1008 - Math.pow(1 + A, 3) / C
    let C6 = 1 / 120 + (17 * A) / 5040 + 1 / C
    let C7 = 215 / 2772 + (51 * A) / 1232 + (60 / 7 + (225 * A) / 14 + (75 * A * A) / 7 + (5 * Math.pow(A, 3)) / 2) / C
    let C8 = 31 / 6930 + (128 * A) / 45045 + (6 / 7 + (15 * A) / 7 + (12 * A * A) / 7 + (5 * Math.pow(A, 3)) / 11) / C
    let C9 =
      533 / 30240 + (653 * A) / 73920 + (0.5 + (33 * A) / 14 + (39 * A * A) / 28 + (25 * Math.pow(A, 3)) / 84) / C
    let C10 = 29 / 3780 + (3 * A) / 704 - (0.5 + (33 * A) / 14 + (81 * A * A) / 28 + (13 * Math.pow(A, 3)) / 12) / C
    let C11 = 31 / 6048 + (1763 * A) / 665280 + (0.5 + (6 * A) / 7 + (15 * A * A) / 28 + (5 * Math.pow(A, 3)) / 42) / C
    let C12 =
      1 / 2925 + (71 * A) / 300300 + (8 / 35 + (18 * A) / 35 + (156 * A * A) / 385 + (6 * Math.pow(A, 3)) / 55) / C
    let C13 =
      761 / 831600 + (937 * A) / 1663200 + (1 / 35 + (6 * A) / 35 + (11 * A * A) / 70 + (3 * Math.pow(A, 3)) / 70) / C
    let C14 = 197 / 415800 + (103 * A) / 332640 - (1 / 35 + (6 * A) / 35 + (17 * A * A) / 70 + Math.pow(A, 3) / 10) / C
    let C15 = 233 / 831600 + (97 * A) / 554400 + (1 / 35 + (3 * A) / 35 + (A * A) / 14 + (2 * Math.pow(A, 3)) / 105) / C
    let C16 = C1 * C7 * C12 + C2 * C8 * C3 + C3 * C8 * C2 - (C3 * C3 * C7 + C8 * C8 * C1 + C2 * C2 * C12)
    let C17 = (C4 * C7 * C12 + C2 * C8 * C13 + C3 * C8 * C9 - (C13 * C7 * C3 + C8 * C8 * C4 + C12 * C2 * C9)) / C16
    let C18 = (C5 * C7 * C12 + C2 * C8 * C14 + C3 * C8 * C10 - (C14 * C7 * C3 + C8 * C8 * C5 + C12 * C2 * C10)) / C16
    let C19 = (C6 * C7 * C12 + C2 * C8 * C15 + C3 * C8 * C11 - (C15 * C7 * C3 + C8 * C8 * C6 + C12 * C2 * C11)) / C16
    let C20 = (C1 * C9 * C12 + C4 * C8 * C3 + C3 * C13 * C2 - (C3 * C3 * C9 + C13 * C8 * C1 + C12 * C4 * C2)) / C16
    let C21 = (C1 * C10 * C12 + C5 * C8 * C3 + C3 * C14 * C2 - (C3 * C3 * C10 + C14 * C8 * C1 + C12 * C5 * C2)) / C16
    let C22 = (C1 * C11 * C12 + C6 * C8 * C3 + C3 * C15 * C2 - (C3 * C3 * C11 + C15 * C8 * C1 + C12 * C6 * C2)) / C16
    let C23 = (C1 * C7 * C13 + C2 * C9 * C3 + C4 * C8 * C2 - (C3 * C7 * C4 + C8 * C9 * C1 + C2 * C2 * C13)) / C16
    let C24 = (C1 * C7 * C14 + C2 * C10 * C3 + C5 * C8 * C2 - (C3 * C7 * C5 + C8 * C10 * C1 + C2 * C2 * C14)) / C16
    let C25 = (C1 * C7 * C15 + C2 * C11 * C3 + C6 * C8 * C2 - (C3 * C7 * C6 + C8 * C11 * C1 + C2 * C2 * C15)) / C16
    let C26 = -Math.pow(C / 4, 1 / 4)
    let C27 = C20 - C17 - 5 / 12 - C17 * Math.pow(C / 4, 1 / 4)
    let C28 = C22 - C19 - 1 / 12 - C19 * Math.pow(C / 4, 1 / 4)
    let C29 = -Math.pow(C / 4, 1 / 2)
    let C30 = -Math.pow(C / 4, 3 / 4)
    let C31 = (3 * A) / 2 - C17 * C30
    let C32 = 1 / 2 - C19 * C30
    let C33 = 0.5 * C26 * C32 + C28 * C31 * C29 - (0.5 * C30 * C28 + C32 * C27 * C29)
    let C34 = 1 / 12 + C18 - C21 - C18 * C26
    let C35 = -C18 * Math.pow(C / 4, 3 / 4)
    let C36 = (C28 * C35 * C29 - C32 * C34 * C29) / C33
    let C37 = (0.5 * C26 * C35 + C34 * C31 * C29 - (0.5 * C30 * C34 + C35 * C27 * C29)) / C33

    let E1 = C17 * C36 + C18 + C19 * C37
    let E2 = C20 * C36 + C21 + C22 * C37
    let E3 = C23 * C36 + C24 + C25 * C37
    let E4 = 1 / 4 + C37 / 12 + C36 / 4 - E3 / 5 - (3 * E2) / 2 - E1
    let E5 = E1 * (0.5 + A / 6) + E2 * (1 / 4 + (11 * A) / 84) + E3 * (1 / 70 + A / 105)
    let E6 = E5 - C36 * (7 / 120 + A / 36 + (3 * A) / C) - 1 / 40 - A / 72 - C37 * (1 / 60 + A / 120 + 1 / C)
    let F = -E6 / ((Math.pow(C / 2.73, 1 / 4) * Math.pow(1 + A, 3)) / C)
    let FL =
      (C18 * (0.5 + A / 6) + C21 * (1 / 4 + (11 * A) / 84) + C24 * (1 / 70 + A / 105) - (1 / 40 + A / 72)) /
      ((Math.pow(C / 2.73, 1 / 4) * Math.pow(1 + A, 3)) / C)
    let VL = (1 / 4 - C24 / 5 - (3 * C21) / 2 - C18) / ((Math.pow(2.73 / C, 1 / 4) * Math.pow(1 + A, 3)) / C)
    let V = E4 / (Math.pow(2.73 / C, 1 / 4) * Math.pow(1 + A, 3))
    let lambda = C36 / (1 + A) > 1 ? C36 / (1 + A) : 1
    let K = Dext / B
    let T = (K * K * (1 + 8.55246 * Math.log10(K)) - 1) / ((1.0472 + 1.9448 * K * K) * (K - 1))
    let U = (K * K * (1 + 8.55246 * Math.log10(K)) - 1) / (1.36136 * (K * K - 1) * (K - 1))
    let Y = (1 / (K - 1)) * (0.66845 + (5.7169 * K * K * Math.log10(K)) / (K * K - 1))
    let Z = (K * K + 1) / (K * K - 1)
    let nu = 0.3
    let e = F / h0
    let L = (Ep * e + 1) / T + (V * Math.pow(Ep, 3)) / (U * h0 * g0 * g0)
    let B1 = B > 20 * g1 ? B : lambda > 1 ? B + g0 : B + g1

    // console.log('A:',A,'h0:', h0, 'rapport h: ', rapport_h, 'c ', C, 'C1: ', C1, 'C2: ', C2, 'C3: ', C3, 'C4: ', C4, 'C5: ', C5)
    // console.log('C6: ', C6, 'C7: ', C7, 'C8: ', C8, 'C9: ', C9, 'C10: ', C10, 'C11: ', C11, 'C12: ', C12, 'C13: ', C13, 'C14: ', C14)
    // console.log('C15: ', C15, 'C16: ', C16, 'C17: ', C17, 'C18: ', C18, 'C19: ', C19, 'C20: ', C20, 'C21: ', C21, 'C22: ', C22, 'C23: ', C23)
    // console.log('C24: ', C24, 'C25: ', C25, 'C26: ', C26, 'C27: ', C27, 'C28: ', C28, 'C29: ', C29, 'C30: ', C30, 'C31: ', C31, 'C32: ', C32)
    // console.log('C33: ', C33, 'C34: ', C34, 'C35: ', C35, 'C36: ', C36,'C37: ',C37, 'E1: ', E1, 'E2: ', E2, 'E3: ', E3, 'E4: ', E4, 'E5: ', E5, 'E6: ', E6)
    // console.log('F: ', F, 'FL: ', FL, 'V: ', V, 'VL: ', VL, 'lambda: ', lambda, 'K: ', K, 'T: ', T, 'U: ', U, 'Y: ', Y, 'Z: ', Z, 'e :', e, 'L :', L, 'B1 :', B1)

    coef_result = {L, B1, lambda, e, Y, Z}
  }
  return coef_result
}
