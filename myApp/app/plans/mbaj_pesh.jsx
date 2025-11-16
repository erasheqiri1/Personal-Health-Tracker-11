
import React from 'react';
import PlanMealsScreen from '../../components/PlanMealsScreen';

export default function MbajPeshPlan() {
  return (
    <PlanMealsScreen
      planKey="mbaj"
      headerTitle="Plani: Mbaj Peshë"
      tips={[
        '• Qëllimi: rreth kalorisë së mirëmbajtjes (as deficit, as surplus).',
        '• Ruaj balancë mes proteinave, karbohidrateve dhe yndyrave të shëndetshme.',
        '• Monitoro peshën 1–2 herë në javë, jo çdo ditë.',
      ]}
    />
  );
}
