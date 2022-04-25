import Layout from "../src/app/components/Layout"
import Header from "../src/app/components/Header"
import Hero from "../src/app/components/Hero"
import Services from "../src/app/components/Services"
import About from "../src/app/components/About"
import Footer from "../src/app/components/Footer"
import serviceSource from "../src/app/assets/services.json"
import footerSource from "../src/app/assets/footer.json"

export default function LandingPage({ services, footerLinks }) {
  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      <Header />
      <Hero />
      <Services services={services} />
      <About />
      <Footer links={footerLinks} />
    </Layout>
  )
}

export function getStaticProps() {
  // in a real-world scenario retrieve the service list
  // by calling an API or performing a query
  const services = serviceSource

  // retrieving the footer link list ...
  const footerLinks = footerSource

  return {
    props: {
      services: services,
      footerLinks: footerLinks,
    },
    revalidate: 60,
  }
}
