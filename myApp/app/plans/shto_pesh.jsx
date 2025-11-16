
import React from 'react';
import PlanMealsScreen from '../../components/PlanMealsScreen';

export default function ShtoPeshPlan() {
  return (
    <PlanMealsScreen
      planKey="shto"
      headerTitle="Plani: Shto Peshë"
      tips={[
        '• Qëllimi: surplus i lehtë kalorik (+250–400 kcal/ditë).',
        '• Shto ushqime të pasura me kalori të mira (arra, vaj ulliri, avokado, qumësht, kos grek).',
        '• Shpërndaj kaloritë në 3–5 vakte, mos i fut të gjitha përnjëherë.',
      ]}
    />
  );
}
