const ingredients = ['tomato', 'apple'];

const pizza = setTimeout(
  (tomato, apple) => {
    console.log(`pizza here with ${tomato},${apple}`);
  },
  2000,
  ...ingredients
);

if (ingredients.includes('tomato')) clearTimeout(pizza);
