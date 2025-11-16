
import React from 'react';
import WorkoutPlanScreen from '../../components/WorkoutPlanScreen';

const BG_ICONS_HOME = [
  { name: 'arm-flex', x: 0.18, y: 0.12, sizeMul: 0.22, op: 0.10, rot: -8 },
  { name: 'yoga', x: 0.80, y: 0.10, sizeMul: 0.20, op: 0.08, rot: 8 },
  { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
  { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
  { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
  { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
];

export default function HomeWorkoutScreen() {
  return (
    <WorkoutPlanScreen
      planKey="homeworkout"
      headerTitle="Home Workout"
      activeTabLabel="Home Workout"
      otherTabLabel="Weightlifting"
      otherTabRoute="/ushtrime/weightlifting"
      bgIcons={BG_ICONS_HOME}
    />
  );
}


