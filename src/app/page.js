import Hero from "../components/main/Hero";
import HomeMenu from "../components/main/HomeMenu";
import SectionHeaders from "../components/main/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about" className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Welcome to our flavorful world!
            <span className="text-primary font-bold tracking-wider text-lg">
              Foody!
            </span>
            <br />
            we’re passionate about connecting food lovers with their favorite
            cuisines, right at their fingertips. Whether you’re craving comfort
            food, exotic flavors, or healthy bites, we’ve got you covered.
          </p>
          <p>
            What Sets Us Apart? <br />
            Variety: Explore a smorgasbord of options! From sizzling biryanis to
            cheesy pizzas, our app features a wide range of cuisines.
            Vegetarian? Vegan? Gluten-free? No worries—we’ve got choices galore.
            <br /> Speedy Delivery: Hungry? Don’t wait! Our lightning-fast
            delivery ensures your food arrives fresh and piping hot. Because no
            one likes a cold samosa, right? <br />
            Safety First: Your well-being matters to us. We adhere to strict
            safety and hygiene standards, ensuring your meal reaches you in
            top-notch condition.
            <br />
            User-Friendly Experience: Our app’s intuitive interface makes
            ordering a breeze. Browse menus, customize your meal, and track your
            delivery—all with a few taps.
          </p>
        </div>
      </section>
      <section id="contact" className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't Hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a className="text-4xl text-gray-500" href="tel:+919600446800">
            +91-96004 46800
          </a>
        </div>
      </section>
    </>
  );
}
