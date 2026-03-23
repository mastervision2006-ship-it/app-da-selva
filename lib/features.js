import { PLANS } from './plans';

export function hasFeature(userPlan, feature) {
  return PLANS[userPlan]?.features.includes(feature) ?? false;
}

export function getPlanFeatures(userPlan) {
  return PLANS[userPlan]?.features ?? [];
}

export function getLockedUpgrade(feature) {
  const { UPGRADES } = require('./plans');
  return UPGRADES[feature] ?? null;
}
