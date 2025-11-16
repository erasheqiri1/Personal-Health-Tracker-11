
import React from 'react';
import WorkoutPlanScreen from '../../components/WorkoutPlanScreen';

const BG_ICONS_WEIGHT = [
  { name: 'dumbbell', x: 0.20, y: 0.12, sizeMul: 0.23, op: 0.10, rot: -6 },
  { name: 'weight-lifter', x: 0.78, y: 0.14, sizeMul: 0.21, op: 0.08, rot: 5 },
  { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
  { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
  { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
  { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
];

export default function WeightliftingScreen() {
  return (
    <WorkoutPlanScreen
      planKey="weightlifting"
      headerTitle="Weightlifting"
      activeTabLabel="Weightlifting"
      otherTabLabel="Home Workout"
      otherTabRoute="/ushtrime/homeworkout"
      bgIcons={BG_ICONS_WEIGHT}
    />
  );
}
