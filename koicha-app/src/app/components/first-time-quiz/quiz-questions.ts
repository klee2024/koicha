class Season {
  id = 'q1';
  initialPrompt = "It's a beautiful";
  followUpPrompt = 'day';
  options = [
    { value: 'floral', label: 'Spring' },
    { value: 'grassy', label: 'Summer' },
    { value: 'creamy', label: 'Fall' },
    { value: 'umami', label: 'Winter' },
  ];
}

class Aesthetic {
  id = 'q2';
  initialPrompt = 'You are welcomed into a';
  followUpPrompt = 'restaurant for the afternoon';
  options = [
    { value: 'creamy', label: 'Cozy' },
    { value: 'floral', label: 'Airy' },
    { value: 'umami', label: 'Luxurious' },
    { value: 'grassy', label: 'Minimalist' },
  ];
}

// New quiz groups based on provided document

class PleasantScent {
  id = 'q3';
  initialPrompt = "There's a pleasnt";
  followUpPrompt = 'aroma in the air';
  options = [
    { value: 'creamy', label: 'Vanilla' },
    { value: 'nutty', label: 'Freshly baked bread' },
    { value: 'floral', label: 'Wildflowers' },
    { value: 'grassy', label: 'Lemongrass' },
  ];
}

class DrinkChoice {
  id = 'q4';
  initialPrompt = "Let's order a drink! The";
  followUpPrompt = 'sounds good';
  options = [
    { value: 'astringent', label: 'Black coffee' },
    { value: 'floral', label: 'Plum tea' },
    // grassy value
    { value: 'creamy', label: 'Hot chocolate' },
    // nutty value
    { value: 'nutty', label: 'Mocha' },
  ];
}

class MilkPreference {
  id = 'q5';
  initialPrompt = "You'll have that";
  followUpPrompt = '';
  options = [
    { value: 'astringent', label: 'Straight' },
    { value: 'nutty', label: 'Almond milk' },
    { value: 'umami', label: 'Oat milk' },
    { value: 'creamy', label: 'Whole milk' },
  ];
}

class BeveragePreference {
  id = 'q6';
  initialPrompt = 'You like...';
  followUpPrompt = '';
  options = [
    { value: 'usucha', label: 'A refreshing beverage' },
    { value: 'koicha', label: 'A rich beverage to enjoy slowly' },
    {
      value: 'latte',
      label: 'A satisfying beverage you can take on the go',
    },
  ];
}

class MenuSelection {
  id = 'q7';
  initialPrompt = 'What looks good on the menu?';
  followUpPrompt = '';
  options = [
    // Tags from doc: floral, astringent, nutty/creamy
    { value: 'umami', label: 'Mushroom pappardelle' },
    { value: 'nutty', label: 'Pistachio' },
    { value: 'astringent', label: 'Sushi' },
    { value: 'grassy', label: 'Salad' },
  ];
}

class BakeryItemChoice {
  id = 'q8';
  initialPrompt = "You'll take a";
  followUpPrompt = 'To go';
  options = [
    { value: 'nutty', label: 'Cardamom bun' },
    { value: 'creamy', label: 'Canele' },
    { value: 'floral', label: 'Orange blossom madeleine' },
    {
      value: 'umami',
      label: 'Spinach and white cheddar puff pastry',
    },
  ];
}

export const QUIZ_QUESTIONS = [
  new Season(),
  new Aesthetic(),
  new PleasantScent(),
  new DrinkChoice(),
  new MilkPreference(),
  new BeveragePreference(),
  new MenuSelection(),
  new BakeryItemChoice(),
];
