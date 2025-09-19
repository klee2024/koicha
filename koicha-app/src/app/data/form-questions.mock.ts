import { QuizQuestion } from '../models/quizQuestion';

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    initialPrompt: "It's a beautiful",
    followUpPrompt: 'day',
    type: 'radio',
    options: [
      { value: 'floral', label: 'Spring' },
      { value: 'grassy', label: 'Summer' },
      { value: 'creamy', label: 'Fall' },
      { value: 'umami', label: 'Winter' },
    ],
  },
  {
    id: 'q2',
    initialPrompt: 'You are welcomed into a',
    followUpPrompt: 'restaurant for the afternoon',
    type: 'radio',
    options: [
      { value: 'creamy', label: 'Cozy' },
      { value: 'floral', label: 'Airy' },
      { value: 'umami', label: 'Luxurious' },
      { value: 'grassy', label: 'Minimalist' },
    ],
  },
  {
    id: 'q3',
    initialPrompt: "There's a pleasnt",
    followUpPrompt: 'aroma in the air',
    type: 'radio',
    options: [
      { value: 'creamy', label: 'Vanilla' },
      { value: 'nutty', label: 'Freshly baked bread' },
      { value: 'floral', label: 'Wildflowers' },
      { value: 'grassy', label: 'Lemongrass' },
    ],
  },
  {
    id: 'q4',
    initialPrompt: "Let's order a drink! The",
    followUpPrompt: 'sounds good',
    type: 'radio',
    options: [
      { value: 'astringent', label: 'Black coffee' },
      { value: 'floral', label: 'Plum tea' },
      { value: 'creamy', label: 'Hot chocolate' },
      { value: 'nutty', label: 'Mocha' },
    ],
  },
  {
    id: 'q5',
    initialPrompt: "You'll have that",
    followUpPrompt: '',
    type: 'radio',
    options: [
      { value: 'astringent', label: 'Straight' },
      { value: 'nutty', label: 'Almond milk' },
      { value: 'umami', label: 'Oat milk' },
      { value: 'creamy', label: 'Whole milk' },
    ],
  },
  {
    id: 'q6',
    initialPrompt: 'You like...',
    followUpPrompt: '',
    type: 'radio',
    options: [
      { value: 'usucha', label: 'A refreshing beverage' },
      { value: 'koicha', label: 'A rich beverage to enjoy slowly' },
      {
        value: 'latte',
        label: 'A satisfying beverage you can take on the go',
      },
    ],
  },
  {
    id: 'q7',
    initialPrompt: 'What looks good on the menu?',
    followUpPrompt: '',
    type: 'radio',
    options: [
      { value: 'umami', label: 'Mushroom pappardelle' },
      { value: 'nutty', label: 'Pistachio' },
      { value: 'astringent', label: 'Sushi' },
      { value: 'grassy', label: 'Salad' },
    ],
  },
  {
    id: 'q8',
    initialPrompt: "You'll take a",
    followUpPrompt: 'To go',
    type: 'radio',
    options: [
      { value: 'nutty', label: 'Cardamom bun' },
      { value: 'creamy', label: 'Canele' },
      { value: 'floral', label: 'Orange blossom madeleine' },
      {
        value: 'umami',
        label: 'Spinach and white cheddar puff pastry',
      },
    ],
  },
];
