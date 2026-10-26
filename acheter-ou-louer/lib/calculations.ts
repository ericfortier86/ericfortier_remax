export const money = (n: number) => new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
export function minimumDown(price: number) { return price >= 1500000 ? price * .2 : Math.min(price, 500000) * .05 + Math.max(0, price - 500000) * .1; }
export function premiumRate(price: number, down: number) { const ltv = (price - down) / price; return ltv <= .8 ? 0 : ltv <= .85 ? .028 : ltv <= .9 ? .031 : .04; }
export function monthlyRate(rate: number) { return Math.pow(1 + rate / 200, 1 / 6) - 1; }
export function payment(principal: number, rate: number, years = 25) { const r = monthlyRate(rate); return r === 0 ? principal / (years * 12) : principal * r / (1 - Math.pow(1 + r, -years * 12)); }
export const MAX_COMPARISON_YEARS = 25;
const defaultPrice = 450000;
export const defaultInputs = { price: defaultPrice, down: minimumDown(defaultPrice), rent: 1800, rate: 4.5, years: 5, appreciation: 2, returnRate: 4, rentGrowth: 3.1, taxes: 3600, maintenance: 1, insurance: 120, renterInsurance: 30, condo: 0, heating: 120, closing: 1, selling: 4, income: 100000, debts: 400, savings: 45000 };
export type Inputs = typeof defaultInputs;
export function compare(v: Inputs) {
  const minimum = minimumDown(v.price);
  const valid = v.down >= minimum && v.down <= v.price;
  const loan = Math.max(0, v.price - v.down), premium = loan * premiumRate(v.price, v.down);
  const principal = loan + premium, monthly = payment(principal, v.rate);
  const closing = v.price * v.closing / 100 + premium * .09;
  const upfront = v.down + closing;
  let debt = principal, home = v.price, tenantWealth = upfront, ownerInvestment = 0;
  const investRate = Math.pow(1 + v.returnRate / 100, 1 / 12) - 1;
  const houseRate = Math.pow(1 + v.appreciation / 100, 1 / 12) - 1;
  const points: { year: number; owner: number; renter: number; difference: number }[] = [];
  for (let month = 1; month <= MAX_COMPARISON_YEARS * 12; month++) {
    const inflation = Math.pow(1.02, (month - 1) / 12);
    const ownerCost = monthly + (v.taxes / 12 + v.price * v.maintenance / 1200 + v.insurance + v.condo) * inflation;
    const tenantCost = v.rent * Math.pow(1 + v.rentGrowth / 100, (month - 1) / 12) + v.renterInsurance * inflation;
    tenantWealth = tenantWealth * (1 + investRate) + Math.max(0, ownerCost - tenantCost);
    ownerInvestment = ownerInvestment * (1 + investRate) + Math.max(0, tenantCost - ownerCost);
    debt = Math.max(0, debt * (1 + monthlyRate(v.rate)) - monthly); home *= 1 + houseRate;
    if (month % 12 === 0) { const owner = home * (1 - v.selling / 100) - debt + ownerInvestment; points.push({ year: month / 12, owner, renter: tenantWealth, difference: owner - tenantWealth }); }
  }
  const selected = points[v.years - 1];
  return { valid, minimum, premium, principal, monthly, closing, upfront, ownerMonthly: monthly + v.taxes / 12 + v.price * v.maintenance / 1200 + v.insurance + v.condo, points, selected, firstAdvantage: points.find(p => p.difference >= 0)?.year };
}
export function capacity(v: Inputs) {
  const qualifying = Math.max(v.rate + 2, 5.25), income = v.income / 12;
  const overhead = v.taxes / 12 + v.heating + v.condo * .5;
  const room = Math.max(0, Math.min(income * .39 - overhead, income * .44 - overhead - v.debts));
  function scenario(price: number) { const down = minimumDown(price), premium = (price - down) * premiumRate(price, down); return { down, premium, needed: down + price * v.closing / 100 + premium * .09, qualifyingPayment: payment(price - down + premium, qualifying) }; }
  let lo = 0, hi = 2000000;
  for (let i = 0; i < 65; i++) { const mid = (lo + hi) / 2, s = scenario(mid); if (s.needed <= v.savings && s.qualifyingPayment <= room) lo = mid; else hi = mid; }
  const price = Math.floor(lo / 1000) * 1000, s = scenario(price), target = scenario(v.price);
  const gds = income > 0 ? (target.qualifyingPayment + overhead) / income * 100 : Infinity;
  const tds = income > 0 ? (target.qualifyingPayment + overhead + v.debts) / income * 100 : Infinity;
  return { price, qualifying, room, ...s, monthly: price > 0 ? payment(price - s.down + s.premium, v.rate) + v.taxes / 12 + v.insurance + price * v.maintenance / 1200 + v.condo : 0, targetShortfall: Math.max(0, target.needed - v.savings), targetNeeded: target.needed, gds, tds, targetFits: target.needed <= v.savings && gds <= 39 && tds <= 44 };
}
