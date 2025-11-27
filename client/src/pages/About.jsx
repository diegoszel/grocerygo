const About = () => {
  return (
    <section className="page">
      <h1>About GroceryGo</h1>
      <p>
        GroceryGo is an online grocery demo built as a full-stack final
        project. It includes authentication, admin product management, and a
        personal favorites list.
      </p>
      <h2>How to use the site</h2>
      <ol>
        <li>Create an account and log in.</li>
        <li>Browse products and filter by category or availability.</li>
        <li>Open a product to see details and add it to your favorites.</li>
        <li>Visit the Favorites page to review all saved products.</li>
        <li>
          If you are an admin, open the Admin section to create, edit and
          delete products.
        </li>
      </ol>
      <p>Developed by <strong>Diego Szelepski</strong>.</p>
    </section>
  );
};

export default About;
