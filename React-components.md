# React Components

# React.memo (functional component):

O componente só será rerenderizado quando o componente pai mudar E QUANDO o props passado pelo componente pai para este componente também mudar. Caso o componente pai mude um status o qual não é passado para este componente, ele não será rerenderizado.

````
const IngredientForm = React.memo(props => {
  
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          ...
        </form>
      </Card>
    </section>
  );
});
````