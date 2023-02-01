import React from "react"
import Link from "next/link"

export default function Footer({ links }) {
  return (
    <section className="footer section">
      <div>
        <div>
          <div lg={4}>
            <div className="mb-4">
              <p className="text-muted mt-4 mb-2">your-email@email.com</p>
              <h6 className="text-muted font-weight-normal">+1 555-2368</h6>
            </div>
          </div>
          <div lg={8}>
            <div>
              {links.map((link, key) => (
                <div key={key} md={4}>
                  <h6 className="text-dark mb-3">{link.title}</h6>
                  <ul className="list-unstyled company-sub-menu">
                    {link.child.map((fLink, key) => (
                      <li key={key}>
                        <Link href={fLink.link}>{fLink.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div md={4}>
                <h6 className="text-dark mb-3">Our Address</h6>
                <p className="text-muted f-14">1234 Lorem Ipsum, 12345</p>
                <ul className="list-unstyled footer-social-list mt-4">
                  <li className="list-inline-item">
                    <Link href="src/app/components/Footer#">
                      <i className="mdi mdi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="src/app/components/Footer#">
                      <i className="mdi mdi-instagram"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="src/app/components/Footer#">
                      <i className="mdi mdi-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div md={12}>
            <div className="text-center text-muted">
              <p className="mb-0 f-15">{`©${new Date().getFullYear()} - Your Company Name`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
