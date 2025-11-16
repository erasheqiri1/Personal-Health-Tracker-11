
import React from 'react';
import PlanMealsScreen from '../../components/PlanMealsScreen';

export default function HumbPeshPlan() {
  return (
    <PlanMealsScreen
      planKey="humb"
      headerTitle="Plani: Humb Peshë"
      tips={[
        '• Qëllimi: deficit kalorik i lehtë (-250–400 kcal/ditë).',
        '• Fokus te perimet, proteinat e larta, shmang kaloritë boshe (pije të ëmbla, snacks ultra–të–përpunuara).',
        '• Mbaj 3 vakte + 1 ndërmjetëse nëse ke nevojë, jo “urije ekstreme”.',
      ]}
    />
  );
}
