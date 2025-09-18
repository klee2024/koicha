// TODO: Map these to the characteristic values

class Season {
  initialPrompt = "It's a beautiful";
  followUpPrompt = 'day';
  options = [
    { value: 'option1', label: 'Spring' },
    { value: 'option2', label: 'Summer' },
    { value: 'option3', label: 'Fall' },
    { value: 'option4', label: 'Winter' },
  ];
}

class Aesthetic {
  options = [
    { value: 'option1', label: 'Cozy' },
    { value: 'option2', label: 'Airy' },
    { value: 'option3', label: 'Luxurious' },
    { value: 'option4', label: 'Minimalist' },
  ];
}

// New quiz groups based on provided document

class PleasantScent {
  options = [
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'freshly-baked-bread', label: 'Freshly baked bread' },
    { value: 'wildflowers', label: 'Wildflowers' },
    { value: 'lemongrass', label: 'Lemongrass' },
  ];
}

class DrinkChoice {
  options = [
    { value: 'black-coffee', label: 'Black coffee' }, // astringent
    { value: 'plum-tea', label: 'Plum tea' }, // creamy
  ];
}

class MilkPreference {
  options = [
    { value: 'straight', label: 'Straight' },
    { value: 'almond-milk', label: 'Almond milk' },
    { value: 'oat-milk', label: 'Oat milk' },
    { value: 'whole-milk', label: 'Whole milk' },
  ];
}

class BeveragePreference {
  options = [
    { value: 'refreshing', label: 'A refreshing beverage' },
    { value: 'rich-slow', label: 'A rich beverage to enjoy slowly' },
    {
      value: 'satisfying-to-go',
      label: 'A satisfying beverage you can take on the go',
    },
  ];
}

class MenuSelection {
  options = [
    // Tags from doc: floral, astringent, nutty/creamy
    { value: 'mushroom-rigatoni', label: 'Mushroom rigatoni' },
  ];
}

class BakeryItemChoice {
  options = [
    { value: 'cardamom-bun', label: 'Cardamom bun' },
    { value: 'canele', label: 'Canele' },
    { value: 'orange-blossom-madeleine', label: 'Orange blossom madeleine' },
    {
      value: 'spinach-white-cheddar-puff',
      label: 'Spinach and white cheddar puff pastry',
    },
  ];
}

export const QUIZ_QUESTION_CLASSES = [
  new Season(),
  new Aesthetic(),
  new PleasantScent(),
  new DrinkChoice(),
  new MilkPreference(),
  new BeveragePreference(),
  new MenuSelection(),
  new BakeryItemChoice(),
];
